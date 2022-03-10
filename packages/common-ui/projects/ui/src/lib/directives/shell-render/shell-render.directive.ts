import {
    Directive, Inject, OnInit, PLATFORM_ID,
    TemplateRef, ViewContainerRef
} from "@angular/core";
import { isPlatformServer } from "@angular/common";

@Directive({
    selector: "[ytShellRender]"
})
export class ShellRenderDirective implements OnInit {

    // eslint-disable-next-lint
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {

    }

    public ngOnInit(): void {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }

    }

}