<template>
  <div class="yjz-filed-config">
    <div class="title">组件属性配置</div>
    <div class="config-form">
      <!-- 表格 -->
      <TableFiled v-if="operateFormItem.type === 'table'" :operateFormItem="operateFormItem" v-model="optionData" />

      <!-- 表格下拉框配置 -->
      <TableSelectFiled v-else-if="operateFormItem.type === 'select' && operateFormItem.parentType === 'table'" v-model="optionData" />

      <!-- 单行文本配置 -->
      <TableInputFiled v-else-if="operateFormItem.type === 'input' && operateFormItem.parentType === 'table'" v-model="optionData" />

      <!-- 下拉框配置 -->
      <SelectFiled v-else-if="operateFormItem.type === 'select'" v-model="optionData" />

      <!-- 单选框配置 -->
      <RadioFiled v-else-if="operateFormItem.type === 'radio'" v-model="optionData" />

      <!-- 复选框配置 -->
      <CheckboxFiled v-else-if="operateFormItem.type === 'checkbox'" v-model="optionData" />

      <!-- 计数器配置 -->
      <NumberFiled v-else-if="operateFormItem.type === 'number'" v-model="optionData" />

      <!-- 单行文本配置 -->
      <InputFiled v-else-if="operateFormItem.type === 'input'" v-model="optionData" />

      <!-- 多行文本配置 -->
      <TextareaFiled v-else-if="operateFormItem.type === 'textarea'" v-model="optionData" />

      <!-- 日期配置 -->
      <DateFiled v-else-if="operateFormItem.type === 'date'" v-model="optionData" />

      <!-- 起止时间配置 -->
      <DateRangeFiled v-else-if="operateFormItem.type === 'dateRange'" v-model="optionData" />

      <!-- 组合组件配置 -->
      <CombinationFiled v-else-if="operateFormItem.type === 'combination'" v-model="optionData" />

      <!-- 上传附件配置 -->
      <FileuploadFiled v-else-if="operateFormItem.type === 'fileupload'" v-model="optionData" />

      <!-- 开关配置 -->
      <SwitchFiled v-else-if="operateFormItem.type === 'switch'" v-model="optionData" />

      <!-- 办理意见配置 -->
      <ClassicOpinionFiled v-else-if="operateFormItem.type === 'opinion'" v-model="optionData" />

      <!-- 印章名称 -->
      <ElectricSealNameFiled v-else-if="operateFormItem.type === 'electricSealName'" v-model="optionData" />

      <!-- 工单回填 -->
      <WorkOrderBackfillFiled v-else-if="operateFormItem.type === 'workOrderBackfill'" v-model="optionData" />

      <!-- 指派实施组 -->
      <DesignateFiled v-else-if="operateFormItem.type === 'designate'" v-model="optionData" />

      <!-- 审核结果 -->
      <ApproveResultFiled v-else-if="operateFormItem.type === 'approveResult'" v-model="optionData" />

      <!-- 标题 -->
      <LayoutTitleFiled v-else-if="operateFormItem.type === 'layoutTitle'" v-model="optionData" />

      <!-- 分割线 -->
      <LayoutDividerFiled v-else-if="operateFormItem.type === 'layoutDivider'" v-model="optionData" />
    </div>
  </div>
</template>
<script>
import SelectFiled from './filedConfig/selectFiled';
import CombinationFiled from './filedConfig/combinationFiled';
import RadioFiled from './filedConfig/radioFiled';
import CheckboxFiled from './filedConfig/checkboxFiled';
import NumberFiled from './filedConfig/numberFiled';
import InputFiled from './filedConfig/inputFiled';
import DateFiled from './filedConfig/dateFiled';
import DateRangeFiled from './filedConfig/dateRangeFiled';
import TextareaFiled from './filedConfig/textareaFiled';
import FileuploadFiled from './filedConfig/fileuploadFiled';
import SwitchFiled from './filedConfig/switchFiled';
import ClassicOpinionFiled from './filedConfig/classicOpinionFiled';
import ElectricSealNameFiled from './filedConfig/electricSealNameFiled';
import WorkOrderBackfillFiled from './filedConfig/workOrderBackfillFiled';
import DesignateFiled from './filedConfig/designateFiled';
import ApproveResultFiled from './filedConfig/approveResultFiled';
import TableFiled from './filedConfig/tableFiled';
import TableInputFiled from './filedConfig/tableInputFiled';
import TableSelectFiled from './filedConfig/tableSelectFiled';
import LayoutTitleFiled from './filedConfig/layoutTitleFiled';
import LayoutDividerFiled from './filedConfig/layoutDividerFiled';

import Bus from '../Bus';
export default {
  name: 'FiledConfig',
  components: {
    SelectFiled,
    CombinationFiled,
    RadioFiled,
    CheckboxFiled,
    NumberFiled,
    InputFiled,
    DateFiled,
    DateRangeFiled,
    TextareaFiled,
    FileuploadFiled,
    SwitchFiled,
    ClassicOpinionFiled,
    ElectricSealNameFiled,
    WorkOrderBackfillFiled,
    DesignateFiled,
    ApproveResultFiled,
    TableFiled,
    TableInputFiled,
    TableSelectFiled,
    LayoutTitleFiled,
    LayoutDividerFiled,
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
    // 选中正在操作的表单项
    operateFormItem: {
      type: Object,
    },
  },
  watch: {
    // 更新Bus中正在操作的表单项
    operateFormItem: {
      handler(val) {
        Bus.updateOperateFormItem(val);
      },
      immediate: true,
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
<style lang="less">
.yjz-filed-config {
  .flex-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .checkbox-input {
      width: 135px;
    }
  }
}
</style>
