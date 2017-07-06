/// <reference path="jquery/index.d.ts" />
/// <reference path="jquery.pnotify/index.d.ts" />
/// <reference path="jquery.blockui/index.d.ts/" />

module com.sabrac.processer {

    export class Utils {
        self: any;

        constructor() {
           this.self = this; 
        }

        public static postData(url: string, data: any): JQueryPromise<any> {
            var dfd = $.Deferred();
            $.ajax({
                url: url,
                data: JSON.stringify(data),
                type: 'post',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: false,
                success: function(result) {
                    dfd.resolve(JSON.parse(result));
                },
                error: function(result) {
                    dfd.reject(result);
                }
            });
            return dfd.promise();
        }

        public static notification(
            title: string,
            text: string,
            type: NotiType,
            hide?: boolean,
            nonblock?: NotiNonBlock,
            sound?: boolean): PNotify {

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

    export class NotiType {
        static SUCCESS = new NotiType("success");
        static INFO = new NotiType("info");
        static WARNING = new NotiType("warning");
        static ERROR = new NotiType("error");
        static DARK = new NotiType("dark");
        static NOTICE = new NotiType("notice");

        constructor(public value: NoticeTypeOptions) {
        }

        toString(): NoticeTypeOptions {
            return this.value;
        }
    }

    export class NotiNonBlock {
        nonblock: boolean;
        nonblock_opacity: number;

        constructor() {
            this.nonblock = false;
            this.nonblock_opacity = 0.2; 
        }
    }
}