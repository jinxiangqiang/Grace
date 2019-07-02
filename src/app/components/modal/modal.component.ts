import {
  Type,
  Component,
  ViewContainerRef,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { ViewChild, ComponentRef, TemplateRef, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NzAlertComponent } from 'ng-zorro-antd'
@Component({
  selector: 'bi-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  visible = false;
  _title = '';
  @Input()
  cancelText = '取消';
  @Input()
  submitText = '保存';
  @Input()
  header = true;
  @Input()
  footer = true;
  @Input()
  size = 'md';
  @Input()
  backdrop = 'static';
  @Input('title')
  private _headerText: string;
  @Input('edit-title')
  private _headerEditText: string;
  @Input() set component(component: Type<any> | string){};

  @Output()
  show = new EventEmitter<ComponentRef<any>>();
  @Output()
  close = new EventEmitter<ComponentRef<any>>();

  @ViewChild('container', { read: ViewContainerRef })
  containerRef: ViewContainerRef;
  @ViewChild('template', { read: TemplateRef })
  templateRef: TemplateRef<any>;

  get title() {
    return this._title || this._headerText;
  }

  set title(value: string) {
    this._title = value;
  }

  get isVisible() {
    return this.visible;
  }

  constructor(protected elementRef: ElementRef, protected renderer2: Renderer2) {
    renderer2.removeAttribute(elementRef.nativeElement, 'title');
  }

  ngOnInit() {

  }


  ngOnDestroy(): void {

  }
}

export function beforeunload() {
  $(window).off('.unload').on('beforeunload.unload', () => {
      if ($('[data-slider=static]:first').is('[data-slider=static]')) {
        return '当前编辑的内容还没有保存，您确定要离开吗？';
      }
    });
}
