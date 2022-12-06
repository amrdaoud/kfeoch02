import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { OfficeContactViewModel } from 'src/app/app-models/office';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeContactListService } from 'src/app/app-services/office-contact-list.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {
  language$ = this.languageService.currentLanguage$;
  isHandset = this.deviceService.isHandset$;
  contactTypes = this.dictionaryService.contactTypes;
  officeContacts: OfficeContactViewModel[] = [];
  contactTypesLoading = this.dictionaryService.contactTypesLoading;
  officeId = this.accountService.getOfficeId();
  isLoading = this.contactListService.isLoading;
  frm!: FormGroup;
  constructor(private deviceService: DeviceService,
              private languageService: LanguageService,
              private accountService: AccountService,
              private dictionaryService: DictionaryService,
              private contactListService: OfficeContactListService,
              private route: ActivatedRoute,
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
        return this.contactListService.getOfficeContacts(this.officeId!)
      }),
      tap(o => {
        this.officeContacts = o;
        this.frm = this.contactListService.createContactForm(this.officeId!);
      })
    ).subscribe()
  }
  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to add contact?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.contactListService.addOfficeContact(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      this.officeContacts.push(x);
      this.frm.get('ContactId')?.setValue('');
      this.frm.get('PhoneNumber')?.setValue('');
    });
  }
  delete(id: number, i: number) {
    this.confirm.open('Are you sure you want to delete contact?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.contactListService.deleteOfficeCoontact(id)
      })
    )
    .subscribe(x => {
      if(x) {
        this.officeContacts.splice(i,1);
      }

    });
  }

}
