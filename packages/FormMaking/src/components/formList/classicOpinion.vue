<template>
  <div class="mk-form-item drag-form-item">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
    <!-- 审批用语 -->
    <y-form-model-item :label="formItemData.options.name2" :class="formItemData.options.inline ? '' : 'vertical-mode'">
      <!-- 多选 -->
      <y-link-tag
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        v-if="formItemData.options.isCheck"
        :disabled="formItemData.options.disabled"
        v-model="modelValue"
        :data="optionsData"
      >
      </y-link-tag>
      <!-- 单选框 -->
      <y-radio-group
        :class="formItemData.options.lineFeed ? 'line-feed' : ''"
        :disabled="formItemData.options.disabled"
        v-model="radioModelValue"
        autoWidth
        v-else
        :radio="false"
        bodered
      >
        <y-radio-content v-for="item in optionsData" :key="item.value" :value="item.value">
          {{ item.label || item.value }}
        </y-radio-content>
      </y-radio-group>
    </y-form-model-item>
    <!-- 办理意见 -->
    <y-form-model-item :label="formItemData.options.name" :required="formItemData.options.required">
      <y-textarea
        :style="{ ...widthStyle }"
        autoWidth
        :disabled="formItemData.options.disabled"
        :fixedNumber="formItemData.options.maxLength !== 0"
        :maxLength="formItemData.options.maxLength"
        v-model="modelValue"
        :placeholder="getPlaceHolder(formItemData)"
      />
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
export default {
  name: 'ClassicOpinion',
  props: {
    type: {
      type: String,
    },
    formItemData: {
      type: Object,
    },
  },
  data() {
    return {
      modelValue: '',
      radioModelValue: '',
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
      // const arr = val.split(',');
      // let mes = this.modelValue || '';
      // arr.forEach((i) => {
      //   if (!mes.includes(i)) {
      //     if (!mes) {
      //       mes += i;
      //     } else {
      //       mes += '，' + i;
      //     }
      //   }
      // });
      // this.modelValue = mes;
      this.modelValue = this.modelValue + val;
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
    optionsData({ formItemData }) {
      return formItemData.options.options;
    },
  },
};
</script>
