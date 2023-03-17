<template>
  <!-- 组件标识设置 -->
  <y-form-model-item :label="label || '组件标识'">
    <y-input autoWidth v-model="optionData.model" placeholder="请输入组件标识" />
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'SetTitle',
  mixins: [mixins],
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>
