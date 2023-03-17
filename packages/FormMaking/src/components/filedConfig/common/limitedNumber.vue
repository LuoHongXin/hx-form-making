<template>
  <!-- 字数限制设置 -->
  <y-form-model-item label="字数限制">
    <y-checkbox v-model="limitCheck"> 是否字数限制 </y-checkbox>
    <y-input-number style="width: 47%" autoWidth v-model="minNum" :max="maxNum" placeholder="请输入最小值" />
    -
    <y-input-number style="width: 47%" autoWidth v-model="maxNum" :min="minNum" placeholder="请输入最大值" />
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'LimitedNumber',
  mixins: [mixins],
  data() {
    return {
      minNum: 0,
      maxNum: 9,
    };
  },
  computed: {
    limitCheck: {
      get({ optionData }) {
        return optionData.limitCheck || false;
      },
      set(val) {
        this.$set(this.optionData, 'limitCheck', val);
      },
    },
  },
  watch: {
    limitCheck(val) {
      this.updateRule(val);
    },
    minNum() {
      this.debounce(this.updateRule(this.limitCheck), 1000);
    },
    maxNum() {
      this.debounce(this.updateRule(this.limitCheck), 1000);
    },
  },
  methods: {
    updateRule(isAdd) {
      if (isAdd) {
        let flag = true;
        let message = `字数限制在${this.minNum}到${this.maxNum}之间`;
        this.optionData.validator.forEach((item) => {
          // 字数限制校验规则
          if (item.selfKey === 'limitedNumber') {
            item.min = this.minNum;
            item.max = this.maxNum;
            item.message = message;
            flag = false;
          }
        });
        if (flag) {
          this.optionData.validator.push({
            min: this.minNum,
            max: this.maxNum,
            selfKey: 'limitedNumber',
            message,
            trigger: 'blur',
          });
        }
      } else {
        this.$set(
          this.optionData,
          'validator',
          this.optionData.validator.filter((i) => i.selfKey !== 'limitedNumber')
        );
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
  },
};
</script>
