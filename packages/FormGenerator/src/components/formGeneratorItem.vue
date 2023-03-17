<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden" :style="formItemstyle">
    <y-form-model-item
      :label="type !== 'noLabel' ? formItemData.options.copyName || formItemData.options.name : ''"
      :prop="formItemData.options.model"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <!-- 起止时间 -->
      <y-range-picker
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        :format="formItemData.options.format"
        autoWidth
        v-model="modelValue"
        v-if="formItemData.type === 'dateRange'"
      />
      <!-- 日期 -->
      <y-date-picker
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        :format="formItemData.options.format"
        v-model="modelValue"
        autoWidth
        v-if="formItemData.type === 'date'"
        :placeholder="getPlaceHolder(formItemData)"
      />
      <!-- 多行文本 -->
      <y-textarea
        :style="{ ...widthStyle }"
        autoWidth
        :disabled="formItemData.options.disabled"
        :fixedNumber="formItemData.options.maxLength !== 0"
        :maxLength="formItemData.options.maxLength"
        v-model="modelValue"
        v-if="formItemData.type === 'textarea'"
        :placeholder="getPlaceHolder(formItemData)"
      />
      <!-- 单行文本 -->
      <y-input
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        autoWidth
        v-model="modelValue"
        :prefix="formItemData.options.prefix"
        :suffix="formItemData.options.suffix"
        v-if="formItemData.type === 'input'"
        :placeholder="getPlaceHolder(formItemData)"
      />
      <!-- 计数器 -->
      <y-input-number
        :style="{ ...widthStyle }"
        autoWidth
        @minus="validateFormField"
        @plus="validateFormField"
        @blur="onValidateBlur"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        v-if="formItemData.type === 'number'"
        :min="formItemData.options.min"
        :formatter="getFormatterFunction(formItemData.options.formatter)"
        :parser="getParseFunction(formItemData.options.formatter)"
        :step="formItemData.options.step"
        :max="formItemData.options.max"
        :placeholder="getPlaceHolder(formItemData)"
        calculator
      />
      <!-- 单选框 -->
      <y-radio-group
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        autoWidth
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        v-if="formItemData.type === 'radio'"
        :radio="false"
        bodered
      >
        <y-radio-content v-for="item in optionsData" :key="item.value" :value="item.value">
          {{ item.label || item.value }}
        </y-radio-content>
      </y-radio-group>
      <!-- 下拉框，赋值则会看不到placeholder -->
      <YInfiniteSelect
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-if="formItemData.type === 'select' && !formItemData.options.defaultValue"
        :options="optionsData"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
        v-model="modelValue"
        :showSearch="formItemData.options.filterable"
        :placeholder="getPlaceHolder(formItemData)"
        @dropdownVisibleChange="selectDropdownVisibleChange"
        :dropdownClassName="formItemData.options.remoteType === 'privateIp' ? 'hiddenDropdown' : ''"
      />
      <YInfiniteSelect
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-else-if="formItemData.type === 'select' && formItemData.options.defaultValue"
        v-model="modelValue"
        :options="optionsData"
        :showSearch="formItemData.options.filterable"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
        :placeholder="getPlaceHolder(formItemData)"
        @dropdownVisibleChange="selectDropdownVisibleChange"
        :dropdownClassName="formItemData.options.remoteType === 'privateIp' ? 'hiddenDropdown' : ''"
      />

      <!-- 开关 -->
      <div class="y-switch-item" v-if="formItemData.type === 'switch'">
        <y-switch v-model="modelValue" :disabled="formItemData.options.disabled"></y-switch>
      </div>

      <!-- 上传附件 -->
      <div :style="{ ...widthStyle }" class="y-file-upload" v-if="formItemData.type === 'fileupload'">
        <a-upload
          :disabled="formItemData.options.disabled"
          :before-upload="beforeUpload"
          :remove="remove"
          name="file"
          :fileList="fileList2"
          :multiple="formItemData.options.multiple"
          :accept="formItemData.options.accept"
        >
          <y-button :disabled="formItemData.options.disabled">
            <y-svg-icon icon-class="icon-fileupload" style="margin-right: 4px" />上传附件</y-button
          >
        </a-upload>
        <span class="file-upload-text" v-if="getPlaceHolder(formItemData)">{{ getPlaceHolder(formItemData) }}</span>
      </div>

      <!-- 复选框 -->
      <y-link-tag
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        :data="optionsData"
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        v-if="formItemData.type === 'checkbox'"
      >
      </y-link-tag>
      <!-- 添加按钮 -->
      <y-button
        v-if="formItemData.options.buttonType && !formItemData.isCopy"
        @click="$emit('clickBtn', formItemData)"
        class="action-button"
        type="primary"
        icon="plus"
      ></y-button>
      <!-- 删除按钮，复制项显示 -->
      <y-button
        class="delete-button no-bg"
        @click="$emit('clickBtn', formItemData)"
        v-if="formItemData.options.buttonType && formItemData.isCopy"
        icon-class="delete-trash"
      ></y-button>
      <!-- 轻提示 -->
      <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>

      <!-- 强提示 -->
      <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
        {{ formItemData.options.strongTipsContent }}
      </div>
    </y-form-model-item>
    <!-- 私有网络抽屉 -->
    <PrivateIpDrawer
      :formItemData="formItemData"
      :submitForm="submitForm"
      :modelValue="modelValue"
      v-if="privateIpVisible"
      @drawerCtrl="privateIpCtrl"
      @submit="privateIpSubmit"
    />
  </div>
