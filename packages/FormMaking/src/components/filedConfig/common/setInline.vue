<template>
  <!-- 排序方式设置 -->
  <y-form-model-item label="排序方式">
    <y-radio-group v-model="optionData.inline" :radio="false" bodered>
      <y-radio-content :value="true"> 横向排布 </y-radio-content>
      <y-radio-content :value="false"> 纵向排布 </y-radio-content>
    </y-radio-group>
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
