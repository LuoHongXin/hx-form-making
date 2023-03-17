<template>
  <!-- 格式校验设置 -->
  <y-form-model-item label="格式校验">
    <y-select v-model="optionData.validaeFormatterKey" :options="validateOptions"> </y-select>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
import Bus from '../../../Bus';
import { numberValidate, inputValidate, dateValidate } from '@src/utils/validateData';
export default {
  name: 'SetValidate',
  mixins: [mixins],
  computed: {
    // 映射Bus中正在操作的表单项对象
    operateFormItem() {
      return Bus.operateFormItem;
    },
    validateOptions({ operateFormItem }) {
      let op = [{ label: '无', value: '' }];
      let targetValidate = [];
      if (operateFormItem.type === 'number') {
        targetValidate = numberValidate;
      } else if (['input', 'textarea'].includes(operateFormItem.type)) {
        targetValidate = inputValidate;
      } else if (['date', 'dateRange'].includes(operateFormItem.type)) {
        targetValidate = dateValidate;
      }
      return op.concat(
        targetValidate.map((i) => {
          return { label: i.text, value: i.key };
        })
      );
    },
  },
};
</script>
