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
            var typeListScreenModel;
            class TypeListScreenModel {
                constructor() {
                    var self = this;
                    self.pageTitle = ko.observable("Type Manage");
                    self.userName = ko.observable("");
                    self.isNew = ko.observable(false);
                    self.typeId = ko.observable(null);
                    self.typeName = ko.observable("");
                    self.listType = ko.observable(new ListType());
                    typeListScreenModel = self;
                }
                startPage() {
                    var self = this;
                    var dfd = $.Deferred();
                    var data = {
                        "function": "init"
                    };
                    processer.Utils.postData("typeService.do", data).done(function (data) {
                        if (data && data.userName) {
                            self.userName(data.userName);
                        }
                        dfd.resolve(self.userName());
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }
                newType() {
                    var self = this;
                    self.isNew(true);
                    self.clear();
                    $("#type_list").igGridSelection("clearSelection");
                }
                clear() {
                    var self = this;
                    if (self.isNew()) {
                        self.typeId(null);
                    }
                    self.typeName("");
                }
                deleteType() {
                    var self = this;
                    $.blockUI();
                    var data = {
                        "function": "delete",
                        "typeId": self.typeId()
                    };
                    processer.Utils.postData("typeService.do", data).done(function (data) {
                        self.listType().loadData(data.lsType);
                        self.listType().selectFirst();
                        $.unblockUI();
                    }).fail(function (data) {
                        processer.Utils.notification("Error", "Unexpected error occur", processer.NotiType.ERROR);
                        $.unblockUI();
                    });
                }
            }
            processer.TypeListScreenModel = TypeListScreenModel;
            class ListType {
                constructor() {
                    var self = this;
                    self.lsType = ko.observableArray([]);
                    self.selectionChanged = function (evt, ui) {
                        var rowData = ui.row;
                        if (self.lsType().length <= 0) {
                            return;
                        }
                        typeListScreenModel.isNew(false);
                        var selectedType = ko.utils.arrayFirst(self.lsType(), function (item) {
                            return item.typeId() === rowData.id;
                        });
                        typeListScreenModel.typeId(selectedType.typeId());
                        typeListScreenModel.typeName(selectedType.typeName());
                    };
                }
                loadData(lsType) {
                    var self = this;
                    self.lsType([]);
                    if (lsType && lsType.length > 0) {
                        lsType.forEach(function (typeItem) {
                            if (typeItem.TId && typeItem.TName) {
                                self.lsType.push(new Type(typeItem.TId, typeItem.TName));
                            }
                        });
                    }
                }
                selectFirst() {
                    var self = this;
                    if (self.lsType().length > 0) {
                        var selectedId = self.lsType()[0].typeId();
                        self.select(selectedId);
                    }
                }
                select(typeId) {
                    var self = this;
                    if ($("#type_list").data("igGrid") != null) {
                        self.goToPageWithId(typeId);
                        var rows = $("#type_list").igGrid("rows");
                        $(rows).each(function (index, el) {
                            if ($(el).attr("data-id") == (typeId + "")) {
                                $("#type_list").igGridSelection("selectRow", index);
                                self.selectionChanged(null, { row: { id: typeId } });
                            }
                        });
                    }
                }
                goToPageWithId(id) {
                    var self = this;
                    let currIndex = 0;
                    self.lsType().forEach(function (typeItem, index) {
                        if (typeItem.typeId() == id) {
                            currIndex = index;
                        }
                    });
                    let newPageIndex = Math.floor(currIndex / $("#type_list").igGridPaging("pageSize"));
                    $("#type_list").igGridPaging("pageIndex", newPageIndex);
                }
            }
            processer.ListType = ListType;
            class Type {
                constructor(typeId, typeName) {
                    var self = this;
                    self.typeId = ko.observable(typeId);
                    self.typeName = ko.observable(typeName);
                }
            }
            processer.Type = Type;
            $(document).ready(function () {
                var screenModel = new TypeListScreenModel();
                $.blockUI();
                screenModel.startPage().done(function () {
                    ko.applyBindings(screenModel, $("#html_content")[0]);
                    $.unblockUI();
                });
            });
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=typemanage.js.map