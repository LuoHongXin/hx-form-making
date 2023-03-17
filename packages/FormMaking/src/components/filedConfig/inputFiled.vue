<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 组件标识设置 -->
    <SetModel v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" />

    <!-- 显示单位 -->
    <SuffixInput v-model="optionData" />

    <!-- 显示前缀 -->
    <!-- <y-form-model-item label="显示前缀">
      <y-input style="width: 100%" autoWidth v-model="optionData.prefix" placeholder="请输入前缀，保留为空则不设置" />
    </y-form-model-item> -->

    <!-- 格式校验 -->
    <SetValidate v-model="optionData" />

    <!-- 字数限制 -->
    <LimitedNumber v-model="optionData" />

    <!-- 默认值 -->
    <y-form-model-item label="默认值">
      <y-input style="width: 100%" autoWidth v-model="optionData.defaultValue" placeholder="请输入默认值" />
    </y-form-model-item>

    <y-form-model-item label="必填项">
      <y-radio-group v-model="optionData.required" :radio="false" bodered>
        <y-radio-content :value="true"> 是 </y-radio-content>
        <y-radio-content :value="false"> 否 </y-radio-content>
      </y-radio-group>
    </y-form-model-item>

    <!-- 逻辑表单 -->
    <!-- <SetLogicForm v-model="optionData" /> -->

    <!-- 添加按钮 -->
    <AddButton v-model="optionData" />

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
import AddButton from './common/addButton';
import SetItemWidth from './common/setItemWidth';
import SetTitle from './common/setTitle';
import SetModel from './common/setModel';
// import SetLogicForm from './common/setLogicForm';
import LimitedNumber from './common/limitedNumber';
import OperationalAttribute from './common/operationalAttribute';
import SetWidth from './common/setWidth';
import SuffixInput from './common/suffixInput';
import SetValidate from './common/setValidate';

export default {
  name: 'InputFiled',
  components: {
    TipsConfig,
    AddButton,
    SetItemWidth,
    SetTitle,
    SetModel,
    // SetLogicForm,
    LimitedNumber,
    OperationalAttribute,
    SetWidth,
    SuffixInput,
    SetValidate,
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
