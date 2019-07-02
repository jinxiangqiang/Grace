import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { ApplicationComponent } from './application/application.component';
import { ApplicationNav } from './application/application.nav';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'application', pathMatch: 'full' },
      { path: 'application_nav', component: ApplicationNav, data: { title: '应用' } },
      { path: 'application', component: ApplicationComponent, data: { title: '设置中心', titleI18n: '设置中心' } },
      { path: 'authorization', component: AuthorizationComponent, data: { title: '系统角色授权', titleI18n: '系统角色授权' } },
      { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
    ],
  }, {
    path: 'fullscreen',
    component: LayoutFullScreenComponent,
    children: [],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' }];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // 注意:如果使用“reuse-tab(路由复用)”组件并打开keepingScroll，可以将其设置为“禁用
        // 请参考 https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      },
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
