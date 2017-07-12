/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';

module com.sabrac.processer {

    export class NewProjectScreenModel {
        pageTitle: KnockoutObservable<string>;
        userName: KnockoutObservable<string>;
        lsProjectStatus: KnockoutObservableArray<Status>;
        selectedStatus: KnockoutObservable<number>;

        constructor() {
            var self = this;
            self.pageTitle = ko.observable<string>("New Project");
            self.userName = ko.observable<string>("");
            self.lsProjectStatus = ko.observableArray<Status>([]);
            self.selectedStatus = ko.observable<number>(-1);
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();

            Utils.postData("newProjectService.do", null).done(function(data) {
                self.userName(data.userName);
                self.lsProjectStatus(data.lsProjectStatus);
                dfd.resolve(self.userName());
            }).fail(function(data) {
                Utils.notification("Error", "Cannot get login info", NotiType.ERROR);
                dfd.resolve();
            });

            return dfd.promise();
        }
    }

    $(document).ready(function() {
        var screenModel = new NewProjectScreenModel();
        $.blockUI();
        screenModel.startPage().done(function() {
            ko.applyBindings(screenModel, $("#html_content")[0]);
            $.unblockUI(); 
        });
    });
}