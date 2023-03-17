<template>
  <!-- 提示信息配置 -->
  <y-form-model-item label="提示信息">
    <div class="flex-item" v-if="placeholder && isSpaceTip">
      <y-checkbox v-model="optionData[placeholderCheck]">占位提示</y-checkbox>
      <y-input
        class="checkbox-input"
        :disabled="!optionData[placeholderCheck]"
        autoWidth
        v-model="optionData[placeholders]"
        placeholder="请输入提示语"
      />
    </div>
    <div class="flex-item" v-if="lightTips">
      <y-checkbox v-model="optionData[lightTipsCheck]">轻提示</y-checkbox>
      <y-input
        :disabled="!optionData[lightTipsCheck]"
        class="checkbox-input"
        autoWidth
        v-model="optionData[lightTipsContent]"
        placeholder="请输入提示语"
      />
    </div>
    <div class="flex-item" v-if="strongTips">
      <y-checkbox v-model="optionData[strongTipsCheck]">强提示</y-checkbox>
      <y-input
        :disabled="!optionData[strongTipsCheck]"
        class="checkbox-input"
        autoWidth
        v-model="optionData[strongTipsContent]"
        placeholder="请输入提示语"
      />
    </div>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'TipsConfig',
  props: {
    placeholder: {
      type: Boolean,
      default: true,
    },
    lightTips: {
      type: Boolean,
      default: true,
    },
    strongTips: {
      type: Boolean,
      default: true,
    },
    placeholderCheck: {
      type: String,
      default: 'placeholderCheck',
    },
    lightTipsCheck: {
      type: String,
      default: 'lightTipsCheck',
    },
    strongTipsCheck: {
      type: String,
      default: 'strongTipsCheck',
    },
    placeholders: {
      type: String,
      default: 'placeholder',
    },
    lightTipsContent: {
      type: String,
      default: 'lightTipsContent',
    },
    strongTipsContent: {
      type: String,
      default: 'strongTipsContent',
    },
    //类型
    type: {
      type: String,
      default: 'input',
    },
  },
  mixins: [mixins],
  computed: {
    //fileupload  workOrderBackfill 上传组件不显示占位提示
    isSpaceTip({ type }) {
      return !['fileupload', 'workOrderBackfill'].includes(type);
    },
  },
};
</script>
