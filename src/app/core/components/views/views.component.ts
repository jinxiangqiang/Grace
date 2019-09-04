import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

import classNames from 'classnames';

@Component({
  selector: 'views',
  template: `<ng-content></ng-content>`,
})
export class ViewsComponent implements OnInit {
  @Input() value = true;
  @Input() direction;
  @Input() scrollable;
  @Input() fill;
  @Input() align;
  @Input() justify;
  @Input() class;
  @Input() hidden;
  className = this.class;

  constructor(protected el: ElementRef) {
  }

  ngOnInit() {
    let direction = this.direction;
    if (!direction) {
      direction = 'column';
    }

    let fill = this.fill;
    if (direction === 'column' || this.scrollable) {
      fill = true;
    }

    let align = this.align;
    if (direction === 'column' && align === 'top') align = 'start';
    if (direction === 'column' && align === 'bottom') align = 'end';
    if (direction === 'row' && align === 'left') align = 'start';
    if (direction === 'row' && align === 'right') align = 'end';

    this.className = classNames(this.class, {
      'container-fill': fill,
      'container-column': direction === 'column',
      'container-row': direction === 'row',
      'container-align-center': align === 'center',
      'container-align-start': align === 'start',
      'container-align-end': align === 'end',
      'container-justify-center': this.justify === 'center',
      'container-justify-start': this.justify === 'start',
      'container-justify-end': this.justify === 'end',
      'container-justified': this.justify === true,
      'container-scrollable': this.scrollable,
      'container-hidden': this.hidden,
    });
    this.el.nativeElement.setAttribute('class', this.className);
  }
}
