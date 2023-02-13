import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { exhaustMap, filter, map, tap } from 'rxjs';
import { ConfirmService } from 'src/app/app-services/confirm.service';
import { DeviceService } from 'src/app/app-services/device.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  postId = 0;
  frm!: FormGroup;
  isHandset = this.deviceService.isHandset$;
  isLoading = this.siteService.isLoadingPost$;
  imgSrc!: string | ArrayBuffer | null;
  constructor(private route: ActivatedRoute,
              private siteService: SiteService,
              private deviceService: DeviceService,
              private confirm: ConfirmService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      // filter((param: ParamMap) => param.get('id') ? true : false),
      map((param: ParamMap) => {
        if(param.get('id')) {
          this.postId = +param.get('id')!;
          return this.postId;
        } else {
          return null;
        }
      }),
      tap(id => {
        this.frm = this.siteService.createSectionForm(this.postId)
      })
    ).subscribe();
  }
  save() {


    if(this.frm.invalid) {
      return;
    }
    const currentUrl = this.route.snapshot.url;
    currentUrl.pop();
    this.confirm.open({Type: 'add'}).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.siteService.addSectionWithImageFormData(this.frm.value)
      })
    )
    .subscribe(x => {
      this.router.navigate([...currentUrl.map(x => x.path)],{relativeTo: this.route.parent});
    });
  }
  reset() {
    this.confirm.open({Type: 'reset'}).pipe(
      filter(x => x)
    ).subscribe(() => {
      this.frm.reset();
    })
  }
  previewImage(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imgSrc = reader.result!
    };
    reader.readAsDataURL(selectedFile);

    this.frm.get('ImageFile')?.setValue(selectedFile);
  }

}
