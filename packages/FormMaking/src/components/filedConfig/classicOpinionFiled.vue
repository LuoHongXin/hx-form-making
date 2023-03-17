<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <y-form-model-item label="审批用语名称">
      <y-input autoWidth v-model="optionData.name2" placeholder="请输入审批用语名称" />
    </y-form-model-item>
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" label="办理意见名称" />

    <!-- 组件标识设置 -->
    <!-- <y-form-model-item label="办理意见的组件标识">
      <y-input autoWidth v-model="optionData.model" placeholder="请输入组件标识" />
    </y-form-model-item> -->

    <!-- 组件标识设置 -->
    <!-- <y-form-model-item label="审批用语的组件标识">
      <y-input autoWidth v-model="optionData.model2" placeholder="请输入组件标识" />
    </y-form-model-item> -->

    <!-- 提示信息 -->
    <TipsConfig v-model="optionData" />
    <!-- 自定义选项 -->
    <!-- <y-form-model-item label="审批用语选项内容">
      <draggable
        v-bind="{
          group: { name: 'inputOptionGroup' },
        }"
        :sort="true"
        draggable=".input-option"
        v-model="optionData.options"
      >
        <div class="input-option" v-for="(item, index) in optionData.options" :key="index">
          <y-input autoWidth placeholder="编辑选项值" v-model="item.value" />
          <a-icon type="delete" @click="deleteCustomOptions(index)" />
          <y-svg-icon icon-class="dragLine" class-name="line" />
        </div>
      </draggable>
      <y-button style="width: 100%" @click="addCustomOptions" icon="plus" type="dashed">添加新选项</y-button>
    </y-form-model-item> -->

    <!-- 字数限制 -->
    <!-- <y-form-model-item label="字数限制">
      <y-input-number style="width: 100%" :min="0" autoWidth v-model="optionData.maxLength" placeholder="请输入字数限制" />
    </y-form-model-item> -->
    <LimitedNumber v-model="optionData" />

    <!-- 默认值 -->
    <!-- <y-form-model-item label="办理意见默认值">
      <y-input style="width: 100%" autoWidth v-model="optionData.defaultValue" placeholder="请输入默认值" />
    </y-form-model-item> -->

    <y-form-model-item label="办理意见必填项">
      <y-radio-group v-model="optionData.required" :radio="false" bodered>
        <y-radio-content :value="true"> 是 </y-radio-content>
        <y-radio-content :value="false"> 否 </y-radio-content>
      </y-radio-group>
    </y-form-model-item>

    <!-- <y-form-model-item label="审批用语选择类型">
      <y-radio-group v-model="optionData.isCheck" :radio="false" bodered>
        <y-radio-content :value="true"> 多选</y-radio-content>
        <y-radio-content :value="false"> 单选 </y-radio-content>
      </y-radio-group>
    </y-form-model-item> -->
    <!-- 逻辑表单 -->
    <!-- <SetLogicForm v-model="optionData" /> -->

    <!-- 布局宽度占比 -->
    <!-- <SetItemWidth v-model="optionData" /> -->

    <!-- 宽度 -->
    <SetWidth v-model="optionData" />

    <!-- 操作属性 -->
    <OperationalAttribute lineFeed v-model="optionData" />
  </y-form-model>
</template>
<script>
// import draggable from 'vuedraggable';
import TipsConfig from './common/tipsConfig';
// import SetItemWidth from './common/setItemWidth';
import SetTitle from './common/setTitle';
import LimitedNumber from './common/limitedNumber';
// import SetLogicForm from './common/setLogicForm';
import OperationalAttribute from './common/operationalAttribute';
import SetWidth from './common/setWidth';
export default {
  name: 'ClassicOpinionFiled',
  components: {
    // draggable,
    TipsConfig,
    // SetItemWidth,
    SetTitle,
    LimitedNumber,
    // SetLogicForm,
    OperationalAttribute,
    SetWidth,
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
  methods: {
    // 自定义新增选项
    addCustomOptions() {
      const options = this.optionData.options;
      options.push({ value: '' });
      this.$set(this.optionData, 'options', options);
    },
    deleteCustomOptions(index) {
      let options = this.optionData.options;
      options = options.filter((i, idx) => {
        return idx !== index;
      });
      this.$set(this.optionData, 'options', options);
    },
  },
};
</script>
