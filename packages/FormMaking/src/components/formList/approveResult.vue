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
      :label="type !== 'noLabel' ? formItemData.options.name : ''"
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
  name: 'ApproveResult',
  props: {
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
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
  },
  computed: {
    // 可显示的选项
    optionsData({ formItemData }) {
      return formItemData.options.options.filter(i => {
        return i.check !== false;
      });
    },
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
  },
};
</script>
