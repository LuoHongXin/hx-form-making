<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" :placeholder="false" />

    <y-form-model-item label="按钮显示">
      <div class="flex-item" v-for="item in optionData.options" :key="item.value">
        <y-checkbox v-model="item.check">{{ item.text }}</y-checkbox>
        <y-input class="checkbox-input" :disabled="!item.check" autoWidth v-model="item.label" placeholder="请输入" />
      </div>
    </y-form-model-item>
    <!-- 默认值 -->
    <SetDefaultValue v-model="optionData" />

    <y-form-model-item label="必填项">
      <y-radio-group v-model="optionData.required" :radio="false" bodered>
        <y-radio-content :value="true"> 是 </y-radio-content>
        <y-radio-content :value="false"> 否 </y-radio-content>
      </y-radio-group>
    </y-form-model-item>

    <!-- 逻辑表单 -->
    <SetLogicForm v-model="optionData" />

    <!-- 布局宽度占比 -->
    <SetItemWidth v-model="optionData" />

    <!-- 宽度 -->
    <SetWidth v-model="optionData" />

    <!-- 操作属性 -->
    <OperationalAttribute v-model="optionData" />
  </y-form-model>
</template>
<script>
import TipsConfig from './common/tipsConfig';
import SetItemWidth from './common/setItemWidth';
import SetTitle from './common/setTitle';
import SetDefaultValue from './common/setDefaultValue';
import SetWidth from './common/setWidth';
import SetLogicForm from './common/setLogicForm';
import OperationalAttribute from './common/operationalAttribute';
export default {
  name: 'ApproveResultFiled',
  components: {
    TipsConfig,
    SetItemWidth,
    SetTitle,
    SetDefaultValue,
    SetWidth,
    SetLogicForm,
    OperationalAttribute,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  props: {
    data: {
      type: Object,
      default: function() {
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
