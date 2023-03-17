<template>
  <div class="mk-form-item drag-form-item mk-table-item" :style="formItemstyle">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
    <y-table :columns="columns" :data-source="tableData" :pagination="false">
      <template slot="mkFormItem">
        <MkFormItem type="noLabel" :formItemData="formItemData" />
      </template>
    </y-table>
  </div>
</template>
<script>
import MkFormItem from './mkFormItem';
export default {
  name: 'TableItem',
  props: {
    formItemData: {
      type: Object,
    },
  },
  components: {
    MkFormItem,
  },
  computed: {
    tableData({ formItemData }) {
      return [{ ...formItemData }];
    },
    columns({ formItemData }) {
      return [
        {
          title: formItemData.options.name,
          dataIndex: formItemData.options.model,
          scopedSlots: { customRender: 'mkFormItem' },
        },
      ];
    },
    // 组合组件情况下，计数器等宽度不要自动撑开，以后有组合组件
    formItemstyle({ formItemData }) {
      if (['number', 'switch'].includes(formItemData.type)) {
        return {
          flex: 'unset',
        };
      }
      return {};
    },
  },
};
</script>
