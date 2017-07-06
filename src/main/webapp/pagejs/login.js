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
                submit() {
                    var dataObject = {
                        "userName": this.userName(),
                        "password": this.password()
                    };
                    processer.Utils.postData("loginService.do", dataObject).done(function (result) {
                        window.location.href = "index.do";
                    }).fail(function (result) {
                        alert("error");
                    });
                }
            }
            $(document).ready(function () {
                ko.applyBindings(new LoginScreenModel(), $("#html_content")[0]);
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=login.js.map