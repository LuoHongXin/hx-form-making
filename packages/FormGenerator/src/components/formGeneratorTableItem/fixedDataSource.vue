<template>
  <y-drawer title="选择资源" size="m" :visible="true" @close="cancel">
    <div slot="footer" style="text-align: right">
      <y-button @click="cancel">取消</y-button>
      <y-button type="primary" @click="onSubmit">确定</y-button>
    </div>
    <y-model-table
      rowKey="uuid"
      v-model="selectedData"
      :modelKeys.sync="selectedDataKeys"
      :api="getTableData"
      :scroll="{ x: '100%' }"
      paginationType="mini"
      :fresh="false"
      :setting="false"
      :columns="columns"
      :handleResponse="handleResponse"
      :extraParams="extraParams"
      :immediately="false"
      :key="tableKey"
      ref="tableInstance"
    >
      <template slot="tableHeaderLeft">
        <y-select v-model="productTab" showSearch :options="productTypes"></y-select>
      </template>
    </y-model-table>
  </y-drawer>
</template>
<script>
import Api from '@api';
import { getArrUniq } from '@src/utils/common.js';
// const columns = [
//   {
//     title: '字段',
//     dataIndex: 'name',
//     ellipsis: true,
//   },
//   {
//     title: '表头类型',
//     dataIndex: 'type',
//     scopedSlots: { customRender: 'type' },
//     ellipsis: true,
//   },
// ];
export default {
  name: 'FixedDataSource',
  props: {
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
      productTab: '',
      columns: [],
      selectedData: [],
      selectedDataKeys: [],
      getTableData: Api.getNormalizedPage,
      tableKey: '123',
      filterColums: [
        {
          type: 'machineRoom', // 所属机房
          itemId: '5c5076d413c041c5872e30f5eb845c48',
          list: [],
        },
        {
          type: 'networkArea', // 网络区域
          itemId: 'aa918c730d814f159f645e9ae761e236',
          list: [],
        },
        {
          type: 'cpuArch', // CPU架构
          itemId: '9b9f6ea3b3c4410e8ffaeacb27a0b808',
          list: [],
        },
        {
          type: 'osName', // 操作系统
          itemId: 'f3b034cd3260404587210e92e91dc156',
          list: [],
        },
        // {
        //   type: 'osName', // 系统名称
        //   list: [],
        // },
      ],
    };
  },
  computed: {
    productTypes({ formItemData }) {
      return formItemData.productTypes;
    },
    extraParams({ productTab }) {
      return {
        productType: productTab,
      };
    },
  },
  watch: {
    productTab: {
      handler() {
        this.getColumn();
      },
    },
  },
  created() {
    const arr = this.filterColums;
    this.getFilterColumsOptions().then(res => {
      arr.forEach((item, index) => {
        item.list = res[index].records || res[index];
      });
      this.filterColums = arr;
      this.productTab = this.productTypes[0]?.value;
    });
  },
  methods: {
    getFilterColumsOptions() {
      const arr = [];
      this.filterColums.forEach(item => {
        // if (item.type !== 'osName') {
        arr.push(
          Api.getDictionaryCodePage({
            itemUuid: item.itemId,
            size: 64, // 获取选项最多为64
          })
        );
        // } else {
        //   arr.push(Api.getBusinessSystem());
        // }
      });
      return Promise.all(arr);
    },
    getColumn() {
      Api.getServiceDescriptors(this.productTab).then(res => {
        console.log(res, 'this.columns = res.metaData.columns.map((i)');
        this.columns = res.metaData.columns.map(i => {
          if (this.isFilterColumn(i.key)) {
            return {
              // ...i,
              dataIndex: i.key,
              title: i.name,
              ellipsis: true,
              filter: true,
              filters: this.getFilterColumnList(i.key),
              width: 100,
            };
          } else {
            return {
              // ...i,
              dataIndex: i.key,
              title: i.name,
              ellipsis: true,
              width: 100,
            };
          }
        });
        this.tableKey = Math.random()
          .toString(36)
          .slice(-8);
        this.$nextTick(function() {
          if (this.$refs.tableInstance) {
            this.$refs.tableInstance.freshTable();
          }
        });
      });
    },
    // 判断是否为可过滤字段
    isFilterColumn(type) {
      const array = this.filterColums;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.type === type) return true;
      }
      return false;
    },
    // 获取过滤字段的选项
    getFilterColumnList(type) {
      const array = this.filterColums;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.type === type)
          return getArrUniq(
            element.list.map(i => {
              return {
                // text: type === 'osName' ? i.name : i.code,
                // value: type === 'osName' ? i.name : i.code,
                text: i.code,
                value: i.code,
              };
            }),
            'value'
          );
      }
      return [];
    },
    handleResponse(res, type) {
      if (type === 'total') {
        return res.total;
      }
      if (type === 'data') {
        return res.records;
      }
    },
    cancel() {
      this.$emit('drawerCtrl', false);
    },
    onSubmit() {
      this.$emit('confirm', this.selectedData);
      this.cancel();
    },
  },
};
</script>
<style lang="less">
.fixed-data-source-form {
  .ant-form-item-label {
    & > label::after {
      display: none;
    }
  }
}
</style>
