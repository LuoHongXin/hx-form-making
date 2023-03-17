<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden">
    <div class="yjz-layout-content">
      <div v-if="formItemData.type === 'layoutTitle'" class="yjz-layout-title">{{ formItemData.options.name }}</div>
      <y-divider v-if="formItemData.type === 'layoutDivider'" />
      <!-- 轻提示 -->
      <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>
    </div>

    <!-- 强提示 -->
    <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
      {{ formItemData.options.strongTipsContent }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormGeneratorLayoutItem',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 提交表单的数据
    submitForm: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 表单项
    formItemData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    'formItemData.options.defaultValue': {
      handler(val) {
        this.modelValue = val;
      },
      immediate: true,
    },
  },
  computed: {
    // 宽度样式
    widthStyle({ formItemData }) {
      if (formItemData.options.width) {
        return {
          flex: 'unset',
          width: formItemData.options.width,
        };
      }
      return {};
    },
  },
};
</script>
