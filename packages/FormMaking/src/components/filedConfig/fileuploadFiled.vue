<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 组件标识设置 -->
    <SetModel v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" type="fileupload" />

    <y-form-model-item label="限制上传大小">
      <y-input-number class="limit-input" :min="0" autoWidth v-model="optionData.limitSize" placeholder="限制上传大小" />
      <span>MB</span>
    </y-form-model-item>
    <y-form-model-item label="限制上传个数">
      <y-input-number class="limit-input" :min="0" autoWidth v-model="optionData.limit" placeholder="限制上传个数" />
      <span>个</span>
    </y-form-model-item>
    <y-form-model-item label="限制上传文件类型">
      <y-input style="width: 100%" autoWidth v-model="optionData.accept" placeholder="例：.png,.jpg,.jpeg,.doc" />
    </y-form-model-item>
    <y-form-model-item label="文件业务类型">
      <y-select autoWidth v-model="optionData.fileType" :options="fileTypeOptions"></y-select>
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
    <!-- <SetWidth v-model="optionData" /> -->

    <!-- 操作属性 -->
    <OperationalAttribute v-model="optionData" />
  </y-form-model>
</template>
<script>
import TipsConfig from './common/tipsConfig';
// import AddButton from './common/addButton';
import SetItemWidth from './common/setItemWidth';
// import SetWidth from './common/setWidth';
import SetTitle from './common/setTitle';
import SetModel from './common/setModel';
// import SetLogicForm from './common/setLogicForm';
import OperationalAttribute from './common/operationalAttribute';

export default {
  name: 'InputFiled',
  components: {
    TipsConfig,
    // AddButton,
    SetItemWidth,
    SetTitle,
    SetModel,
    // SetLogicForm,
    // SetWidth,
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
  data() {
    return {
      fileTypeOptions: [
        {
          label: '订单项文件',
          value: '1',
        },
        {
          label: '创建工单文件',
          value: '2',
        },
        {
          label: '处理工单文件',
          value: '3',
        },
        {
          label: '电子印章文件',
          value: '4',
        },
        {
          label: '实施回填文件',
          value: '5',
        },
      ],
    };
  },
};
</script>
<style lang="less">
.select-filed {
  .limit-input {
    width: 85%;
    margin-right: 4px;
  }
}
</style>
