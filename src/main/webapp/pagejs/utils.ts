/// <reference path="jquery/index.d.ts" />

//module com.sabrac.processer {
//    export class utils {
//        self: any;
//
//        constructor(tmp: string) {
//            this.self = this;
//        }
//
//        public static postData(url: string, data: any): any {
//            var dfd = $.Deferred();
//            $.ajax({
//                url: url,
//                data: JSON.stringify(data),
//                type: 'post',
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json',
//                cache: false,
//                success: function(result) {
//                    return dfd.done(result);
//                },
//                error: function(result) {
//                    return dfd.reject(result);
//                }
//            });
//        }
//    }
//}

export const utils = {
    postData(url, data): JQueryPromise<any> {
        var dfd = $.Deferred();
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            success: function(result) {
                dfd.done(result);
            },
            error: function(result) {
                dfd.reject(result);
            }
        });
        return dfd.promise();
    }
}