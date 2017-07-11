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
            class IndexScreenModel {
                constructor() {
                    var self = this;
                    this.isLoggedIn = ko.observable(false);
                    this.projectList = ko.observableArray([]);
                    this.pageTitle = ko.observable("Project Processer");
                }
                startPage() {
                    var self = this;
                    var dfd = $.Deferred();
                    var data = {
                        "function": "init"
                    };
                    processer.Utils.postData("indexService.do", data).done(function (data) {
                        self.isLoggedIn(data.isLoggedIn);
                        dfd.resolve(self.isLoggedIn());
                    }).fail(function (data) {
                        processer.Utils.notification("error", "Unexpected error occurred", processer.NotiType.ERROR, false);
                        dfd.resolve(self.isLoggedIn());
                    });
                    return dfd.promise();
                }
                newProject() {
                    var self = this;
                    window.location.href = "newproject.do";
                }
                adminLogin() {
                    window.location.href = "login.do";
                }
            }
            processer.IndexScreenModel = IndexScreenModel;
            class Project {
                constructor() {
                    var self = this;
                    self.pjId = ko.observable(-1);
                    self.pjName = ko.observable("");
                    self.pjType = ko.observable("");
                    self.pjStatus = ko.observable(null);
                    self.pjCapacity = ko.observable(0);
                    self.pjAssignee = ko.observable("");
                    self.pjReceiveDate = ko.observable(new Date().toLocaleDateString());
                    self.pjSendDate = ko.observable(new Date().toLocaleDateString());
                    self.pjDeadLine = ko.observable(new Date().toLocaleDateString());
                    self.pjComment = ko.observable("");
                }
                loadData(pjId, pjName, pjType, pjStatus, pjCapacity, pjAssignee, pjReceiveDate, pjSendDate, pjDeadLine, pjComment) {
                    var self = this;
                    self.pjId(pjId);
                    self.pjName(pjName);
                    self.pjType(pjType);
                    self.pjStatus(pjStatus);
                    self.pjCapacity(pjCapacity);
                    self.pjAssignee(pjAssignee);
                    self.pjReceiveDate(pjReceiveDate);
                    self.pjSendDate(pjSendDate);
                    self.pjDeadLine(pjDeadLine);
                    self.pjComment(pjComment);
                }
            }
            processer.Project = Project;
            $(document).ready(function () {
                var screenModel = new IndexScreenModel();
                $.blockUI();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                    $.unblockUI();
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=index.js.map