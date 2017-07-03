/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
'use strict';

module com.sabrac.processer.login {
    import { utils } from './utils';
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
            com.sabrac.processer.utils.postData("loginService.do", dataObject).done(function(result) {
                window.location.href = "index.do";
            }).reject(function(result) {
                alert("error");
            });
        }
    }

    $(document).ready(function() {
       ko.applyBindings(new ScreenModel()); 
    });
}