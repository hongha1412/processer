/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="datatables.net/index.d.ts" />
'use strict';

module com.sabrac.processer {

    export class StatusListScreenModel {
        pageTitle: KnockoutObservable<string>;
        userName: KnockoutObservable<string>;
        lsStatus: KnockoutObservableArray<Status>;

        constructor() {
            var self = this;
            self.pageTitle = ko.observable<string>("Status Manage");
            self.userName = ko.observable<string>("");
            self.lsStatus = ko.observableArray<Status>([]);
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            var data = {
                "function": "init"
            }
            Utils.postData("statusService.do", data).done(function(data) {
                if (data && data.userName) {
                    self.userName(data.userName);
                }
                // Mockup data
                self.lsStatus.push(new Status(0, "Test 0"));
                self.lsStatus.push(new Status(1, "Test 1"));
                self.lsStatus.push(new Status(2, "Test 2"));
                self.lsStatus.push(new Status(3, "Test 3"));
                self.lsStatus.push(new Status(4, "Test 4"));
                // End mockup
                $("#status_list").DataTable({
                    "data": self.lsStatus(),
                    "columns": [
                        {"title": "statusId"},
                        {"title": "statusName"}
                    ]
                });
                dfd.resolve(self.lsStatus());
            }).fail(function(data) {
                Utils.notification("Error", "Unexpected error occur", NotiType.ERROR);
                dfd.resolve();
            });
            return dfd.promise();
        }
    }

    export class Status {
        statusId: KnockoutObservable<number>;
        statusName: KnockoutObservable<string>; 

        constructor(statusId: number, statusName: string) {
            var self = this;
            self.statusId = ko.observable<number>(statusId);
            self.statusName = ko.observable<string>(statusName);
        }
    }

    $(document).ready(function() {
        var screenModel = new StatusListScreenModel();
        $.blockUI();
        screenModel.startPage().done(function() {
            ko.applyBindings(screenModel, $("#html_content")[0]);
            $.unblockUI(); 
        });
    });
}