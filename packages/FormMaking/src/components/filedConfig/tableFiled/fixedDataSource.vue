<template>
  <y-drawer title="固定数据源字段" size="s" :visible="true" @close="cancel">
    <div slot="footer" style="text-align: right">
      <y-button @click="cancel">取消</y-button>
      <y-button type="primary" @click="onSubmit">确定</y-button>
    </div>
    <y-form-model class="fixed-data-source-form" labelAlign="left" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <y-form-model-item ref="name" label="固定数据源" prop="name">
        <!-- <y-checkbox-group v-model="checkValue" :options="checkOptions2" /> -->
        <InputCheck :treeData="checkOptions2" v-model="checkValue" />
      </y-form-model-item>
      <y-form-model-item ref="name" label="选择字段" prop="name">
        <y-model-table
          :fresh="false"
          :setting="false"
          tableKey="fetable"
          rowKey="key"
          :paramsKeyFilter="{ search: 'name' }"
          v-model="selectedData"
          :modelKeys.sync="selectedDataKeys"
          :scroll="{ x: '100%' }"
          paginationType="mini"
          ref="tableInstance"
          :dataSource="tableData"
          :columns="columns"
        >
          <template v-slot:type="{ text }">
            {{ text }}
          </template>
        </y-model-table>
      </y-form-model-item>
    </y-form-model>
  </y-drawer>
</template>
<script>
import Api from '@api';
import { flatArr } from '@src/utils/common.js';
import InputCheck from './inputCheck.vue';
const columns = [
  {
    title: '字段',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '表头类型',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
    ellipsis: true,
  },
];
export default {
  name: 'FixedDataSource',
  props: {
    operateFormItem: {
      type: Object,
      default: function() {
        return {};
      },
    },
    fdsVisible: {
      type: Boolean,
      default: false,
    },
    replaceFiled: {
      type: Object,
      default: function() {
        return {
          label: 'productTypeName',
          key: 'productType',
          children: 'children',
        };
      },
    },
  },
  components: {
    InputCheck,
  },
  data() {
    return {
      columns,
      selectedData: [],
      selectedDataKeys: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      checkValue: [],
      // 扁平化数据
      checkOptions: [
        // {
        //   label: '裸金属',
        //   value: '裸金属',
        // },
      ],
      // 树数据
      checkOptions2: [],
      tableData: [],
    };
  },
  watch: {
    fdsVisible() {
      this.getFiexedData();
    },
    checkValue: {
      handler(val, oldVal) {
        if (val.length !== oldVal.length && oldVal.length) {
          // 新勾选多一个数据源就清空已勾选的选择字段
          this.selectedDataKeys = [];
          this.selectedData = [];
        }
        this.debounce(this.getCrossColumn, 600)(val);
      },
    },
    'operateFormItem.productTypes': {
      handler(val) {
        if (val && val.length > 0) {
          this.checkValue = val.map(i => i.value);
          this.setCheckOptions2();
          const selectedKeys = [];
          this.operateFormItem.list.forEach(item => {
            if (item.columnType === 'fixedData') {
              selectedKeys.push(item.options.model);
            }
          });
          this.selectedDataKeys = selectedKeys;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getFiexedData();
  },
  methods: {
    setCheckOptions2() {
      for (const opt of this.checkOptions2) {
        this.$set(opt, 'check', this.checkValue.includes(opt[this.replaceFiled.key]));
      }
    },
    getFiexedData() {
      Api.getInstanceDescriptorsTree().then(res => {
        this.checkOptions = flatArr.get(res, 'children').map(i => {
          return {
            ...i,
            value: i.productType,
            label: i.productTypeName,
          };
        });

        this.checkOptions2 = res;
        this.setCheckOptions2();
      });
    },
    // 获取固定数据源的交集表头
    getCrossColumn(productTypes) {
      this.$refs.tableInstance.loading = true;
      if (productTypes && productTypes.length > 0) {
        Api.getCrossMetadata(productTypes)
          .then(res => {
            this.$refs.tableInstance.loading = false;
            this.tableData = res.metaData.columns.map(i => {
              return {
                ...i,
                type: '文本框',
              };
            });
          })
          .catch(err => {
            this.$refs.tableInstance.loading = false;
            if (err.message) {
              this.$YMessage(err.message);
            }
          });
      } else {
        this.tableData = [];
      }
    },
    cancel() {
      this.$emit('drawerCtrl', false);
    },
    onSubmit() {
      this.$emit(
        'confirm',
        this.selectedData,
        this.checkOptions.filter(i => {
          return this.checkValue.includes(i.value);
        })
      );
      this.cancel();
    },
    debounce(f, wait) {
      return (...args) => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          f(...args);
        }, wait);
      };
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
