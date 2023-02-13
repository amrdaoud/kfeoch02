import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { OfficeCertificateService } from 'src/app/app-services/office-certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  isLoading = this.certificateService.isGettingCertificate$;
  html = '';
  hasQr = false;
  location = window.location.href;
  @ViewChild('document') printable!: ElementRef;
  constructor(private certificateService: OfficeCertificateService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        return +param.get('id')!
      }),
      switchMap(id => this.certificateService.getCertificateById(id)),
      tap(x => this.hasQr = x.HasQr),
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
