/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
'use strict';

module com.sabrac.processer.index {

    export class ScreenModel {
        self: any;
        projectList: KnockoutObservableArray<Project>;

        constructor() {
            this.self = this;
            this.projectList = ko.observableArray([]) as KnockoutObservableArray<Project>;
        }

        private adminLogin(): void {
            window.location.href = "login.do";
        }
    }

    export class Project {
        self: any;
        pjId: KnockoutObservable<number>;
        pjName: KnockoutObservable<string>;
        pjType: KnockoutObservable<string>;
        pjStatus: KnockoutObservable<string>;
        pjCapacity: KnockoutObservable<number>;
        pjReceiveDate: KnockoutObservable<string>;

        constructor() {
            this.self = this;
            this.pjId = ko.observable(-1) as KnockoutObservable<number>;
            this.pjName = ko.observable("") as KnockoutObservable<string>;
            this.pjType = ko.observable("") as KnockoutObservable<string>;
            this.pjStatus = ko.observable("") as KnockoutObservable<string>;
            this.pjCapacity = ko.observable(0) as KnockoutObservable<number>;
            this.pjReceiveDate = ko.observable(new Date().toLocaleDateString()) as KnockoutObservable<string>;
        }

        loadData(pjId: number, pjName: string, pjType: string, pjStatus: string, pjCapacity: number, pjReceiveDate: string) {
            this.pjId(pjId);
            this.pjName(pjName);
            this.pjType(pjType);
            this.pjStatus(pjStatus);
            this.pjCapacity(pjCapacity);
            this.pjReceiveDate(pjReceiveDate);
        }
    }

    $(document).ready(function() {
       ko.applyBindings(new ScreenModel()); 
    });
}
