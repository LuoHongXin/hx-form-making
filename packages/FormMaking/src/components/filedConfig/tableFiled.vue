<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <!-- 组件名称设置 -->
    <SetTitle v-model="optionData" />

    <!-- 组件标识设置 -->
    <SetModel v-model="optionData" />

    <!-- 提示信息 -->
    <TipsConfig :placeholder="false" v-model="optionData" />

    <!-- 表格字段 -->
    <y-form-model-item>
      <span slot="label">
        表格字段
        <y-tooltip title="请从左侧拖拽来添加常规数据源字段">
          <a-icon type="info-circle" />
        </y-tooltip>
      </span>
      <draggable
        v-bind="{
          group: { name: 'tableGroup' },
        }"
        :sort="true"
        handle=".y-svg-icon-line"
        draggable=".input-option"
        v-model="operateFormItem.list"
      >
        <div
          :class="item.columnType === 'fixedData' ? 'isFiexdData input-option' : 'input-option'"
          v-for="item in operateFormItem.list"
          :key="item.key"
        >
          <y-input autoWidth placeholder="请输入表头名称" v-model="item.options.name">
            <template slot="suffix">
              <y-svg-icon icon-class="edit-icon" class-name="edit" @click="edit(item)" />
              <a-icon type="delete" @click="deleteTableColumn(item.key)" />
              <y-svg-icon icon-class="dragLine" class-name="line" />
            </template>
          </y-input>
        </div>
      </draggable>
      <y-button style="width: 100%" icon="plus" type="dashed" @click="fdsDrawerCtrl(true)">添加固定数据源字段</y-button>
    </y-form-model-item>

    <y-form-model-item label="必填项">
      <y-radio-group v-model="optionData.required" :radio="false" bodered>
        <y-radio-content :value="true"> 是 </y-radio-content>
        <y-radio-content :value="false"> 否 </y-radio-content>
      </y-radio-group>
    </y-form-model-item>

    <!-- 操作属性 -->
    <OperationalAttribute importData exportData v-model="optionData" />

    <!-- 固定数据源选择抽屉 -->
    <FixedDataSource :operateFormItem="operateFormItem" v-if="fdsVisible" @drawerCtrl="fdsDrawerCtrl" @confirm="fdSConfirm" />

    <!-- 费用 -->
    <SetBilling v-model="optionData" />
  </y-form-model>
</template>
<script>
import draggable from 'vuedraggable';
import TipsConfig from './common/tipsConfig';
import SetTitle from './common/setTitle';
import SetModel from './common/setModel';
import OperationalAttribute from './common/operationalAttribute';
import FixedDataSource from './tableFiled/fixedDataSource';
import Bus from '../../Bus';
import { basicComponents } from '../../config/componentsConfig';
import SetBilling from './common/setBilling';
export default {
  name: 'TableFiled',
  components: {
    draggable,
    TipsConfig,
    SetTitle,
    SetModel,
    OperationalAttribute,
    FixedDataSource,
    SetBilling,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
    operateFormItem: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  computed: {
    optionData: {
      get({ data }) {
        return data;
      },
      set(val) {
        this.$emit('update-data', val);
      },
    },
  },
  data() {
    return {
      fdsVisible: false,
    };
  },
  methods: {
    fdSConfirm(arr, productTypes) {
      const array = basicComponents;
      this.$set(this.operateFormItem, 'productTypes', productTypes);
      let list = JSON.parse(JSON.stringify(this.operateFormItem.list));
      list = list.filter(i => i.columnType !== 'fixedData'); // 需清除所有固定数据源重新赋最新的数据源
      arr.forEach(item => {
        let element = null;
        for (let index = 0; index < array.length; index++) {
          if (array[index].type === 'input') {
            element = JSON.parse(JSON.stringify(array[index]));
            break;
          }
        }
        const random = Math.random()
          .toString(36)
          .slice(-8);
        element.options.name = item.name;
        element.options.model = item.key;
        list.push({
          ...element,
          parentType: 'table',
          columnType: 'fixedData', // 表格列类型，固定数据源
          key: element.type + '_' + random,
        });
      });
      this.$set(this.operateFormItem, 'list', list);
    },
    fdsDrawerCtrl(bool) {
      this.fdsVisible = bool;
    },
    // 删除表格字段
    deleteTableColumn(key) {
      let list = this.operateFormItem.list;
      list = list.filter(i => {
        return i.key !== key;
      });
      this.$set(this.operateFormItem, 'list', list);
    },
    // 切换到对应表格字段配置
    edit(obj) {
      Bus.updateOperateFormItem(obj);
    },
  },
};
</script>
<style lang="less">
// 固定数据源样式特别，区分自定义数据源
.isFiexdData {
  .ant-input {
    background-color: #f5f5f5;
  }
}
</style>
