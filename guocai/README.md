# 文件说明

 1. demo.html: 接口调用例子
 2. joyBridge.js: iframe调用接口，所有iframe的调用接口都调用此文件里的方法
 3. RecordRTC.js: 国才录音题外部库
 4. recordUtil.js: 录音接口
 5. speak_item: 文件为内嵌录音题demo


# 试题结构

 说明：duration 录音限时，单位秒；下面是包含的三种题型：1.含子小题录音的；2.一题一录音；3.同时有音频和视频的录音题

1. 复合题录音题:

```json 
{
  "point": 1,
  "template": "templateName",
  "content": {
    "main_stem": "主题干内容，支持HTML",
    "items": [
      {
        "point": 1,
        "analysis": "",
        "scoreType": "norm",
        "content": {
          "stem": "子小题题干，支持HTML",
          "duration": 30 
        },
        "type": "speak",
        "audio": {
          "url": "https://***.mp3"
        },
        "id": "a3e75834-0056-038b-3d42-256619090c63"
      }
    ]
  },
  "audio": {
    "url": "https://***.mp3"
  },
  "type": "mq-lr",
  "id": "ae693cd1-e45d-d491-798d-978506a0cac3"
}
```
2.单题录音题:
```json
{
  "id": "e2134188-c608-329c-f3fc-58939cb43764",
  "point": 1,
  "type": "speak",
  "template": "templateName",
  "audio": {
    "url": "https://***.mp3"
  },
  "content": {
    "stem": "录音题干，支持HTML",
    "duration": 30
  }
}
```
3.带视频的录音题
```json
{
  "id": "e2134188-c608-329c-f3fc-58939cb43764",
  "point": 1,
  "type": "speak",
  "audio": {
    "url": "https://***.mp3"
  },
  "video": {
    "url": "https://***.mp4"
  },
  "content": {
    "stem": "录音题干，支持HTML",
    "duration": 30,
    "template": "templateName"
  }
}
```
# iframe给考试机的response:
说明：复合题就给当前子小题，单个录音题就给当前试题id
```json
{
  "item_id": "e2134188-c608-329c-f3fc-58939cb43764", 
  "annotation": { 
    "item_id": "e2134188-c608-329c-f3fc-58939c",
    "data": ["jlfkajsd", "", "32909rer"]
  }
}
```

# 考试机给iframe的response:
1.复合题录音
```json
{
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
      "annotation":["jfkajksd", "", "faksdjf"],
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
            "value: "***.webm"
          }
        }
      ]
    }
```
2.单录音
```json
{
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
    "annotation":["jfkajksd", "", "faksdjf"],
    "answer": {
      "value": "https://cdn.eztest.org/media/attachment/8709352/92e38d3e-43df-4305-442d-0dd3fff987e6_ctvfdglu.webm"
    }
}
```
 

 # 接口说明文档

 说明：所有调用接口都在window.joyBridge上

## 1. init(opts)

   数据加载好之后运行，通知考试机iframe已经初始化成功。

   参数说明：函数，此函数可以在答题过程中获取当前试题的答案，为了考试机自动收取iframe里的答案。

```js 
  const jb = window.joyBridge;
  let item;
  const opts = {
      get_item_response: async function() {
        // 提交录音，发送答案
        const itemRes = {
                "item_id": item.id,
                "annotation": { 
                  "item_id": item.id,
                  "data": ["jlfkajsd", "", "32909rer"]
                },
                "answer": ""
              };
        if(joyRecordUtil.audioRecording) {
          const blob = await jb.get_blob();
          const file = await jb.post_audio_blob(blob);
          itemRes.answer = file.filename;
          joyRecordUtil.audioRecording = false;
        }
        return itemRes;
      
    },
      pause_exam: function(){
        // todo
      },
      resume_exam: function(){
        // todo
      }
    };
    

    jb.init(opts);
```

## 2. start_item()
通知考试机已开始答题，返回值为Promise

## 3. submit_response(itemRes)

提交答案至考试机，返回值为Promise

## 4. get_current_item()

获取当前试题数据，返回值为Promise

## 5. get_current_item_response(subitemId?)

获取当前试题的reponse，返回值为Promise

如果没有参数，返回复合题整个response；如果有参数，返回当前自小题的response


## 6.next()

作答完当前题，执行下一步操作（考试机执行操作：下一题/下一组/下一单元/结束考试）

## 7.start_record()

 开始录音，返回值为promise
 ```js
    // 开始录制
    startBtn.onclick = function(){
      const mediaDevices = jb.mediaDevices;
      mediaDevices.getUserMedia({audio: true})
      .then(function(stream) {
        /* use the stream */
        jb.start_record(stream);
      })
      .catch(function(err) {
        /* handle the error */
        console.log(err);
      });
    }
 ```

## 7.stop_record(itemRes, type?)
 开始录音，返回值为promise, 异步执行成功返回音频url

| parameter name                   | Description          |   type  |
| --------------------- | -------------------- ------- | -------- |
| itemRes | 当前试题response数据 |object|
| type | 考前试麦flag, 值为：“pre_test”, 此时itemRes传入null即可             |  string |

```js
    // 停止录制
    stopBtn.onclick = function(){
      const itemRes = {
        "item_id": item.id,
        "annotation": { 
          "item_id": item.id,
          "data": ["jlfkajsd", "", "32909rer"]
        }
      };

      // 提交录音，发送答案
      jb.stop_record(itemRes).then(function(filename){
        const audioDom = document.getElementById("audio");
        audioDom.src = "/seat/rfile/" + filename;
        //jb.next();
      });
    }
```