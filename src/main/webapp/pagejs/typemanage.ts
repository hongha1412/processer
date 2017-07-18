/// <reference path="jquery/index.d.ts" />
/// <reference path="knockout/index.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="datatables.net/index.d.ts" />
/// <reference path="ignite-ui/index.d.ts" />
'use strict';

module com.sabrac.processer {

    var typeListScreenModel: TypeListScreenModel;
    export class TypeListScreenModel {
        pageTitle: KnockoutObservable<string>;
        userName: KnockoutObservable<string>;
        isNew: KnockoutObservable<boolean>;
        typeId: KnockoutObservable<number>;
        typeName: KnockoutObservable<string>;
        listType: KnockoutObservable<ListType>;

        constructor() {
            var self = this;
            self.pageTitle = ko.observable<string>("Type Manage");
            self.userName = ko.observable<string>("");
            self.isNew = ko.observable<boolean>(false);
            self.typeId = ko.observable<number>(null);
            self.typeName = ko.observable<string>("");
            self.listType = ko.observable<ListType>(new ListType());
            typeListScreenModel = self;
        }

        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            var data = {
                "function": "init"
            }
            Utils.postData("typeService.do", data).done(function(data) {
                if (data && data.userName) {
                    self.userName(data.userName);
                }
                dfd.resolve(self.userName());
            }).fail(function(data) {
                Utils.notification("Error", "Unexpected error occur", NotiType.ERROR);
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
            }
            Utils.postData("typeService.do", data).done(function(data) {
                self.listType().loadData(data.lsType);
                self.listType().selectFirst();
                $.unblockUI();
            }).fail(function(data) {
                Utils.notification("Error", "Unexpected error occur", NotiType.ERROR);
                $.unblockUI();
            });
        }
    }

    export class ListType {
        lsType: KnockoutObservableArray<Type>;
        selectionChanged: any;

        constructor() {
            var self = this;
            self.lsType = ko.observableArray<Type>([]);
            self.selectionChanged = function(evt: any, ui: any) {
                var rowData = ui.row;
                if (self.lsType().length <= 0) {
                    return;
                }
                typeListScreenModel.isNew(false);
                var selectedType = ko.utils.arrayFirst(self.lsType(), function(item: Type) {
                    return item.typeId() === rowData.id;
                });
                typeListScreenModel.typeId(selectedType.typeId());
                typeListScreenModel.typeName(selectedType.typeName());
            }
        }

        loadData(lsType: any[]) {
            var self = this;
            self.lsType([]);
            if (lsType && lsType.length > 0) {
                lsType.forEach(function(typeItem: any) {
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

        select(typeId: number) {
            var self = this;
            if ($("#type_list").data("igGrid") != null) {
                self.goToPageWithId(typeId);
                var rows = $("#type_list").igGrid("rows");
                $(rows).each(function(index, el){
                    if ($(el).attr("data-id") == (typeId + "")) {
                        $("#type_list").igGridSelection("selectRow", index);
                        self.selectionChanged(null, {row: {id: typeId}});
                    }
                });
            }
        }

        goToPageWithId(id: number) {
            var self = this;
            let currIndex = 0;
            self.lsType().forEach(function(typeItem: Type, index: number) {
                if (typeItem.typeId() == id) {
                    currIndex = index;
                }
            });
            let newPageIndex = Math.floor(currIndex / $("#type_list").igGridPaging("pageSize"));
            $("#type_list").igGridPaging("pageIndex", newPageIndex);
        }
    }

    export class Type {
        typeId: KnockoutObservable<number>;
        typeName: KnockoutObservable<string>;

        constructor(typeId: number, typeName: string) {
            var self = this;
            self.typeId = ko.observable<number>(typeId);
            self.typeName = ko.observable<string>(typeName);
        }
    }

    $(document).ready(function() {
        var screenModel = new TypeListScreenModel();
        $.blockUI();
        screenModel.startPage().done(function() {
            ko.applyBindings(screenModel, $("#html_content")[0]);
            $.unblockUI(); 
        });
    });
}