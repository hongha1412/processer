/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';

module com.sabrac.processer {
    class LoginScreenModel {
        userName: KnockoutObservable<string>;
        password: KnockoutObservable<string>;
        pageTitle: KnockoutObservable<string>;

        constructor() {
            var self = this;
            this.pageTitle = ko.observable<string>("Admin Login");
            this.userName = ko.observable<string>("");
            this.password = ko.observable<string>("");
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            var dataObject = {
                "function": "init"
            }
            Utils.postData("loginService.do", dataObject).done(function(data) {
                if (data.isLoggedIn) {
                    window.location.href = "index.do";
                }
            }).fail(function(data) {
                Utils.notification("error", "Unexpected error occurred", NotiType.ERROR, false);
                dfd.resolve();
            });
            return dfd.promise();
        }

        private submit(): void {
            var dataObject = {
                "function": "login",
                "userName": this.userName(),
                "password": this.password()
            }
            Utils.postData("loginService.do", dataObject).done(function(result) {
                window.location.href = "index.do";
            }).fail(function(result) {
                Utils.notification("error", "Unexpected error occurred", NotiType.ERROR, false);
            });
        }
    }

    $(document).ready(function() {
        var screenModel = new LoginScreenModel();
        screenModel.startPage().done(function() {
            ko.applyBindings(screenModel, $("#html_content")[0]);
        });
    });
}