</template>
<script>
import Api from '@api';
import Bus from '../Bus';
import { getArrUniq } from '@src/utils/common.js';
import validaeMixins from '@src/mixins/validaeMixins';
import privateIpMixins from '@src/mixins/privateIpMixins';
export default {
  name: 'FormGeneratorItem',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  mixins: [validaeMixins, privateIpMixins],
  props: {
    // 判断是否需要label，noLabel不需要label
    type: {
      type: String,
      default: '',
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
  computed: {
    // 宽度样式
    widthStyle({ formItemData }) {
      if (formItemData.options.width) {
        return {
          flex: 'unset',
          width: formItemData.options.width,
        };
      }
      return {};
    },
    getPlaceHolder() {
      return function(obj) {
        if (obj.options.placeholderCheck) {
          return obj.options.placeholder;
        }
        return '';
      };
    },
    formItemstyle({ formItemData }) {
      // 组合组件情况下，计数器等宽度不要自动撑开，以后有组合组件
      if (['number', 'switch'].includes(formItemData.type)) {
        return {
          flex: 'unset',
        };
      }
      return {};
    },
    modelValue: {
      get({ submitForm, formItemData }) {
        // 注意避免选项还没请求回来就被设undefined了
        // 默认选第一个且选项是自定义，即选项不会变的
        if (submitForm[formItemData.options.model] === 'choseFirstOne' && formItemData.options.remoteType === 'custom') {
          const val = this.optionsData[0] ? this.optionsData[0].value : undefined;
          this.updateSubmitForm(val);
          return val;
        } else if (submitForm[formItemData.options.model] === 'noChose') {
          this.updateSubmitForm(undefined);
          return undefined;
        } else if (formItemData.options.remoteType === 'privateIp') {
          if (!submitForm[formItemData.options.model]) return '';
          // 私网地址
          if (formItemData.options.multiple) {
            // 多选
            return submitForm[formItemData.options.model].map(i => i.uuid).join();
          } else {
            // 单选
            return submitForm[formItemData.options.model].uuid;
          }
        } else if (formItemData.type === 'checkbox') {
          if (Array.isArray(submitForm[formItemData.options.model])) {
            return submitForm[formItemData.options.model].join();
          }
        }
        return submitForm[formItemData.options.model];
      },
      set(val) {
        this.updateSubmitForm(val);
      },
    },
    // 附件上传数据
    fileList: {
      get({ submitForm, formItemData }) {
        return submitForm[formItemData.options.model];
      },
      set(val) {
        this.updateSubmitForm(val);
      },
    },
    // 可显示的选项
    optionsData({ formItemData, initOptions }) {
      return initOptions.filter(i => {
        if (formItemData.options.hideOptions) {
          return !formItemData.options.hideOptions.includes(i?.value);
        }
      });
    },
  },
  data() {
    return {
      apiFlag: false, // 第一次请求选项后就要改为true
      fileList2: [],
      initOptions: this.formItemData.options.options || [], // 初始化表单选项
      libraryTreeDetails: [], // 数据关联表详情
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        this.triggerDataAssociate(val);
      },
    },
    optionsData(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(oldVal) && this.apiFlag) return; // 新旧值一样就不用更新值
      // 每次相关带选项的组件选项变更时
      if (val && ['select', 'radio', 'checkbox'].includes(this.formItemData.type)) {
        const { submitForm, formItemData } = this;
        // 若是默认选第一个就要重新更新submitForm的值
        if (submitForm[formItemData.options.model] === 'choseFirstOne' && val[0]) {
          this.updateSubmitForm(val[0].value);
        } else if (submitForm[formItemData.options.model] !== 'choseFirstOne') {
          // 若是已有绑定值则判断新的选项中是否有该值，有则不变，否则置空
          let flag = false;
          for (let index = 0; index < val.length; index++) {
            const element = val[index];
            if (element.value === submitForm[formItemData.options.model]) {
              flag = true;
              break;
            }
          }
          // 没有之前的选项值，置空掉；若下拉框选择的是对象类型则不做判断；选项为空则不执行，避免选项在请求中就清掉默认值了
          if (!flag && typeof submitForm[formItemData.options.model] !== 'object' && val.length > 0) {
            this.updateSubmitForm(undefined);
          }
        }
        this.apiFlag = true;
        // 将最新的选项暴露出去
        this.$emit('updateRequestOptions', { [this.formItemData.options.model]: val });
      }
    },
  },
  created() {
    this.getOptions();
    // 逻辑表单显示隐藏，没有值的时候恢复默认值
    this.$nextTick(function() {
      if (!this.modelValue) {
        this.syncUpdateSubmitForm(this.formItemData.options.defaultValue);
      }
    });
  },
  methods: {
    // 下拉框展开下拉
    selectDropdownVisibleChange(bool) {
      if (bool && this.formItemData.options.remoteType === 'privateIp') {
        this.privateIpCtrl(true);
      }
    },
    // 校验当前单个表单项
    validateFormField() {
      this.$nextTick(function() {
        this.$emit('validateFormField', this.formItemData.options.model);
      });
    },
    // 触发关联表关联关系
    triggerDataAssociate(val = this.modelValue) {
      // 数据来源为数据关联表且开启数据关联
      if (val && this.formItemData.options.remoteType === 'library' && this.formItemData.options.dataAssociation) {
        const array = this.optionsData;
        let target = {}; // 关联该表值（字典值）对象
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          if (element.value && element.value === val) {
            target = element;
            continue;
          }
        }
        Bus.searchDataAssociate(this.formItemData.options.remoteLibraryId, this.formItemData.options.remoteLibraryHeadId, target.uuid);
      }
    },
    // 文件上传
    beforeUpload(file) {
      let flag = true;
      const acceptType = this.formItemData.options.accept && this.formItemData.options.accept.split(',');
      // 限制上传类型
      if (this.formItemData.options.accept && acceptType) {
        let typeFlag = false;
        const fileType = file.name.slice(file.name.lastIndexOf('.'));
        acceptType.forEach(type => {
          if (type.includes(fileType)) {
            typeFlag = true;
          }
        });
        if (!typeFlag) {
          this.$message.error(`不支持${fileType}文件类型上传`);
          flag = false;
        }
      }
      // 限制文件上传大小
      const fileSize = file.size / 1024 / 1024; // MB单位文件大小
      if (!fileSize) {
        this.$message.error(`文件内容不能为空`);
        flag = false;
      }
      if (this.formItemData.options.limitSize > 0 && fileSize > this.formItemData.options.limitSize) {
        this.$message.error(`文件大小超过${this.formItemData.options.limitSize}MB`);
        flag = false;
      }
      // 限制上传数据
      if (this.fileList && this.formItemData.options.limit && this.fileList.length > this.formItemData.options.limit) {
        this.$message.error(`文件数量超过${this.formItemData.options.limit}个`);
        flag = false;
      }
      if (flag) {
        // 请求将附件上传
        const formData = new FormData();
        const key = 'uploadFile';
        this.$YMessage.loading({ content: '上传中...', key, duration: 0 });
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('fileType', this.formItemData.options.fileType);
        Api.uploadAttachment(formData)
          .then(res => {
            this.$YMessage.success({ content: '上传成功', key, duration: 2 });
            if (!this.fileList) {
              this.fileList = [{ ...res, uid: file.uid }];
            } else {
              this.fileList = this.fileList.concat([{ ...res, uid: file.uid }]);
            }
            this.fileList2.push(file);
          })
          .catch(err => {
            if (err.message) {
              this.$YMessage.error({ content: err.message, key, duration: 2 });
            } else {
              this.$YMessage.error({ content: '上传失败', key, duration: 2 });
            }
          });
      }
      return flag;
    },
    // 文件移除
    remove(file) {
      const key = 'deleteFile';
      this.$YMessage.loading({ content: '删除中...', key, duration: 0 });
      const array = this.fileList;
      let uuid = '';
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.uid === file.uid) {
          uuid = element.fileId;
        }
      }
      Api.deleteAttachment(uuid)
        .then(() => {
          this.$YMessage.success({ content: '删除成功', key, duration: 2 });
          const fL = [...this.fileList];
          this.fileList = fL.filter(i => i.fileId !== uuid);
          this.fileList2 = this.fileList2.filter(i => i.uid !== file.uid);
        })
        .catch(err => {
          if (err.message) {
            this.$YMessage.error({ content: err.message, key, duration: 2 });
          } else {
            this.$YMessage.error({ content: '删除失败', key, duration: 2 });
          }
        });
    },
    // 更新表单提交数据
    updateSubmitForm(val, newObj) {
      let obj = { ...this.submitForm };
      if (newObj) {
        obj = Object.assign(obj, newObj);
      } else {
        let model = this.formItemData.options.model;
        obj[model] = val;
      }
      this.$emit('update-submitForm', obj);
    },
    // 同步更新表单提交数据（多个表单同时更新submitForm时，确保下个表单要更新的submitForm，是上个表单的更新后的值）
    syncUpdateSubmitForm(val, newObj) {
      let obj = { ...this.submitForm };
      if (newObj) {
        obj = Object.assign(obj, newObj);
      } else {
        let model = this.formItemData.options.model;
        obj[model] = val;
      }
      this.$emit('updateForm', obj);
    },
    getFormatterFunction(str) {
      return function(value) {
        return str ? value + str : value;
      };
      // return Function('value', str);
    },
    getParseFunction(str) {
      return function(value) {
        return value.replace(str, '');
      };
      // const strTmpl = str.match(/(?<=`)(.+?)(?=`)/g)[0]; // 匹配字符串模板内容
      // return function (value) {
      //   return value
      //     .replace(strTmpl.slice(0, strTmpl.indexOf('${')), '')
      //     .replace(strTmpl.slice(strTmpl.indexOf('}') + 1, strTmpl.length), '');
      // };
    },
    // 获取选项
    getOptions() {
      const remoteType = this.formItemData.options.remoteType;
      const formItemData = this.formItemData;
      if (remoteType === 'dictionary') {
        // 字典目录查询字典值
        this.getDictionaryCode(formItemData.options.remoteDictionaryId);
      } else if (remoteType === 'library') {
        // 数据关联表
        this.getLibraryDetails(formItemData.options.remoteLibraryId, formItemData.options.remoteLibraryHeadId);
      } else if (remoteType === 'businessSystemName') {
        // 系统名称
        this.getBusinessSystemOptions();
      } else if (remoteType === 'privateIp') {
        const submitForm = this.submitForm;
        if (!submitForm[formItemData.options.model]) return;
        // 私网地址
        if (formItemData.options.multiple) {
          // 多选
          this.initOptions = submitForm[formItemData.options.model].map(i => {
            return {
              ...i,
              label: i.businessPrivateIp,
              value: i.uuid,
            };
          });
        } else {
          // 单选
          const obj = submitForm[formItemData.options.model];
          this.initOptions = [
            {
              ...obj,
              label: obj.businessPrivateIp,
              value: obj.uuid,
            },
          ];
        }
      }
    },
    // 获取字典值
    getDictionaryCode(val) {
      Api.getDictionaryCode({ itemUuid: val }).then(res => {
        this.initOptions = res.map(i => {
          return {
            ...i,
            value: i.uuid,
            label: i.code,
          };
        });
      });
    },
    // 获取表详情
    getLibraryDetails(uuid, headId) {
      Bus.updateLibraryTable(uuid, headId).then(options => {
        this.initOptions = getArrUniq(options, 'value');
        this.triggerDataAssociate();
      });
    },
    // 获取业务系统
    getBusinessSystemOptions() {
      Api.getBusinessSystem(Bus.metaData).then(res => {
        this.initOptions = res.map(i => {
          return {
            ...i,
            label: i.name,
            value: i.uuid,
          };
        });
      });
    },
  },
};
</script>
