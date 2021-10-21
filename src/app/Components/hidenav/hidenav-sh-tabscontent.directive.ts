import {Directive, Host, Self, Optional, ElementRef, ContentChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {SuperTabs} from '@ionic-super-tabs/angular';
import {HidenavShService} from './hidenav-sh-service.service';
import { Component } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[hidenav-sh-tabscontent]'
})
export class HidenavShTabscontentDirective {

    name: any;
    @ContentChild(SuperTabs) supertabs: SuperTabs;

    constructor(public contentElem: ElementRef, @Host() @Self() @Optional() public el: IonContent, private globals: HidenavShService) {

    }

    ngAfterViewInit() {
        this.name = this.globals.requestName();
        this.contentElem.nativeElement.setAttribute('hidenav-sh-tabscontent', this.name);
        $('hidenav-stretchheader', $(this.contentElem.nativeElement).parents().get().find(itm => $(itm).find('[hidenav-stretchheader]').length)).attr('hidenav-sh-header', this.name);
        if(this.name) {
            if (typeof this.globals.data[this.name] == 'undefined' || this.globals.data[this.name] == null)
                this.globals.data[this.name] = [];
            this.globals.data[this.name].tabscontent = this.el;
            this.globals.data[this.name].tabscontentElem = this.contentElem;
            this.globals.data[this.name].supertabs = this.supertabs;
            this.globals.initiate(this.name);

            this.supertabs.tabChange.subscribe(e => {
                let i = e.detail.index;
                let tabs = this.contentElem.nativeElement.querySelectorAll('super-tab');
                let results = [];
                for (let tab of tabs) {
                    let cont = tab.querySelector('ion-content');
                    if (cont != null && typeof cont.attributes['hidenav-sh-content'] != 'undefined' && cont.attributes['hidenav-sh-content'].nodeValue != '')
                        results.push(cont.attributes['hidenav-sh-content'].nodeValue);
                    else
                        results.push(null);
                }
                if (results[i] != null) {
                    this.globals.resetContent(results[i]);
                }
            })
        }
    }

    ngOnDestroy() {
        delete this.globals.data[this.name].tabscontent;
    }

}
