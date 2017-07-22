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
                        self.listStatus().loadData(data.lsStatus);
                        if (self.listStatus().lsStatus().length === 0) {
                            self.isNew(true);
                        }
                        dfd.resolve(self.listStatus().lsStatus());
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }
                submit() {
                    var self = this;
                    $.blockUI();
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
                        self.listStatus().loadData(data.lsStatus);
                        self.listStatus().select(data.statusId);
                        $.unblockUI();
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        $.unblockUI();
                    });
                }
                newStatus() {
                    var self = this;
                    self.isNew(true);
                    self.clear();
                    $("#status_list").igGridSelection("clearSelection");
                }
                clear() {
                    var self = this;
                    if (self.isNew()) {
                        self.statusId(null);
                    }
                    self.statusName("");
                }
                deleteStatus() {
                    var self = this;
                    $.blockUI();
                    var data = {
                        "function": "delete",
                        "statusId": self.statusId()
                    };
                    processer.Utils.postData("statusService.do", data).done(function (data) {
                        self.listStatus().loadData(data.lsStatus);
                        if (self.listStatus().lsStatus().length > 0) {
                            self.listStatus().selectFirst();
                        }
                        else {
                            self.isNew(true);
                        }
                        self.clear();
                        $.unblockUI();
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        self.clear();
                        $.unblockUI();
                    });
                    self.clear();
                }
            }
            processer.StatusListScreenModel = StatusListScreenModel;
            class ListStatus {
                constructor() {
                    var self = this;
                    self.lsStatus = ko.observableArray([]);
                    self.selectionChanged = function (evt, ui) {
                        var rowData = ui.row;
                        if (self.lsStatus().length <= 0) {
                            return;
                        }
                        statusListScreenModel.isNew(false);
                        var selectedStatus = ko.utils.arrayFirst(self.lsStatus(), function (item) {
                            return item.statusId() === rowData.id;
                        });
                        statusListScreenModel.statusId(selectedStatus.statusId());
                        statusListScreenModel.statusName(selectedStatus.statusName());
                    };
                }
                loadData(lsStatus) {
                    var self = this;
                    self.lsStatus([]);
                    if (lsStatus && lsStatus.length > 0) {
                        lsStatus.forEach(function (statusItem) {
                            if (statusItem.SId && statusItem.SName) {
                                self.lsStatus.push(new Status(statusItem.SId, statusItem.SName));
                            }
                        });
                    }
                }
                selectFirst() {
                    var self = this;
                    if (self.lsStatus().length > 0) {
                        var selectedId = self.lsStatus()[0].statusId();
                        self.select(selectedId);
                    }
                }
                select(statusId) {
                    var self = this;
                    if ($("#status_list").data("igGrid") != null) {
                        self.goToPageWithId(statusId);
                        var rows = $("#status_list").igGrid("rows");
                        $(rows).each(function (index, el) {
                            if ($(el).attr("data-id") == (statusId + "")) {
                                $("#status_list").igGridSelection("selectRow", index);
                                self.selectionChanged(null, { row: { id: statusId } });
                            }
                        });
                    }
                }
                goToPageWithId(id) {
                    var self = this;
                    let currIndex = 0;
                    self.lsStatus().forEach(function (status, index) {
                        if (status.statusId() == id) {
                            currIndex = index;
                        }
                    });
                    let newPageIndex = Math.floor(currIndex / $("#status_list").igGridPaging("pageSize"));
                    $("#status_list").igGridPaging("pageIndex", newPageIndex);
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