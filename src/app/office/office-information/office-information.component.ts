import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs';
import { Office } from 'src/app/app-models/office';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeService } from 'src/app/app-services/office.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-office-information',
  templateUrl: './office-information.component.html',
  styleUrls: ['./office-information.component.scss']
})
export class OfficeInformationComponent implements OnInit {
  isTest = environment.test;
  language = this.languageService.currentLanguage;
  office!: Office;
  frm!: FormGroup;
  officeTypes = this.dictionaryService.officeTypes;
  officeTypesLoading = this.dictionaryService.officeTypesLoading;
  officeEntities = this.dictionaryService.officeEntities;
  officeEntitiesLoading = this.dictionaryService.officeEntitiesLoading;
  officeLegalEntities = this.dictionaryService.officeLegalEntities;
  officeLegalEntitiesLoading = this.dictionaryService.officeLegalEntitiesLoading;
  countries = this.dictionaryService.countries;
  countriesLoading = this.dictionaryService.countriesLoading;
  governorates = this.dictionaryService.governorates;
  governoratesLoading = this.dictionaryService.governoratesLoading;
  areas = this.dictionaryService.areas;
  areasLoading = this.dictionaryService.areasLoading;
  isLoading = this.officeService.isLoading;
  officeId = this.accountService.getOfficeId();
  isHandset = this.deviceService.isHandset$;
  constructor(private dictionaryService: DictionaryService,
              private languageService: LanguageService,
              private officeService: OfficeService,
              private route: ActivatedRoute,
              private confirm: ConfirmService,
              private accountService: AccountService,
              private deviceService: DeviceService,
              private router: Router) { }

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
        return this.officeService.getOfficeById(this.officeId!)
      }),
      tap(o => {
        this.office = o;
        this.frm = this.officeService.createOfficeForm(o);
      })
    ).subscribe()
  }

  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to save updates?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeService.updateOffice(this.frm.get('Id')?.value,this.frm.getRawValue())
      })
    )
    .subscribe(x => this.office = x);
  }
  reset() {
    this.confirm.open('Are you sure you want to reset changes?').pipe(
      filter(x => x)
    ).subscribe(() => {
      this.frm.patchValue(this.office);
    })

  }
  uploadLogo(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("File", selectedFile);
    formData.append("FileName", this.officeId? this.officeId.toString() : '');
    this.officeService.uploadLogo(formData).subscribe(x => this.office.LogoUrl = x.LogoUrl + '?r=' + Date.now());
  }
  deleteLogo() {
    this.confirm.open('Are you sure you want to remove logo?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeService.deleteLogo(this.office.Id);
      })
    ).subscribe(x => {
      if(x) {
        this.office.LogoUrl = null;
      }
    })
  }

  logOut() {
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }

}
