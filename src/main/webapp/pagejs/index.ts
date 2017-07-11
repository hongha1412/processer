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
            var data = {
                "function": "init"
            }
            Utils.postData("indexService.do", data).done(function(data){
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
        pjId: KnockoutObservable<number>;
        pjName: KnockoutObservable<string>;
        pjType: KnockoutObservable<string>;
        pjStatus: KnockoutObservable<Status>;
        pjCapacity: KnockoutObservable<number>;
        pjAssignee: KnockoutObservable<string>;
        pjReceiveDate: KnockoutObservable<string>;
        pjSendDate: KnockoutObservable<string>;
        pjDeadLine: KnockoutObservable<string>;
        pjComment: KnockoutObservable<string>;

        constructor() {
            var self = this;
            self.pjId = ko.observable<number>(-1);
            self.pjName = ko.observable<string>("");
            self.pjType = ko.observable<string>("");
            self.pjStatus = ko.observable<Status>(null);
            self.pjCapacity = ko.observable<number>(0);
            self.pjAssignee = ko.observable<string>("");
            self.pjReceiveDate = ko.observable<string>(new Date().toLocaleDateString());
            self.pjSendDate = ko.observable<string>(new Date().toLocaleDateString());
            self.pjDeadLine = ko.observable<string>(new Date().toLocaleDateString());
            self.pjComment = ko.observable<string>("");
        }

        loadData(pjId: number,
                pjName: string, 
                pjType: string, 
                pjStatus: Status, 
                pjCapacity: number,
                pjAssignee: string, 
                pjReceiveDate: string,
                pjSendDate: string,
                pjDeadLine: string,
                pjComment: string) {

            var self = this;
            self.pjId(pjId);
            self.pjName(pjName);
            self.pjType(pjType);
            self.pjStatus(pjStatus);
            self.pjCapacity(pjCapacity);
            self.pjAssignee(pjAssignee);
            self.pjReceiveDate(pjReceiveDate);
            self.pjSendDate(pjSendDate);
            self.pjDeadLine(pjDeadLine);
            self.pjComment(pjComment);
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
