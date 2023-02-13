import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmMapping, ConfirmModel } from 'src/app/app-models/shared';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  confirmMapping = confirmMapping;
  language$ = this.languageService.currentLanguage$;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmModel,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
