/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';

module com.sabrac.processer {

    export class NewProjectScreenModel {
        pageTitle: KnockoutObservable<string>;
        userName: KnockoutObservable<string>;

        constructor() {
            var self = this;
            this.pageTitle = ko.observable<string>("New Project");
            this.userName = ko.observable<string>("");
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();

            Utils.postData("newProjectService.do", null).done(function(data) {
                self.userName(data.userName);
                dfd.resolve(self.userName());
            }).fail(function(data) {
                Utils.notification("Error", "Cannot get login info", NotiType.ERROR);
                console.log("Error: Cannot get login info");
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