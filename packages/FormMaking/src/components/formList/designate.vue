<template>
  <div class="mk-form-item drag-form-item">
    <div class="operate-list">
      <y-text-link @click.native.stop="$emit('deleteItem', formItemData)" antdIcon="delete" type="link"></y-text-link>
      <y-divider type="vertical" />
      <y-text-link @click.native.stop="$emit('copyItem', formItemData)" antdIcon="copy" type="link"></y-text-link>
    </div>
    <!-- <y-form-model-item
      v-if="formItemData.options.nodeCheck"
      :prop="formItemData.options.model"
      :required="formItemData.options.nodeRequired"
      :label="formItemData.options.nodeText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="nodeModelValue"
        :options="optionsData"
        :showSearch="true"
        autoWidth
        :mode="formItemData.options.multiple ? 'multiple' : ''"
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
      :required="formItemData.options.roleRequired"
      v-if="formItemData.options.roleCheck"
      :prop="formItemData.options.model"
      :label="formItemData.options.roleText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="roleModelValue"
        :options="optionsData"
        :showSearch="true"
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
      :required="formItemData.options.implementRequired"
      v-if="formItemData.options.implementCheck"
      :prop="formItemData.options.model"
      :label="formItemData.options.implementText"
      :class="formItemData.options.inline ? '' : 'vertical-mode'"
    >
      <y-select
        :style="{ ...widthStyle }"
        v-model="implementModelValue"
        :options="optionsData"
        :showSearch="true"
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
export default {
  name: 'Designate',
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
      nodeModelValue: undefined,
      roleModelValue: undefined,
      implementModelValue: undefined,
      optionsData: [],
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
  },
};
</script>
