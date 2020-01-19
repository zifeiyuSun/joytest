# 悦考考试机定制项目接口说明

 说明：所有函数都挂在window.JTCustom对象下，调用：window.JTCustom.fn()
## 1. 获取数据：
| Function name                   | Description          |   type  |
| ------------------------------- | -------------------- ------- | -------------------- ------- |
| getSession()    | session信息            |object|
| getEntryInfo()  | 考生信息             |  object |
| getForm()    | 试卷信息          |  object |
| getResponse()    | 考生答案          |  object |
| getCurSection() | 当前Section信息         |object|
| getCurGroup()   | 当前Group信息         |object|
| getCurItem()    | 当前Item信息         |object|
| getVolume()     | 当前音量                |number|
| getAllIMs()     | 所有输入法               |object|
| getCIM          | 当前使用输入法          |object|
| isFormAvailable()      | 获取当前试卷是否加载好 |boolean|

1. getSession(), 返回值:

```json 
{
	end_time: "2019-12-31 14:00:00",
	ended_at: 0,
	id: "5c23280e250b856978dae075",
	name: "P000000018012-5c232804250b856978dad6f0",
	start_time: "2018-12-25 14:00:00",
	status: "ongoing",
	title: "www1225-试考-试考",
  ...
}
```
2. getEntryInfo(), 返回值:

```json 
{
	entry_id: "5c23280e250b856978dae078",
	permit: "5c23280e250b856978dae075-1",
	seat: 2,
	status: "ongoing",
	subject: "试考",
  ...
}
```
3. getForm(), 返回值:

```json 
{
  form_id: "5d089e87250b85438df84279",
	id: "bdf511c452f947d8b02aed5f79adced8",
	name: "TEM8_样卷_全内容0607",
  sections: Array<Section>,
  ...
}
```

4. getCurSection(), 返回值:

```json 
{
	display: string; // by_group/by_item（缺省）
  calculator: boolean;
  id: string;
  name: string;
  section_type: SectionType;
  groups: Array<Group>;
  fold?: boolean; // 是否默认 折叠 左侧选题区；default:false
  ...
}
```
5. getCurGroup(), 返回值:

```json 
{
  id: string;
  name?: string;
  items: Array<Item|SavilleItem|TypeItem>;
  ...
}
```
6. getCurItem(), 返回值:

```json 
{
  id: string;
  required?: boolean;
  type: "sc" | "mc" | "tf" | "sa" | "saville" | "mq-lr" | "mq-in" | "mq-in-sc" | "tm" | "tl" | "speak" | "embed" | "mq-drop" | "mq-se";
  ...
}
```
7. getVolume(), 返回值:  0-100 整数
	
8. getAllIMs(), 返回值:

```json 
[
  {"name":"搜狗拼音"},
  {"name":"QQ拼音"},
  {"name":"搜狗五笔"},
  {"name":"万能五笔"},
  {"name":"微软全拼"}
]
```
9. getCIM(), 返回值:

```json 
{"name":"搜狗拼音"}
```
10. isFormAvailable(), 返回值:  true | false

## 2. 系统配置项：

| Function name                               | Description |
| ------------------------------------------- | ----------- |
| setConfig (configName, val) | 设置配置项  |
| deleteConfig (configName) | 删除配置项  |

参数说明：

| config name | val      | Description          |
| ----------- | ----------------- | -------------------- |
| notice      | “notice.html ”  | 设置自定义notice url |
| volume      | 50  | 设置系统音量 |
| time        | {type: "current"} ，{type: "left"，format: "min" }  ，{type: "left"，format: "sec" } | 设置考试时间显示     |
| water_mark  | object | 设置水印配置         |

time 属性说明：
```json
{type: “current”} // 设置考试时间为当前服务器时间
{type: “left”，format: “min” }// 设置考试时间为倒计时，ex: 剩余时间：1小时50分钟
{type: “left”，format: “sec” }// 设置考试时间为倒计时，ex: 剩余时间：01：50：43
```
water_mark 属性说明：
```json
water_mark: {
	eleClassName: "exam-sailfish", // 显示水印背景的dom元素，"rt-cont-main" | "exam-sailfish"
	text: "我是水印内容", // 水印内容，默认为 entry id
	fontSize: "13",
	fontFamily: "serif",
	color: "#ddd",
	repeatX: false, // 是否水平平铺
	repeatY: false,// 是否垂直平铺
	startPosX: "100%",// 背景中x轴开始位置
	startPosY: "50px",// 背景中Y轴开始位置
	space: 1.5 // 最小值为1，越大距离越大 
}
```
## 3. 设置form上的属性：

#### window.JTCustom.setFormPro(type, config, sectionIndex?, firstItemType?)

| parameter name    | Description                                         |
| ------------- | --------------------------------------------------- |
| type         | string类型：form/section/group  |
| config         | ex:                                                                                                                                                    1.设置section最小限时题型：{timer: {time_min_limit: 0}}                                                                                         2.设置group name：{"name": "本大题共有{{item_length}}道题，每小题{{item_score}}分，共计{{group_score}}分"}； |
| sectionIndex         | 当前section的index，从0开始，type为“form”时不需要传入|
| firstItemType         | group下第一题题型，type为“form”/“section”时不需要传入 |
## 4. 事件绑定：window.JTCustom.bind(eventName, callback)
可绑定事件：

| event name    | Description                                         |
| ------------- | --------------------------------------------------- |
| login         | login dom加载完成执行                               |
| examStart     | 管理机通知考试机开考                                |
| formLoaded | 试卷加载完成后执行 |
| examSailfish  | 进入答题界面，包括group intro界面， dom加载完成执行 |
| newSectionDomLoaded | 新的 section 答题界面DOM 已经加载好后时执行                   |
| enterSection | 进入新单元，新单元还未开始计时前 |
| endPageLoaded | end 页面加载完成执行                                  |
| endSuccess    | end 接口提交完成执行                                  |
|scorePageLoaded|  score 页面加载完成执行 |
|scoreSuccess|  score 获取得分完成执行 |
| clearUp | 清除skin配置项时触发，可用于清除skin里的本地变量              |

## 5. 自定义考试词条
注：如果词条中有动态数据，譬如: “{{timeLeft}}之后才能结束本单元”，请先使用getTransMsg获取原有词条，提取词条中的动态变量，再通过setTransMsg设置
| event name    | Description                                         |
| ------------- | --------------------------------------------------- |
| getTransMsg(transKey)       | 获取已有考试词条对象     |
| setTransMsg(lang, trans, shouldMerge?)       | 设置考试词条 |

 setTransMsg参数说明：
|  参数      |   类型            | 说明                             |
| --------- | -----------------  | -------------------------------- |
| lang           |String| 设置词条的语言，参数值："en"、"zh"、"zh-hk"   |
| trans          |Object| 词条对象                          |
| shouldMerge    |Boolean| 是否合并词条，默认为true；false: trans 对象替换已有词条对象|


## 6. 调用系统函数
| fn name       | Description       |
| ------------- | ----------------- |
| redirectLogin()  | 执行返回login页面 |
| startExam ()     | 执行开始考试      |
| disableIME(500)     | 禁用中文输入法，参数：1-1000：多久检测一次非中文输入法 |
| setSessionStatus(type) | 设置考试状态：type： ongoing、paused；（paused，考试计时暂停） |

## 7. 页面对应css文件说明

| component name       | Description       |
| ------------- | ----------------- |
| global.css  | 全局css文件，可适用任何组件 |
| exam_login.css     | 只适用login组件      |
| exam_sailfish.css     | 只适用答题界面组件（试题展示界面及group intro界面）|










