<template>
  <div class="y-form-label-item">
    <y-svg-icon :icon-class="dataObj.icon || ''" style="margin-right: 4px" />
    <span>{{ dataObj.title || '-' }}</span>
  </div>
</template>
<script>
export default {
  name: 'YFormLabelItem',
  props: {
    dataObj: {
      type: Object,
    },
  },
};
</script>
<style lang="less">
.y-form-label-item {
  width: 48%;
  line-height: 20px;
  position: relative;
  padding: 5px 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fafbfc;
  cursor: move;
  margin-bottom: 12px;
}
</style>
