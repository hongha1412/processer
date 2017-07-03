/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
'use strict';

import { utils } from "./utils";
module com.sabrac.processer.login {
    export class ScreenModel {
        self: any;
        userName: KnockoutObservable<string>;
        password: KnockoutObservable<string>;

        constructor() {
            this.self = this;
            this.userName = ko.observable("") as KnockoutObservable<string>;
            this.password = ko.observable("") as KnockoutObservable<string>;
        }

        private submit(): void {
            var dataObject = {
                "userName": this.userName(),
                "password": this.password()
            }
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
            utils.postData("loginService.do", dataObject).done(function(result) {
                window.location.href = "index.do";
            }).fail(function(result) {
                alert("error");
            });
        }
    }

    $(document).ready(function() {
       ko.applyBindings(new ScreenModel()); 
    });
}