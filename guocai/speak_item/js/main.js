/**
 * Created by matianye on 2019/12/23.
 */
const debug = false;
class MAIN {
    constructor(){
        this.data = {};
    }
    init(){
        console.log("main.js is run")

    }
    startExam(cb){
        /*H
        * 开始答题
        * */
        window.joyBridge.start_item().then(cb);
    }
    itemRequestFun(type,cb){
        /*
        * 获取当前试题数据
        * type: [string]
        * LC listeningCompletion 听力填空
        * LM listeningMultiple 听力复合题
        * LV listeningVideo 听力视频
        * cb：异步成功后的回调函数
        * */
        if(debug){
            let data = {};
            if(type == "LC"){
                //听力填空
                data = {
                    "point": 1,
                    "content": {
                      "main_stem": "",
                      "template": "templateName",
                      "items": [
                        {
                          "point": 1,
                          "analysis": "",
                          "scoreType": "norm",
                          "content": {
                            "stem": "子小题题干，支持HTML",
                            "duration": 5 
                          },
                          "type": "speak",
                          "audio": {
                            "url": "../media/test1.mp3"
                          },
                          "id": "a3e75834-0056-038b-3d42-256619090c63"
                        },{
                            "point": 1,
                            "analysis": "",
                            "scoreType": "norm",
                            "content": {
                              "stem": "子小题题干，支持HTML",
                              "duration": 5 
                            },
                            "type": "speak",
                            "audio": {
                              "url": "../media/test2.mp3"
                            },
                            "id": "a3e75834-0056-038b-3d42-256619090c63"
                          },{
                            "point": 1,
                            "analysis": "",
                            "scoreType": "norm",
                            "content": {
                              "stem": "子小题题干，支持HTML",
                              "duration": 5 
                            },
                            "type": "speak",
                            "audio": {
                              "url": "../media/test3.mp3"
                            },
                            "id": "a3e75834-0056-038b-3d42-256619090c63"
                          } ,{
                            "point": 1,
                            "analysis": "",
                            "scoreType": "norm",
                            "content": {
                              "stem": "子小题题干，支持HTML",
                              "duration": 5 
                            },
                            "type": "speak",
                            "audio": {
                              "url": "../media/test4.mp3"
                            },
                            "id": "a3e75834-0056-038b-3d42-256619090c63"
                          },{
                            "point": 1,
                            "analysis": "",
                            "scoreType": "norm",
                            "content": {
                              "stem": "子小题题干，支持HTML",
                              "duration": 5 
                            },
                            "type": "speak",
                            "audio": {
                              "url": "../media/test4.mp3"
                            },
                            "id": "a3e75834-0056-038b-3d42-256619090c63"
                          }
                      ]
                    },
                    "audio": {
                      "url": "../media/intro.mp3"
                    },
                    "type": "mq-lr",
                    "id": "ae693cd1-e45d-d491-798d-978506a0cac3"
                  }
            }else if(type == "LM"){
                //听力复合题
                data = {
                    "point": 1,
                    "content": {
                        "main_stem": "主题干内容，支持HTML",
                        "template": "templateName",
                        "items": [
                            {
                                "point": 1,
                                "analysis": "",
                                "scoreType": "norm",
                                "content": {
                                    "stem": "<div>小题1</div>",
                                    "duration": 5
                                },
                                "type": "speak",
                                "audio": {
                                    "url": "../media/test1.mp3"
                                },
                                "id": "a3e75834-0056-038b-3d42-256619090c61"
                            },{
                                "point": 1,
                                "analysis": "",
                                "scoreType": "norm",
                                "content": {
                                    "stem": "<div>小题2</div>",
                                    "duration": 5
                                },
                                "type": "speak",
                                "audio": {
                                    "url": "../media/test2.mp3"
                                },
                                "id": "a3e75834-0056-038b-3d42-256619090c62"
                            },{
                                "point": 1,
                                "analysis": "",
                                "scoreType": "norm",
                                "content": {
                                    "stem": "<div>小题3</div>",
                                    "duration": 5
                                },
                                "type": "speak",
                                "audio": {
                                    "url": "../media/test3.mp3"
                                },
                                "id": "a3e75834-0056-038b-3d42-256619090c63"
                            }
                        ]
                    },
                    "audio": {
                        "url": "../media/intro.mp3"
                    },
                    "type": "mq-lr",
                    "id": "ae693cd1-e45d-d491-798d-978506a0cac3"
                }
            }else if(type == "LV"){
                //听力视频
                data = {
                    "id": "e2134188-c608-329c-f3fc-58939cb43764",
                    "point": 1,
                    "type": "speak",
                    "audio": {
                        "url": "../media/ListeningVideo.mp3"
                    },
                    "video": {
                        "url": "../media/ListeningVideo.mp4"
                    },
                    "content": {
                        "stem": "<div>听力视频</div>",
                        "duration": 30,
                        "page": "https://*****.index.html"
                    }
                }
            }
            return data
        }else{
            window.joyBridge.get_current_item().then(cb)
        }
    }
    itemStateRequestFun(type,cb){
        /*
         * 获取当前试题response
         * type: [string]
         * LC listeningCompletion 听力填空
         * LM listeningMultiple 听力复合题
         * LV listeningVideo 听力视频
         * cb：异步成功后的回调函数
         * */
        if(debug){
            let data = {};
            if(type == "LC"){
                // 录音填空题
                data = {
                    "id": "20fb349b-b169-5936-79f7-e9892708f90f",
                    "type": "mq-lr",
                    "marked": false,
                    "completed": true,
                    "group_id": "fe49826f-da43-d736-c097-f688b92aaa78",
                    "section_type": "exam",
                    "section_id": "34c313da-9893-47f8-f3da-5a657a2ce81b",
                    "status": {
                      "dirty": false,
                      "failed": false,
                      "submitted": false,
                      "submitting": false
                    },
                    "timestamp": 1577069526622,
                    "practice_complete": false,
                    "annotation":["", "", "","","","sdfsdfsdf","","dfs","dd"],
                    "answers": [
                      {
                        "id": "107964cf-7661-2034-e380-92b85a64fcfd",
                        "type": "speak",
                        "time_spent": 11,
                        "completed": true,
                        "retry_count": 2,
                        "marked": false,
                        "annotation":["jfkajksd", "", "faksdjf"],
                        "answer": {
                          "url": ""
                        }
                      },{
                        "id": "107964cf-7661-2034-e380-92b85a64fcfd",
                        "type": "speak",
                        "time_spent": 11,
                        "completed": true,
                        "retry_count": 2,
                        "marked": false,
                        "annotation":["jfkajksd", "", "faksdjf"],
                        "answer": {
                          "url": ""
                        }
                      }
                    ]
                  }
            }else if( type == "LM"){
                //复合题录音
                data =  {
                    "id": "20fb349b-b169-5936-79f7-e9892708f90f",
                    "type": "mq-lr",
                    "marked": false,
                    "completed": true,
                    "group_id": "fe49826f-da43-d736-c097-f688b92aaa78",
                    "section_type": "exam",
                    "section_id": "34c313da-9893-47f8-f3da-5a657a2ce81b",
                    "status": {
                        "dirty": false,
                        "failed": false,
                        "submitted": false,
                        "submitting": false
                    },
                    "timestamp": 1577069526622,
                    "practice_complete": false,
                    "answers": [
                        {
                            "id": "107964cf-7661-2034-e380-92b85a64fcf1",
                            "type": "speak",
                            "time_spent": 11,
                            "completed": true,
                            "retry_count": 2,
                            "marked": false,
                            "answer": {
                                "url": "12321213"
                            }
                        },{
                            "id": "107964cf-7661-2034-e380-92b85a64fcf2",
                            "type": "speak",
                            "time_spent": 11,
                            "completed": true,
                            "retry_count": 2,
                            "marked": false,
                            "answer": {
                                "url": ""
                            }
                        },{
                            "id": "107964cf-7661-2034-e380-92b85a64fcf3",
                            "type": "speak",
                            "time_spent": 11,
                            "completed": true,
                            "retry_count": 2,
                            "marked": false,
                            "answer": {
                                "url": ""
                            }
                        }
                    ]
                }
            }else if(type == "LV"){
                //单录音
                data ={
                    "id": "e2134188-c608-329c-f3fc-58939cb43764",
                    "type": "speak",
                    "marked": false,
                    "completed": true,
                    "group_id": "9ccb791b980940c296305a9949c47ba9",
                    "section_type": "exam",
                    "section_id": "c33e4e1f1eb042a1904732a1e45537ff",
                    "status": {
                        "dirty": false,
                        "failed": false,
                        "submitted": false,
                        "submitting": false
                    },
                    "timestamp": 1577069675367,
                    "practice_complete": false,
                    "time_spent": 2,
                    "retry_count": 1,
                    "answer": {
                        "url": "https://cdn.eztest.org/media/attachment/8709352/92e38d3e-43df-4305-442d-0dd3fff987e6_ctvfdglu.webm"
                    }
                }
            }
            return data
        }else{
            window.joyBridge.get_current_item_response().then(cb)
        }
    }
    recordStartFun(id,cb){
        /*
        * 录音开始函数
        * id : 试题id
        * cb : 音频录制结束后回调函数
        * */
        if(debug){
            cb();
        }else{
            let _id = id;
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(function(stream) {
                    window.joyBridge.start_record(stream).then(cb);
                })
        }
        //typeof cb === "function"?cb():"";
    }
    recordStopFun(data,cb,errCb){
        /*
         * 录音结束函数
         * id : 试题id
         * cb : 音频录制结束后回调函数
         * */
        if(debug){
            cb();
        }else{
            window.joyBridge.stop_record(data).then(cb,errCb);
        }
    }
    submitRecordFun(data,cb){
        /*
        * 提交试题答案
        * data：试题答案
        * cb：提交成功后回调函数
        * */
        if(debug){
            cb();
        }else{
            window.joyBridge.submit_response(data).then(cb);
        }
    }
    audioFun(url,cb){
        /*
        * 播放音频函数
        * url : 音频路径
        * cb : 音频播放结束后回调函数
        * */
        $("audio").remove();
        $("body").append("<audio id='audio_id' autoplay='autoplay' src='"+ url +"'></audio>");
        $("#audio_id")[0].onended = typeof cb === "function"?cb:"";
    }
    videoFun(id,url,cb){
        /*
         * 播放视频函数
         * id  : 载体
         * url : 视频路径
         * cb  : 视频播放结束后回调函数
         * */
        $("video").remove();
        $("."+id).append("<div class='VideoBox'><video  id='video_id'  autoplay='autoplay'  width='480' height='360' src='"+ url +"'></video ></div>");

        $("#video_id")[0].onended = typeof cb === "function"?cb:"";
    }

