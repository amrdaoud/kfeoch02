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
  constructor() { }

  ngOnInit(): void {
  }
  get initials(): string {
    const splitted = this.name.split(' ');
    if(splitted.length > 1) {
      return this.name.split(' ')[0][0].toUpperCase() + this.name.split(' ')[1][0].toUpperCase();
    }
    return this.name.split(' ')[0][0].toUpperCase();
  }

}
