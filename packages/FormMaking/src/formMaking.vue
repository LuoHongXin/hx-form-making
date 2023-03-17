<template>
  <div class="y-form-making">
    <div class="form-left">
      <div class="form-left-box">
        <div class="title">基础组件</div>
        <draggable
          class="y-form-label-item-list"
          v-bind="{
            group: { name: 'formItemList', pull: 'clone', put: false },
            sort: false,
          }"
          draggable=".y-form-label-item"
          v-model="basicFormLabelList"
        >
          <FormLabelItem :id="item.type" :dataObj="item" v-for="item in basicFormLabelList" :key="item.type" />
        </draggable>
      </div>
      <div class="form-left-box">
        <div class="title">高级组件</div>
        <draggable
          class="y-form-label-item-list"
          v-bind="{
            group: { name: 'formItemList', pull: 'clone', put: false },
            sort: false,
          }"
          draggable=".y-form-label-item"
          v-model="advanceFormLabelList"
        >
          <FormLabelItem :id="item.type" :dataObj="item" v-for="item in advanceFormLabelList" :key="item.type" />
        </draggable>
      </div>
      <div class="form-left-box">
        <div class="title">业务组件</div>
        <draggable
          class="y-form-label-item-list"
          v-bind="{
            group: { name: 'formItemList', pull: 'clone', put: false },
            sort: false,
          }"
          draggable=".y-form-label-item"
          v-model="classicFormLabelList"
        >
          <FormLabelItem :id="item.type" :dataObj="item" v-for="item in classicFormLabelList" :key="item.type" />
        </draggable>
      </div>
    </div>
    <div class="form-center">
      <FormList
        :initFormData="[...basicFormLabelList, ...advanceFormLabelList, ...classicFormLabelList]"
        @updateFormList="updateFormList"
        @selectOperateFormItem="selectOperateFormItem"
        :formDataList="formList"
        :operateFormItem="operateFormItem"
      />
    </div>
    <div class="form-right">
      <FiledConfig v-model="operateFormItem.options" :operateFormItem="operateFormItem" v-if="filedConfigShow" />
      <!-- <y-tabs default-active-key="1" style="margin-top: -16px;">
        <y-tab-pane key="1" tab="组件属性">
        </y-tab-pane>
        <y-tab-pane key="2" tab="表单属性">
          Content of Tab Pane 2
        </y-tab-pane>
      </y-tabs> -->
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import FormLabelItem from './components/formLabelItem.vue';
import FormList from './components/formList.vue';
import FiledConfig from './components/filedConfig.vue';
import Bus from './Bus';
import { basicComponents, advanceComponents, classicComponents } from './config/componentsConfig';

export default {
  name: 'YjzFormMaking',
  components: {
    draggable,
    FormLabelItem,
    FormList,
    FiledConfig,
  },
  data() {
    return {
      basicFormLabelList: [], // 基础组件
      advanceFormLabelList: [], // 高级组件
      classicFormLabelList: [], // 业务组件
    };
  },
  computed: {
    // 显示的表单数据
    formList: {
      get() {
        return Bus.formList;
      },
      set(arr) {
        Bus.updateFormList(arr);
      },
    },
    // 选中的表单项
    operateFormItem() {
      return Bus.operateFormItem || {};
    },
    filedConfigShow({ operateFormItem }) {
      return operateFormItem && Object.keys(operateFormItem).length > 0;
    },
  },
  // watch: {
  //   operateFormItem: {
  //     handler: function(val) {
  //       this.formList.forEach(item => {
  //         if (item.key === val.key) {
  //           item = val;
  //         }
  //       });
  //     },
  //     deep: true,
  //   },
  // },
  created() {
    this.loadBasicFormLabelList();
    this.loadAdvanceFormLabelList();
    this.loadClassicFormLabelList();
  },
  beforeDestroy() {
    Bus.clearBus();
  },
  methods: {
    // 回显表单数据
    setJSON(json) {
      if (typeof json === 'string') {
        json = JSON.parse(json);
      }
      Bus.updateFormList(json);
    },
    // 获取表单数据
    getJSON() {
      return JSON.stringify(this.recurisonFormList());
    },
    // 遍历处理 formList
    recurisonFormList(arr = this.formList) {
      arr.forEach(item => {
        // 把关系表数据清空，避免数据太大后端服务报错
        if (item.options.remoteType === 'library') {
          item.options.options = [];
        }
      });
      return arr;
    },
    // 回显逻辑表单设计规则
    setLogicFormRules(json) {
      if (typeof json === 'string') {
        json = JSON.parse(json);
      }
      Bus.designLogicFormRules = json;
    },
    // 获取表单逻辑规则
    getLogicFormRules() {
      Bus.clearDesignLogicFormRules(); // 清空无效表单规则
      Bus.updateLogicFormRules(); // 更新获取渲染逻辑表单规则
      return {
        logicRules: Bus.logicFormRules,
        designLogicRules: Bus.designLogicFormRules,
      };
    },
    // 选中的表单项对象
    selectOperateFormItem(obj) {
      if (!this.operateFormItem || !obj || obj.key !== this.operateFormItem.key) {
        Bus.updateOperateFormItem(obj);
      }
    },
    updateFormList(arr) {
      this.formList = arr;
    },
    // 加载基础组件
    loadBasicFormLabelList() {
      this.basicFormLabelList = basicComponents.map(i => {
        return i;
      });
    },
    // 加载高级组件
    loadAdvanceFormLabelList() {
      this.advanceFormLabelList = advanceComponents.map(i => {
        return i;
      });
    },
    // 加载业务组件
    loadClassicFormLabelList() {
      this.classicFormLabelList = classicComponents.map(i => {
        return i;
      });
    },
    // 检查表单选项配置是否符合规范
    checkFormConfig(arr = this.formList) {
      return new Promise(resolve => {
        let flag = true;
        let emptyOptionsName = []; // 选项为空的组件名称，选项不能为空
        let emptyTitleIndex = []; // 名称为空的组件下标,组件名称不能为空
        let currentIndex = 0;
        arr.forEach(async item => {
          if (!item.options.name) {
            currentIndex++;
            emptyTitleIndex.push(currentIndex);
            flag = false;
          }
          if (['select', 'checkbox', 'radio'].includes(item.type) && item.options.remoteType === 'custom') {
            if (item.options.options.length === 0) {
              flag = false;
              emptyOptionsName.push(item.options.name);
            } else {
              item.options.options.forEach(i => {
                if (!i.value || (i.value.trim() === '' && item.options.name)) {
                  flag = false;
                  emptyOptionsName.push(item.options.name);
                }
              });
            }
          }
          if (item.type === 'designate') {
            if (!item.options.nodeModel2) {
              flag = false;
              this.$YMessage.error(item.options.implementText + '选择节点不能为空');
            }
          }
          if (item.type === 'combination') {
            const p = await this.checkFormConfig(item.list);
            flag = p.flag;
            emptyOptionsName = emptyOptionsName.concat(p.emptyOptionsName);
            emptyTitleIndex = emptyTitleIndex.concat(p.emptyTitleIndex);
          }
        });
        resolve({ flag, emptyOptionsName, emptyTitleIndex });
      });
    },
  },
};
</script>
