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
            class NewProjectScreenModel {
                constructor() {
                    var self = this;
                    this.pageTitle = ko.observable("New Project");
                    this.userName = ko.observable("");
                }
                startPage() {
                    var self = this;
                    var dfd = $.Deferred();
                    processer.Utils.postData("newProjectService.do", null).done(function (data) {
                        self.userName(data.userName);
                        dfd.resolve(self.userName());
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Cannot get login info", processer.NotiType.ERROR);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }
            }
            processer.NewProjectScreenModel = NewProjectScreenModel;
            $(document).ready(function () {
                var screenModel = new NewProjectScreenModel();
                $.blockUI();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                    $.unblockUI();
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=newproject.js.map