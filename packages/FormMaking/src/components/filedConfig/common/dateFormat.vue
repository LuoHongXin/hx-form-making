<template>
  <!-- 显示格式 -->
  <y-form-model-item label="显示格式">
    <y-select autoWidth v-model="optionData.format" :options="dateFormatOptions"></y-select>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'DateFormat',
  mixins: [mixins],
  data() {
    return {
      dateFormatOptions: [
        {
          label: '年',
          value: 'YYYY',
        },
        {
          label: '年-月',
          value: 'YYYY-MM',
        },
        {
          label: '年-月-日',
          value: 'YYYY-MM-DD',
        },
        {
          label: '年-月-日 时:分',
          value: 'YYYY-MM-DD HH:mm',
        },
        {
          label: '年-月-日 时:分:秒',
          value: 'YYYY-MM-DD HH:mm:ss',
        },
      ],
    };
  },
};
</script>
