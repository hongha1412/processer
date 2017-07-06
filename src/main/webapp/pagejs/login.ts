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

        private submit(): void {
            var dataObject = {
                "userName": this.userName(),
                "password": this.password()
            }
            Utils.postData("loginService.do", dataObject).done(function(result) {
                window.location.href = "index.do";
            }).fail(function(result) {
                alert("error");
            });
        }
    }

    $(document).ready(function() {
        ko.applyBindings(new LoginScreenModel(), $("#html_content")[0]); 
    });
}