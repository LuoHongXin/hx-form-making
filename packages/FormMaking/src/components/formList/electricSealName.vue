<template>
  <div class="mk-form-item drag-form-item">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
    <y-form-model-item
      :required="formItemData.options.required"
      :prop="formItemData.options.model"
      :rules="rules"
      :label="type !== 'noLabel' ? formItemData.options.name : ''"
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
import Api from '@api';
export default {
  name: 'ElectricSealName',
  props: {
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
  data() {
    const validator = (rule, value, callBack) => {
      Api.checkSealName(this.modelValue).then(res => {
        if (res.code === 201063) {
          callBack(this.formItemData.options.name + '已存在');
        } else {
          callBack();
        }
      });
    };
    return {
      modelValue: '',
      rules: { validator, trigger: 'blur' },
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
      let o = { 'min-width': '100%' };
      if (formItemData.options.lightTipsCheck || formItemData.options.buttonType) o = {};
      if (formItemData.options.width) {
        return {
          flex: 'unset',
          width: formItemData.options.width,
          ...o,
        };
      }
      return o;
    },
  },
};
</script>
