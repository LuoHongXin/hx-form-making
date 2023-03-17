<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />
    <!-- 操作属性 -->
    <OperationalAttribute v-model="optionData" :disabledCheck="false" />
  </y-form-model>
</template>
<script>
import SetTitle from './common/setTitle';
import OperationalAttribute from './common/operationalAttribute';

export default {
  name: 'LayoutDividerFiled',
  components: {
    SetTitle,
    OperationalAttribute,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    optionData: {
      get({ data }) {
        return data;
      },
      set(val) {
        this.$emit('update-data', val);
      },
    },
  },
};
</script>
