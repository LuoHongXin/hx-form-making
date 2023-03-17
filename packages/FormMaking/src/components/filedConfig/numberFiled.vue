<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 组件标识设置 -->
    <SetModel v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" />

    <y-form-model-item label="显示单位" class="suffix-input">
      <y-input autoWidth v-model="optionData.formatter" placeholder="请输入单位，保留为空则不设置" />
    </y-form-model-item>

    <!-- 格式校验 -->
    <SetValidate v-model="optionData" />

    <y-form-model-item label="步长设置">
      <y-input-number style="width: 100%" autoWidth v-model="optionData.step" placeholder="请输入步长" />
    </y-form-model-item>

    <y-form-model-item label="限制数值范围">
      <y-input-number style="width: 47%" autoWidth v-model="optionData.min" placeholder="请输入最小值" />
      -
      <y-input-number style="width: 47%" autoWidth v-model="optionData.max" placeholder="请输入最大值" />
    </y-form-model-item>

    <!--  是否开启同组件标识计数器的数值总和 -->
    <y-form-model-item>
      <span slot="label"
        >限制数值总和<y-tooltip title="自增情况下同组件标识计数器的数值总和的最大限制" style="margin-left: 8px">
          <a-icon type="info-circle" /> </y-tooltip
      ></span>
      <div class="flex-item">
        <y-checkbox v-model="optionData.sumTotalCheck">开启</y-checkbox>
        <y-input-number class="checkbox-input" autoWidth v-model="optionData.sumTotal" placeholder="请输入数值总和" />
      </div>
    </y-form-model-item>

    <y-form-model-item label="默认值">
      <y-input-number style="width: 100%" autoWidth v-model="optionData.defaultValue" placeholder="请输入默认值" />
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

    <!-- 费用 -->
    <SetBilling v-model="optionData" />
  </y-form-model>
</template>
<script>
import TipsConfig from './common/tipsConfig';
import AddButton from './common/addButton';
import SetTitle from './common/setTitle';
import SetModel from './common/setModel';
// import SetLogicForm from './common/setLogicForm';
import SetItemWidth from './common/setItemWidth';
import OperationalAttribute from './common/operationalAttribute';
import SetWidth from './common/setWidth';
import SetValidate from './common/setValidate';
import SetBilling from './common/setBilling';
export default {
  name: 'SelectFiled',
  components: {
    TipsConfig,
    AddButton,
    SetTitle,
    SetModel,
    // SetLogicForm,
    SetItemWidth,
    OperationalAttribute,
    SetWidth,
    SetValidate,
    SetBilling,
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
