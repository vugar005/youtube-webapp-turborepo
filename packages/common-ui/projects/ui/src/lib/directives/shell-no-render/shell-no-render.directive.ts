import {
    Directive, Inject, OnInit, PLATFORM_ID,
    TemplateRef, ViewContainerRef
} from "@angular/core";
import { isPlatformServer } from "@angular/common";

@Directive({
    selector: "[ytShellNoRender]"
})
export class ShellNoRenderDirective implements OnInit {
    // eslint-disable-next-lint
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {

    }

    public ngOnInit(): void {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.clear();
        }
        else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }

    }

}