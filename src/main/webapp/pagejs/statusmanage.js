/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="datatables.net/index.d.ts" />
/// <reference path="ignite-ui/index.d.ts" />
'use strict';
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            var statusListScreenModel;
            class StatusListScreenModel {
                constructor() {
                    var self = this;
                    self.pageTitle = ko.observable("Status Manage");
                    self.userName = ko.observable("");
                    self.listStatus = ko.observable(new ListStatus());
                    self.statusId = ko.observable(null);
                    self.statusName = ko.observable("");
                    self.isNew = ko.observable(false);
                    statusListScreenModel = self;
                }
                startPage() {
                    var self = this;
                    var dfd = $.Deferred();
                    var data = {
                        "function": "init"
                    };
                    processer.Utils.postData("statusService.do", data).done(function (data) {
                        if (data && data.userName) {
                            self.userName(data.userName);
                        }
                        self.listStatus().loadData();
                        dfd.resolve(self.listStatus());
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
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
                    };
                    processer.Utils.postData("statusService.do", data).done(function (data) {
                        self.listStatus().loadData();
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
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
            processer.StatusListScreenModel = StatusListScreenModel;
            class ListStatus {
                constructor() {
                    var self = this;
                    self.lsStatus = ko.observableArray([]);
                    self.selectionChanged = function (evt, ui) {
                        var rowData = ui.row;
                        statusListScreenModel.isNew(false);
                        var selectedStatus = ko.utils.arrayFirst(self.lsStatus(), function (item) {
                            return item.statusId() === rowData.id;
                        });
                        statusListScreenModel.statusId(selectedStatus.statusId());
                        statusListScreenModel.statusName(selectedStatus.statusName());
                    };
                }
                loadData() {
                    var self = this;
                    // Mockup data
                    self.lsStatus.push(new Status(0, "Test 0"));
                    self.lsStatus.push(new Status(1, "Test 1"));
                    self.lsStatus.push(new Status(2, "Test 2"));
                    self.lsStatus.push(new Status(3, "Test 3"));
                    self.lsStatus.push(new Status(4, "Test 4"));
                    // End mockup
                }
                selectFirst() {
                    var self = this;
                    if (self.lsStatus().length > 0) {
                        var selectedId = self.lsStatus()[0].statusId();
                        self.select(selectedId);
                        self.selectionChanged(null, { row: { id: selectedId } });
                    }
                }
                select(statusId) {
                    var self = this;
                    if ($("#status_list").data("igGrid") != null) {
                        var rows = $("#status_list").igGrid("rows");
                        $(rows).each(function (index, el) {
                            if ($(el).attr("data-id") == (statusId + ""))
                                $("#status_list").igGridSelection("selectRow", index);
                        });
                    }
                }
            }
            processer.ListStatus = ListStatus;
            class Status {
                constructor(statusId, statusName) {
                    var self = this;
                    self.statusId = ko.observable(statusId);
                    self.statusName = ko.observable(statusName);
                }
            }
            processer.Status = Status;
            $(document).ready(function () {
                var screenModel = new StatusListScreenModel();
                $.blockUI();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                    screenModel.listStatus().selectFirst();
                    $.unblockUI();
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=statusmanage.js.map