<template>
  <div class="mk-form-item drag-form-item" :style="formItemstyle">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>

    <y-form-model-item
      :rules="{
        required: formItemData.options.required,
        message: formItemData.options.requiredMessage,
        trigger: 'change',
      }"
      ref="formModelItem"
      :label="type !== 'noLabel' ? formItemData.options.name : ''"
      :prop="formItemData.options.model"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <!-- <template slot="label">
        <div>
          {{formItemData.options.name }}
        </div>
      </template> -->

      <!-- 起止时间 -->
      <y-range-picker
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        :format="formItemData.options.format"
        autoWidth
        v-model="rangeModelValue"
        v-if="formItemData.type === 'dateRange'"
      />

      <!-- 日期 -->
      <y-date-picker
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        :format="formItemData.options.format"
        v-model="dateModelValue"
        autoWidth
        v-if="formItemData.type === 'date'"
        :placeholder="getPlaceHolder(formItemData)"
      />

      <!-- 多行文本 -->
      <!-- :rows="formItemData.options.rows" -->
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
        autoWidth
        :disabled="formItemData.options.disabled"
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
        @blur="onValidateBlur"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        v-if="formItemData.type === 'number'"
        :min="formItemData.options.min"
        :formatter="getFormatterFunction(formItemData.options.formatter)"
        :step="formItemData.options.step"
        :max="formItemData.options.max"
        :parser="getParseFunction(formItemData.options.formatter)"
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

      <!-- 下拉框，赋值则会看不到placeholder -->
      <y-select
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-if="formItemData.type === 'select' && !formItemData.options.defaultValue"
        :options="optionsData"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
        :showSearch="formItemData.options.filterable"
        :placeholder="getPlaceHolder(formItemData)"
        :dropdownClassName="formItemData.options.remoteType === 'privateIp' ? 'hiddenDropdown' : ''"
      />
      <y-select
        :style="{ ...widthStyle }"
        :disabled="formItemData.options.disabled"
        v-else-if="formItemData.type === 'select' && formItemData.options.defaultValue"
        v-model="modelValue"
        :options="optionsData"
        :showSearch="formItemData.options.filterable"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
        :placeholder="getPlaceHolder(formItemData)"
        :dropdownClassName="formItemData.options.remoteType === 'privateIp' ? 'hiddenDropdown' : ''"
      />

      <!-- 开关 -->
      <div class="y-switch-item">
        <y-switch v-model="modelValue" :disabled="formItemData.options.disabled" v-if="formItemData.type === 'switch'"></y-switch>
      </div>

      <!-- 上传附件 -->
      <div class="y-file-upload" :style="{ ...widthStyle }" v-if="formItemData.type === 'fileupload'">
        <a-upload
          :disabled="formItemData.options.disabled"
          :before-upload="beforeUpload"
          :remove="remove"
          name="file"
          :fileList="fileList"
          :multiple="formItemData.options.multiple"
          :accept="formItemData.options.accept"
        >
          <y-button :disabled="formItemData.options.disabled">
            <y-svg-icon icon-class="icon-fileupload" style="margin-right: 4px" />上传附件</y-button
          >
        </a-upload>

        <span class="file-upload-text" v-if="getPlaceHolder(formItemData)">{{ getPlaceHolder(formItemData) }}</span>
      </div>

      <!-- 添加按钮 -->
      <y-button v-if="formItemData.options.buttonType" class="action-button" type="primary" icon="plus"></y-button>

      <!-- 轻提示 -->
      <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>

      <!-- 强提示 -->
      <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
        {{ formItemData.options.strongTipsContent }}
      </div>
    </y-form-model-item>
  </div>
</template>
<script>
// import moment from 'moment';
import validaeMixins from '@src/mixins/validaeMixins'; // 校验逻辑
export default {
  name: 'MkFormItem',
  // model: {
  //   prop: 'submitForm',
  //   event: 'update-submitForm',
  // },
  mixins: [validaeMixins],
  props: {
    // submitForm: {
    //   type: Object,
    // },
    type: {
      // noLabel - 不要label
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
  data() {
    return {
      modelValue: '',
      fileList: [], // 附件上传的文件
      dateModelValue: null,
      rangeModelValue: [null, null],
    };
  },
  watch: {
    modelValue(val) {
      if (val) {
        this.$refs.formModelItem.$refs.YFormModelItem.clearValidate();
      }
    },
    'formItemData.options.defaultValue': {
      handler(val) {
        if (this.formItemData.type === 'checkbox' && val) {
          // 复选框数据需要处理下
          if (Array.isArray(val)) {
            this.modelValue = val.join();
          } else {
            this.modelValue = val;
          }
        } else if (this.formItemData.type === 'date') {
          this.dateModelValue = val;
        } else if (this.formItemData.type === 'dateRange' && val) {
          this.rangeModelValue = val;
        } else {
          //多选
          if (this.formItemData.options.multiple) {
            const modelValue = val.reduce((curr, val) => {
              if (!['choseFirstOne', 'noChose'].includes(val)) {
                curr.push(val);
              }
              return curr;
            }, []);
            this.modelValue = modelValue;
          } else {
            if (val === 'choseFirstOne') {
              if (this.optionsData[0]) {
                this.modelValue = this.optionsData[0].value;
              } else {
                console.log('数据正在请求，请稍后再选');
                // this.$YMessage.warn('数据正在请求，请稍后再选');
              }
            } else if (val === 'noChose') {
              this.modelValue = '';
            } else {
              this.modelValue = val;
            }
          }
        }
      },
      immediate: true,
    },
  },
  computed: {
    // 宽度样式
    widthStyle({ formItemData }) {
      let o = { 'min-width': '100%' };
      if (formItemData.options.lightTipsCheck || formItemData.options.buttonType) o = {};
      if (formItemData.options.width) {
        return {
          flex: 'unset',
          width: formItemData.options.width,
          ...o,
        };
      }
      return o;
    },
    getPlaceHolder() {
      return function(obj) {
        if (obj.options.placeholderCheck) {
          return obj.options.placeholder;
        }
        return '';
      };
    },
    // 组合组件情况下，计数器等宽度不要自动撑开，以后有组合组件
    formItemstyle({ formItemData }) {
      if (['number', 'switch'].includes(formItemData.type)) {
        return {
          flex: 'unset',
        };
      }
      return {};
    },
    // 可显示的选项
    optionsData({ formItemData }) {
      return formItemData.options.options.filter(i => {
        if (formItemData.options.hideOptions) {
          return !formItemData.options.hideOptions.includes(i.value);
        }
      });
    },
    // submitForm2: {
    //   get({ submitForm }) {
    //     return submitForm;
    //   },
    //   set(val) {
    //     this.$set('update-submitForm', val);
    //   },
    // },
  },
  methods: {
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
      if (this.formItemData.options.limitSize > 0 && fileSize > this.formItemData.options.limitSize) {
        this.$message.error(`文件大小超过${this.formItemData.options.limitSize}MB`);
        flag = false;
      }
      // 限制上传数据
      if (this.fileList.length > this.formItemData.options.limit) {
        this.$message.error(`文件数量超过${this.formItemData.options.limit}个`);
        flag = false;
      }
      if (flag) {
        this.fileList.push(file);
      }

      return flag;
    },
    // 文件移除
    remove(file) {
      this.fileList = this.fileList.filter(i => i.uid !== file.uid);
    },
    getFormatterFunction(str) {
      return function(value) {
        return str ? value + str : value;
      };
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
  },
};
</script>
