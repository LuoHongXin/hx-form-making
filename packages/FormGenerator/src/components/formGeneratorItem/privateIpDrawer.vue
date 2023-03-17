<template>
  <y-drawer :title="title" :visible="true" size="m" @close="cancel">
    <div slot="footer" style="text-align: right">
      <y-button type="primary" @click="submit"> 确定 </y-button>
    </div>
    <ServiceTreeSelect class="yjz-service-tree-select" @fresh="fresh" v-model="resourceType" />
    <y-model-table
      searchPlaceholder="请输入关键字搜索"
      :setting="false"
      :tableHeader="{ left: false }"
      :scroll="{ x: true }"
      :api="getTableData"
      rowKey="uuid"
      :columns="columns"
      :immediately="false"
      :extraParams="extraParams"
      :handleResponse="handleResponse"
      :paramsKeyFilter="paramsKeyFilter"
      paginationType="mini"
      :rowSelection="rowSelection"
      v-model="selectedData"
      :modelKeys.sync="selectedDataKeys"
      ref="tableInstance"
    >
    </y-model-table>
  </y-drawer>
</template>
<script>
import Api from '@api';
import Bus from '../../Bus';
import ServiceTreeSelect from './privateIpDrawer/serviceTreeSelect.vue';
const columns = [
  {
    title: '虚拟主机',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '业务私网地址',
    dataIndex: 'businessPrivateIp',
    ellipsis: true,
  },
];
export default {
  name: 'PrivateIpDrawer',
  components: {
    ServiceTreeSelect,
  },

  props: {
    tableData: {
      type: Array,
    },
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
  computed: {
    rowSelection({ formItemData }) {
      return {
        type: formItemData.options.multiple ? 'checkbox' : 'radio',
      };
    },
    modelValue({ formItemData, submitForm }) {
      return submitForm[formItemData.options.model];
    },
  },
  watch: {
    resourceType: {
      handler(resourceType, oldVal) {
        this.extraParams = {
          resourceType,
          ...Bus.metaData,
        };
        if (oldVal && oldVal !== resourceType) {
          this.selectedDataKeys = [];
          this.selectedData = [];
        }
        this.$nextTick(function () {
          if (this.$refs.tableInstance) {
            this.$refs.tableInstance.freshTable();
          }
        });
      },
    },
  },
  created() {
    // 回显选中数据
    const modelValue = this.modelValue;
    if (modelValue && Array.isArray(modelValue)) {
      // 多选
      this.selectedDataKeys = modelValue.map((i) => i.uuid);
      this.selectedData = modelValue;
      this.resourceType = modelValue[0].resourceType; // 回显资源类型
    } else if (modelValue && typeof modelValue === 'object') {
      // 单选
      this.selectedDataKeys = [modelValue.uuid];
      this.selectedData = [modelValue];
      this.resourceType = modelValue.resourceType; // 回显资源类型
    }
  },
  data() {
    return {
      selectedData: [],
      selectedDataKeys: [],
      paramsKeyFilter: { search: 'keyword' },
      extraParams: { ...Bus.metaData },
      resourceType: '',
      getTableData: Api.getInstVm,
      title: '选择私网地址',
      columns,
    };
  },
  methods: {
    fresh() {
      this.$nextTick(function () {
        if (this.$refs.tableInstance) {
          this.$refs.tableInstance.freshTable();
        }
      });
    },
    handleResponse(res, type) {
      if (type === 'total') {
        return res.total;
      }
      if (type === 'data') {
        return res.records;
      }
    },
    submit() {
      if (this.selectedData.length === 0) {
        return this.$YMessage.warn('请' + this.title);
      }
      this.$emit('submit', this.selectedData);
      this.cancel();
    },
    cancel() {
      this.$emit('drawerCtrl', false);
    },
  },
};
</script>
<style lang="less">
.yjz-service-tree-select {
  min-width: 202px;
  position: absolute;
  .ant-select-selection--single .ant-select-selection__rendered {
    margin-right: 0;
    padding-right: 24px;
    z-index: 1;
  }
}
</style>
