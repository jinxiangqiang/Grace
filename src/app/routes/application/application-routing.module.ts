import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationNav } from './application.nav';
import { ApplicationComponent } from './application.component';
import { AuthorizationComponent } from './authorization.component';

const routes: Routes = [
  { path: '', redirectTo: '/index/application/(nav//content:setting)', pathMatch: 'full' },
  { path: 'nav', component: ApplicationNav, data: { title: '应用管理'} },
  { path: 'setting', outlet: 'content', component: ApplicationComponent, data: { title: '设置中心', titleI18n: '设置中心' } },
  { path: 'authorization', outlet: 'content', component: AuthorizationComponent, data: { title: '系统角色授权', titleI18n: '系统角色授权' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
