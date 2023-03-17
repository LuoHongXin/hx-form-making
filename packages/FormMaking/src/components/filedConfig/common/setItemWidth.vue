<template>
  <y-form-model-item label="组件占比" class="set-default-value">
    <y-radio-group v-model="optionData.itemWidth" autoWidth :radio="false" bodered>
      <y-radio-content v-for="item in radioOptions" :key="item.value" :value="item.value">
        {{ item.label || item.value }}
      </y-radio-content>
    </y-radio-group>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'SetItemWiidth',
  mixins: [mixins],
  data() {
    return {
      radioOptions: [
        {
          label: '50%',
          value: '46%',
        },
        {
          label: '100%',
          value: '100%',
        },
      ],
    };
  },
};
</script>
<style lang="less">
.set-default-value {
  .y-tag-item {
    margin-right: 0;
    text-align: center;
  }
}
</style>
