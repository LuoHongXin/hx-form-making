import moment from 'moment';
export const numberValidate = [
  {
    text: '匹配整数',
    key: 'integer',
    test: function(val) {
      return /^-?[1-9]\d*$/.test(val) || val === 0;
    },
  },
  {
    text: '匹配非零整数',
    key: 'noZerointeger',
    test: function(val) {
      return /^-?[1-9]\d*$/.test(val);
    },
  },
  {
    text: '百整数',
    key: 'hundredInteger',
    test: function(val) {
      return val % 100 === 0;
    },
  },
];
export const inputValidate = [
  {
    text: '浮点数',
    key: 'floating',
    test: function(val) {
      return /^(-?\d+)(\.\d+)?$/.test(val);
    },
  },
  {
    text: '非负数',
    key: 'nonnegative',
    test: function(val) {
      return /^\d+(\.\d+)?$/.test(val);
    },
  },
  {
    text: '非正数',
    key: 'positive',
    test: function(val) {
      return /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/.test(val);
    },
  },
  {
    text: '大于零的数',
    key: 'greaterZero',
    test: function(val) {
      return val - 0 > 0;
    },
  },
  {
    text: '小于零的数',
    key: 'lessZero',
    test: function(val) {
      return val - 0 < 0;
    },
  },
  {
    text: '仅小写字母',
    key: 'letters',
    test: function(val) {
      return /^[a-z]+$/.test(val);
    },
  },
  {
    text: '仅大写字母',
    key: 'capital',
    test: function(val) {
      return /^[A-Z]+$/.test(val);
    },
  },
  {
    text: '仅英文字符',
    key: 'engilsh',
    test: function(val) {
      return /^[A-Za-z]+$/.test(val);
    },
  },
  {
    text: '仅能包含英文字符和数字',
    key: 'engilshAndNum',
    test: function(val) {
      return /^[A-Za-z0-9]+$/.test(val);
    },
  },
  {
    text: '仅中文字符',
    key: 'chinese',
    test: function(val) {
      return /^[\u4e00-\u9fa5]{0,}$/.test(val);
    },
  },
  {
    text: '仅能包含中英文字符',
    key: 'chineseAndEngilsh',
    test: function(val) {
      return /^[\u4E00-\u9FA5A-Za-z]+$/.test(val);
    },
  },
  {
    text: '仅能包含中英文数字下划线',
    key: 'englishNumUnderlined',
    test: function(val) {
      return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(val);
    },
  },
  {
    text: '仅能包含小写英文数字中划线英文句号',
    key: 'lowerEnglishNumStrikethroughPoint',
    test: function(val) {
      return /^[a-z0-9-.]+$/.test(val);
    },
  },
  {
    text: '包含英文数字，以英文字符开头',
    key: 'englishBeginNum',
    test: function(val) {
      return /^[A-Za-z]+[A-Za-z0-9]+$/.test(val);
    },
  },
  {
    text: '邮箱',
    key: 'email',
    test: function(val) {
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
    },
  },
  {
    text: '内地手机号码',
    key: 'phone',
    test: function(val) {
      return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);
    },
  },
  {
    text: '身份证',
    key: 'idCard',
    test: function(val) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
    },
  },
  {
    text: 'QQ号码',
    key: 'qq',
    test: function(val) {
      return /^[1-9][0-9]{4,20}$/.test(val);
    },
  },
  {
    text: 'IP地址',
    key: 'ipAddress',
    test: function(val) {
      return /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/.test(val);
    },
  },
  {
    text: 'url地址',
    key: 'url',
    test: function(val) {
      return !!val.match(
        /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
      );
    },
  },
];
export const dateValidate = [
  {
    text: '所选日期不允许<当前日期',
    key: 'dateLessNotAllow',
    test: function(val) {
      const m = moment();
      return val.date() >= m.date();
    },
  },
  {
    text: '所选日期不允许<=当前日期',
    key: 'dateLessEqualNotAllow',
    test: function(val) {
      const m = moment();
      return val.date() > m.date();
    },
  },
  // {
  //   text: '所选日期允许<当前日期',
  //   key: 'dateLessAllow',
  //   test: function(val) {
  //     const m = moment();
  //     return val.date() < m.date();
  //   },
  // },
  // {
  //   text: '所选日期允许<=当前日期',
  //   key: 'dateLessEqualAllow',
  //   test: function(val) {
  //     const m = moment();
  //     return val.date() <= m.date();
  //   },
  // },
  {
    text: '所选日期+时间不允许<当前日期+时间',
    key: 'dayLessNotAllow',
    test: function(val) {
      const m = moment();
      return val.date() > m.date() || (val.date() === m.date() && val.hours() >= m.hours());
    },
  },
  {
    text: '所选日期+时间不允许<=当前日期+时间',
    key: 'dayLessEqualNotAllow',
    test: function(val) {
      const m = moment();
      return val.date() > m.date() || (val.date() === m.date() && val.hours() > m.hours());
    },
  },
  // {
  //   text: '所选日期+时间允许<当前日期+时间',
  //   key: 'dayLessAllow',
  //   test: function(val) {
  //     const m = moment();
  //     return val.date() < m.date() || (val.date() === m.date() && val.hours() > m.hours());
  //   },
  // },
  // {
  //   text: '所选日期+时间允许<=当前日期+时间',
  //   key: 'dayLessEqualAllow',
  //   test: function(val) {
  //     const m = moment();
  //     return val.date() <= m.date() || (val.date() === m.date() && val.hours() > m.hours());
  //   },
  // },
];
