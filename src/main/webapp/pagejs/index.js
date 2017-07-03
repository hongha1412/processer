/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
'use strict';
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            var index;
            (function (index) {
                class ScreenModel {
                    constructor() {
                        this.self = this;
                        this.projectList = ko.observableArray([]);
                    }
                    adminLogin() {
                        window.location.href = "login.do";
                    }
                }
                index.ScreenModel = ScreenModel;
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
                index.Project = Project;
                $(document).ready(function () {
                    ko.applyBindings(new ScreenModel());
                });
            })(index = processer.index || (processer.index = {}));
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=index.js.map