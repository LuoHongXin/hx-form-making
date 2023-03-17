<template>
  <!-- 必填项设置 -->
  <y-form-model-item :label="label || '必填项'">
    <y-radio-group v-model="optionData[required]" :radio="false" bodered>
      <y-radio-content :value="true"> 是 </y-radio-content>
      <y-radio-content :value="false"> 否 </y-radio-content>
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
    required: {
      type: String,
      default: 'required',
    },
  },
};
</script>
