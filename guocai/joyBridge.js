window.joyBridge = {
    parent: window.parent.joyBridge,
    mediaDevices: joyRecordUtil.getMediaDevices(),

    // 初始化成功，返回值为promise
    init:function(opts) {
        const _this = this;
        window.addEventListener("message", async function(event){
            if(!event.data) return;

            const data = JSON.parse(event.data);
            switch(data.type){
              case "RequestSubmit":
                if(!opts.get_item_response) return;
                const itemRes = await opts.get_item_response();
                // window.parent.postMessage(JSON.stringify(data), '*');
                _this.submit_response(itemRes, "RequestSubmit");
                // console.log(data);
                break;
            case "PauseExam":
                if(!opts.pause_exam) return;
                // 考试机暂停考试通知
                opts.pause_exam();
                break;

            case "ResumeExam":
                if(!opts.resume_exam) return;
                // 考试机继续考试通知
                opts.resume_exam();
                break;
            }
        })
        return this.parent.init();
    },

    // 开始答题，返回值为promise
    start_item: function() {
        return this.parent.start_item();
    },

    // 提交当前试题答案，返回值为promise
    submit_response: function(itemRes, type) {
        return this.parent.update_response(itemRes, type);
    },

    // 获取当前试题数据，返回值为promise，异步执行成功返回当前试题结构
    get_current_item: function() {
        return this.parent.get_current_item();
    },

    // 获取当前试题response，返回值为promise，异步执行成功返回当前试题response
    get_current_item_response: function(subitemId) {
        if(subitemId){
            return this.parent.get_current_item_response(subitemId);
        }
        return this.parent.get_current_item_response();
    },
    
    // 作答完当前题，执行下一步操作（考试机执行操作：下一题/下一组/下一单元/结束考试）
    next: function () {
        return this.parent.next();
    },

    // 开始录音,返回值为promise 
    start_record: function(stream) {
        return this.parent.start_record(stream).then(function(stream){
            joyRecordUtil.startRecordAudio(stream);
        });
    },

    post_audio_blob: function(blob) {
        return this.parent.post_audio_blob(blob);
    },

    get_blob: async function(){
        return await joyRecordUtil.stopRecordAudio()
    },

    // 停止录音,返回值为promise,异步执行成功返回音频url; type: pre_test(考前测试)
    stop_record: async function(itemRes, type) {
        if(type === "pre_test"){
            const url = await joyRecordUtil.toURL();
            //console.log(url);
            return url;
        }
        const blob = await this.get_blob();
        const file = await this.post_audio_blob(blob);
        itemRes.answer = file.filename;
        return this.submit_response(itemRes);
    }

};

