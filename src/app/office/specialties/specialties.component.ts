import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { exhaustMap, filter, map, mergeMap, switchMap, tap } from 'rxjs';
import { Specialty } from 'src/app/app-models/dictionary';
import { OfficeSpecialityViewModel } from 'src/app/app-models/office';
import { AccountService } from 'src/app/app-services/account.service';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { OfficeSpecialtiesService } from 'src/app/app-services/office-specialties.service';
import { OfficeService } from 'src/app/app-services/office.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss']
})
export class SpecialtiesComponent implements OnInit {
  isHandset = this.deviceService.isHandset$;
  officeId = this.accountService.getOfficeId();
  officeSpecialties: OfficeSpecialityViewModel[] = [];
  eligibleSpecialties: Specialty[] = [];
  frm!: FormGroup;
  language = this.languageService.currentLanguage;
  isLoadingEligible = this.officeSpecialtiesService.isLoadingEligible;
  isLoading = this.officeSpecialtiesService.isLoading;
  constructor(private deviceService: DeviceService,
              private officeSpecialtiesService: OfficeSpecialtiesService,
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
        return this.officeSpecialtiesService.getOfficeSpecialties(this.officeId!)
      }),
      tap(o => {
        this.officeSpecialties = o;
        this.frm = this.officeSpecialtiesService.createSpecialtyForm(this.officeId!);
      }),
      switchMap(() => {
        return this.officeSpecialtiesService.getEligibleSpecialties(this.officeId!)
      })
    ).subscribe(
      x => {
        this.eligibleSpecialties = x;
      }
    )
  }

  save() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to add specialty?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeSpecialtiesService.addOfficeSpecialty(this.frm.getRawValue())
      })
    )
    .subscribe(x => {
      this.officeSpecialties.push(x);
      this.frm.get('SpecialityId')?.setValue('');
    });
  }
  delete(id: number, i: number) {
    this.confirm.open('Are you sure you want to delete specialty?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.officeSpecialtiesService.deleteOfficeSpecialty(id)
      })
    )
    .subscribe(x => {
      if(x) {
        this.officeSpecialties.splice(i,1);
      }

    });
  }

}
