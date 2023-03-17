<template>
  <!-- 组件名称设置 -->
  <y-form-model-item :label="label || '组件名称'">
    <y-input autoWidth v-model="optionData.name" placeholder="请输入组件名称" />
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
