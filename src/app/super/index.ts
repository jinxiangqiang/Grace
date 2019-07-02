import { Injector } from "@angular/core";

export class Core {
    static modules: any[] = null;
    static strategies: string[] = null;
    static unitStrategies: { [key: number]: string[] } = null;
    static parkStrategies: { [key: number]: string[] } = null;
    static injector: Injector = null;

    protected injector: Injector;

    constructor() {
        this.injector = Core.injector;
    }
}
