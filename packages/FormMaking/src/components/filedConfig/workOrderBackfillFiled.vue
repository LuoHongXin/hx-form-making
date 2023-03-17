<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" type="workOrderBackfill" />

    <y-form-model-item label="工单回填类型">
      <!-- <y-radio-group v-model="optionData.flowState" :radio="false" bodered>
        <y-radio-content value="implement"> 实施 </y-radio-content>
        <y-radio-content value="backupImplement"> 备份 </y-radio-content>
      </y-radio-group> -->
      <y-select v-model="optionData.flowState" :options="flowStateOptions"></y-select>
    </y-form-model-item>

    <y-form-model-item label="按钮显示">
      <div>
        <y-checkbox v-model="optionData.downloadTmplCheck">下载模板</y-checkbox>
        <y-input
          class="checkbox-input"
          :disabled="!optionData.downloadTmplCheck"
          autoWidth
          v-model="optionData.downloadTmplText"
          placeholder="请输入下载模板按钮文字"
        />
      </div>
      <div>
        <y-checkbox v-model="optionData.uploadOrderCheck">上传工单</y-checkbox>
        <y-input
          :disabled="!optionData.uploadOrderCheck"
          class="checkbox-input"
          autoWidth
          v-model="optionData.uploadOrderText"
          placeholder="请输入上传工单文字"
        />
      </div>
      <div>
        <y-checkbox v-model="optionData.viewResultCheck">查看回填结果</y-checkbox>
        <y-input
          :disabled="!optionData.viewResultCheck"
          class="checkbox-input"
          autoWidth
          v-model="optionData.viewResultText"
          placeholder="请输入查看回填结果文字"
        />
      </div>
      <div>
        <y-checkbox v-model="optionData.downloadResultCheck">下载回填结果</y-checkbox>
        <y-input
          :disabled="!optionData.downloadResultCheck"
          class="checkbox-input"
          autoWidth
          v-model="optionData.downloadResultText"
          placeholder="请输入下载回填结果文字"
        />
      </div>
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
    <!-- <AddButton v-model="optionData" /> -->

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
// import AddButton from './common/addButton';
import SetItemWidth from './common/setItemWidth';
import SetTitle from './common/setTitle';
// import SetLogicForm from './common/setLogicForm';
import SetWidth from './common/setWidth';
import OperationalAttribute from './common/operationalAttribute';
import Api from '@api';
export default {
  name: 'WorkOrderBackfillFiled',
  components: {
    TipsConfig,
    // AddButton,
    SetItemWidth,
    SetTitle,
    // SetLogicForm,
    SetWidth,
    OperationalAttribute,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  watch: {
    'optionData.flowState': {
      handler(val) {
        // 工单回填标识根据回填类型区分
        this.$set(this.optionData, 'model', this.optionData.model.split('_')[0] + '_' + val);
      },
      immediate: true,
    },
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
  created() {
    this.getWorkflowNodes();
  },
  data() {
    return {
      flowStateOptions: [],
    };
  },
  methods: {
    getWorkflowNodes() {
      Api.getWorkflowNodes().then(res => {
        let arr = [];
        res.forEach(item => {
          if (item.formKey.indexOf('implement') > -1 || item.formKey.indexOf('Implement') > -1) {
            arr.push({
              label: item.name,
              value: item.formKey,
            });
          }
        });
        this.flowStateOptions = arr;
      });
    },
  },
};
</script>
