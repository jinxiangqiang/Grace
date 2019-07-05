import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Exception403Component } from './403.component';
import { Exception404Component } from './404.component';
import { Exception500Component } from './500.component';
import { ExceptionTriggerComponent } from './trigger.component';

const routes: Routes = [
  { path: '403', component: Exception403Component, outlet: 'content' },
  { path: '404', component: Exception404Component, outlet: 'content'},
  { path: '500', component: Exception500Component, outlet: 'content' },
  { path: 'trigger', component: ExceptionTriggerComponent, outlet: 'content' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExceptionRoutingModule {}
