<template>
  <div :class="'y-form-list ' + `${mkFormDataList.length === 0 ? 'no-data' : ''}`">
    <y-form-model :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left" ref="ruleForm" :model="submitForm" :rules="rules">
      <div class="no-img" v-if="mkFormDataList.length === 0">
        <img :src="bgBase64" />
        <div class="text">拖拽或点击左侧组件设计表单</div>
      </div>
      <draggable
        class="mk-form-list"
        v-bind="{
          group: { name: 'formItemList', put: true },
          animation: 200,
        }"
        :sort="true"
        @add="addItem"
        draggable=".mk-form-item-box"
        v-model="mkFormDataList"
      >
        <div class="mk-form-item-box" :style="{ width: item.options.itemWidth }" v-for="(item, index) in mkFormDataList" :key="item.key">
          <!-- 组合组件 -->
          <CombinationFormItem
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @deleteItem="deleteItem"
            :initFormData="initFormData"
            :operateFormItem="operateFormItem"
            @selectOperateFormItem="selectOperateFormItem"
            :formItemData="item"
            @click.native="selectOperateFormItem(item)"
            v-if="item.type === 'combination'"
          />
          <!-- 表格组件 -->
          <TableFormItem
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @deleteItem="deleteItem"
            :initFormData="initFormData"
            :operateFormItem="operateFormItem"
            @selectOperateFormItem="selectOperateFormItem"
            :formItemData="item"
            @click.native="selectOperateFormItem(item)"
            v-else-if="item.type === 'table'"
          />
          <!-- 业务组件-办理意见 -->
          <ClassicOpinion
            v-else-if="item.type === 'opinion'"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />
          <!-- 业务组件-印章名称 -->
          <ElectricSealName
            v-else-if="item.type === 'electricSealName'"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />
          <!-- 业务组件-工单回填 -->
          <WorkOrderBackfill
            v-else-if="item.type === 'workOrderBackfill'"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />
          <!-- 业务组件-选择下个实施范围 -->
          <Designate
            v-else-if="item.type === 'designate'"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />

          <!-- 审批结果 -->
          <ApproveResult
            v-else-if="item.type === 'approveResult'"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />

          <!-- 布局字段 -->
          <LayoutFormItem
            v-else-if="item.type.includes('layout')"
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />
          <!-- 基础组件 -->
          <MkFormItem
            v-else
            @copyItem="
              obj => {
                addItem(obj, index);
              }
            "
            @deleteItem="deleteItem"
            :class="operateFormItem && operateFormItem.key === item.key ? 'selected' : ''"
            @click.native="selectOperateFormItem(item)"
            :formItemData="item"
          />
        </div>
      </draggable>
    </y-form-model>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import MkFormItem from './formList/mkFormItem';
import CombinationFormItem from './formList/combinationFormItem';
import TableFormItem from './formList/tableFormItem';
import ClassicOpinion from './formList/classicOpinion';
import ElectricSealName from './formList/electricSealName';
import WorkOrderBackfill from './formList/workOrderBackfill';
import Designate from './formList/designate';
import ApproveResult from './formList/approveResult';
import LayoutFormItem from './formList/layoutFormItem';
import bgBase64 from '@src/images/noform-bg.js';
import { deepCopy } from '@src/utils/common.js';
export default {
  name: 'MkFormList',
  props: {
    formDataList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 初始化的表单项数据
    initFormData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 选中操作的表单项
    operateFormItem: {
      type: Object,
      default: function() {
        return null;
      },
    },
  },
  components: {
    draggable,
    MkFormItem,
    CombinationFormItem,
    ClassicOpinion,
    ElectricSealName,
    WorkOrderBackfill,
    Designate,
    ApproveResult,
    TableFormItem,
    LayoutFormItem,
  },
  computed: {
    mkFormDataList: {
      get({ formDataList }) {
        return formDataList;
      },
      set(val) {
        this.$emit('updateFormList', val);
      },
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      submitForm: {},
      rules: {},
      bgBase64,
    };
  },
  methods: {
    // 选中操作表单项对象
    selectOperateFormItem(obj) {
      this.$emit('selectOperateFormItem', obj);
    },
    // 新增表单项
    addItem(evt, index) {
      const random = Math.random()
        .toString(36)
        .slice(-8);
      if (!isNaN(index)) {
        // 复制新增
        const copyItem = deepCopy(evt);
        copyItem.options.name = copyItem.title;
        // copyItem.key = copyItem.key + '_' + random;
        copyItem.key = copyItem.type + '_' + random;
        // copyItem.options.model = random;
        this.mkFormDataList.splice(index + 1, 0, copyItem);
        this.selectOperateFormItem(copyItem);
      } else {
        // 拖拽新增
        const initFormData = this.initFormData;
        const newIndex = evt.newIndex;
        for (let index = 0; index < initFormData.length; index++) {
          const element = deepCopy(initFormData[index]);
          if (element.type === evt.item.id) {
            // element.options.name = element.title + '_' + random;
            element.options.name = element.title;
            const newItems = {
              ...element,
              key: element.type + '_' + random,
            };
            // 指派实施组生成三个组件
            if (element.type === 'designate') {
              newItems.options.nodeModel = newItems.options.nodeModel + '_' + random;
              newItems.options.roleModel = newItems.options.roleModel + '_' + random;
              newItems.options.implementModel = newItems.options.implementModel + '_' + random;
            } else if (element.type === 'opinion') {
              // 办理意见固定标识，审批用语随机生成
              newItems.options.model2 = 'message' + random;
            } else if (element.type === 'approveResult') {
              // 审批结果固定组件标识
              newItems.options.model = 'approveResult';
            } else if (element.type === 'workOrderBackfill') {
              // 工单回填固定组件标识
              newItems.options.model = 'attachments';
            } else {
              newItems.options.model = random;
            }
            this.$set(this.mkFormDataList, newIndex, newItems);
            this.selectOperateFormItem(newItems);
            break;
          }
        }
      }
    },
    // 删除表单项
    deleteItem(obj) {
      let deleteIndex = 0;
      const list = [...this.mkFormDataList];
      this.mkFormDataList = list.filter((i, index) => {
        if (i.key === obj.key) {
          deleteIndex = index;
        }
        return i.key !== obj.key;
      });
      let newItem = null;
      if (list[deleteIndex + 1]) {
        newItem = list[deleteIndex + 1];
      } else if (list[deleteIndex - 1]) {
        newItem = list[deleteIndex - 1];
      }
      this.selectOperateFormItem(newItem);
    },
  },
};
</script>
