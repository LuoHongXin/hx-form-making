<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden && !isHidden">
    <y-form-model-item
      :prop="formItemData.options.model"
      :label="formItemData.options.name"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
      :ref="formItemData.options.model"
    >
      <y-button
        :disabled="formItemData.options.disabled"
        type="default"
        @click="downloadTmplClick"
        v-if="formItemData.options.downloadTmplCheck"
        style="margin-right: 8px"
        >{{ formItemData.options.downloadTmplText }}</y-button
      >
      <y-button type="default" style="margin-right: 8px" v-if="formItemData.options.uploadOrderCheck" @click="uploadEvent">{{
        formItemData.options.uploadOrderText
      }}</y-button>
      <a-upload
        v-show="false"
        ref="uploadRef"
        :disabled="formItemData.options.disabled"
        accept=".xlsx"
        style="display: inline-block"
        :beforeUpload="beforeUpload"
        :fileList="[]"
        :multiple="false"
      >
        <y-button type="default" style="margin-right: 8px">{{ formItemData.options.uploadOrderText }}</y-button>
      </a-upload>
      <y-button
        :disabled="formItemData.options.disabled"
        type="default"
        @click="viewResultClick"
        v-if="formItemData.options.viewResultCheck"
        style="margin-right: 8px"
        >{{ formItemData.options.viewResultText }}</y-button
      >
      <y-button
        :disabled="formItemData.options.disabled"
        type="default"
        @click="downloadResultClick"
        v-if="formItemData.options.downloadResultCheck"
        style="margin-right: 8px"
        >{{ formItemData.options.downloadResultText }}</y-button
      >
    </y-form-model-item>
    <!-- 轻提示 -->
    <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
      <y-svg-icon icon-class="warning" />
    </y-tooltip>

    <!-- 强提示 -->
    <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
      {{ formItemData.options.strongTipsContent }}
    </div>
    <!-- 查看回填结果抽屉 -->
    <ResultTableDrawer
      :title="formItemData.options.viewResultText"
      v-if="resultTableVisible"
      :columns="resultTableColumns"
      :tableData="resultTableData"
      @drawerCtrl="resultTableCtrl"
    />
  </div>
