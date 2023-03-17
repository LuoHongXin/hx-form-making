<template>
  <y-form-model-item class="suffix-input">
    <span slot="label"> 显示单位 </span>
    <y-input autoWidth style="width: 100%" v-model="optionData.suffix" placeholder="请输入单位，保留为空则不设置" />
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'SuffixInput',
  mixins: [mixins],
};
</script>
<style lang="less">
.suffix-input {
  .ant-input-affix-wrapper .ant-input:not(:last-child) {
    padding-right: 0;
  }
}
</style>
