import Vue from 'vue';
const Bus = new Vue({
  data() {
    return {
      formList: [], // 显示的表单数据
      operateFormItem: null, // 正在操作的表单项
      // 用于渲染时的逻辑表单规则（渲染表单时判断表单是否显示隐藏）
      logicFormRules: {
        // 被控制表单项id: {
        //   控制表单项id: ['取值'], // 控制表单项id的取值满足数组数据才能显示被控制表单项
        // },
      },
      // 设计时的逻辑表单规则（生成表单时设计和回显）
      designLogicFormRules: {
        // 控制表单项id: {
        //   值1: ['被控制表单项1id','被控制表单项2id'],
        //   值2: ['被控制表单项id'],
        // },
      },
    };
  },
  methods: {
    // 清空bus的数据缓存
    clearBus() {
      this.formList = [];
      this.operateFormItem = null;
    },
    updateFormList(arr) {
      this.formList = arr;
    },
    updateOperateFormItem(obj) {
      this.operateFormItem = obj;
    },
    /**
     * 根据 designLogicFormRules 生成 logicFormRules
     */
    updateLogicFormRules() {
      let logicFormRules = {}; // 生成用于渲染的逻辑表单规则
      const newLogicRules = this.designLogicFormRules;
      for (let ctrFormKey in newLogicRules) {
        for (let ctrFormVal in newLogicRules[ctrFormKey]) {
          newLogicRules[ctrFormKey][ctrFormVal].forEach(ctrledFromKey => {
            if (!logicFormRules[ctrledFromKey]) {
              logicFormRules[ctrledFromKey] = {};
            }
            if (!logicFormRules[ctrledFromKey][ctrFormKey]) {
              logicFormRules[ctrledFromKey][ctrFormKey] = [];
            }
            logicFormRules[ctrledFromKey][ctrFormKey].push(ctrFormVal);
          });
        }
      }
      this.logicFormRules = logicFormRules;
    },
    /*
      controlFormKey 被控制控制表单项不变的key        string
      optionValue 控制表单项取值                string
      controledFormKey 控制表单项不变的key    array
    */
    // updateLogicFormRules(controlFormKey, controledFormKey, optionValue) {
    //   const logicFormRules = this.logicFormRules;
    //   if (!logicFormRules[controlFormKey]) {
    //     logicFormRules[controlFormKey] = {};
    //   }
    //   logicFormRules[controlFormKey][controledFormKey] = [...optionValue];
    // },

    /**
     * controlFormKey 控制表单项key
     * optionValue 控制表单项值
     * controledFormKeyArr 被控制表单项key
     */
    updateDesignLogicFormRules(controlFormKey, optionValue, controledFormKeyArr) {
      const designLogicFormRules = this.designLogicFormRules;
      if (!designLogicFormRules[controlFormKey]) {
        designLogicFormRules[controlFormKey] = {};
      }
      designLogicFormRules[controlFormKey][optionValue] = [...controledFormKeyArr];
    },

    // 清空无效的设计表单规则
    clearDesignLogicFormRules() {
      const designLogicFormRules = JSON.parse(JSON.stringify(this.designLogicFormRules));
      for (let key in designLogicFormRules) {
        if (!this.hasFormKey(key)) {
          delete designLogicFormRules[key];
        }
      }
      this.designLogicFormRules = designLogicFormRules;
    },
    // 判断表单key是否还在formList里面
    hasFormKey(key, arr = this.formList) {
      for (let index = 0; index < arr.length; index++) {
        const i = arr[index];
        if (i.key === key) {
          return true;
        }
        if (i.list && i.list.length > 0) {
          if (this.hasFormKey(key, i.list)) {
            return true;
          }
        }
      }
      return false;
    },
  },
});

export default Bus;
