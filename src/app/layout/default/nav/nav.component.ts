import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'rec-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  menus = [
    {
      icon: 'reco reco-apply',
      name: '应用',
      children: [
        {
          name: '应用管理',
          link: '/index/application',
          selected: true
        },
        {
          name: '产品管理',
          link: 'product'
        }
      ]
    },
    {
      icon: 'reco reco-jurisdiction',
      name: '权限',
      link: 'permission'
    },
    {
      icon: 'reco reco-news',
      name: '消息',
      children: [
        {
          name: '场景配置',
          link: 'scenesConfig'
        },
        {
          name: '消息日志',
          link: 'messageLog'
        }
      ]
    },
    {
      icon: 'reco reco-config',
      name: '配置',
      link: 'config'
    },
    {
      icon: 'reco reco-log',
      name: '日志',
      link: 'log'
    },
    {
      icon: 'reco reco-garden',
      name: '园区',
      link: 'park'
    },
    {
      icon: 'reco reco-users',
      name: '用户',
      link: 'user'
    }
  ];
  constructor(public settings: SettingsService) {}

}
