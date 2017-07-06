/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';

module com.sabrac.processer {

    export class IndexScreenModel {
        isLoggedIn: KnockoutObservable<boolean>;
        projectList: KnockoutObservableArray<Project>;
        pageTitle: KnockoutObservable<string>;

        constructor() {
            var self = this;
            this.isLoggedIn = ko.observable<boolean>(false);
            this.projectList = ko.observableArray<Project>([]);
            this.pageTitle = ko.observable<string>("Project Processer");
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            Utils.postData("indexService.do", null).done(function(data){
                self.isLoggedIn(data.isLoggedIn);
                dfd.resolve(self.isLoggedIn());
            }).fail(function(data) {
                Utils.notification("error", "Unexpected error occurred", NotiType.ERROR, false);
                dfd.resolve(self.isLoggedIn());
            });
            return dfd.promise();
        }

        public newProject() {
            var self = this;
            window.location.href = "newproject.do";
        }

        public adminLogin() {
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
        var screenModel = new IndexScreenModel();
        $.blockUI();
        screenModel.startPage().done(function() {
            ko.applyBindings(screenModel, $("#html_content")[0]);
            $.unblockUI(); 
        });
    });
}
