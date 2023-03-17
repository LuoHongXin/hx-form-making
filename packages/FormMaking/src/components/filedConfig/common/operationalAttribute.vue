<template>
  <!-- 操作属性设置 -->
  <y-form-model-item label="操作属性">
    <a-row>
      <a-col :span="12"><y-checkbox v-model="optionData.hidden"> 隐藏 </y-checkbox></a-col>
      <a-col :span="12" v-if="disabledCheck"><y-checkbox v-model="optionData.disabled"> 禁用 </y-checkbox></a-col>
      <a-col :span="12" v-if="importData"><y-checkbox v-model="optionData.importData"> 导入数据 </y-checkbox></a-col>
      <a-col :span="12" v-if="exportData"><y-checkbox v-model="optionData.exportData"> 导出数据 </y-checkbox></a-col>
      <a-col :span="12" v-if="lineFeed"
        ><y-tooltip>
          <template slot="title">
            <span>选项是否换行，不换行则默认铺满一行，换行则根据内容撑开选项宽度，选项多的情况则会换行</span>
          </template>
          <y-checkbox v-model="optionData.lineFeed">
            <span>换行</span>
          </y-checkbox>
        </y-tooltip></a-col
      >
      <a-col :span="12"
        ><y-tooltip>
          <template slot="title">
            <span>开启后，当前组件受多个组件的逻辑表单控制时，需同时满足逻辑限制才显示。</span>
          </template>
          <y-checkbox v-model="optionData.logicRulesIsAnd">
            <span>且逻辑限制</span>
          </y-checkbox>
        </y-tooltip></a-col
      >
      <a-col :span="24" v-if="shouChildLabel"><y-checkbox v-model="optionData.showChildComponentLabel"> 显示子组件标题 </y-checkbox></a-col>
    </a-row>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'OperationalAttribute',
  mixins: [mixins],
  props: {
    shouChildLabel: {
      type: Boolean,
      default: false,
    },
    // 禁用
    disabledCheck: {
      type: Boolean,
      default: true,
    },
    // 换行
    lineFeed: {
      type: Boolean,
      default: false,
    },
    // 导入数据
    importData: {
      type: Boolean,
      default: false,
    },
    // 导出数据
    exportData: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
