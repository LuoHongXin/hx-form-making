<template>
  <div class="yjz-form-generator-item" v-if="!formItemData.options.hidden">
    <!-- <y-form-model-item
      v-if="formItemData.options.nodeCheck"
      :prop="formItemData.options.nodeModel"
      :label="formItemData.options.nodeText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="nodeModelValue"
        :options="nodeOptionsData"
        :showSearch="true"
        @change="nodeChange"
        :disabled="formItemData.options.disabled"
        autoWidth
        :placeholder="formItemData.options.nodePlaceholder"
      />
      <y-tooltip v-if="formItemData.options.nodeLightTipsCheck" class="light-tips-check" :title="formItemData.options.nodeLightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>
      <div style="width: 100%" v-if="formItemData.options.nodeStrongTipsCheck" class="strong-tips">
        {{ formItemData.options.nodeStrongTipsContent }}
      </div>
    </y-form-model-item> -->
    <y-form-model-item
      v-if="formItemData.options.roleCheck"
      :prop="formItemData.options.roleModel"
      :label="formItemData.options.roleText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="roleModelValue"
        :options="optionsData"
        :showSearch="true"
        :disabled="formItemData.options.disabled"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
        :placeholder="formItemData.options.rolePlaceholder"
      />
      <!-- 轻提示 -->
      <y-tooltip v-if="formItemData.options.roleLightTipsCheck" class="light-tips-check" :title="formItemData.options.roleLightTipsContent">
        <y-svg-icon icon-class="warning" />
      </y-tooltip>

      <!-- 强提示 -->
      <div style="width: 100%" v-if="formItemData.options.roleStrongTipsCheck" class="strong-tips">
        {{ formItemData.options.roleStrongTipsContent }}
      </div>
    </y-form-model-item>
    <y-form-model-item
      v-if="formItemData.options.implementCheck"
      :prop="formItemData.options.implementModel"
      :label="formItemData.options.implementText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="implementModelValue"
        :options="implementOptionsData"
        :showSearch="true"
        :disabled="formItemData.options.disabled"
        autoWidth
        :mode="formItemData.options.implementMultiple ? 'multiple' : ''"
        :placeholder="formItemData.options.implementPlaceholder"
      />
      <!-- 轻提示 -->
      <y-tooltip
        v-if="formItemData.options.implementLightTipsCheck"
        class="light-tips-check"
        :title="formItemData.options.implementLightTipsContent"
      >
        <y-svg-icon icon-class="warning" />
      </y-tooltip>
      <!-- 强提示 -->
      <div style="width: 100%" v-if="formItemData.options.implementStrongTipsCheck" class="strong-tips">
        {{ formItemData.options.implementStrongTipsContent }}
      </div>
    </y-form-model-item>
  </div>
</template>
<script>
import Api from '@api';
export default {
  name: 'FormGeneratorDesignate',
  model: {
    prop: 'submitForm',
    event: 'update-submitForm',
  },
  props: {
    // 工单业务的信息
    orderInfo: {
      type: Object,
      default: null,
    },
    // 提交表单的数据
    submitForm: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 表单项
    formItemData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      roleModelValue: undefined,
      optionsData: [],
      nodeOptionsData: [], // 节点选项
      implementOptionsData: [], // 实施组选项
    };
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
    implementModelValue: {
      get({ submitForm, formItemData }) {
        // 多选
        if (formItemData.options.implementMultiple) {
          return submitForm[formItemData.options.implementModel] || undefined;
        }
        return (submitForm[formItemData.options.implementModel] && submitForm[formItemData.options.implementModel][0]) || undefined;
      },
      set(val) {
        if (this.formItemData.options.implementMultiple) {
          return this.updateSubmitForm(val, this.formItemData.options.implementModel);
        }
        this.updateSubmitForm([val], this.formItemData.options.implementModel);
      },
    },
    nodeModelValue: {
      get({ submitForm, formItemData }) {
        return submitForm[formItemData.options.nodeModel] || undefined;
      },
      set(val) {
        this.updateSubmitForm(val, this.formItemData.options.nodeModel);
      },
    },
  },
  watch: {
    orderInfo: {
      handler(val) {
        if (val && this.nodeOptionsData.length === 0) {
          this.getWorkflowsNodes();
        }
      },
      immediate: true,
    },
    // nodeModelValue: {
    //   handler(val) {
    //     if (val) {
    //       this.getImplementOptions(val);
    //     }
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    nodeChange() {
      // 节点更改清空实施组选项和值
      this.$nextTick(function () {
        this.implementModelValue = '';
        this.implementOptionsData = [];
      });
    },
    // 更新表单提交数据
    updateSubmitForm(val, key) {
      const obj = { ...this.submitForm };
      obj[key] = val;
      this.$emit('update-submitForm', obj);
    },
    // 获取节点选项
    getWorkflowsNodes() {
      const { workflowUuid } = this.orderInfo.items[0];
      Api.getWorkflowsNodes(workflowUuid).then((res) => {
        const arr = [];
        this.nodeOptionsData = res.map((i) => {
          // 根据名称匹配设置的选择节点
          if (i.taskName === this.formItemData.options.nodeModel2) {
            arr.push(i.resourceId);
          }
          return { label: i.taskName, value: i.resourceId, ...i };
        });
        this.nodeModelValue = arr.join();
        this.$nextTick(function () {
          this.getImplementOptions(this.nodeModelValue);
        });
      });
    },
    // 根据节点选项获取实施组（暂只做角色）选项
    getImplementOptions(nodeKey) {
      if (!nodeKey) return;
      let candidateGroups = null;
      nodeKey.split(',').forEach((k) => {
        for (let index = 0; index < this.nodeOptionsData.length; index++) {
          const element = this.nodeOptionsData[index];
          if (element.resourceId === k) {
            candidateGroups = element.candidateGroups;
          }
        }
      });
      if (!candidateGroups) {
        return this.$YMessage.warn('当前节点没有实施组');
      }
      let roleIds = [];
      // 从candidateGroups获取角色id
      candidateGroups.forEach((group) => {
        let arr = group.split(':');
        if (arr[1]) {
          roleIds.push(arr[1]);
        }
      });
      // Promise.all(
      //   roleIds.map((id) => {
      //     return Api.getSingleRoles(id);
      //   })
      // ).then((res) => {
      //   this.implementOptionsData = res.map((i) => {
      //     return {
      //       ...i,
      //       label: i.name,
      //       value: i.uuid,
      //     };
      //   });
      // });
      Api.getRoles({ roleIds, ignoreLogin: true, size: 999 }).then((res) => {
        this.implementOptionsData = res.records.map((i) => {
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
