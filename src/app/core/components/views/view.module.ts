import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewsComponent } from "./views.component";


@NgModule({
    imports: [CommonModule],
    declarations: [ViewsComponent],
    exports: [ViewsComponent]
})
export class ViewsModule {}
