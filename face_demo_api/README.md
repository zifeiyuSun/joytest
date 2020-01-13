# 文件说明
| fn name                   | Description          | 
| --------------------- | -------------------| 
| itemRes | 当前试题response数据                     |
| type | 考前试麦flag, 值为：“pre_test”, 此时itemRes传入null即可             | 
 ```js
  window.joyFaceApi = {
      getEntryPhoto: function() {
        const entryInfo = window.JTCustom.getEntryInfo();
        if(entryInfo.personal) {
          return entryInfo.personal.registration_photo;
        }
        return "";
      },

      // 开始考试
      startExam: function() {
        window.JTCustom.startExam()
      },

      // 是否管理机已经开始考试
      isExamValid: function() {
        const session = window.JTCustom.getSession();
        return session.status != "open";
      }

    }
 ```