    stepListRenderFun(){
        /*
        * 试题状态栏渲染函数
        * */
        let _this = this;
        class stepFun{
            stepInit(id,stepData){
                /*
                * id：渲染位置父级id
                * stepData：试题结构[Array]
                * */
                let _data = stepData;
                let _html = () => `
                <ul class="step-component">
                ${_data.map((item,index) => `
                    <li class="step-item">
                        <div class="point un-answerd"></div>
                        <p>${index+1}</p>
                    </li>`).join("")}
                </ul>
                `;
                $("#"+id).append(_html);
            }
            stepPos(stepCpout){
                /*
                * stepCpout：试题进度[number]
                * */
                for(let k = 0;k<stepCpout;k++){
                    if(k + 1 == stepCpout){
                        $(".step-component .step-item div").eq(k).attr("class","point now-item")
                    }else{
                        $(".step-component .step-item div").eq(k).attr("class","point is-answerd")
                    }
                }
            }
            stepDestroy(){
                $(".step-component").remove();
            }
        }
        return new stepFun();
    }
    timeBox(){
        class TIMER{
            constructor(){
            }
            /* 初始化timer到一个dom节点上
            id：dom节点的id
            */
            init(id){
                $(id).html(`<div class="timer-area ReadItemColor">
                                <div class="timer-type"></div>
                                <div class="timer-time"></div>
                            </div>`);
                return this;
            }
            //4209 => 01:10:09
            timeParse(num){
                let h,m,s;
                h = String(Math.floor(num / 3600));
                m = String(Math.floor((num % 3600) / 60));
                s = String(num % 60);
                return `${h.padStart(2,"0")}:${m.padStart(2,"0")}:${s.padStart(2,"0")}`;
            }
            /* 
            num: 倒计时秒数
            type: 定时器类型
                RI：播放音频阶段
                RP：考生答题阶段
                PT：准备答题阶段
            cb: 回调函数
            */
            startTimer(num, type="ReadItem", cb){
                switch(type){
                    case "RI":
                    //播放音频阶段
                    $(".timer-area").removeClass("ReadItemColor RecordColor prepareColor").addClass("ReadItemColor");
                    $(".timer-type").html("Reading Time");
                    break;
                    case "RP":
                    //考生答题阶段
                    $(".timer-area").removeClass("ReadItemColor RecordColor prepareColor").addClass("RecordColor");
                    $(".timer-type").html("Response Time");
                    break;
                    case "PT":
                    //准备答题阶段
                    $(".timer-area").removeClass("ReadItemColor RecordColor prepareColor").addClass("prepareColor");
                    $(".timer-type").html("Preparation Time");
                    break;
                }
                let last = new Date().valueOf();
                let temptimer = setInterval(() => {
                    var now = new Date().valueOf();
                    let tc = $(".timer-area .timer-time");
                    tc.html(this.timeParse(num));
                    if(now - last >= 1000){
                        last = now;
                        num--;
                       tc.html(this.timeParse(num));
                        if(num == 0){
                            clearInterval(temptimer);
                            $(".timer-area").remove();
                            if(typeof cb === "function"){
                                cb()
                            }
                        }
                    }
                },100)
            }
        }
        return new TIMER()
    }
    changeIconFun(id,type){
        /*
        * 更改gif icon 函数
        * id: 需要添加icon的父级id
        * type:添加icon类型 MIC => 麦克风 EARP => 耳机 [string]
        * */
        $(".item-icon").remove();
        let _src = "";
        if(type == "MIC"){
            _src = "image/MIC.gif";
        }else if(type == "EARP"){
            _src = "image/Earphone.gif";
        }
        $("#"+id).append(`<div id="item_icon" class="item-icon"><img src="${_src}"/></div>`)
    }
    changeIconFunRemove(){
        $(".item-icon").remove();
    }
    itemEndFun(){
        /*
        * 考试结束函数
        * 执行下一步操作（考试机执行操作：下一题/下一组/下一单元/结束考试）
        * */
        if(debug){
            alert("item is over")
        }else{
            window.joyBridge.next();
        }
    }
}