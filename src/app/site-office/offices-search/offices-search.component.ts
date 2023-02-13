import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, merge, Observable, startWith, switchMap, tap } from 'rxjs';
import { Office } from 'src/app/app-models/office';
import { DynamicTableByndingModel } from 'src/app/app-models/shared';
import { DeviceService } from 'src/app/app-services/device.service';
import LanguageService from 'src/app/app-services/language.service';
import { SiteService } from 'src/app/app-services/site.service';

@Component({
  selector: 'app-offices-search',
  templateUrl: './offices-search.component.html',
  styleUrls: ['./offices-search.component.scss']
})
export class OfficesSearchComponent implements AfterViewInit {
  isHandset = this.deviceService.isHandset$;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl('');
  offices = new Observable<Office[]>();
  dataSize = 100;
  language$ = this.languageService.currentLanguage$;
  isLoading$ = this.siteService.isLoadingOffices$;
  constructor(private deviceService: DeviceService,
              private route: ActivatedRoute,
              private siteService: SiteService,
              private languageService: LanguageService,
              private router: Router) { }
  ngAfterViewInit(): void {
    this.offices = merge(this.paginator.page,
                            this.searchControl.valueChanges.pipe(
                              debounceTime(400),
                              distinctUntilChanged()
                            )
                        ).pipe(
                          startWith({}),
                          map(() => {
                            const filter = new DynamicTableByndingModel();
                            filter.PageIndex = this.paginator.pageIndex;
                            filter.PageSize = this.paginator.pageSize;
                            filter.SearchQuery = this.searchControl.value;
                            return filter;
                          }),
                          switchMap((filter: DynamicTableByndingModel) =>
                            this.siteService.getOfficesByFilter(filter).pipe(
                              tap(x => this.dataSize = x.DataSize),
                              map(x => x.Data)
                            )
                          )
                        )
    const searchQuery = this.route.snapshot.queryParams['searchQuery'];
    if(searchQuery) {
      this.searchControl.setValue(searchQuery);
    }
  }
  goToOffice(office: Office) {
    this.router.navigate(['site-offices', office.Id] )
  }

}
