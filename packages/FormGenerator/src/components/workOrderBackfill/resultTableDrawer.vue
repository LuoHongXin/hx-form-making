<template>
  <y-drawer :title="title" :visible="true" size="xl" @close="cancel">
    <div slot="footer" style="text-align: right">
      <y-button type="primary" @click="cancel"> 确定 </y-button>
    </div>
    <y-model-table :rowSelection="false" :tableHeader="false" :scroll="{ x: true }" :dataSource="tableData" :columns="columns">
    </y-model-table>
  </y-drawer>
</template>
<script>
export default {
  name: 'WorkOrderBackfillResultTable',
  props: {
    title: {
      type: String,
    },
    columns: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  methods: {
    cancel() {
      this.$emit('drawerCtrl', false);
    },
  },
};
</script>
