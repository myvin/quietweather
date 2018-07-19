let messages = () => {
  let hour = new Date().getHours()
  switch(hour) {
    case 6:
    case 7:
    case 8:
    case 9:
      return '早上好，这么早就醒了，住的离公司远了吧'
    case 10:
    case 11:
      return '刚到公司？歇会儿吧，等会就该吃饭了'
    case 12:
    case 13:
      return '中午好，如果工作太忙，那就不要吃饭了'
    case 14:
    case 15:
    case 16:
    case 17:
      return '下午好，长时间敲代码，能让你的腰间盘更加突出噢'
    case 18:
    case 19:
      return '还没下班？不要担心，以后这样的日子还多得是呢'
    case 20:
    case 21:
      return '晚上好，赶不上末班车？那就在公司加班到天明吧'
    case 22:
    case 23:
      return '问我见过晚上十一二点的月亮没？没有，我都是凌晨一两点下班'
    case 0:
    case 1:
    case 2:
    case 3:
      return '这个点儿了还在看手机？没有妹子就是好啊'
    case 4:
    case 5:
      return '对不起，我实在是编不下去了...'
  }
}
module.exports = {
  messages,
}