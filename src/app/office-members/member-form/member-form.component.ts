import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  specialties = this.dictionaryService.memberSpecialties;
  specialtiesLoading = this.dictionaryService.memberSpecialtiesLoading;
  positions = this.dictionaryService.memberPositions;
  positionsLoading = this.dictionaryService.memberPositionsLoading;
  frm!: FormGroup;
  isLoading = this.officeMemberService.isLoading;
  language = this.languageService.currentLanguage;
  uploadingType$ = this.officeMemberService.uploadingType$;
  downloadingFile$ = this.officeMemberService.downloadingFile$;
  defaultNationalityId = 0;
  nationalities = this.dictionaryService.nationalities.pipe(
    map(x => {
      if(this.languageService.currentLanguage === 'ar') {
        return x.sort((a,b) => {
          if ( a.NameArabic < b.NameArabic ){
            return -1;
          }
          if ( a.NameArabic > b.NameArabic ){
            return 1;
          }
          return 0;
        })
      }
      else {
        return x.sort((a,b) => {
          if ( a.NameEnglish < b.NameEnglish ){
            return -1;
          }
          if ( a.NameEnglish > b.NameEnglish ){
            return 1;
          }
          return 0;
        })
      }
    }),
    tap(x => this.defaultNationalityId = x.find(z => z.NameEnglish = 'Kuwait')?.Id!)
  )
  nationalitiesLoading = this.dictionaryService.nationalitiesLoading;
  constructor(private deviceService: DeviceService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private dictionaryService: DictionaryService,
              private officeMemberService: OfficeMemberService,
              private languageService: LanguageService,
              private confirm: ConfirmService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

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
      tap(om => this.officeMember = om!),
      ///Getting Office Id
      switchMap(() => this.route.parent?.parent?.parent?.paramMap!),
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.officeId = +param.get('id')!;
          return this.officeId;
        }
        else {
          return null
        }
      }),
      tap(om => {
        this.frm = this.officeMemberService.createOfficeMemberForm(this.officeId, this.officeMember!);
      })
    ).subscribe()
  }
  save(){
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open({Type: 'update'}).pipe(
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
        this.router.navigate(['edit', x.Id], {relativeTo: this.route.parent})
      }
      else if(x && this.officeMemberId) {
        this.router.navigate(['list'], {relativeTo: this.route.parent})
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
        type.Files.pop();
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
      if (fileName) {
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
      // const fileUrl = URL.createObjectURL(x);
      // window.open(fileUrl, '_blank');
      // // const safeUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
      // //   this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl))
      // // const a = document.createElement('a');
      // // a.target = '_blank';
      // // a.href = safeUrl!;
      // // console.log(a);
      // // a.click();
    });
  }
  openFileInNewWindow(id: number, fileName: string) {
    return this.officeMemberService.getFile(id).subscribe(x => {
      if (fileName) {
        const fileUrl = URL.createObjectURL(x);
        window.open(fileUrl);
      }
    });
  }
  reset(){

  }
  deleteFile(id: number, fileName: string, documentTypeIndex: number, fileIndex: number) {
    this.confirm.open({Type: 'delete', ElementNameArabic: fileName, ElementNameEnglish: fileName}).pipe(
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