</template>
<script>
import Api from '@api';
import ResultTableDrawer from './workOrderBackfill/resultTableDrawer.vue';
import { downLoadXls } from '@src/utils/common.js';
export default {
  name: 'FormGeneratorWorkOrderBackfill',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  components: {
    ResultTableDrawer,
  },
  props: {
    // 工单业务的信息
    orderInfo: {
      type: Object,
      default: null,
    },
    // 提交表单的数据
    submitForm: {
      type: Object,
      default: function() {
        return {};
      },
    },
    // 表单项
    formItemData: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      resultTableVisible: false,
      resultTableColumns: [],
      resultTableData: [],
    };
  },
  computed: {
    flowState({ formItemData }) {
      return formItemData.options.flowState;
    },
    // orderInfo里面的对应回填类型的信息
    writebackInfo({ orderInfo, flowState }) {
      return orderInfo && orderInfo.items[0] && orderInfo.items[0].writebackInfo && orderInfo.items[0].writebackInfo[flowState];
    },
    flowTaskId({ orderInfo, flowState }) {
      let id = '';
      orderInfo.items[0].flowStates.forEach(i => {
        if (i.flowState === flowState) {
          id = i.flowTaskId;
        }
      });
      return id;
    },
    // 若没有上传按钮，且订单信息没有对应的回填信息，则不显示当前工单回填表单
    isHidden({ writebackInfo, formItemData }) {
      return !writebackInfo && !formItemData.options.uploadOrderCheck;
    },
  },
  methods: {
    initValue() {
      if (this.writebackInfo) {
        this.updateSubmitForm('have-uploaded'); // 有上传过加上have-uploaded标识
      }
    },
    downloadResultClick() {
      if (!this.writebackInfo) {
        return this.$YMessage.error('请先上传工单');
      }
      Api.downloadFiles(this.writebackInfo.attachmentUuid)
        .then(res => {
          downLoadXls(res, '回填结果');
        })
        .catch(err => {
          if (err.message) {
            this.$YMessage.error(err.message);
          }
        });
      this.$emit('clickBtn', 'downloadResult');
    },
    // 回填结果抽屉
    resultTableCtrl(bool) {
      this.resultTableVisible = bool;
    },
    // 查看回填结果
    viewResultClick() {
      if (!this.writebackInfo) {
        return this.$YMessage.error('请先上传工单');
      }
      const writebackResultData = this.writebackInfo.metaData;
      if (writebackResultData) {
        const resultTableColumns = [];
        writebackResultData.headers.forEach(i => {
          if (!i.hidden) {
            resultTableColumns.push({
              title: i.name,
              dataIndex: i.key,
              ellipsis: true,
            });
          }
        });
        this.resultTableColumns = resultTableColumns;

        this.resultTableData = writebackResultData.dataList;
        this.resultTableCtrl(true);
        this.$emit('clickBtn', 'viewResult');
      }
    },
    // 下载模板
    downloadTmplClick() {
      Api.getTemplateDocument({
        taskId: this.flowTaskId,
        uuid: this.orderInfo.items[0].uuid,
      })
        .then(res => {
          downLoadXls(res, '模板');
        })
        .catch(err => {
          if (err.message) {
            this.$YMessage.error(err.message);
          }
        });
      this.$emit('clickBtn', 'downloadTmpl');
    },
    uploadEvent() {
      if (!this.orderInfo) {
        this.$YMessage.error('未关联工单');
        return false;
      }
      const _this = this;
      if (this.writebackInfo) {
        this.$YConfirm({
          content: '您已上传过工单，是否重新上传？',
          onOk() {
            _this.$refs.uploadRef.$el.querySelector('input').dispatchEvent(new MouseEvent('click'));
          },
          onCancel() {},
        });
      } else {
        this.$refs.uploadRef.$el.querySelector('input').dispatchEvent(new MouseEvent('click'));
      }
    },
    beforeUpload(file) {
      this.uploadFile(file);
      return false;
    },
    uploadFile(file) {
      if (file.name.slice(file.name.lastIndexOf('.')) !== '.xlsx') {
        this.$YMessage.error('仅支持xlsx文件');
        return false;
      }
      // 限制文件上传大小
      const fileSize = file.size / 1024 / 1024; // MB单位文件大小
      if (!fileSize) {
        this.$message.error(`文件内容不能为空`);
        return false;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('fileType', '1');
      const hide = this.$YMessage.loading({
        content: this.formItemData.options.name + '上传中...',
        key: 'file',
        duration: 0,
      });

      Api.writeback({ file: formData, taskId: this.flowTaskId, uuid: this.orderInfo.items[0].uuid })
        .then(res => {
          this.updateSubmitForm(res);
          this.$YMessage.success({
            content: this.formItemData.options.name + '成功',
            key: 'file',
            duration: 2,
          });
          // 触发校验
          this.$nextTick(function() {
            this.$refs[this.formItemData.options.model].$refs.YFormModelItem.onFieldBlur();
          });
          this.$emit('clickBtn', 'writeback');
        })
        .catch(err => {
          hide();
          this.$YError({
            content: err?.message,
            class: 'yjz-max-height-info-content',
          });
        });
    },
    // 更新表单提交数据
    updateSubmitForm(val) {
      const obj = { ...this.submitForm };
      obj[this.formItemData.options.model] = val;
      this.$emit('update-submitForm', obj);
    },
  },
};
</script>
<style lang="less">
.yjz-max-height-info-content {
  .ant-modal-confirm-content {
    max-height: 250px;
    overflow: auto;
  }
}
</style>
