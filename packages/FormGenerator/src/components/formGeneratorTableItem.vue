<template>
  <y-form-model-item
    class="yjz-form-generator-table-item"
    v-if="!formItemData.options.hidden"
    :label="formItemData.options.copyName || formItemData.options.name"
    :prop="formItemData.options.model"
  >
    <y-model-table
      :paginationShow="false"
      tableKey="fetable"
      :tableHeader="{ left: false, right: false }"
      :rowSelection="false"
      :scroll="{ x: '100%' }"
      :dataSource="tableData"
      :columns="columns"
    >
      <div slot="tableHeaderLeft" style="display: flex">
        <y-button type="primary" icon="plus" @click="addTableItem">添加</y-button>

        <!-- 轻提示 -->
        <y-tooltip
          style="margin-left: 8px"
          v-if="formItemData.options.lightTipsCheck"
          class="light-tips-check"
          :title="formItemData.options.lightTipsContent"
        >
          <y-svg-icon icon-class="warning" />
        </y-tooltip>
      </div>
      <div slot="tableHeaderRight" class="data-btn-list">
        <y-upload :showUploadList="false" :before-upload="beforeUpload" accept=".xlsx">
          <y-button type="default" v-if="formItemData.options.importData">导入数据</y-button>
        </y-upload>
        <y-button type="default" v-if="formItemData.options.importData" @click="downloadTmpl">下载模板</y-button>
        <y-button type="default" v-if="formItemData.options.exportData" @click="downloadData">导出数据</y-button>
      </div>

      <template v-for="col in formItemData.list" :slot="col.key" slot-scope="{ record }">
        <FormGeneratorItem
          :key="col.key"
          v-model="record.value"
          :formItemData="col"
          @updateRequestOptions="val => $emit('updateRequestOptions', val)"
          type="noLabel"
        />
      </template>
      <template slot="action" slot-scope="{ record }">
        <y-tooltip title="删除">
          <y-svg-icon style="margin-left: 10px; font-size: 16px" @click="delTableItem(record)" icon-class="delete" />
        </y-tooltip>
      </template>
    </y-model-table>

    <!-- 强提示 -->
    <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
      {{ formItemData.options.strongTipsContent }}
    </div>
    <FixedDataSource :formItemData="formItemData" v-if="fdsVisible" @drawerCtrl="fdsDrawerCtrl" @confirm="fdSConfirm" />
  </y-form-model-item>
</template>
<script>
import FormGeneratorItem from './formGeneratorItem.vue';
import FixedDataSource from './formGeneratorTableItem/fixedDataSource.vue';
import { exportExcel, readExcelFileToJSON } from '@src/utils/common.js';
export default {
  name: 'FormGeneratorTableItem',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 表单项
    formItemData: {
      type: Object,
      default: function() {
        return {};
      },
    },
    submitForm: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  components: {
    FormGeneratorItem,
    FixedDataSource,
  },
  data() {
    return {
      fdsVisible: false,
    };
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
    tableData: {
      get({ submitForm2, formItemData }) {
        return submitForm2[formItemData.options.model] || [];
      },
      set(val) {
        this.$set(this.submitForm2, this.formItemData.options.model, val);
      },
    },
    columns({ formItemData }) {
      const col = formItemData.list.map(i => {
        return {
          title: i.options.name,
          dataIndex: i.options.model,
          scopedSlots: { customRender: i.key },
        };
      });
      col.push({
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      });
      return col;
    },
    columnsMap({ columns }) {
      const map = {};
      columns.forEach(i => {
        map[i.title] = i.dataIndex;
      });
      return map;
    },
  },
  mounted() {
    this.$nextTick(function() {
      // 没固定数据源初始化表格时需自增一行
      if (!this.judgeHasFiedData() && !this.tableData.length) {
        this.addTableItem();
      }
    });
  },
  methods: {
    // 导出数据
    downloadData() {
      const tHeader = [];
      const filterVal = [];
      this.columns.forEach(item => {
        if (item.dataIndex !== 'action') {
          tHeader.push(item.title);
          filterVal.push(item.dataIndex);
        }
      });
      exportExcel(
        tHeader,
        filterVal,
        this.tableData.map(i => {
          return { ...i.value };
        }),
        '导出数据'
      );
    },
    // 导入数据
    beforeUpload(file) {
      const columnsMap = this.columnsMap;
      const _this = this;
      readExcelFileToJSON(file, function(arr) {
        const random = Math.random()
          .toString(36)
          .slice(-8);
        const tableData = JSON.parse(JSON.stringify(_this.tableData));
        arr.forEach(item => {
          const newItem = {};
          for (let key in item) {
            let newKey = columnsMap[key].trim();
            if (newKey) {
              newItem[newKey] = item[key];
            }
          }
          tableData.push({ value: { ...newItem }, key: random });
        });
        _this.tableData = tableData;
      });
      return false;
    },
    // 下载模板
    downloadTmpl() {
      const tHeader = [];
      this.columns.forEach(item => {
        if (item.dataIndex !== 'action') {
          tHeader.push(item.title);
        }
      });
      exportExcel(tHeader);
    },
    fdSConfirm(arr) {
      const tableData = JSON.parse(JSON.stringify(this.tableData));
      arr.forEach(item => {
        tableData.push({ value: { ...item }, key: item.uuid });
      });
      this.tableData = tableData;
    },
    fdsDrawerCtrl(bool) {
      this.fdsVisible = bool;
    },
    // 表格新增一行数据
    addTableItem() {
      if (this.judgeHasFiedData()) {
        this.fdsDrawerCtrl(true);
      } else {
        const random = Math.random()
          .toString(36)
          .slice(-8);
        const tableData = JSON.parse(JSON.stringify(this.tableData));
        tableData.push({ key: random });
        this.tableData = tableData;
      }
    },
    // 表格删除一行数据
    delTableItem(obj) {
      let tableData = JSON.parse(JSON.stringify(this.tableData));
      tableData = tableData.filter(i => i.key !== obj.key);
      this.tableData = tableData;
    },
    // 判断是否有固定数据源
    judgeHasFiedData() {
      const array = this.formItemData.list;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // 存在表格列类型为固定数据源的
        if (element.columnType === 'fixedData') {
          return true;
        }
      }
      return false;
    },
  },
};
</script>
