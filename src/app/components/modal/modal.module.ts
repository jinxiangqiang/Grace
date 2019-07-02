import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalComponent, beforeunload } from "./modal.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent],
    entryComponents: [ModalComponent],
    exports: [ModalComponent]
})
export class BiDialogModule {
    static inited = false;
    constructor() {
        if (!BiDialogModule.inited) {
            BiDialogModule.inited = !0;
            beforeunload();
        }
    }
}
