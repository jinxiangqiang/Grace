import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages

// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { AuthorizationComponent } from './application/authorization.component';
import { BiDirectiveModule } from '../directive/directive.module';
import { ApplicationNav } from './application/application.nav'
import {ApplicationComponent} from './application/application.component'
const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  // single pages
  CallbackComponent,
  UserLockComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, BiDirectiveModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
