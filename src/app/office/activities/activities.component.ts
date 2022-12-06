import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { Activity } from 'src/app/app-models/dictionary';
import { OfficeActivityViewModel } from 'src/app/app-models/office';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeActivitiesService } from 'src/app/app-services/office-activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  officeActivities: OfficeActivityViewModel[] = [];
  eligibleActivities: Activity[] = [];
  frm!: FormGroup;
  language = this.languageService.currentLanguage;
  isLoadingEligible = this.officeActivitiesService.isLoadingEligible;
  isLoading = this.officeActivitiesService.isLoading;
  constructor(private deviceService: DeviceService,
              private officeActivitiesService: OfficeActivitiesService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private languageService: LanguageService,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
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
        return this.officeActivitiesService.getOfficeActivities(this.officeId!)
      }),
      tap(o => {
        this.officeActivities = o;
        this.frm = this.officeActivitiesService.createActivityForm(this.officeId!);
      }),
      switchMap(() => {
        return this.officeActivitiesService.getEligibleActivities(this.officeId!)
      })
    ).subscribe(
      x => {
        this.eligibleActivities = x;
      }
    )
  }

  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to add activity?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeActivitiesService.addOfficeActivity(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      this.officeActivities.push(x);
      this.frm.get('ActivityId')?.setValue('');
    });
  }
  delete(id: number, i: number) {
    this.confirm.open('Are you sure you want to delete activity?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeActivitiesService.deleteOfficeActivity(id)
      })
    )
    .subscribe(x => {
      if(x) {
        this.officeActivities.splice(i,1);
      }
    });
  }

}
