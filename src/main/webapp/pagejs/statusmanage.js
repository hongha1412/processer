/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="datatables.net/index.d.ts" />
'use strict';
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            class StatusListScreenModel {
                constructor() {
                    var self = this;
                    self.pageTitle = ko.observable("Status Manage");
                    self.userName = ko.observable("");
                    self.lsStatus = ko.observableArray([]);
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
                                { "title": "statusId" },
                                { "title": "statusName" }
                            ]
                        });
                        dfd.resolve(self.lsStatus());
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }
            }
            processer.StatusListScreenModel = StatusListScreenModel;
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
                    $.unblockUI();
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=statusmanage.js.map