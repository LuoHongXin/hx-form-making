<template>
  <div class="myFormGenerator">
    <div class="show-box">
      <YjzFormGenerator
        :orderInfo="orderInfo"
        :metaData="{ orgId: 123123 }"
        v-model="formDesignData"
        @buttonClick="buttonClick"
        :logicRules="formLogicFormRules.logicRules"
        ref="yjzmkform"
      />
      <y-button @click="submit" type="primary">提交表单</y-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myFormGenerator',
  methods: {
    buttonClick(l) {
      console.log(l, 555);
    },
    submit() {
      this.$refs.yjzmkform.getData((valid, formData) => {
        // alert(`${valid ? '表单校验通过' : '表单校验未通过'}：${JSON.stringify(formData)}`);
        console.log(`${valid ? '表单校验通过' : '表单校验未通过'}：${JSON.stringify(formData)}`);
      });
    },
  },
  mounted() {
    let makingformData = localStorage.getItem('makingformData');
    let formLogicFormRules = localStorage.getItem('makingformLogicFormRules');
    if (makingformData) {
      const _this = this;
      _this.formDesignData = JSON.parse(makingformData);
    }
    this.$nextTick(function () {
      this.$refs.yjzmkform.initForm(null, function (obj) {
        console.log(obj, 77777);
      });
    });
    if (formLogicFormRules) {
      this.formLogicFormRules = JSON.parse(formLogicFormRules);
    }
  },
  data() {
    return {
      formDesignData: [],
      formLogicFormRules: {},
      // 订单信息
      orderInfo: {
        uuid: '99e1b20c76d23bf243fa277885164538',
        code: '20221026113836257385',
        userName: 'admin',
        account: 'admin',
        userUuid: '12941e0b8ff947edb3ecc2dc376b3a04',
        state: 'APPROVE_PENDING',
        workflowType: 'RESOURCE_APPLY',
        createTime: 1666755516,
        attatchment: '33bdefc926ed7b6293e135f52167dd0d',
        updateTime: 1666755639,
        description: '111',
        subject: null,
        recall: true,
        items: [
          {
            uuid: 'f64d01c07b724da7ac6fd4c669cec27c',
            code: '20221026113836257385-001',
            orderUuid: '99e1b20c76d23bf243fa277885164538',
            resourceType: 'VOLUME_FILE_STORAGE',
            productUuid: '8dfa7d7f06bb1cbd5f266eb2535a20dc',
            productName: '国产化文件存储服务',
            state: 'APPROVE_PENDING',
            approveState: '1',
            fee: '0',
            price: '0',
            groupId: '1cbi40ie5474i',
            portalType: 'operation',
            portalItemUuid: '980d365621276799b6b323fce5080054',
            billRuleUuid: null,
            resourceUuid: null,
            resourceName: '存储',
            flowStates: [
              {
                flowState: 'implement',
                flowStateName: '云平台实施',
                flowTaskId: 'f5144615-54df-11ed-b68e-1611e5e1f09f',
                flowInstanceId: 'ac70d81e-54df-11ed-b68e-1611e5e1f09f',
              },
            ],
            createTime: 1666755516,
            updateTime: 1666755639,
            expiryType: null,
            expiryValue: null,
            metaData: {
              metaData: {
                writebacked: {
                  implement: true,
                },
              },
              specs: [
                {
                  metaData: {},
                  price: '0',
                  fee: '0',
                  num: 1,
                  fields: [
                    {
                      name: '系统名称',
                      definitionKey: 'busSysName',
                      text: '广电社区服务中心',
                      value: '广电社区服务中心',
                    },
                    {
                      name: '系统标识',
                      definitionKey: 'busSysUuid',
                      value: '01aed633927541d9bcee25727fdca0c6',
                    },
                    {
                      name: '所属机房',
                      definitionKey: 'machineRoom',
                      text: '南基机房',
                      value: '958db350ef5b9772257fb2091ebd696d',
                    },
                    {
                      name: '网络区域',
                      definitionKey: 'networkArea',
                      text: '政务外网1区',
                      value: '5afa945b01befba9dec866566303ec81',
                    },
                    {
                      name: '容量大小',
                      definitionKey: 'capacity',
                    },
                    {
                      name: '用户名',
                      definitionKey: 'username',
                      text: 'root',
                      value: 'root',
                    },
                    {
                      name: '目录名',
                      definitionKey: 'dirName',
                      text: '/test1137',
                      value: '/test1137',
                    },
                    {
                      name: 'NAS挂载需求说明',
                      definitionKey: 'nasMountRequirements ',
                      value: '111',
                    },
                  ],
                },
              ],
            },
            charge: false,
            traceId: null,
            traceName: '',
            workflowUuid: 'a2281c02f5ea0d93c6d948e06af2ee32',
            constructState: 'CONSTRUCTION_READY',
            num: 1,
            workflowType: 'RESOURCE_APPLY',
            serviceType: 'CLOUD_PROC',
            recall: null,
            writebackInfo: {
              implement: {
                uuid: '90df1a0de650ef00ff2d16dce9c8d45c',
                orderItemUuid: 'f64d01c07b724da7ac6fd4c669cec27c',
                orderUuid: '99e1b20c76d23bf243fa277885164538',
                metaData: {
                  headers: [
                    {
                      hidden: false,
                      name: '网络区域',
                      key: 'networkArea',
                    },
                    {
                      hidden: false,
                      name: '目录用户',
                      key: 'dirUser',
                    },
                    {
                      hidden: false,
                      name: '用户密码',
                      key: 'userPassword',
                    },
                    {
                      hidden: false,
                      name: '配额总量(GB)',
                      key: 'quotaCapacity',
                    },
                    {
                      hidden: true,
                      name: '申请单号',
                      key: 'orderItemCode',
                    },
                    {
                      hidden: true,
                      name: '申请人',
                      key: 'applicantName',
                    },
                    {
                      hidden: false,
                      name: '所属系统',
                      key: 'busSysName',
                    },
                    {
                      hidden: true,
                      name: '所属机房',
                      key: 'machineRoom',
                    },
                    {
                      hidden: false,
                      name: '申请单位',
                      key: 'applicantUnitName',
                    },
                    {
                      hidden: false,
                      name: '目录名称',
                      key: 'dirName',
                    },
                  ],
                  dataList: [
                    {
                      networkArea: '政务外网1区',
                      dirUser: 'root',
                      userPassword: 'root123',
                      quotaCapacity: 100,
                      orderItemCode: '20221026113836257385-001',
                      applicantName: 'admin',
                      busSysName: '广电社区服务中心',
                      applicantUnitName: '测试test19366',
                      dirName: '/test1137',
                    },
                  ],
                },
                nodeKey: 'implement',
                attachmentUuid: '5bcb0f3dcc506d11961bfe3ac2eb2849',
                createTime: 1666763008,
                updateTime: 1666763008,
              },
            },
          },
        ],
        metaData: {
          internalAuditUserUuid: '12941e0b8ff947edb3ecc2dc376b3a04',
        },
        productTypes: 'VOLUME_FILE_STORAGE',
        productNames: '国产化文件存储服务',
        urgency: 3,
        urgencyReason: '急急急急急急急急急急急急急急急急急急急急',
        busSysUuid: '01aed633927541d9bcee25727fdca0c6',
        busSysName: '广电社区服务中心',
        areaCode: '4400',
        files: null,
        serviceType: 'CLOUD_PROC',
        internalAuditUserName: 'admin',
        internalAuditUserUuid: '12941e0b8ff947edb3ecc2dc376b3a04',
        unitName: '测试test19366',
        unitUuid: '000tnvv40azk8rmdub79nk',
        email: '13811118888@mobile.com',
        phone: '13811118888',
        endTime: 1666763012,
      },
    };
  },
};
</script>
<style lang="less" scoped>
.myFormGenerator {
  height: 100vh;
  display: flex;
  overflow: auto;
  justify-content: center;
  .show-box {
    background-color: #fff;
    width: 1200px;
    padding: 24px;
  }
}
</style>
