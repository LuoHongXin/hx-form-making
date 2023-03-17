<template>
  <y-form-model-item>
    <span slot="label">
      宽度
      <y-tooltip title="为空则是弹性布局，自动撑开">
        <a-icon type="info-circle" />
      </y-tooltip>
    </span>
    <y-input autoWidth v-model="value" placeholder="请输入宽度">
      <y-select slot="addonAfter" :allowClear="false" :showArrow="false" v-model="unit" style="width: 50px">
        <y-select-option value="%"> % </y-select-option>
        <y-select-option value="px"> px </y-select-option>
      </y-select>
    </y-input>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'SetWidth',
  mixins: [mixins],
  computed: {
    value: {
      get({ optionData }) {
        if (optionData.width) {
          return optionData.width.replace('%', '').replace('px', '');
        }
        return '';
      },
      set(val) {
        this.onChange(val);
      },
    },
    unit: {
      get({ optionData }) {
        if (optionData.width) {
          return optionData.width.match(/[(px)(%)]+/g)[0];
        }
        return '%';
      },
      set(val) {
        this.$set(this.optionData, 'width', this.optionData.width.replace(/[(px)(%)]+/g, val));
      },
    },
  },
  methods: {
    onChange(value) {
      const reg = /^-?[0-9]*(\.[0-9]*)?$/;
      if (!isNaN(value) && reg.test(value)) {
        this.$set(this.optionData, 'width', value === '' ? '' : value + this.unit);
      }
    },
  },
};
</script>
