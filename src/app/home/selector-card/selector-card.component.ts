import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-selector-card',
  templateUrl: './selector-card.component.html',
  styleUrls: ['./selector-card.component.scss'],
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0, height: 0}),
        animate('0.5s', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class SelectorCardComponent implements OnInit {
  @Input() bgImage = '';
  @Input() overlayHeight = '20';
  @Input() icon = '';
  @Input() iconColor = 'accent';
  @Input() isLoading = false;
  @Input() hideOverlay = false;
showOverlay = false;
  constructor() { }

  ngOnInit(): void {
  }

}
