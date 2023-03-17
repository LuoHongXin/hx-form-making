<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden">
    <!-- 审批用语 -->
    <y-form-model-item
      v-if="optionsData.length > 0"
      :label="formItemData.options.name2"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <!-- 多选 -->
      <!-- <y-link-tag
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        v-if="formItemData.options.isCheck"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        :data="optionsData"
      >
      </y-link-tag> -->
      <!-- 单选框 -->
      <!-- <y-radio-group
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        :disabled="formItemData.options.disabled"
        v-model="radioModelValue"
        autoWidth
        :radio="false"
        bodered
      >
        <y-radio-content v-for="item in optionsData" :key="item.value" :value="item.value">
          {{ item.label || item.value }}
        </y-radio-content>
        <y-button type="link" @click="viewMore(foldNum)" v-if="initOptions.length > foldNum && optionsData.length === initOptions.length"
          >收起<a-icon type="up"
        /></y-button>
        <y-button type="link" @click="viewMore()" v-else-if="initOptions.length > foldNum">查看更多<a-icon type="down" /></y-button>
      </y-radio-group> -->
      <y-describe ref="describeInstance" class="yjz-custom-describe-style">
        <y-radio-group
          :class="formItemData.options.lineFeed ? 'line-feed' : ''"
          :disabled="formItemData.options.disabled"
          v-model="radioModelValue"
          autoWidth
          :radio="false"
          bodered
        >
          <y-radio-content @click="commentClick(item)" v-for="item in initOptions" :key="item.uuid" :value="item.value">
            {{ item.label || item.value }}
          </y-radio-content>
          <y-button type="link" class="fold-btn" @click="foldClick">收起<a-icon type="up"/></y-button>
        </y-radio-group>
        <y-button type="link" v-show="false" slot="foldText">收起<a-icon type="up"/></y-button>
        <y-button type="link" slot="unFoldText">查看更多<a-icon type="down"/></y-button>
      </y-describe>
    </y-form-model-item>
    <!-- 办理意见 -->
    <y-form-model-item :prop="formItemData.options.model" :label="formItemData.options.name">
      <y-textarea
        :style="{ ...widthStyle }"
        autoWidth
        :disabled="formItemData.options.disabled"
        :fixedNumber="formItemData.options.maxLength !== 0"
        :maxLength="formItemData.options.maxLength"
        v-model="modelValue"
        :placeholder="getPlaceHolder(formItemData)"
      />
    </y-form-model-item>
    <!-- 轻提示 -->
    <y-tooltip v-if="formItemData.options.lightTipsCheck" class="light-tips-check" :title="formItemData.options.lightTipsContent">
      <y-svg-icon icon-class="warning" />
    </y-tooltip>

    <!-- 强提示 -->
    <div style="width: 100%" v-if="formItemData.options.strongTipsCheck" class="strong-tips">
      {{ formItemData.options.strongTipsContent }}
    </div>
  </div>
</template>
<script>
import Api from '@api';

export default {
  name: 'FormGeneratorItemClassicOpinion',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 提交表单的数据
    submitForm: {
      type: Object,
      default: function() {
        return {};
      },
    },
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
  data() {
    return {
      optionsData: [],
      initOptions: [],
      modelValue: '',
      radioModelValue: '',
      foldNum: 8,
    };
  },
  watch: {
    'formItemData.options.defaultValue': {
      handler(val) {
        this.modelValue = val;
      },
      immediate: true,
    },
    radioModelValue(val) {
      // let mes = this.modelValue || '';
      // if (!mes.includes(val)) {
      //   if (!mes) {
      //     mes += val;
      //   } else {
      //     mes += '，' + val;
      //   }
      // }
      // this.modelValue = mes;
      this.modelValue = (this.modelValue || '') + val;
      this.validateFormField();
    },
    modelValue(val) {
      this.updateSubmitForm(val);
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
    // 可显示的选项
    // optionsData({ formItemData }) {
    //   return formItemData.options.options;
    // },
  },
  created() {
    this.getOptions();
  },
  methods: {
    commentClick(obj) {
      Api.statComments(obj.uuid);
    },
    foldClick() {
      this.$refs.describeInstance.checkClick();
    },
    viewMore(num) {
      if (num) {
        this.optionsData = this.initOptions.filter((i, l) => l < num);
      } else {
        this.optionsData = this.initOptions;
      }
    },
    getOptions() {
      Api.getUserComments().then(res => {
        this.initOptions = res.records.map(i => {
          return { label: i.title, value: i.content, uuid: i.uuid };
        });
        this.viewMore(this.foldNum);
      });
    },
    // 更新表单提交数据
    updateSubmitForm(val) {
      const obj = { ...this.submitForm };
      obj[this.formItemData.options.model] = val;
      this.$emit('update-submitForm', obj);
    },
    // 校验当前单个表单项
    validateFormField() {
      this.$nextTick(function() {
        this.$emit('validateFormField', this.formItemData.options.model);
      });
    },
  },
};
</script>
<style lang="less">
.yjz-custom-describe-style.y-describe {
  .y-describe-text {
    line-height: 32px; // 定义自己所需的行高
    max-height: 32px;
    .y-describe-btn {
      margin-top: -11px; // 调整自定义按钮位置
      &::before {
        display: none; // 去除省略号
      }
    }
    &.y-unFold {
      .y-describe-btn {
        margin-top: -18px; // 调整自定义按钮位置
      }
      .fold-btn {
        display: inline-block;
      }
    }
    .y-describe-content {
      .ant-radio-group.y-radio-group {
        display: inline;
      }
    }
    .fold-btn {
      display: none;
    }
  }
}
</style>
