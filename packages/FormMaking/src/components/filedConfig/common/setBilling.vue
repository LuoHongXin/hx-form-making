<template>
  <!-- 组件名称设置 -->
  <y-form-model-item class="yjz-set-billing">
    <span slot="label"
      >费用<y-tooltip title="用于计算预估费用" style="margin-left: 8px"> <a-icon type="info-circle" /> </y-tooltip
    ></span>
    <y-radio-group v-model="optionData.billingType" @change="clearBilling" autoWidth :radio="false" bodered>
      <y-radio-content v-for="item in radioOptions" :key="item.value" :value="item.value">
        {{ item.label || item.value }}
      </y-radio-content>
    </y-radio-group>
    <div v-show="optionData.billingType">
      <div v-if="optionData.billingConfig" class="billing-show">
        {{ optionData.billingConfig.name }}<a-icon type="delete" @click="clearBilling" />
      </div>
      <y-button v-else style="width: 100%; margin-top: 4px" @click="modalVisible = true" icon="plus" type="dashed">关联计费因子</y-button>
    </div>
    <y-drawer size="xxl" :visible="modalVisible" @ok="modalVisible = false" @close="modalVisible = false" title="关联计费因子">
      <y-model-table
        v-model="selectedData"
        :modelKeys.sync="selectedDataKeys"
        :setting="false"
        :bordered="false"
        :rowSelection="rowSelection"
        :api="getTableData"
        :columns="columns"
        :extraParams="extraParams"
        :scroll="{ x: '100%' }"
        ref="tableInstance"
        :paramsKeyFilter="paramsKeyFilter"
        searchPlaceholder="请输入关键字搜索"
        rowKey="uuid"
        :handleResponse="handleResponse"
      >
        <template #sort="{ index }">
          <span href="javascript:;">{{ index + 1 }}</span>
        </template>
        <template #ruleName="{ record }">
          <y-tooltip :title="record.name">
            <a class="factor-name" @click="lookDetail(record)" href="javascript:;">{{ record.name }}</a>
          </y-tooltip>
        </template>
        <template #cityName="{ record }">
          <span href="javascript:;">{{ record.metaData.cityName }}</span>
        </template>
        <template #price="{ record }">
          <span>{{ record.metaData.billingTypes[0].price.toFixed(2) }}</span>
        </template>
      </y-model-table>
      <div slot="footer" style="text-align: right">
        <y-button @click="modalVisible = false"> 取消 </y-button>
        <y-button type="primary" @click="confirm"> 确定 </y-button>
      </div>
    </y-drawer>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
import Api from '@api';
const columns = [
  { title: '因子名称', dataIndex: 'name', width: 150, scopedSlots: { customRender: 'ruleName' } },
  { title: '归属地市', dataIndex: 'belongCity', scopedSlots: { customRender: 'cityName' }, width: 80 },
  { title: '计费项', dataIndex: 'billingItem', ellipsis: true, width: 80 },
  { title: '计费方式', dataIndex: 'billingType', ellipsis: true, width: 100 },
  { title: '单价(元)', dataIndex: 'price', scopedSlots: { customRender: 'price' }, width: 80 },
  { title: '步长', dataIndex: 'stepValue', width: 60 },
  { title: '单位', dataIndex: 'unit', width: 60, ellipsis: true },
  { title: '计费周期', dataIndex: 'cycleName', filter: true, width: 80 },
];
export default {
  name: 'SetBilling',
  mixins: [mixins],
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  created() {
    if (this.optionData.billingConfig) {
      this.selectedData = [this.optionData.billingConfig];
      this.selectedDataKeys = [this.optionData.billingConfig.uuid];
    }
  },
  data() {
    return {
      selectedData: [],
      selectedDataKeys: [],
      rowSelection: { type: 'radio' },
      extraParams: {
        public: false,
      },
      getTableData: Api.getBillingFactorList,
      columns,
      modalVisible: false,
      paramsKeyFilter: { search: 'name', start: 'current' },
      radioOptions: [
        {
          label: '无',
          value: null,
        },
        {
          label: '关联计费因子',
          value: 'billingFactor',
        },
      ],
    };
  },
  methods: {
    clearBilling() {
      this.$set(this.optionData, 'billingConfig', null);
      this.selectedData = [];
      this.selectedDataKeys = [];
    },
    confirm() {
      if (this.selectedData.length === 0) {
        return this.$YMessage.wran('请先选择需要关联的计费因子');
      }
      this.$set(this.optionData, 'billingConfig', this.selectedData[0]);
      this.modalVisible = false;
    },
    handleResponse(res, type) {
      if (type === 'total') {
        return res.total;
      }
      if (type === 'data') {
        return res.records;
      }
    },
  },
};
</script>
<style lang="less">
.yjz-set-billing {
  .billing-show {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
    margin-top: 4px;
    position: relative;
    .anticon-delete {
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }
  .y-radio-content {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}
</style>
