/// <reference path="jquery/index.d.ts" />
/// <reference path="jquery.pnotify/index.d.ts" />
/// <reference path="jquery.blockui/index.d.ts/" />
var com;
(function (com) {
    var sabrac;
    (function (sabrac) {
        var processer;
        (function (processer) {
            class Utils {
                constructor() {
                    this.self = this;
                }
                static postData(url, data) {
                    var dfd = $.Deferred();
                    $.ajax({
                        url: url,
                        data: JSON.stringify(data),
                        type: 'post',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: false,
                        success: function (result) {
                            dfd.resolve(JSON.parse(result));
                        },
                        error: function (result) {
                            dfd.reject(result);
                        }
                    });
                    return dfd.promise();
                }
                static notification(title, text, type, hide, nonblock, sound) {
                    if (hide == null || hide == undefined) {
                        hide = true;
                    }
                    if (nonblock == null || nonblock == undefined) {
                        nonblock = new NotiNonBlock();
                    }
                    if (sound == null || sound == undefined) {
                        sound = false;
                    }
                    return new PNotify({
                        title: title,
                        text: text,
                        type: type.toString(),
                        hide: hide,
                        nonblock: nonblock,
                        sound: sound
                    });
                }
            }
            processer.Utils = Utils;
            class NotiType {
                constructor(value) {
                    this.value = value;
                }
                toString() {
                    return this.value;
                }
            }
            NotiType.SUCCESS = new NotiType("success");
            NotiType.INFO = new NotiType("info");
            NotiType.WARNING = new NotiType("warning");
            NotiType.ERROR = new NotiType("error");
            NotiType.DARK = new NotiType("dark");
            NotiType.NOTICE = new NotiType("notice");
            processer.NotiType = NotiType;
            class NotiNonBlock {
                constructor() {
                    this.nonblock = false;
                    this.nonblock_opacity = 0.2;
                }
            }
            processer.NotiNonBlock = NotiNonBlock;
        })(processer = sabrac.processer || (sabrac.processer = {}));
    })(sabrac = com.sabrac || (com.sabrac = {}));
})(com || (com = {}));
//# sourceMappingURL=utils.js.map