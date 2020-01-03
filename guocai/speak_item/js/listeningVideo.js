/**
 * Created by liulintao on 2019/12/23.
 */


var  LVMAIN=new MAIN()
let _data = {};
function GetItemData(){//获取原始数据
    if(debug){
        var  GetOriginalData=LVMAIN.itemRequestFun("LV")//请求试题原始数据
        var itemMessage = GetOriginalData.content.stem;
        //$(".listening-video").append(itemMessage)
    }else{
        LVMAIN.itemRequestFun("LV",(value) => {
            var  GetOriginalData = value;
            _data = value;
            var itemMessage;
            itemMessage=GetOriginalData.content.stem;
            $(".listening-video").append(itemMessage);
            PlayAudio();
        })//请求试题原始数据
    }
    //var  GetiRequestData=LVMAIN.itemStateRequestFun("LV")//请求试题返回数据
   /* if (GetiRequestData.answer.url!="") {
        console.log(GetiRequestData.answer.url)
    }*/

}


function PlayAudio(){//播放音频
    LVMAIN.changeIconFun("iconBox","EARP");//显示耳机图标
    var audioUrl;
    audioUrl=_data.audio.url;
    //audioUrl="media/ListeningVideo.mp3";
    LVMAIN.audioFun(audioUrl, PlayVideo);
}
function PlayVideo(){//播放视频

    var videoUrl;
    //videoUrl=_data.audio.url;
    videoUrl="media/ListeningVideo.mp4";

    $("._ctrlTime").hide();

    LVMAIN.videoFun('listening-video',videoUrl, ()=>{LVMAIN.audioFun("media/beep.mp3",PreparationTime)});
}
function PreparationTime(){//考生准备时间

    $(".VideoBox").hide();
    LVMAIN.changeIconFunRemove();//移除音频图标
    $("._ctrlTime").show();
    $(".listening-video").append("<div  class=' ItemNotice' id='prepareNotice'><span>Now you have <span class='second-text-bold'>2</span> minutes to prepare.</span></div>")
    LVMAIN.timeBox().init('.timeBox').startTimer(10,"PT",()=>{LVMAIN.audioFun("media/beep.mp3",recordFStar)});

}
/*function End(){
    LVMAIN.changeIconFun("iconBox","EARP");//显示耳机图标
    console.log("is end")

}*/
function recordFStar(){//录音开始
    LVMAIN.startExam();
    $("#prepareNotice").hide();
    $(".listening-video").append("<div  class=' ItemNotice' id='prepareNotice'><span>Now you have <span class='second-text-bold'>90</span> seconds to speak.</span></div>")
    LVMAIN.changeIconFun("iconBox","MIC");//显示麦克风图标
    LVMAIN.audioFun("media/beep.mp3",() => {
        LVMAIN.recordStartFun(_data.id,() => {});
        LVMAIN.timeBox().init('.timeBox').startTimer(10, "RP", ()=> {
            LVMAIN.changeIconFun("iconBox","EARP");//显示耳机图标
            LVMAIN.recordStopFun({
                "item_id":_data.id
            },(url)=>{
                console.log("stop is success,url is :" + url);
            },(Error)=>{
                console.log(Error);
                return {
                    "item_id": _data.id
                }
            });
            LVMAIN.audioFun("media/beep.mp3", ()=> {
                LVMAIN.itemEndFun()
            })
        })
    });
}
function setTimeBox(){
    LVMAIN.timeBox().init('.test').startTimer();
}

window.onload = function(){
    if (debug) {
        GetItemData();
        PlayAudio();
    } else {
        window.joyBridge.init(() => {
            LVMAIN.recordStopFun((value)=> {
                return {
                    "AttachmentBase64": value,
                    "item_id": _data.id
                }
            },(Error)=>{
                console.log(Error);
                return {
                    "AttachmentBase64": "",
                    "item_id": _data.id
                }
            })
        }).then(() => {
            GetItemData();
        });
    }
}