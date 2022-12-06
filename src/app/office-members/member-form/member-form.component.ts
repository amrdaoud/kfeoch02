import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { MemberDocument, OfficeMember } from 'src/app/app-models/office-members';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeMemberService } from 'src/app/app-services/office-member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  officeMember!: OfficeMember;
  officeMemberId!: number;
  genders = this.dictionaryService.genders;
  gendersLoading = this.dictionaryService.gendersLoading;
  specialties = this.dictionaryService.ownerSpecialties;
  specialtiesLoading = this.dictionaryService.ownerSpecialtiesLoading;
  frm!: FormGroup;
  isLoading = this.officeMemberService.isLoading;
  language = this.languageService.currentLanguage;
  constructor(private deviceService: DeviceService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private dictionaryService: DictionaryService,
              private officeMemberService: OfficeMemberService,
              private languageService: LanguageService,
              private confirm: ConfirmService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeMemberId = +param.get('id')!;
          return this.officeMemberId;
        }
        else {
          return null
        }
      }),
      switchMap((id: number | null) => {
        if(id) {
          return this.officeMemberService.getMemberById(this.officeMemberId!)
        }
        return of(null)
      }),
      tap(om => {
        this.officeMember = om!;
        this.frm = this.officeMemberService.createOfficeMemberForm(this.officeId, om!);
      })
    ).subscribe()
  }
  save(){
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to save updates?').pipe(
      filter(x => x),
      exhaustMap(() => {
        if(this.officeMemberId) {
          return this.officeMemberService.editOfficeMember(this.officeMemberId, this.frm.getRawValue())
        }
        return this.officeMemberService.addOfficeMember(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      if(x && !this.officeMemberId) {
        this.router.navigateByUrl('/office/members/edit/' + x.Id)
      }
      else if(x && this.officeMemberId) {
        this.router.navigateByUrl('/office/members/list')
      }
    });
  }
  uploadFile(event:any, type: MemberDocument) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("File", selectedFile);
    formData.append("OwnerId", this.officeMemberId? this.officeMemberId.toString() : '');
    formData.append("TypeId",type.Id.toString() );
    this.officeMemberService.uploadFile(formData).subscribe(x => {
      if(x) {
        type.Files.push(x);
      }
    });
  }
  getFile(id: number, fileName: string) {
    return this.officeMemberService.getFile(id).subscribe(x => {
      let dataType = x.type;
      let binaryData = [];
      binaryData.push(x);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      if (fileName)
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    });
  }
  reset(){

  }
  deleteFile(id: number, fileName: string, documentTypeIndex: number, fileIndex: number) {
    this.confirm.open('Are you sure you want to delete file: ' + fileName).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeMemberService.deleteFile(id)
      })
    ).subscribe(x => {
      if(x) {
        this.officeMember.Documents[documentTypeIndex].Files.splice(fileIndex,1);
      }
    });
  }

}
