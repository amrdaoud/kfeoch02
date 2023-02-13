import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, debounceTime, distinctUntilChanged, startWith, map, of, Subscription } from 'rxjs';
import { ColumnDef, DynamicTableByndingModel, SelectFilter } from 'src/app/app-models/shared';
import LanguageService from 'src/app/app-services/language.service';

@Component({
  selector: 'app-dynamic-data-table',
  templateUrl: './dynamic-data-table.component.html',
  styleUrls: ['./dynamic-data-table.component.scss']
})
export class DynamicDataTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() data = new Observable<any[]>();
  @Input() columnsDef: ColumnDef[] = [];
  @Input() clickable: boolean = false;
  @Input() activeSort!: string;
  @Input() activeDirection: SortDirection = 'asc';
  @Input() borders = false;
  @Input() havePaging: boolean = false;
  @Input() padding!: string
  @Input() haveFilter: boolean = false;
  @Input() isObservableFilter: boolean = false;
  @Input() isLoading = new Observable<boolean>();
  @Input() dataSize = new Observable<number>();
  @Input() filterFormGroup = new FormGroup({});
  @Input() haveFilterForm = false;
  @Input() filterFormCols = 0;
  @Input() btn1: string = '';
  @Input() btn2: string = '';
  @Input() btn3: string = '';
  @Input() selectFilters!: SelectFilter[] | null;
  @Input() selectFiltersCols = 4;
  @Input() language$ = of('en');
  @Input() showFilters = false;
  @Input() haveExport = false;
  @Output() rowClicked = new EventEmitter<any>();
  @Output() bindingChanged = new EventEmitter<Observable<DynamicTableByndingModel>>();
  @Output() exportClick = new EventEmitter<any>();
  @Output() btn1Click = new EventEmitter<any>();
  @Output() btn2Click = new EventEmitter<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ds = 0;
  dataSource = new MatTableDataSource<any>();
  columns: string[] = [];
  filterControl = new FormControl('');
  frm = new FormGroup({});
  s0!: Subscription;
  s1!: Subscription;
  s2!: Subscription;
  s3!: Subscription;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'])
    this.s0 = this.data.subscribe(result => {
      this.dataSource.data = result;
      console.log(result);
    });
    if(changes['columnsDef']) {
      this.columns = this.columnsDef.map(x => x.Property + (x.SubProperty ? x.SubProperty : ''));
      if(this.btn1 || this.btn2) {
        this.columns.push('actions')
      }
    }
    if(changes['btn1']) {
      if(this.btn1 || this.btn2) {
        this.columns.push('actions')
      }
    }
  }
  ngOnInit(): void {
    this.columns = this.columnsDef.map(x => x.Property + (x.SubProperty ? x.SubProperty : ''));
    if(this.btn1 || this.btn2) {
      this.columns.push('actions')
    }
    this.buildFormControls();
  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.data.subscribe(result => {
      this.dataSource.data = result;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.s1 = this.sort.sortChange.subscribe(() => (this.paginator ? this.paginator.pageIndex = 0 : ''));
    this.s2 = this.frm.valueChanges.subscribe(() => (this.paginator ? this.paginator.pageIndex = 0 : ''));
    if(!this.isObservableFilter) {
      this.s3 = this.filterControl.valueChanges.subscribe((val: string | null) => {
        (this.paginator ? this.paginator.pageIndex = 0 : '');
        this.dataSource.filter = val!;
      });
    }
    else {
      this.s3 = this.filterControl.valueChanges.subscribe((val: string | null) => {
        (this.paginator ? this.paginator.pageIndex = 0 : '');
      });
    }


    const mergedBinding = this.paginator ? merge(this.sort.sortChange,
      this.paginator.page,
      this.frm.valueChanges,
      this.filterControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      ) : merge(this.sort.sortChange,
        this.frm.valueChanges,
        this.filterControl.valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        );
    this.bindingChanged.emit(mergedBinding.pipe(
      startWith({}),
      map(() => {
        const ret = new DynamicTableByndingModel();
        ret.SearchQuery = this.filterControl.value!;
        ret.Sort = this.sort.active;
        ret.Order = this.sort.direction;
        ret.PageIndex = this.paginator? this.paginator.pageIndex : 0;
        ret.PageSize = this.paginator? this.paginator.pageSize : 0;
        return Object.assign({}, ret, this.frm.value);
      })
    ));
  }
  rowClick(model: any) {
    this.rowClicked.emit(model);
  }
  btn1Clicked(model: any) {
    this.btn1Click.emit(model)
  }
  btn2Clicked(model: any) {
    this.btn2Click.emit(model)
  }
  exportClicked() {
    this.exportClick.emit();
  }
  buildFormControls() {
    if(this.selectFilters) {
      for(const field of this.selectFilters) {
        this.frm.addControl(field.controlName, new FormControl('',{updateOn:field.updateOn}))
      }
    }
  }
  ngOnDestroy(): void {
      this.s0 ? this.s0.unsubscribe() : '';
      this.s1 ? this.s1.unsubscribe() : '';
      this.s2 ? this.s2.unsubscribe() : '';
      this.s3 ? this.s3.unsubscribe() : '';
  }

}

