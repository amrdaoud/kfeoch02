import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { OfficeMemberViewModel } from 'src/app/app-models/office-members';
import { AccountService } from 'src/app/app-services/account.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { OfficeMemberService } from 'src/app/app-services/office-member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-member-list',
  templateUrl: './office-member-list.component.html',
  styleUrls: ['./office-member-list.component.scss']
})
export class OfficeMemberListComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  isTest = environment.test;
  members: OfficeMemberViewModel[] = [];
  officeId =this.accountService.getOfficeId();
  dataSource = new MatTableDataSource<OfficeMemberViewModel>();
  columns = ['Name', 'Speciality', 'Gender', 'Actions'];
  isLoading = this.officeMemberService.isLoading;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private officeMemberService: OfficeMemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.isHandset.subscribe(x => {
      if(x) {
        this.columns = ['Name'];
      }
      else {
        this.columns = ['Name', 'Speciality', 'Gender'];
      }
    })
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeId = +param.get('id')!;
          return this.officeId;
        }
        else {
          return this.officeId ?? 0
        }
      }),
      switchMap((id: number) => {
        return this.officeMemberService.getMembersByOfficeId(this.officeId!)
      }),
      tap(o => {
        this.members = o;
        this.dataSource.data = o;
      })
    ).subscribe()
  }

  rowClick(id:number) {
    this.router.navigateByUrl('/office/members/edit/' + id);
  }

}
