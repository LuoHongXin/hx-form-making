<template>
  <y-form-model-item label="逻辑表单">
    <template v-for="item in tableData">
      <div class="lf-box" :key="item.value" v-if="item.logicFormList && item.logicFormList.length > 0">
        <span class="lf-label">{{ item.label }}</span>
        <div class="lf-btn-list">
          <buttonGroup :moreBtnNum="2" :buttonList="getButtonList(item, item.options)"></buttonGroup>
        </div>
      </div>
    </template>
    <y-button style="width: 100%" @click="modalVisible = true" type="dashed">点击配置</y-button>
    <y-modal size="s" title="添加逻辑表单规则" :visible="modalVisible" @ok="modalVisible = false" @cancel="modalVisible = false">
      <y-alert style="margin-bottom: 24px" type="info" show-icon message="选择选项后，才会显示所设置的其他组件"></y-alert>
      <y-model-table
        :bordered="false"
        paginationType="mini"
        :tableHeader="false"
        :rowSelection="false"
        :scroll="{ x: '100%' }"
        :dataSource="tableData"
        :columns="columns"
      >
        <template v-slot:action="{ record }">
          <y-select
            autoWidth
            style="width: 100%"
            :value="record.logicFormList"
            :getPopupContainer="getPopupContainer"
            @change="
              arr => {
                onChange(arr, record);
              }
            "
            mode="multiple"
            :options="record.options"
          ></y-select>
        </template>
      </y-model-table>
    </y-modal>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
import Bus from '../../../Bus';
import buttonGroup from './setLogicForm/buttonGroup';
const columns = [
  {
    title: '选项内容',
    dataIndex: 'label',
    ellipsis: true,
    width: 80,
  },
  {
    title: '显示组件',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200,
  },
];
export default {
  name: 'SetLogicForm',
  mixins: [mixins],
  components: {
    buttonGroup,
  },
  data() {
    return {
      getPopupContainer: () => document.body,
      columns,
      modalVisible: false,
      getTableData: false, // 为了触发tableData响应式数据重新根据logicFormRules更新
    };
  },
  computed: {
    // 映射Bus中正在操作的表单项对象
    operateFormItem() {
      return Bus.operateFormItem;
    },
    // 获取可选选项
    tableData({ optionData, getTableData, operateFormItem, getOtherFormItem }) {
      if (!optionData.options) {
        // 开关类型组件
        return [
          {
            label: '开启',
            value: true, // value作为关键字
            getTableData,
            logicFormList: Bus.designLogicFormRules[operateFormItem.key] && (Bus.designLogicFormRules[operateFormItem.key]['true'] || []),
            options: getOtherFormItem(),
          },
          {
            label: '关闭',
            value: false, // value作为关键字
            getTableData,
            logicFormList: Bus.designLogicFormRules[operateFormItem.key] && (Bus.designLogicFormRules[operateFormItem.key]['false'] || []),
            options: getOtherFormItem(),
          },
        ];
      }
      let arr = [];
      optionData.options.forEach(i => {
        if (!(optionData.hideOptions && optionData.hideOptions.includes(i.value))) {
          // 值所关联的表单key
          let logicFormList =
            Bus.designLogicFormRules[operateFormItem.key] && (Bus.designLogicFormRules[operateFormItem.key][i.value] || []);
          arr.push({
            label: i.label || i.value,
            value: i.value, // value作为关键字
            getTableData,
            logicFormList,
            options: getOtherFormItem(),
          });
        }
      });
      return arr;
    },
  },
  methods: {
    getButtonList(obj, op) {
      return obj.logicFormList.map(item => {
        return {
          text: this.getLabel(item, op),
          key: item,
        };
      });
    },
    getLabel(val, op) {
      for (let index = 0; index < op.length; index++) {
        const element = op[index];
        if (element.value === val) return element.label;
      }
      return '-';
    },
    // 除了自己所有的表单项
    getOtherFormItem() {
      const arr = [];
      Bus.formList.forEach(i => {
        if (i.key !== this.operateFormItem.key) {
          arr.push({
            label: i.options.implementText || i.options.name,
            value: i.key,
          });
        }
      });
      return arr;
    },
    onChange(arr, record) {
      // 更新表单逻辑
      Bus.updateDesignLogicFormRules(this.operateFormItem.key, record.value, arr);
      this.getTableData = !this.getTableData;
      // Bus.$emit('update-logic-form-rules'); // 通知表单逻辑更新
    },
  },
};
</script>
<style lang="less">
.lf-box {
  margin-bottom: 8px;
  .lf-label {
    font-size: 12px;
  }
  .lf-btn-list {
    .y-btn.ant-btn {
      margin-right: 4px;
    }
  }
}
</style>
