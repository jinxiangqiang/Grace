import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationNav } from './application.nav';
import { ApplicationComponent } from './application.component';
import { AuthorizationComponent } from './authorization.component';
import { BiDirectiveModule } from '../../directive/directive.module';


const COMPONENTS = [ApplicationNav, ApplicationComponent, AuthorizationComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ApplicationRoutingModule, BiDirectiveModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ApplicationModule {}
