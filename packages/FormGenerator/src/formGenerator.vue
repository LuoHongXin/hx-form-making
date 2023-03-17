<template>
  <div class="yjz-form-generator">
    <y-form-model :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="left" ref="ruleForm" :model="submitForm" :rules="rules">
      <template v-for="(item, index) in data">
        <div
          :class="item.options.itemWidth === '100%' ? 'yjz-form-item yjz-width-100' : 'yjz-form-item'"
          v-if="judgeShow(item)"
          :style="{ width: item.options.itemWidth }"
          :key="item.key"
        >
          <!-- 组合组件 -->
          <FormGeneratorCombinationItem
            @clickBtn="o => buttonClick(o, index)"
            @updateRequestOptions="updateRequestOptions"
            v-if="item.type === 'combination'"
            v-model="submitForm"
            @updateForm="setForm"
            :ref="item.key"
            :formItemData="item"
          />
          <!-- 表格组件 -->
          <FormGeneratorTableItem
            @clickBtn="o => buttonClick(o, index)"
            @updateRequestOptions="updateRequestOptions"
            v-else-if="item.type === 'table'"
            v-model="submitForm"
            @updateForm="setForm"
            :ref="item.key"
            :formItemData="item"
          />
          <!-- 办理意见 -->
          <FormGeneratorItemClassicOpinion
            :ref="item.key"
            v-else-if="item.type === 'opinion'"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
            @validateFormField="validateFormField"
          />
          <!-- 印章名称 -->
          <FormGeneratorElectricSealName
            :ref="item.key"
            v-else-if="item.type === 'electricSealName'"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
          />
          <!-- 工单回填 -->
          <FormGeneratorWorkOrderBackfill
            :ref="item.key"
            @clickBtn="o => buttonClick(o, index)"
            v-else-if="item.type === 'workOrderBackfill'"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
            :orderInfo="orderInfo"
          />
          <!-- 指派实施组 -->
          <FormGeneratorDesignate
            :ref="item.key"
            @clickBtn="o => buttonClick(o, index)"
            v-else-if="item.type === 'designate'"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
            :orderInfo="orderInfo"
          />
          <!-- 审核结果 -->
          <FormGeneratorApproveResult
            :ref="item.key"
            @clickBtn="o => buttonClick(o, index)"
            v-else-if="item.type === 'approveResult'"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
          />
          <!-- 布局组件 -->
          <FormGeneratorLayoutItem
            :ref="item.key"
            @clickBtn="o => buttonClick(o, index)"
            v-else-if="item.type.includes('layout')"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
          />
          <!-- 基础组件 -->
          <FormGeneratorItem
            @updateRequestOptions="updateRequestOptions"
            @clickBtn="o => buttonClick(o, index)"
            @validateFormField="validateFormField"
            v-else
            :ref="item.key"
            v-model="submitForm"
            @updateForm="setForm"
            :formItemData="item"
          />
        </div>
      </template>
    </y-form-model>
  </div>
</template>
<script>
import FormGeneratorItem from './components/formGeneratorItem.vue';
import FormGeneratorCombinationItem from './components/formGeneratorCombinationItem.vue';
import FormGeneratorItemClassicOpinion from './components/formGeneratorItemClassicOpinion.vue';
import FormGeneratorElectricSealName from './components/formGeneratorElectricSealName.vue';
import FormGeneratorWorkOrderBackfill from './components/formGeneratorWorkOrderBackfill.vue';
import FormGeneratorDesignate from './components/formGeneratorDesignate.vue';
import FormGeneratorApproveResult from './components/formGeneratorApproveResult.vue';
import FormGeneratorTableItem from './components/formGeneratorTableItem.vue';
import FormGeneratorLayoutItem from './components/formGeneratorLayoutItem.vue';

