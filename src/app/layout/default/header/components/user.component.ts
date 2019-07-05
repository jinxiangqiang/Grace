import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `    
    <div nz-dropdown nzPlacement="bottomRight" [nzDropdownMenu]="menuTpl" class="alain-default__nav-item d-flex align-items-center px-sm">
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small"></nz-avatar>
      <div class="hidden-mobile">{{ settings.user.name }}</div>
    </div>
    <nz-dropdown-menu #menuTpl="nzDropdownMenu">
      <ul nz-menu>
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon nzType="user"></i>
          个人中心
        </div>
        <div nz-menu-item routerLink="/pro/account/settings">
          <i nz-icon nzType="setting"></i>
          个人设置
        </div>
        <div nz-menu-item [routerLink]="['/index/exception', {outlets:{content: ['trigger']}}]">
          <i nz-icon nzType="close-circle"></i>
          触发错误
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout"></i>
          退出登录
        </div>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url!);
  }
}
