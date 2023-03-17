<template>
  <div class="docBox">
    <!-- 组件标题和说明 -->
    <title-detail title="yuejizuo-form-making 基于 Vue2 和 wh-component 组件库的可视化低代码表单设计器" detail="" />
    <declareList :value="declareList" title="yuejizuo-form-making 一共两个组件" />
    <funTitleDetail title="安装" detail="npm i yuejizuo-form-making"></funTitleDetail>
    <funTitleDetail title="使用" detail="注意先安装 wh-component，再使用表单设计器"></funTitleDetail>
    <pre class="line-numbers">
        <code class="language-javaScript">// 注册表单设计器
        import yuejizuoFormMaking from 'yuejizuo-form-making';
        import 'yuejizuo-form-making/lib/yuejizuo-form-making.css';
        import 'yuejizuo-form-making/src/styles/index.less';
        Vue.use(yuejizuoFormMaking); 
     </code>
    </pre>
    <funTitleDetail title="表单设计" detail="点击如下跳转按钮去设计"></funTitleDetail>
    <y-button type="primary" @click="goMakingForm">设计制作表单页面</y-button>
    <funTitleDetail title="表单设计器组件" detail="YjzFormMaking 代码如下"></funTitleDetail>
    <pre class="line-numbers">
        <code class="language-html" v-text="html"> </code>
        <code class="language-JavaScript" v-text="js"> </code>
    </pre>
    <funTitleDetail title="表单渲染组件" detail="YjzFormGenerator 代码如下"></funTitleDetail>
    <pre class="line-numbers">
        <code class="language-html" v-text="html2"> </code>
        <code class="language-JavaScript" v-text="js2"> </code>
    </pre>
    <api-table :data="tableData" title="YjzFormGenerator 表单渲染组件 API"></api-table>
    <api-table :data="tableData2" title="YjzFormMaking 表单设计器组件 API" detail="方法都是通过设计器组件实例调用"></api-table>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      html: `<div style="height:100vh;">
        <y-button-group reversed style="margin: 8px 12px" :buttonList="buttonList"></y-button-group>
            <YjzFormMaking ref="yjzmkform" style="height:100%" />
        <y-modal title="表单数据" :visible="modalVisible" @ok="ok" @cancel="modalVisible = false">
            <y-textarea v-model="jsonFormData" />
        </y-modal>
    </div>`,
      html2: `<div class="show-box">
      <YjzFormGenerator v-model="formDesignData" ref="yjzmkform" />
      <y-button @click="submit" type="primary">提交表单</y-button>
    </div>`,
      js: `export default {
        name: 'myformMaking',
        data() {
            return {
            jsonFormData: '',
            modalVisible: false,
            buttonList: [
                {
                text: '生成数据',
                type: 'primary',
                click: () => {
                    this.getjson();
                },
                },
                {
                text: '复制数据',
                click: () => {
                    const _this = this;
                    this.$copyText(this.$refs.yjzmkform.getJSON()).then(
                    function(e) {
                        _this.$YMessage.success('数据已复制');
                        console.log('复制成功', e);
                    },
                    function(e) {
                        _this.$YMessage.error('数据复制失败，请手动尝试复制');
                        console.log('复制失败', e);
                    }
                    );
                },
                },
                {
                text: '输入渲染数据',
                click: () => {
                    this.modalVisible = true;
                },
                },
                {
                  text: '查看表单',
                  click: () => {
                   this.$refs.yjzmkform.checkFormConfig().then(({ flag, emptyOptionsName, emptyTitleIndex }) => {
                      if (flag) {
                        localStorage.setItem('makingformData', this.$refs.yjzmkform.getJSON());
                        localStorage.setItem('makingformLogicFormRules', JSON.stringify(this.$refs.yjzmkform.getLogicFormRules()));
                        this.$router.push({
                          name: 'yjzformGenerator',
                        });
                        return;
                      }
                      let errMessage = '';
                      if (emptyOptionsName.length > 0) {
                        errMessage += emptyOptionsName.join() + '不能存在为空的选项；';
                      }
                      if (emptyTitleIndex.length > 0) {
                        errMessage += '第' + emptyTitleIndex.join() + '个组件名称不能为空；';
                      }
                      this.$YMessage.error(errMessage);
                    });
                },
              },
            ],
            };
        },
        methods: {
            getjson() {
            alert(this.$refs.yjzmkform.getJSON());
            },
            ok() {
            this.$refs.yjzmkform.setJSON(this.jsonFormData);
            this.modalVisible = false;
            },
        },
    };`,
      js2: `export default {
        name: 'myFormGenerator',
        methods: {
            submit() {
            this.$refs.yjzmkform.getData((valid, formData) => {
                alert('\${valid ? '表单校验通过' : '表单校验未通过'}：\${JSON.stringify(formData)}');
            });
            },
        },
        created() {
            let makingformData = localStorage.getItem('makingformData');
            if (makingformData) {
                this.formDesignData = JSON.parse(makingformData);
            }
        },
        data() {
            return {
            formDesignData: [],
            };
        },
        ;`,
      declareList: [
        'YjzFormGenerator 表单生成器组件，通过json快速渲染出表单页面。',
        ' YjzFormMaking 表单设计器组件，通过可视化方式制作表单页面',
      ],
      tableData: [
        {
          params: 'buttonClick',
          explain: '按钮点击事件回调',
          type: 'function(formItem)',
          default: '',
        },
        {
          params: 'orderInfo',
          explain: '工单详情信息，直接传请求 /operation-details 接口返回的整个数据对象，用于于业务组件印章名称、工单回填、指派实施组',
          type: 'Object',
          default: '',
        },
        {
          params: 'metaData',
          explain: '额外的信息，例如传 { orgId } 给获取系统名称数据来源过滤',
          type: 'Object',
          default: '',
        },

        {
          params: 'getData',
          explain: '获取填写的表单数据，传个回调进去，callBack(valid,submitForm)',
          type: 'function(callBack)',
          default: '',
        },
        {
          params: 'v-model',
          explain: '表单渲染的数据',
          type: 'Array',
          default: '[]',
        },
        {
          params: 'logicRules',
          explain: '表单逻辑规则对象',
          type: 'Object',
          default: '{}',
        },
        {
          params: 'formInit',
          explain: '初始化mounted时是否调用initForm方法回显默认值',
          type: 'Boolean',
          default: 'true',
        },
        {
          params: 'initForm',
          explain:
            '渲染组件实例下的方法，用于初始化表单回显默认值，默认mounted生命周期时会执行一次，异步获取表单数据时，修改了v-model绑定的数据，可使用此方法回显表单默认值。形参第一个数组默认是用 v-model 绑定的表单数据数组中表单项的默认值，可不传；第二个形参为回显表单数据echoFormData，传了这个echoFormData则会用它的值去回显表单数据，第三个形参为执行完回调函数，会传回初始化后的submitForm数据对象',
          type: 'function(array,echoFormData,callBack(submitForm))',
          default: '',
        },
        {
          params: 'setForm',
          explain: '渲染组件实例下的方法，设置表单的submitForm值，可用于回显异步请求表单的值，但注意不要再执行initForm',
          type: 'function({key,value})',
          default: '',
        },
        {
          params: 'requestOptions',
          explain: '染组件实例下的属性，保存有新请求的选项数据',
          type: 'Object',
          default: '{}',
        },
        {
          params: 'submitForm',
          explain: '染组件实例下的属性，提交表单时的表单所填数据，不要直接修改该属性回显表单，要用 setForm 去修改',
          type: 'Object',
          default: '{}',
        },
      ],
      tableData2: [
        {
          params: 'setJSON',
          explain: '回显表单数据，可传 JSON数组 或 数组',
          type: 'function(json)',
          default: '',
        },
        {
          params: 'getJSON',
          explain: '获取 JSON 格式的表单数据',
          type: 'function',
          default: '',
        },
        {
          params: 'setLogicFormRules',
          explain: '回显逻辑表单设计规则',
          type: 'function(designLogicRules)',
          default: '',
        },
        {
          params: 'getLogicFormRules',
          explain:
            '获取表单数据，执行方法后会得到逻辑规则对象 { logicRules , designLogicRules } logicRules：用于渲染 YjzFormGenerator 的 logicRules 逻辑表单规则，designLogicRules：用于 YjzFormMaking 的 setLogicFormRules 回显设计表单的逻辑表单规则',
          type: 'function({ logicRules , designLogicRules })',
          default: '',
        },
        {
          params: 'checkFormConfig',
          explain:
            '检查带选项的表单是否存在为空的选项，返回一个Promise，形参为 { flag:检查是否通过, emptyOptionsName:不通过的表单名称, emptyTitleIndex:组件名称为空的组件下标 }',
          type: 'function',
          default: '',
        },
      ],
    };
  },
  methods: {
    goMakingForm() {
      let routeData = this.$router.resolve({
        name: 'yjzformMaking',
      });
      window.open(routeData.href, '_blank');
    },
  },
};
</script>
<style lang="less" scoped>
.docBox {
  padding: 24px;
}
</style>
