<template>
  <y-form-model-item
    :class="
      formItemData.options.inline === false ? 'yjz-form-generator-combination-item vertical-mode' : 'yjz-form-generator-combination-item'
    "
    v-if="!formItemData.options.hidden"
    :label="formItemData.options.copyName || formItemData.options.name"
    :prop="formItemData.options.model"
  >
    <FormGeneratorItem
      v-model="submitForm2"
      :formItemData="item"
      @updateRequestOptions="(val) => $emit('updateRequestOptions', val)"
      v-for="item in formItemData.list"
      :key="item.options.model"
      :ref="item.key"
      :type="formItemData.options.showChildComponentLabel ? '' : 'noLabel'"
      :class="formItemData.options.showChildComponentLabel ? 'showLabel' : ''"
    />
    <!-- 添加按钮 -->
    <y-button
      v-if="formItemData.options.buttonType && !formItemData.isCopy"
      @click="$emit('clickBtn', formItemData)"
      class="action-button"
      type="primary"
      icon="plus"
    ></y-button>
    <!-- 删除按钮，复制项显示 -->
    <y-button
      class="delete-button no-bg"
      @click="$emit('clickBtn', formItemData)"
      v-if="formItemData.options.buttonType && formItemData.isCopy"
      icon-class="delete-trash"
    ></y-button>
    <!-- 轻提示 -->
    <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
      <y-svg-icon icon-class="warning" />
    </y-tooltip>
  </y-form-model-item>
</template>
<script>
import FormGeneratorItem from './formGeneratorItem.vue';
export default {
  name: 'FormGeneratorCombinationItem',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 表单项
    formItemData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    submitForm: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    FormGeneratorItem,
  },
  computed: {
    submitForm2: {
      get({ submitForm }) {
        return submitForm;
      },
      set(val) {
        this.$emit('update-submitForm', val);
      },
    },
  },
};
</script>
