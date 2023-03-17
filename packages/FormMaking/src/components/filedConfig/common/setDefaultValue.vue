<template>
  <y-form-model-item label="默认值" class="set-default-value">
    <!-- <y-link-tag v-if="isChck" :data="optionsData" v-model="checkBoxValue" /> -->
    <y-select mode="multiple" autoWidth v-if="isChck" :options="optionsData" v-model="optionData.defaultValue"></y-select>
    <y-select v-else autoWidth showSearch v-model="optionData.defaultValue" :filter-option="filterOption" :options="optionsData"></y-select>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'SetDefaultValue',
  mixins: [mixins],
  computed: {
    // 判断默认值是否复选
    isChck({ optionData }) {
      return Array.isArray(optionData.defaultValue) || optionData.multiple;
    },
    // 复选值
    // checkBoxValue: {
    //   get({ optionData }) {
    //     return optionData.defaultValue.join();
    //   },
    //   set(val) {
    //     this.$set(this.optionData, 'defaultValue', val.split(','));
    //   },
    // },
    optionsData({ optionData, isChck }) {
      let arr = optionData.options.concat([
        {
          label: '默认选项第一个',
          value: 'choseFirstOne',
        },
        {
          label: '默认不选',
          value: 'noChose',
        },
      ]);
      arr = arr.filter(i => {
        if (optionData.hideOptions && !optionData.hideOptions.includes(i.value)) {
          if (isChck) {
            if (!optionData.defaultValue) optionData.defaultValue = [];
            if (optionData.defaultValue.includes('choseFirstOne')) {
              i.disabled = i.value !== 'choseFirstOne';
            } else if (optionData.defaultValue.includes('noChose')) {
              i.disabled = i.value !== 'noChose';
            } else {
              if (optionData.defaultValue.length) {
                i.disabled = ['noChose', 'choseFirstOne'].includes(i.value) ? true : false;
              } else {
                i.disabled = false;
              }
            }
          } else {
            i.disabled = false;
          }
          return true;
        }
      });
      return arr;
    },
  },
  data() {
    return {
      // 单选搜索过滤选项
      filterOption: (input, option) => {
        return (
          option.componentOptions.children[0].componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    };
  },
};
</script>
<style lang="less">
.set-default-value {
  .y-tag-item {
    margin-right: 0;
    text-align: center;
  }
}
</style>
