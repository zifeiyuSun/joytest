window.joyBridge = {
    _this: window.parent,

    // 初始化成功，返回值为promise
    init:function(callback) {

        // 监听考试机的消息
        window.addEventListener("message", function(evt){
            const dataGot = JSON.parse(evt.data);
            switch(dataGot.type){
                // 考试机收集iframe未提交的试题答案
                case "requestSubmit":
                    const itemRes = callback();
                    const dataPost = {
                        'type': 'submitItemRes',
                        'itemRes': itemRes
                    };
                    window.parent.postMessage(JSON.stringify(dataPost), "*");
                    break;
            }
        });
        return _this.init();
    },

    // 开始答题，返回值为promise
    start_item: function() {
        return _this.start_item();
    },

    // 提交当前试题答案，返回值为promise
    submit_response: function(itemRes) {
        return _this.submit_response(itemRes);
    },

    // 获取当前试题数据，返回值为promise，异步执行成功返回当前试题结构
    get_current_item: function() {
        return _this.get_current_item();
    },

    // 获取当前试题response，返回值为promise，异步执行成功返回当前试题response
    get_current_item_response: function(subitemId) {
        if(subitemId){
            return _this.get_current_item_response(subitemId);
        }
        return _this.get_current_item_response();
    },
    
    // 作答完当前题，执行下一步操作（考试机执行操作：下一题/下一组/下一单元/结束考试）
    next: function () {
        return _this.next();
    },

    // 开始录音,返回值为promise 
    start_record() {
        return _this.start_record();
    },

    // 停止录音,返回值为promise,异步执行成功返回音频blob
    stop_record() {
        return _this.stop_record();
    }

}