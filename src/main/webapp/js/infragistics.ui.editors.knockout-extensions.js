﻿/*!@license
 * Infragistics.Web.ClientUI igEditors KnockoutJS extension 13.2.20132.2417
 *
 * Copyright (c) 2011-2014 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.7.1.js
 *  infragistics.util.js
 *  infragistics.ui.editors.js
 */
(function($) {
    ko.bindingHandlers.igEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igeditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("igeditortextchanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("igeditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element),
                options, parsedDate, val;
            value = ko.utils.unwrapObservable(valueAccessor().value);
            options = valueAccessor();
            if (options.type !== undefined) {
                switch (options.type) {
                    case "date":
                    case 2:
                    case "datepicker":
                    case 3:
                        if (value === null && value !== undefined) {
                            editor.igEditor("value", value)
                        } else {
                            value = String(value).replace(/_(\d)/g, "$1");
                            parsedDate = Date.parse(value);
                            if (value.toString().indexOf("/Date(") === 0) {
                                value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1"), 10));
                                if (value.toString() === "Invalid Date") {
                                    value = undefined
                                }
                            } else if (isNaN(parsedDate)) {
                                val = new Date(value);
                                if (val && isNaN(val) && val.toString() !== "Invalid Date") {
                                    val = $.ig.util.dateFromISO(value)
                                }
                                value = val;
                                if (value.toString() === "Invalid Date") {
                                    value = undefined
                                }
                            }
                            current = editor.igEditor("value");
                            current = Date.parse(current);
                            if (current !== parsedDate) {
                                if (value !== undefined && value !== editor.igEditor("text")) {
                                    value = new Date(value)
                                }
                                editor.igEditor("value", value)
                            }
                        }
                        break;
                    case "percent":
                    case 6:
                    case "numeric":
                    case 4:
                    case "currency":
                    case 5:
                        if (isNaN(value)) {
                            value = undefined
                        }
                        current = editor.igEditor("value");
                        if (current !== value) {
                            editor.igEditor("value", value)
                        }
                        break;
                    default:
                        if (current !== value) {
                            editor.igEditor("value", value)
                        }
                }
            } else {
                current = editor.igEditor("value");
                if (current !== value) {
                    editor.igEditor("value", value)
                }
            }
        }
    };
    ko.bindingHandlers.igTextEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igTextEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igtexteditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igTextEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("igtexteditortextchanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igTextEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("igtexteditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igTextEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igTextEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element);
            value = ko.utils.unwrapObservable(valueAccessor().value);
            current = editor.igTextEditor("value");
            if (current !== value) {
                editor.igTextEditor("value", value)
            }
        }
    };
    ko.bindingHandlers.igDatePicker = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igDatePicker(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igdatepickervaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igDatePicker", viewModel, args.owner.value())
                    }
                })
            } else {
                editor.bind("igdatepickertextchanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value) && args.text !== args.oldText) {
                        if (args.owner.value() !== null && !isNaN(Date.parse(args.owner.value())) && !isNaN(Date.parse(args.text)) && Date.parse(args.text) !== Date.parse(args.owner.value())) {
                            valueAccessor().value(args.owner.value())
                        } else {
                            valueAccessor().value(args.text.replace(/_(\d)/g, "$1"))
                        }
                    } else {
                        if (args.owner.value() !== null && !isNaN(Date.parse(args.owner.value())) && !isNaN(Date.parse(args.text)) && Date.parse(args.text) !== Date.parse(args.owner.value())) {
                            updatePropertyValue(element, "igDatePicker", viewModel, args.owner.value())
                        } else {
                            updatePropertyValue(element, "igDatePicker", viewModel, args.text.replace(/_(\d)/g, "$1"))
                        }
                    }
                })
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igDatePicker("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element),
                parsedDate, val;
            value = ko.utils.unwrapObservable(valueAccessor().value);
            if (value === null && value !== undefined) {
                editor.igDatePicker("value", value)
            } else {
                value = value.toString().replace(/_(\d)/g, "$1");
                parsedDate = Date.parse(value);
                if (value.toString().indexOf("/Date(") === 0) {
                    value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1"), 10));
                    if (value.toString() === "Invalid Date") {
                        value = undefined
                    }
                } else if (isNaN(parsedDate)) {
                    val = new Date(value);
                    if (val && isNaN(val) && val.toString() !== "Invalid Date") {
                        val = $.ig.util.dateFromISO(value)
                    }
                    value = val;
                    if (value.toString() === "Invalid Date") {
                        value = undefined
                    }
                }
                current = editor.igDatePicker("value");
                current = new Date(current);
                if (current !== parsedDate) {
                    if (value !== undefined && value !== editor.igDatePicker("text")) {
                        value = new Date(value)
                    }
                    editor.igDatePicker("value", value)
                }
            }
        }
    };
    ko.bindingHandlers.igDateEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igDateEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onchange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igdateeditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igDateEditor", viewModel, args.owner.value())
                    }
                })
            } else {
                editor.bind("igdateeditortextchanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        if (args.owner.value() !== null && !isNaN(Date.parse(args.owner.value())) && !isNaN(Date.parse(args.text)) && Date.parse(args.text) !== Date.parse(args.owner.value())) {
                            valueAccessor().value(args.owner.value())
                        } else {
                            valueAccessor().value(args.text.replace(/_(\d)/g, "$1"))
                        }
                    } else {
                        if (args.owner.value() !== null && !isNaN(Date.parse(args.owner.value())) && !isNaN(Date.parse(args.text)) && Date.parse(args.text) !== Date.parse(args.owner.value())) {
                            updatePropertyValue(element, "igDateEditor", viewModel, args.owner.value())
                        } else {
                            updatePropertyValue(element, "igDateEditor", viewModel, args.text.replace(/_(\d)/g, "$1"))
                        }
                    }
                })
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igDateEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element),
                parsedDate, val;
            value = ko.utils.unwrapObservable(valueAccessor().value);
            if (value === null && value !== undefined) {
                editor.igDateEditor("value", value)
            } else {
                value = String(value).replace(/_(\d)/g, "$1");
                parsedDate = Date.parse(value);
                if (value.toString().indexOf("/Date(") === 0) {
                    value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1"), 10));
                    if (value.toString() === "Invalid Date") {
                        value = undefined
                    }
                } else if (isNaN(parsedDate)) {
                    val = new Date(value);
                    if (val && isNaN(val) && val.toString() !== "Invalid Date") {
                        val = $.ig.util.dateFromISO(value)
                    }
                    value = val;
                    if (value.toString() === "Invalid Date") {
                        value = undefined
                    }
                }
                current = editor.igDateEditor("value");
                current = Date.parse(current);
                if (current !== parsedDate) {
                    if (value !== undefined && value !== editor.igDateEditor("text")) {
                        value = new Date(value)
                    }
                    editor.igDateEditor("value", value)
                }
            }
        }
    };
    ko.bindingHandlers.igNumericEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igNumericEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("ignumericeditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igNumericEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("ignumericeditortextchanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igNumericEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("ignumericeditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igNumericEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igNumericEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element);
            value = ko.utils.unwrapObservable(valueAccessor().value);
            if (isNaN(value)) {
                value = undefined
            }
            current = editor.igNumericEditor("value");
            if (current !== value) {
                editor.igNumericEditor("value", value)
            }
        }
    };
    ko.bindingHandlers.igCurrencyEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igCurrencyEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igcurrencyeditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igCurrencyEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("igcurrencyeditorkeyup", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igCurrencyEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("igcurrencyeditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igCurrencyEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igCurrencyEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element);
            value = ko.utils.unwrapObservable(valueAccessor().value);
            if (isNaN(value)) {
                value = undefined
            }
            current = editor.igCurrencyEditor("value");
            if (current !== value) {
                editor.igCurrencyEditor("value", value)
            }
        }
    };
    ko.bindingHandlers.igPercentEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igPercentEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igpercenteditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igPercentEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("igpercenteditorkeyup", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igPercentEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("igpercenteditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igPercentEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igPercentEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element);
            value = ko.utils.unwrapObservable(valueAccessor().value);
            if (isNaN(value)) {
                value = undefined
            }
            current = editor.igPercentEditor("value");
            if (current !== value) {
                editor.igPercentEditor("value", value)
            }
        }
    };
    ko.bindingHandlers.igMaskEditor = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var editor = $(element),
                options;
            options = $.extend({}, valueAccessor());
            options.value = ko.utils.unwrapObservable(options.value);
            editor.igMaskEditor(options);
            if (options.updateMode === undefined) {
                options.updateMode = "onChange"
            } else if (options.updateMode.toLowerCase() !== "onchange" && options.updateMode.toLowerCase() !== "immediate") {
                throw new Error($.ig.Editor.locale.updateModeUnsupportedValue)
            }
            if (options.updateMode.toLowerCase() === "onchange") {
                editor.bind("igmaskeditorvaluechanged", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.value)
                    } else {
                        updatePropertyValue(element, "igMaskEditor", viewModel, args.value)
                    }
                })
            } else {
                editor.bind("igmaskeditorkeyup", function(event, args) {
                    if (ko.isObservable(valueAccessor().value)) {
                        valueAccessor().value(args.owner.value())
                    } else {
                        updatePropertyValue(element, "igMaskEditor", viewModel, args.owner.value())
                    }
                });
                if (options.listItems !== undefined) {
                    editor.bind("igmaskeditorlistselected", function(event, args) {
                        if (ko.isObservable(valueAccessor().value) && args.item !== undefined) {
                            valueAccessor().value(args.item)
                        } else if (args.item !== undefined) {
                            updatePropertyValue(element, "igMaskEditor", viewModel, args.item)
                        }
                    })
                }
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).igMaskEditor("destroy")
            })
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value, current, editor = $(element);
            value = ko.utils.unwrapObservable(valueAccessor().value);
            current = editor.igMaskEditor("value");
            if (current !== value) {
                editor.igMaskEditor("value", value)
            }
        }
    };

    function updatePropertyValue(element, bindingType, viewModel, newValue) {
        var reg = new RegExp(bindingType + "\\s*:\\s*(?:{.*,?\\s*value\\s*:\\s*)?([^{},\\s]+)"),
            key, res = $(element).attr("data-bind").match(reg);
        if (res) {
            key = res[1];
            if (viewModel[key]) {
                viewModel[key] = newValue
            }
        }
    }
})(jQuery);