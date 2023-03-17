<template>
  <y-form-model-item label="设置可选范围">
    <y-button style="width:100%" @click="modalVisible = true" type="dashed">点击配置</y-button>
    <y-modal size="s" title="配置可选范围" :visible="modalVisible" @ok="modalVisible = false" @cancel="modalVisible = false">
      <y-alert style="margin-bottom:24px" type="info" show-icon message="配置可选范围后，用户在申请时只能看到可选范围的选项"></y-alert>
      <y-model-table
        :bordered="false"
        paginationType="mini"
        :tableHeader="false"
        :rowSelection="false"
        :scroll="{ x: '100%' }"
        :dataSource="tableData"
        :columns="columns"
      >
        <template v-slot:action="{ record }">
          <y-switch
            :value="record.switch"
            @change="
              bool => {
                switchChange(bool, record);
              }
            "
          ></y-switch>
        </template>
      </y-model-table>
    </y-modal>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
const columns = [
  {
    title: '选项内容',
    dataIndex: 'label',
    width: 100,
  },
  {
    title: '设置是否在申请时可选',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 100,
  },
];
export default {
  name: 'SetAvailableRange',
  mixins: [mixins],
  data() {
    return {
      columns,
      modalVisible: false,
    };
  },
  computed: {
    tableData: {
      get({ optionData }) {
        return optionData.options.map(i => {
          return {
            label: i.label || i.value,
            uuid: i.value, // value作为关键字
            switch: optionData.hideOptions ? !optionData.hideOptions.includes(i.value) : true,
          };
        });
      },
    },
  },
  methods: {
    switchChange(bool, evt) {
      let hideOptions = this.optionData.hideOptions || [];
      if (bool && hideOptions.includes(evt.uuid)) {
        hideOptions = hideOptions.filter(i => i !== evt.uuid);
      } else if (!bool && !hideOptions.includes(evt.uuid)) {
        hideOptions.push(evt.uuid);
      }
      this.$set(this.optionData, 'hideOptions', hideOptions);
    },
  },
};
</script>
