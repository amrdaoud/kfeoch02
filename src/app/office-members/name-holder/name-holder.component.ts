import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-holder',
  templateUrl: './name-holder.component.html',
  styleUrls: ['./name-holder.component.scss']
})
export class NameHolderComponent implements OnInit {
  @Input() name = '';
  @Input() id = '';
  @Input() color = 'primary'
  @Input() language: string | null = 'en';
  constructor() { }

  ngOnInit(): void {
  }
  get initials(): string {
    const splitted = this.name.split(' ');
    if(splitted.length > 1 && splitted[0] && splitted[1]) {
      return splitted[0][0].toUpperCase() + (this.language === 'ar' ? '-' : '') + splitted[1][0].toUpperCase();
    }
    return this.name.split(' ')[0][0].toUpperCase();
  }

}
