<template>
  <y-form-model class="select-filed" ref="ruleForm" :model="optionData">
    <y-form-model-item>
      <div>
        <span>
          选择节点
          <y-tooltip title="注意选择的节点名称要和表单关联流程中的节点对应">
            <a-icon type="info-circle" />
          </y-tooltip>
        </span>
        <y-select :options="options" v-model="optionData.nodeModel2" autoWidth :showSearch="true" placeholder="请选择指派节点" />
      </div>
      <!-- <div>
        <y-checkbox v-model="optionData.nodeCheck">{{ optionData.nodeText }}</y-checkbox>
        <y-input
          class="checkbox-input"
          :disabled="!optionData.nodeCheck"
          autoWidth
          v-model="optionData.nodeText"
          placeholder="请输入选择节点组件名称"
        />
        <TipsConfig
          v-if="optionData.nodeCheck"
          style="margin-bottom: 0"
          v-model="optionData"
          placeholderCheck="nodePlaceholderCheck"
          lightTipsCheck="nodeLightTipsCheck"
          strongTipsCheck="nodeStrongTipsCheck"
          placeholders="nodePlaceholder"
          lightTipsContent="nodeLightTipsContent"
          strongTipsContent="nodeStrongTipsContent"
        />
        <SetRequired v-if="optionData.nodeCheck" v-model="optionData" required="nodeRequired" />
      </div> -->
      <y-divider />
      <div>
        <y-checkbox v-model="optionData.roleCheck">{{ optionData.roleText }}</y-checkbox>
        <y-input
          class="checkbox-input"
          :disabled="!optionData.roleCheck"
          autoWidth
          v-model="optionData.roleText"
          placeholder="请输入选择角色组件名称"
        />
        <TipsConfig
          v-if="optionData.roleCheck"
          style="margin-bottom: 0"
          v-model="optionData"
          placeholderCheck="rolePlaceholderCheck"
          lightTipsCheck="roleLightTipsCheck"
          strongTipsCheck="roleStrongTipsCheck"
          placeholders="rolePlaceholder"
          lightTipsContent="roleLightTipsContent"
          strongTipsContent="roleStrongTipsContent"
        />
        <SetRequired v-if="optionData.roleCheck" v-model="optionData" required="roleRequired" />
      </div>
      <y-divider />
      <div>
        <y-checkbox v-model="optionData.implementCheck">{{ optionData.implementText }}</y-checkbox>
        <y-input
          class="checkbox-input"
          :disabled="!optionData.implementCheck"
          autoWidth
          v-model="optionData.implementText"
          placeholder="请输入指派实施组组件名称"
        />
        <TipsConfig
          v-if="optionData.implementCheck"
          v-model="optionData"
          style="margin-bottom: 0"
          placeholderCheck="implementPlaceholderCheck"
          lightTipsCheck="implementLightTipsCheck"
          strongTipsCheck="implementStrongTipsCheck"
          placeholders="implementPlaceholder"
          lightTipsContent="implementLightTipsContent"
          strongTipsContent="implementStrongTipsContent"
        />
        <SetRequired v-if="optionData.implementCheck" v-model="optionData" required="implementRequired" />
        <y-form-model-item label="是否多选">
          <y-radio-group v-model="optionData.implementMultiple" :radio="false" bodered>
            <y-radio-content :value="true"> 是 </y-radio-content>
            <y-radio-content :value="false"> 否 </y-radio-content>
          </y-radio-group>
        </y-form-model-item>
      </div>
      <y-divider />
    </y-form-model-item>

    <!-- 布局宽度占比 -->
    <!-- <SetItemWidth v-model="optionData" /> -->
    <!-- 宽度 -->
    <SetWidth v-model="optionData" />

    <!-- 操作属性 -->
    <OperationalAttribute v-model="optionData" />
  </y-form-model>
</template>
<script>
// import SetItemWidth from './common/setItemWidth';
import SetWidth from './common/setWidth';
import OperationalAttribute from './common/operationalAttribute';
import TipsConfig from './common/tipsConfig';
import SetRequired from './common/setRequired';
import Api from '@api';
import { getArrUniq } from '@src/utils/common.js';
export default {
  name: 'DesignateFiled',
  components: {
    // SetItemWidth,
    SetWidth,
    OperationalAttribute,
    TipsConfig,
    SetRequired,
  },
  model: {
    prop: 'data',
    event: 'update-data',
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  created() {
    this.getNodeOptions();
  },
  data() {
    return {
      options: [
        {
          value: '提单',
        },
        {
          value: '内审',
        },
        {
          value: '评估',
        },
        {
          value: '审批',
        },
        {
          value: 'Issa运营审核',
        },
        {
          value: 'Issa实施',
        },
        {
          value: '监控实施',
        },
        {
          value: '备份审核',
        },
        {
          value: '备份实施',
        },
        {
          value: '备份复核',
        },
        {
          value: '监理单位核查',
        },
      ],
    };
  },
  computed: {
    optionData: {
      get({ data }) {
        return data;
      },
      set(val) {
        this.$emit('update-data', val);
      },
    },
  },
  methods: {
    getNodeOptions() {
      Api.getDictionaryCode({ itemUuid: 'e0ca23995ce1d35e7f79e5f806f2463b' }).then(res => {
        this.options = getArrUniq(
          res.map(i => {
            return {
              value: i.code,
            };
          }),
          'value'
        );
      });
    },
  },
};
</script>
