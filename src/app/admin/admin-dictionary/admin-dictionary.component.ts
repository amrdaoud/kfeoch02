import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { exhaustMap, filter, map, Observable, switchMap, tap } from 'rxjs';
import { DictionaryTemplate } from 'src/app/app-models/dictionary';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { DictionaryService } from 'src/app/app-services/dictionary.service';
import LanguageService from 'src/app/app-services/language.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-admin-dictionary',
  templateUrl: './admin-dictionary.component.html',
  styleUrls: ['./admin-dictionary.component.scss']
})
export class AdminDictionaryComponent implements OnInit, AfterViewInit {
  dictionaryName: string | null = '';
  isHandset = this.deviceService.isHandset$;
  dataSource = new MatTableDataSource();
  language$ = this.languageService.currentLanguage$;
  template!: DictionaryTemplate | null;
  columns = ['Id', 'Name', 'Description'];
  selected!: any;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route: ActivatedRoute,
              private dictionaryService: DictionaryService,
              private deviceService: DeviceService,
              private languageService: LanguageService,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
    this.route.url.pipe(
      map(x => x[0].path),
      tap(name => {
        this.template = this.dictionaryService.getDictionaryTemplate(name!);
        if(this.template?.haveParent) {
          this.columns.push(this.template?.parentLabel!)
        }
        if(this.template?.haveNumberProperty) {
          this.columns.push(this.template?.numberPropertyName!)
        }
      }),
      switchMap(() => this.template?.data!)
    ).subscribe(data =>
      {
         this.dataSource.data = data!;
      }

    );
  }
  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch(property) {
        case 'Name': if(this.languageService.currentLanguage === 'ar') {
          return item['NameArabic'];
        } else {
          return item['NameEnglish'];
        }
        case this.template?.parentLabel!: if(this.languageService.currentLanguage === 'ar') {
          return item['ParentNameArabic'];
        } else {
          return item['ParentNameEnglish'];
        }
        default: return item[property];
      }
    }
    this.dataSource.sort = this.sort;
  }
  save() {
    if(this.template?.frm.invalid) {
      return;
    }
    if(!this.selected) {
      this.confirm.open({Type: 'add'}).pipe(
        filter(x => x),
        exhaustMap(() => this.dictionaryService.httpAddDictionary(this.template?.urlName!, this.template?.frm.value))
      ).subscribe(
        y => {
          if(y) this.template?.frm.reset();
        }
      );
    } else {
      this.confirm.open({Type: 'update'}).pipe(
        filter(x => x),
        exhaustMap(() => this.dictionaryService.httpEditDictionary(this.template?.urlName!, this.template?.frm.value))
      ).subscribe(
        y => {
          if(y) this.template?.frm.reset();
        }
      );
    }

  }
  dictionaryClicked(element: any) {
    this.selected = element;
    this.template?.frm.patchValue(element);
  }
  reset() {
    this.selected = null;
    this.template?.frm.reset();
    this.template?.frm.get('Id')?.setValue(0);
  }

}
