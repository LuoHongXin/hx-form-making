<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden">
    <y-form-model-item
      :prop="formItemData.options.model"
      :label="formItemData.options.name"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <!-- 印章名称 -->
      <y-input
        :style="{ ...widthStyle }"
        autoWidth
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        :prefix="formItemData.options.prefix"
        :suffix="formItemData.options.suffix"
        :placeholder="getPlaceHolder(formItemData)"
      />
      <!-- 轻提示 -->
      <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>

      <!-- 强提示 -->
      <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
        {{ formItemData.options.strongTipsContent }}
      </div>
    </y-form-model-item>
  </div>
</template>
<script>
export default {
  name: 'FormGeneratorElectricSealName',
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
  data() {
    return {
      modelValue: '',
    };
  },
  watch: {
    'formItemData.options.defaultValue': {
      handler(val) {
        this.modelValue = val;
      },
      immediate: true,
    },
    modelValue(val) {
      this.updateSubmitForm(val);
    },
  },
  computed: {
    getPlaceHolder() {
      return function (obj) {
        if (obj.options.placeholderCheck) {
          return obj.options.placeholder;
        }
        return '';
      };
    },
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
  methods: {
    // 更新表单提交数据
    updateSubmitForm(val) {
      const obj = { ...this.submitForm };
      obj[this.formItemData.options.model] = val;
      this.$emit('update-submitForm', obj);
    },
  },
};
</script>
