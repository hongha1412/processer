/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
'use strict';
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            var login;
            (function (login) {
                class ScreenModel {
                    constructor() {
                        this.self = this;
                        this.userName = ko.observable("");
                        this.password = ko.observable("");
                    }
                    submit() {
                        var dataObject = {
                            "userName": this.userName(),
                            "password": this.password()
                        };
                        //            $.ajax({
                        //                url: 'loginService.do',
                        //                data: JSON.stringify(dataObject),
                        //                type: 'post',
                        //                contentType: "application/json; charset=utf-8",
                        //                dataType: 'json',
                        //                cache: false,
                        //                success: function(data) {
                        //                    window.location.href = "index.do";
                        //                },
                        //                error: function(data) {
                        //                    alert('error');
                        //                }
                        //            });
                        com.sabrac.processer.utils.postData("loginService.do", dataObject).done(function (result) {
                            window.location.href = "index.do";
                        }).reject(function (result) {
                            alert("error");
                        });
                    }
                }
                login.ScreenModel = ScreenModel;
                $(document).ready(function () {
                    ko.applyBindings(new ScreenModel());
                });
            })(login = processer.login || (processer.login = {}));
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=login.js.map