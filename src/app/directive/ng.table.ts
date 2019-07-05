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
  /*设置多少宽度出现滚动条*/
  @Input() width = '1000px';
  /*设置多少高度出现滚动条*/
  @Input() height = '601px';
  /*设置禁用滚动条*/
  @Input() noScroll = false;
  /*设置默认分页*/
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
    if (this.height !== '601px') {
      this.noScroll = true;
      this.table.nzScroll = { x: this.width, y: this.height };
    }
    if (!this.noScroll) {
      this.table.nzScroll = { x: this.width, y: this.height };
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
    /*超时关闭蒙层提示网络超时，封装数据返回后清除延时*/
    this.loadingTimeout = setTimeout(() => {
      this.message.create('error', `加载超时！请检查您网络~`);
      this.table.nzLoading = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  ngOnDestroy(): void {
    /*清除延时以及窗口监听*/
    clearTimeout(this.loadingTimeout);
    if (!this.noScroll) {
      this.resize$.complete();
      this.resize$ = null;
    }
  }

  setHeight() {
    /*获取父容器高度减去分页以及头部的高度等于固定的表格高度*/
    this.height = `${
    $(this.el.nativeElement).parent().height() -
    $(this.el.nativeElement).find('.ant-table-header table').outerHeight(true) -
    $(this.el.nativeElement).find('.ant-table-pagination').outerHeight(true)
      }px`;
    this.table.nzScroll = { ...this.table.nzScroll, x: this.width, y: this.height };
    this.cdr.detectChanges();
  }
}
