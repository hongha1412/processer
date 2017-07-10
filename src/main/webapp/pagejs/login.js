/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            class LoginScreenModel {
                constructor() {
                    var self = this;
                    this.pageTitle = ko.observable("Admin Login");
                    this.userName = ko.observable("");
                    this.password = ko.observable("");
                }
                startPage() {
                    var self = this;
                    var dfd = $.Deferred();
                    var dataObject = {
                        "function": "init"
                    };
                    processer.Utils.postData("loginService.do", dataObject).done(function (data) {
                        if (data.isLoggedIn) {
                            window.location.href = "index.do";
                        }
                    }).fail(function (data) {
                        processer.Utils.notification("error", "Unexpected error occurred", processer.NotiType.ERROR, false);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }
                submit() {
                    var dataObject = {
                        "function": "login",
                        "userName": this.userName(),
                        "password": this.password()
                    };
                    processer.Utils.postData("loginService.do", dataObject).done(function (result) {
                        window.location.href = "index.do";
                    }).fail(function (result) {
                        processer.Utils.notification("error", "Unexpected error occurred", processer.NotiType.ERROR, false);
                    });
                }
            }
            $(document).ready(function () {
                var screenModel = new LoginScreenModel();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=login.js.map