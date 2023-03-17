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
      <y-button type="default" v-if="formItemData.options.downloadTmplCheck" style="margin-right: 8px">{{
        formItemData.options.downloadTmplText
      }}</y-button>
      <a-upload
        accept=".xlsx"
        v-if="formItemData.options.uploadOrderCheck"
        style="display: inline-block"
        :beforeUpload="beforeUpload"
        :fileList="[]"
        :multiple="false"
      >
        <y-button type="default" style="margin-right: 8px">{{ formItemData.options.uploadOrderText }}</y-button>
      </a-upload>
      <y-button type="default" v-if="formItemData.options.viewResultCheck" style="margin-right: 8px">{{
        formItemData.options.viewResultText
      }}</y-button>
      <y-button type="default" v-if="formItemData.options.downloadResultCheck" style="margin-right: 8px">{{
        formItemData.options.downloadResultText
      }}</y-button>
    </y-form-model-item>
    <!-- 轻提示 -->
    <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
      <y-svg-icon icon-class="warning" />
    </y-tooltip>

    <!-- 强提示 -->
    <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
      {{ formItemData.options.strongTipsContent }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'WorkOrderBackfill',
  props: {
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
  methods: {
    beforeUpload(file) {
      if (file.name.slice(file.name.lastIndexOf('.')) !== '.xlsx') {
        this.$YMessage.error('仅支持xlsx文件');
        return false;
      }
    },
  },
};
</script>