import moment from 'moment';
import Bus from './Bus';
import { deepCopy, getLibraryOptions, isUsefulValue } from '@src/utils/common.js';
import Api from '@api';
import { numberValidate, inputValidate, dateValidate } from '@src/utils/validateData';
export default {
  name: 'YjzFormGenerator',
  components: {
    FormGeneratorItem,
    FormGeneratorCombinationItem,
    FormGeneratorItemClassicOpinion,
    FormGeneratorElectricSealName,
    FormGeneratorWorkOrderBackfill,
    FormGeneratorDesignate,
    FormGeneratorApproveResult,
    FormGeneratorTableItem,
    FormGeneratorLayoutItem,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  props: {
    // 额外的信息，比如组织id过滤查询系统名称
    metaData: {
      type: Object,
      default: null,
    },
    // 工单业务的信息
    orderInfo: {
      type: Object,
      default: null,
    },
    // 表单渲染数据
    data: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 表单逻辑数据
    logicRules: {
      type: Object,
      default: function() {
        return {};
      },
    },
    // 初始化mounted时是否调用initForm方法回显默认值
    formInit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      submitForm: {},
      requestOptions: {}, // 数据来源请求后的新数据选项
    };
  },
  watch: {
    metaData: {
      handler(val) {
        if (val) {
          // 更新额外的信息给其他组件共用
          Bus.updateMetaData(val);
        }
      },
      immediate: true,
    },
  },
  computed: {
    // 表单校验规则
    rules({ data }) {
      const rulesObj = {};
      data.forEach(item => {
        let rulesArr = [];
        // 必填规则
        if (item.options.required) {
          // 组合组件
          if (item.list && item.type === 'combination') {
            item.list.forEach(childItem => {
              rulesObj[childItem.options.model] = [
                {
                  required: true,
                  message: childItem.options.requiredMessage || '',
                  trigger: 'blur',
                },
              ];
            });
            this.$set(this.submitForm, item.options.model, 'nodata'); // 组合组件需要星号，但不根据组合组件判断，而是list里的组件判断
          }
          rulesArr.push({
            required: true,
            message: item.options.requiredMessage || '',
            trigger: 'blur',
          });
        }
        // 印章名称
        if (item.type === 'electricSealName') {
          const validator = (rule, value, callBack) => {
            if (!value) {
              return callBack();
            }
            Api.checkSealName(value).then(res => {
              if (res.code === 201063) {
                callBack('印章名称已存在');
              } else {
                callBack();
              }
            });
          };
          rulesArr.push({ validator, trigger: 'blur' });
        }

        // 合并表单配置时的validator规则校验
        if (Array.isArray(item.options.validator)) {
          rulesArr = rulesArr.concat(item.options.validator);
        }
        // 合并表单配置时的validaeFormatterKey规则校验
        if (item.options.validaeFormatterKey) {
          const validatorArr = [];
          let targetValidateItem = null; // 目前只是单个，之后若要是变成多个，可改为数组
          let targetValidate = [];
          if (item.type === 'number') {
            targetValidate = numberValidate;
          } else if (['input', 'textarea'].includes(item.type)) {
            targetValidate = inputValidate;
          } else if (['date', 'dateRange'].includes(item.type)) {
            targetValidate = dateValidate;
          }
          targetValidate.forEach(validateItem => {
            if (validateItem.key === item.options.validaeFormatterKey) {
              targetValidateItem = validateItem;
            }
          });
          if (targetValidateItem) {
            const validator = (rule, value, callBack) => {
              if (!targetValidateItem.test(value)) {
                callBack(new Error(targetValidateItem.text));
              } else {
                callBack();
              }
            };
            validatorArr.push({
              validator,
              trigger: 'blur',
            });
          }
          rulesArr = rulesArr.concat(validatorArr);
        }
        // 指派实施组
        if (item.type === 'designate') {
          const implementRuleArr = [];
          const roleRuleArr = [];
          if (item.options.implementCheck && item.options.implementRequired) {
            implementRuleArr.push({
              required: true,
              message: item.options.requiredMessage || '',
              trigger: 'blur',
            });
          }
          if (item.options.roleCheck && item.options.roleRequired) {
            roleRuleArr.push({
              required: true,
              message: item.options.requiredMessage || '',
              trigger: 'blur',
            });
          }
          if (item.options.implementCheck) {
            rulesObj[item.options.implementModel] = rulesArr.concat(implementRuleArr);
          }
          if (item.options.roleCheck) {
            rulesObj[item.options.roleModel] = rulesArr.concat(roleRuleArr);
          }
          if (item.options.nodeCheck) {
            rulesObj[item.options.nodeModel] = rulesArr;
          }
        } else {
          rulesObj[item.options.model] = rulesArr;
        }
      });
      return rulesObj;
    },
  },
  mounted() {
    Bus.$on('dataAssociateEvent', this.watchDataAssociateEvent);
    this.$nextTick(function() {
      if (this.formInit) {
        this.initForm();
      }
    });
  },
  beforeDestroy() {
    Bus.$off('dataAssociateEvent');
  },
  methods: {
    // 监听关联数据表触发事件，修改关联的表单选项
    watchDataAssociateEvent(tableUuid, headUuid) {
      const dataList = deepCopy(this.data);
      dataList.forEach(item => {
        if (item.type === 'combination') {
          item.list.forEach(i => {
            this.updateLibraryItemOptions(i.options, tableUuid, headUuid, i.key, item.key);
          });
        } else {
          this.updateLibraryItemOptions(item.options, tableUuid, headUuid, item.key);
        }
      });
      // this.$emit('update-data', dataList);
    },
    // 更新指定数据关联表单项的选项
    updateLibraryItemOptions(config, tableUuid, headUuid, key, combinationKey) {
      if (
        config.remoteType === 'library' &&
        config.dataAssociation &&
        config.remoteLibraryId === tableUuid &&
        config.remoteLibraryHeadId.indexOf(headUuid) > -1 &&
        // config.remoteLibraryHeadId.replace(headUuid, '').length > 0
        config.remoteLibraryHeadId.split('_').length - headUuid.split('_').length === 1 // 只更新下一个
      ) {
        const o = getLibraryOptions(config.remoteLibraryHeadId, Bus.libraryTable[tableUuid]);
        if (
          combinationKey &&
          this.$refs[combinationKey] &&
          this.$refs[combinationKey][0] &&
          this.$refs[combinationKey][0].$refs[key] &&
          this.$refs[combinationKey][0].$refs[key][0]
        ) {
          this.$refs[combinationKey][0].$refs[key][0].initOptions = o;
        } else if (this.$refs[key] && this.$refs[key][0]) {
          this.$refs[key][0].initOptions = o;
        }
        // this.$set(this.submitForm, config.model, o[0]?.value); // 默认选第一个
      }
    },
    // 初始化表单并回显默认值
    initForm(array = this.data, dataObj = {}, callBack = null) {
      if (!array) array = this.data;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let initValue = null;
        if (isUsefulValue(dataObj[element.options.model])) {
          initValue = dataObj[element.options.model];
        } else if (isUsefulValue(element.options.defaultValue)) {
          initValue = element.options.defaultValue;
        }
        if (initValue) {
          // 日期组件值不是moment对象就转成moment
          if (element.type === 'date' && !initValue._isAMomentObject) {
            initValue = moment(initValue);
          } else if (element.type === 'dateRange' && initValue.length > 1 && !initValue[0]._isAMomentObject) {
            // 起止时间组件值不是moment对象就转成moment
            initValue = [moment(initValue[0]), moment(initValue[1])];
          } else if (element.type === 'checkbox' && Array.isArray(initValue)) {
            // 复选框默认值为数组则要改为字符串
            initValue = initValue.join();
          }
        }
        // 没有提交表单对象没有值时才赋默认值
        // if (!this.submitForm[element.options.model]) {
        if (element.options.model) {
          if (element.type === 'workOrderBackfill') {
            this.$refs[element.key][0].initValue();
          } else {
            this.$set(this.submitForm, element.options.model, initValue);
          }
        }
        // }
        // 组合组件递归
        if (element.list) {
          this.initForm(element.list, dataObj);
        }
      }
      // 回调并传初始化值的提交数据
      if (callBack) {
        callBack(this.submitForm);
      }
    },
    // 设置submitForm的值
    setForm(obj) {
      this.$nextTick(function() {
        this.submitForm = Object.assign(JSON.parse(JSON.stringify(this.submitForm)), JSON.parse(JSON.stringify(obj)));
      });
    },
    // 复制生成新表单对象
    copyNewItem(obj) {
      const copyItem = deepCopy(obj);
      const random = Math.random()
        .toString(36)
        .slice(-8);
      copyItem.key = copyItem.key + '_' + random;
      copyItem.options.model = copyItem.options.model + '_' + random;
      // 复制时回显新增复制项的默认值
      if (!this.submitForm[copyItem.options.model]) {
        // 优先取复制项已选的值，否则为默认值
        let defaultValue = this.submitForm[obj.options.model] || copyItem.options.defaultValue;
        this.$set(this.submitForm, copyItem.options.model, defaultValue);
      }
      if (copyItem.list) {
        copyItem.list = copyItem.list.map(i => {
          return this.copyNewItem(i);
        });
      }
      return copyItem;
    },
    // 按钮点击
    buttonClick(obj, index) {
      // 新增 或 删除
      if (obj.options && obj.options.buttonType === 'add') {
        const dataList = deepCopy(this.data);
        const copySameClassArr = []; // 同复制项表单数组
        const originKey = obj.key.split('_')[0] + '_' + obj.key.split('_')[1]; // 来源key
        dataList.forEach(i => {
          if (i.key.includes(originKey)) {
            copySameClassArr.push(i.key);
          }
        });
        // 若是复制项则为删除
        if (obj.isCopy) {
          const submitForm = { ...this.submitForm };
          // 删除提交对象中原来复制项绑定的数据
          if (obj.list) {
            obj.list.forEach(i => {
              if (submitForm[i.options.model]) {
                delete submitForm[i.options.model];
              }
            });
          } else {
            delete submitForm[obj.options.model];
          }
          this.submitForm = submitForm;
          dataList.splice(index, 1);
        } else {
          // 否则为添加
          const copyItem = this.copyNewItem(obj);
          copyItem.isCopy = true; // 添加标识为复制表单
          dataList.splice(index + copySameClassArr.length, 0, copyItem);
          copySameClassArr.push(copyItem.key);
        }
        // 根据同复制表单项数组命名复制名称，带数字自动排序
        dataList.forEach(i => {
          if (i.key.includes(originKey)) {
            if (copySameClassArr.length > 1) {
              i.options.copyName = i.options.name + (copySameClassArr.indexOf(i.key) + 1);
            } else {
              i.options.copyName = '';
            }
          }
        });
        this.$emit('update-data', dataList);
        this.$emit('buttonClick', obj);
      } else if (obj.options && obj.options.buttonType === 'routeJump') {
        this.$emit('buttonClick', obj);
        // 路由跳转
        this.$router.push(obj.options.buttonJumpUrl);
      } else if (obj.options && obj.options.buttonType === 'urlJump') {
        this.$emit('buttonClick', obj);
        // url跳转
        window.open(obj.options.buttonJumpUrl);
      } else {
        this.$emit('buttonClick', obj);
      }
    },
    validateFormField(fileId) {
      this.$nextTick(function() {
        this.$refs.ruleForm.validateField(fileId);
      });
    },
    // 获取提交表单数据
    getData(callBack) {
      this.$refs.ruleForm.validate(valid => {
        const dataList = deepCopy(this.data);
        const formData = deepCopy(this.submitForm);
        const submitForm = {};
        const totalVerifyObj = this.getTotalVerify(dataList); // 校验计数器的数值总和
        let designateObj = {}; // 指派实施暂存数据对象
        let hasDesignate = false; // 是否有指派实施表单
        for (let key in formData) {
          // 工单回填
          if (key.includes('attachments') && formData[key]) {
            // 没有附件则直接赋值
            if (!submitForm.attachments) {
              submitForm.attachments = formData[key];
            } else {
              // 有多个包含attachments的key
              if (Array.isArray(submitForm.attachments)) {
                // 为数组则直接推
                submitForm.attachments.push(formData[key]);
              } else {
                // 转成数组
                submitForm.attachments = [submitForm.attachments, formData[key]];
              }
            }
          } else if (formData[key] !== 'nodata') {
            // 排除无效数据
            submitForm[key] = formData[key];
          }
          // 记录数值总和
          const firstName = key.split('_')[0];
          if (totalVerifyObj[firstName]) {
            if (isNaN(totalVerifyObj[firstName].total)) {
              totalVerifyObj[firstName].total = 0;
            }
            totalVerifyObj[firstName].total += formData[key] - 0;
          }
          // 指派实施组表单需要遍历判断是否有节点和实施组并拼接数据
          if (key.includes('approveFlowNodeId') || key.includes('groupUuids')) {
            hasDesignate = true;
            let formKey = key.split('_')[1];
            let formKeyType = key.split('_')[0];
            if (!designateObj[formKey]) {
              designateObj[formKey] = {};
            }
            designateObj[formKey][formKeyType] = formData[key];
          }
        }
        // 有实施组，生成符合接口的数据格式
        if (hasDesignate) {
          let approveNodeGroupMap = {}; // key是节点，value 是指派实施组
          for (let key in designateObj) {
            designateObj[key].approveFlowNodeId.split(',').forEach(i => {
              approveNodeGroupMap[i] = designateObj[key].groupUuids ? designateObj[key].groupUuids.map(i => 'role:' + i) : []; // 先固定成用 role 后面根据 candidateGroups 判断用哪个
            });
          }
          submitForm.approveNodeGroupMap = approveNodeGroupMap;
        }
        // 判断数值总和是否超过
        for (let key in totalVerifyObj) {
          if (totalVerifyObj[key].total > totalVerifyObj[key].sumTotal) {
            valid = false;
            this.$YMessage.warn(`${totalVerifyObj[key].name}数值总和超过了${totalVerifyObj[key].sumTotal}`);
          }
        }
        callBack(valid, submitForm);
      });
    },
    // 计数器类型数值总和
    getTotalVerify(dataList) {
      let totalVerifyObj = {}; // 校验数值总和
      dataList.forEach(item => {
        // 计数器类型且非复制项开启了数值总和上限
        if (item.type === 'number' && item.options.sumTotalCheck && !item.isCopy) {
          totalVerifyObj[item.options.model] = {
            sumTotal: item.options.sumTotal,
            name: item.options.name,
          };
        }
        if (item.type === 'combination' && !item.isCopy) {
          totalVerifyObj = { ...totalVerifyObj, ...this.getTotalVerify(item.list) };
        }
      });
      return totalVerifyObj;
    },
    // 通过表单不变key获取对应表单项
    getKeyItem(key, array = this.data) {
      let arr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.key.includes(key)) {
          arr.push(element);
        }
        if (element.list) {
          arr = arr.concat(this.getKeyItem(key, element.list));
        }
      }
      return arr;
    },
    // 根据表单逻辑判断是否可以显示
    judgeShow(obj) {
      const logicRules = { ...this.logicRules };
      const submitForm = { ...this.submitForm };
      let judgeObjKey = obj.key;
      if (obj.isCopy) {
        // 判断复制项同源项一致
        judgeObjKey = judgeObjKey
          .split('_')
          .slice(0, -1)
          .join('_');
      }
      if (logicRules[judgeObjKey]) {
        let showFlag = true; // 且关系条件下，只要一个不满足则为false
        let isUnuseValue = false; // 表单规则值为无效值，则直接隐藏
        for (let key in logicRules[judgeObjKey]) {
          const formItemArr = this.getKeyItem(key); // 控制表单项
          for (let index = 0; index < formItemArr.length; index++) {
            const formItem = formItemArr[index];

            // 避免已删除却还保留规则的表单项
            // choseFirstOne和noChose等不要做显示判断，先返回false隐藏，等选中值后再判断
            // 有效值才能根据判断
            if (
              formItem &&
              !['choseFirstOne', 'noChose'].includes(submitForm[formItem.options.model]) &&
              isUsefulValue(submitForm[formItem.options.model])
            ) {
              // 若控制表单值有符合逻辑规则则返回true显示
              switch (formItem.type) {
                // 多选是值包含了符合显示规则的选项
                case 'checkbox':
                  for (let index = 0; index < logicRules[judgeObjKey][key].length; index++) {
                    if (
                      submitForm[formItem.options.model] &&
                      submitForm[formItem.options.model].includes(logicRules[judgeObjKey][key][index] + '')
                    ) {
                      if (!obj.options.logicRulesIsAnd) return true;
                    } else {
                      showFlag = false;
                    }
                  }
                  break;
                default:
                  if (logicRules[judgeObjKey][key].includes(submitForm[formItem.options.model] + '')) {
                    if (!obj.options.logicRulesIsAnd) return true;
                  } else {
                    showFlag = false;
                  }
              }
            } else {
              showFlag = false;
              isUnuseValue = true;
            }
          }
        }
        if (showFlag) return true; //且关系逻辑规则都满足则显示
        if (isUnuseValue) return false;
        let flag = true;
        this.data.forEach(item => {
          // 同组件标识，不同key若存在，则不能清空之前的值，否则会导致同组件标识的组件更新不了表单提交的数据
          if (item.key !== judgeObjKey && item.options.model === obj.options.model) flag = false;
        });
        // 有对应判断表单项存在且值有效，还是被判为隐藏，清空之前的值
        if (flag) {
          this.$set(this.submitForm, obj.options.model, undefined); // 被隐藏后要清空之前的值
        }
        return false;
      }
      return true;
    },
    // 给Item项更新最新的选项给formGenerator
    updateRequestOptions(obj) {
      this.requestOptions = Object.assign(this.requestOptions, obj);
    },
  },
};
</script>
