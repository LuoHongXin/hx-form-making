/*
    格式校验配置
*/
// import { numberValidate, inputValidate, dateValidate } from '@src/utils/validateData';
export default {
  watch: {
    modelValue: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          //   this.debounce(this.setNumberValidate, 1000)();
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 失去焦点触发自动规范校验
    onValidateBlur() {
      if (this.formItemData.type === 'number') {
        this.$nextTick(function() {
          this.setNumberValidate();
        });
      }
    },
    debounce(f, wait) {
      return (...args) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          f(...args);
        }, wait);
      };
    },
    // 设置计数器格式校验
    setNumberValidate() {
      const validaeKey = this.formItemData.options.validaeFormatterKey;
      let val = this.modelValue;
      if (val) {
        if (validaeKey === 'integer') {
          // 整数
          val = (val + '').split('.')[0] - 0;
        } else if (validaeKey === 'noZerointeger') {
          // 非零整数
          val = (val + '').split('.')[0] - 0;
          if (val === 0) {
            val = 1;
          }
        } else if (validaeKey === 'hundredInteger') {
          // 百整数
          val = (val + '').split('.')[0] - 0;
          val = Math.ceil(val / 100) * 100;
        }
      }
      this.modelValue = val;
    },
  },
};
