<template>
  <div class="combination-form-item mk-form-item">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
    <y-form-model-item
      class="flex-form-item"
      :rules="{
        required: formItemData.options.required,
        message: formItemData.options.requiredMessage,
        trigger: 'blur',
      }"
      :label="formItemData.options.name"
      :prop="formItemData.options.model"
    >
      <draggable
        class="mk-form-item-list"
        v-bind="{
          group: { name: 'formItemList', put: putFunction, pull: removeFunction },
          animation: 200,
        }"
        :sort="true"
        v-model="formItemDataList"
        draggable=".drag-form-item"
      >
        <TableItem
          @deleteItem="deleteItem"
          @copyItem="
            obj => {
              copyItem(obj, index);
            }
          "
          @click.native.stop="selectOperateFormItem(item)"
          :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
          :formItemData="item"
          v-for="(item, index) in formItemDataList"
          :key="item.key"
        />
      </draggable>
      <!-- <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip> -->
    </y-form-model-item>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import { deepCopy } from '@src/utils/common.js';
import Bus from '../../Bus';
import TableItem from './tableItem';
export default {
  name: 'TableFormItem',
  components: {
    draggable,
    TableItem,
  },
  props: {
    formItemData: {
      type: Object,
    },
    initFormData: {
      type: Array,
    },
    // 选中操作的表单项
    operateFormItem: {
      type: Object,
      default: function() {
        return null;
      },
    },
  },
  computed: {
    formItemDataList: {
      get({ formItemData }) {
        return formItemData.list;
      },
      set(val) {
        this.updateList(val);
      },
    },
  },
  methods: {
    // 更新组合组件中的list
    updateList(list) {
      list = list.map(item => {
        return this.handleItem(item);
      });
      const formList = Bus.formList; // 不能深度拷贝，避免moment之类的函数拷贝错误，导致组合组件添加子项时会导致时间组件值报错
      for (let index = 0; index < formList.length; index++) {
        const element = formList[index];
        if (element.key === this.formItemData.key) {
          element.list = list;
          break;
        }
      }
      Bus.updateFormList(formList);
    },
    selectOperateFormItem(obj) {
      this.$emit('selectOperateFormItem', obj);
    },
    // 新增表单项
    handleItem(obj) {
      if (obj.key) return obj;
      const random = Math.random()
        .toString(36)
        .slice(-8);
      // 拖拽新增
      const initFormData = this.initFormData;
      for (let index = 0; index < initFormData.length; index++) {
        const element = deepCopy(initFormData[index]);
        if (element.type === obj.type) {
          element.options.name = element.title;
          element.parentType = 'table'; // 表格内组件添加标识
          element.columnType = 'customData'; // 表格列类型，自定义数据源
          const newItems = {
            ...element,
            key: element.type + '_' + random,
          };
          newItems.options.model = random;
          return newItems;
        }
      }
    },
    // 删除表单项
    deleteItem(obj) {
      let list = [...this.formItemData.list];
      list = list.filter(i => {
        return i.key !== obj.key;
      });
      this.updateList(list);
    },
    // 复制子表单项
    copyItem(obj, index) {
      if (!isNaN(index)) {
        let list = [...this.formItemData.list];
        const random = Math.random()
          .toString(36)
          .slice(-8);
        // 复制新增
        const copyItem = deepCopy(obj);
        copyItem.options.name = copyItem.title + '_' + random;
        copyItem.key = copyItem.key + '_' + random;
        copyItem.options.model = random;
        list.splice(index + 1, 0, copyItem);
        this.updateList(list);
      }
    },
    // 只有输入框和选择框才允许拖入表格
    putFunction(a, b, c) {
      if (['input', 'select'].includes(c.id) || c.querySelector('.y-input') || c.querySelector('.y-select')) {
        return true;
      }
      return false;
    },
    // 表格组件内的组件不允许被移出去
    removeFunction() {
      return false;
    },
  },
};
</script>
