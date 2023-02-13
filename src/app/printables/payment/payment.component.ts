import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { OfficeLicenseService } from 'src/app/app-services/office-license.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isLoading = this.licenseService.isGettingReceipt$;
  html = '';
  @ViewChild('document') printable!: ElementRef;
  constructor(private licenseService: OfficeLicenseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        return +param.get('id')!
      }),
      switchMap(id => this.licenseService.getReceiptByPaymentId(id)),
      map(x => x.Html)
    ).subscribe(x => this.html = x)
  }
  printThisPage(id: string) {
    const div = document.getElementById(id);
    if(div) {
      const printContents = div.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  }
  print() {
    window.print();
  }
}
