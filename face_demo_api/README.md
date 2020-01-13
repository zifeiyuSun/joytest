# 文件说明
| fn name                   | Description          |
| --------------------- | -------------------|
| getEntryPhoto | Base64, 不存在返回空字符串 |
| startExam | 考前试麦flag, 值为：“pre_test”, 此时itemRes传入null即可             |
| isExamValid | 是否场次已经可以开考，如果没有开考，给出提示，不能执行startExam             |
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
      examValid: function() {
        const session = window.JTCustom.getSession();
        return session.status != "open";
      }

    }
 ```