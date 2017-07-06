/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="jquery.pnotify/index.d.ts" />
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
                    processer.Utils.postData("indexService.do", null).done(function (data) {
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
                    this.self = this;
                    this.pjId = ko.observable(-1);
                    this.pjName = ko.observable("");
                    this.pjType = ko.observable("");
                    this.pjStatus = ko.observable("");
                    this.pjCapacity = ko.observable(0);
                    this.pjReceiveDate = ko.observable(new Date().toLocaleDateString());
                }
                loadData(pjId, pjName, pjType, pjStatus, pjCapacity, pjReceiveDate) {
                    this.pjId(pjId);
                    this.pjName(pjName);
                    this.pjType(pjType);
                    this.pjStatus(pjStatus);
                    this.pjCapacity(pjCapacity);
                    this.pjReceiveDate(pjReceiveDate);
                }
            }
            processer.Project = Project;
            $(document).ready(function () {
                var screenModel = new IndexScreenModel();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=index.js.map