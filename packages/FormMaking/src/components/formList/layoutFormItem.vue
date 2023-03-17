<template>
  <div class="mk-form-item drag-form-item">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
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
  name: 'LayoutFormItem',
  props: {
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
};
</script>
