<template>
  <y-form-model-item label="逻辑表单">
    <y-button style="width: 100%" @click="modalVisible = true" type="dashed">点击配置</y-button>
    <y-modal size="s" title="添加逻辑表单规则" :visible="modalVisible" @ok="modalVisible = false" @cancel="modalVisible = false">
      <y-alert
        style="margin-bottom: 24px"
        type="info"
        show-icon
        message="选择依赖表单项选项内容，当依赖表单项选择值包括在选项内容中才会显示当前组件"
      ></y-alert>
      <y-model-table
        :bordered="false"
        paginationType="mini"
        :tableHeader="false"
        :rowSelection="false"
        :scroll="{ x: '100%' }"
        :dataSource="otherOptionsItem"
        :columns="columns"
      >
        <template v-slot:action="{ record }">
          <y-select
            autoWidth
            style="width: 100%"
            :value="record.logicFormList"
            :getPopupContainer="getPopupContainer"
            @change="
              (arr) => {
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
const columns = [
  {
    title: '依赖表单',
    dataIndex: 'label',
    ellipsis: true,
    width: 80,
  },
  {
    title: '选项内容',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 200,
  },
];
export default {
  name: 'SetLogicFormOld',
  mixins: [mixins],
  data() {
    return {
      getPopupContainer: () => document.body,
      columns,
      modalVisible: false,
      getTableData: false, // 为了触发tableData响应式数据重新根据logicFormRules更新
    };
  },
  computed: {
    // 除了自己所有的选择、单选表单项
    otherOptionsItem({ optionData, getShowOption, currentKey, getTableData }) {
      const arr = [];
      Bus.formList.forEach((i) => {
        let logicFormList =
          Bus.logicFormRules[currentKey] && Bus.logicFormRules[currentKey][i.key] ? Bus.logicFormRules[currentKey][i.key] : [];

        if (i.options.model !== optionData.model && ['select', 'radio'].includes(i.type)) {
          arr.push({
            label: i.options.name,
            value: i.key,
            getTableData,
            logicFormList, // 已有的逻辑规则
            options: getShowOption(i),
          });
        }
      });
      return arr;
    },
    // 当前表单项不变的key
    currentKey({ optionData }) {
      const array = [...Bus.formList];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.options.model === optionData.model) {
          return element.key;
        }
      }
      return '';
    },
  },
  methods: {
    onChange(arr, record) {
      // 更新表单逻辑
      Bus.updateLogicFormRules(this.currentKey, record.value, arr);
      this.getTableData = !this.getTableData;
      // Bus.$emit('update-logic-form-rules'); // 通知表单逻辑更新
    },
    getShowOption(obj) {
      let arr = [];
      obj.options.options.forEach((i) => {
        if (!(obj.options.hideOptions && obj.options.hideOptions.includes(i.value))) {
          arr.push({
            label: i.label || i.value,
            value: i.value, // value作为关键字
          });
        }
      });
      return arr;
    },
    switchChange(bool, evt) {
      let hideOptions = this.optionData.hideOptions || [];
      if (bool && hideOptions.includes(evt.uuid)) {
        hideOptions = hideOptions.filter((i) => i !== evt.uuid);
      } else if (!bool && !hideOptions.includes(evt.uuid)) {
        hideOptions.push(evt.uuid);
      }
      this.$set(this.optionData, 'hideOptions', hideOptions);
    },
  },
};
</script>
