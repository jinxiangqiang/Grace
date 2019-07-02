import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  Inject,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { Subject } from 'rxjs';

import { debounceTime } from 'rxjs/operators';

import { NzMessageService, NzTableComponent } from 'ng-zorro-antd';

import * as $ from 'jquery';


@Directive({
  selector: 'nz-table[default-table]',
  exportAs: 'default-table',
})
export class BiTableDirective implements OnInit, OnDestroy, AfterViewInit {
  loadingTimeout;

  @Input() width;

  @Input() height;

  @Input() noScroll = false;

  @Input() pageSize = 15;

  resize$ = new Subject<void>();

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }

  constructor(@Inject(DOCUMENT) private document: any, private el: ElementRef, private table: NzTableComponent, private cdr: ChangeDetectorRef, private message: NzMessageService) {
    this.table.nzPageSize = this.pageSize;
  }

  ngOnInit(): void {
    if (!this.noScroll) {
      this.table.nzScroll = { x: '1000px', y: '600px' };
      this.resize$.pipe(debounceTime(300)).subscribe(() => {
        this.setHeight();
      });
    }
    Object.assign(this.table, {
      nzLoadingDelay: 150,
      nzLoading: true,
      // nzFrontPagination: false,
      nzPageSizeOptions: [10, 15, 20, 25, 30, 35, 40, 45, 50],
      nzShowQuickJumper: true,
      nzShowSizeChanger: true,
      nzShowPagination: true,
    });
  }

  ngAfterViewInit(): void {
    if (!this.noScroll) {
      this.setHeight();
    }
    this.loadingTimeout = setTimeout(() => {
      this.message.create('error', `加载超时！请检查您网络~`);
      this.table.nzLoading = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.loadingTimeout);
    if (!this.noScroll) {
      this.resize$.complete();
      this.resize$ = null;
    }
  }

  setHeight() {
    this.height = `${
      $(this.el.nativeElement).parent().height() -
      $(this.el.nativeElement).find('.ant-table-header table').outerHeight(true) -
      $(this.el.nativeElement).find('.ant-table-pagination').outerHeight(true)
    }px`;
    this.table.nzScroll = Object.assign(this.table.nzScroll, { x: this.width, y: this.height });
    this.cdr.detectChanges();
  }
}
