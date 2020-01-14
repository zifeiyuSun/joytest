# 文件说明
| fn name                   | Description          |
| --------------------- | -------------------|
| getEntryPhoto | Base64, 不存在返回空字符串 |
| startExam | 执行开始考试，进入答题界面             |
| isExamValid | 是否场次已经可以开考，如果没有开考，给出提示，不能执行startExam             |
 ```js
  window.joyFaceCheck = {
      getEntryPhoto: function() {
        const entryInfo = window.JTCustom.getEntryInfo();
        if(entryInfo.personal && entryInfo.personal.registration_photo) {
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