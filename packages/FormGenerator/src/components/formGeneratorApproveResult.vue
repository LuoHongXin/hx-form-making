<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden">
    <y-form-model-item
      :prop="formItemData.options.model"
      :label="formItemData.options.name"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <!-- 单选框 -->
      <y-radio-group
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        autoWidth
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        :radio="false"
        bodered
      >
        <y-radio-content v-for="item in optionsData" :key="item.value" :value="item.value">
          {{ item.label || item.value }}
        </y-radio-content>
      </y-radio-group>
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
  name: 'FormGeneratorApproveResult',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 提交表单的数据
    submitForm: {
      type: Object,
      default: function() {
        return {};
      },
    },
    // 表单项
    formItemData: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      initOptions: this.formItemData.options.options || [], // 初始化表单选项
    };
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
    getPlaceHolder() {
      return function(obj) {
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
    modelValue: {
      get({ submitForm, formItemData }) {
        // 注意避免选项还没请求回来就被设undefined了
        // 默认选第一个且选项是自定义，即选项不会变的
        if (submitForm[formItemData.options.model] === 'choseFirstOne' && formItemData.options.remoteType === 'custom') {
          const val = this.optionsData[0] ? this.optionsData[0].value : undefined;
          this.updateSubmitForm(val);
          return val;
        } else if (submitForm[formItemData.options.model] === 'noChose') {
          this.updateSubmitForm(undefined);
          return undefined;
        }
        return submitForm[formItemData.options.model];
      },
      set(val) {
        this.updateSubmitForm(val);
      },
    },
    // 可显示的选项
    optionsData({ formItemData, initOptions }) {
      return initOptions.filter(i => {
        if (formItemData.options.hideOptions) {
          return !formItemData.options.hideOptions.includes(i.value) && i.check !== false;
        }
      });
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
