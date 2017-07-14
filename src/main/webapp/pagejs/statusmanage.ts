/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="datatables.net/index.d.ts" />
/// <reference path="ignite-ui/index.d.ts" />
'use strict';

module com.sabrac.processer {

    var statusListScreenModel: StatusListScreenModel;
    export class StatusListScreenModel {
        pageTitle: KnockoutObservable<string>;
        userName: KnockoutObservable<string>;
        listStatus: KnockoutObservable<ListStatus>;
        statusId: KnockoutObservable<number>;
        statusName: KnockoutObservable<string>;
        isNew: KnockoutObservable<boolean>;

        constructor() {
            var self = this;
            self.pageTitle = ko.observable<string>("Status Manage");
            self.userName = ko.observable<string>("");
            self.listStatus = ko.observable<ListStatus>(new ListStatus());
            self.statusId = ko.observable<number>(null);
            self.statusName = ko.observable<string>("");
            self.isNew = ko.observable<boolean>(false);
            statusListScreenModel = self;
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
                self.listStatus().loadData(data.lsStatus);
                dfd.resolve(self.listStatus());
            }).fail(function(data) {
                Utils.notification("Error", "Unexpected error occur", NotiType.ERROR);
                dfd.resolve();
            });
            return dfd.promise();
        }

        submit() {
            var self = this;
            var functionName = "new";
            if (!self.isNew()) {
                functionName = "update";
            }
            var data = {
                "function": functionName,
                "statusId": self.statusId(),
                "statusName": self.statusName()
            }
            Utils.postData("statusService.do", data).done(function(data) {
                self.listStatus().loadData(data.lsStatus);
            }).fail(function(data) {
                Utils.notification("Error", "Unexpected error occur", NotiType.ERROR);
            });
        }

        newStatus() {
            var self = this;
            self.isNew(true);
            self.clear();
        }

        clear() {
            var self = this;
            if (self.isNew()) {
                self.statusId(null);
            }
            self.statusName("");
        }
    }

    export class ListStatus {
        lsStatus: KnockoutObservableArray<Status>;
        selectionChanged: any;

        constructor() {
            var self = this;
            self.lsStatus = ko.observableArray<Status>([]);
            self.selectionChanged = function(evt: any, ui: any) {
                var rowData = ui.row;
                statusListScreenModel.isNew(false);
                var selectedStatus = ko.utils.arrayFirst(self.lsStatus(), function(item: Status) {
                    return item.statusId() === rowData.id;
                });
                statusListScreenModel.statusId(selectedStatus.statusId());
                statusListScreenModel.statusName(selectedStatus.statusName());
            }
        }

        loadData(lsStatus: any[]) {
            var self = this;
            self.lsStatus([]);
            $.each(lsStatus, function(statusItem: any) {
                self.lsStatus.push(new Status(statusItem.SId, statusItem.SName));
            });
            $("#list_status").igGrid("dataSourceObject", self.lsStatus());
            $("#list_status").igGrid("dataBind");
            // Mockup data
//            self.lsStatus.push(new Status(0, "Test 0"));
//            self.lsStatus.push(new Status(1, "Test 1"));
//            self.lsStatus.push(new Status(2, "Test 2"));
//            self.lsStatus.push(new Status(3, "Test 3"));
//            self.lsStatus.push(new Status(4, "Test 4"));
            // End mockup
        }

        selectFirst() {
            var self = this;
            if (self.lsStatus().length > 0) {
                var selectedId = self.lsStatus()[0].statusId();
                self.select(selectedId);
                self.selectionChanged(null, {row: {id: selectedId}});
            }
        }

        select(statusId: number) {
            var self = this;
            if ($("#status_list").data("igGrid") != null) {
                var rows = $("#status_list").igGrid("rows");
                $(rows).each(function(index, el){
                    if ($(el).attr("data-id") == (statusId + ""))
                        $("#status_list").igGridSelection("selectRow", index);
                });
            }
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
            screenModel.listStatus().selectFirst();
            $.unblockUI(); 
        });
    });
}