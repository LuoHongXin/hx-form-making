<template>
  <y-form-model-item label="添加按钮">
    <y-button style="width:100%" @click="modalVisible = true" type="dashed">点击配置</y-button>
    <y-drawer
      :closable="false"
      class="add-button-drawer"
      size="xs"
      :visible="modalVisible"
      @ok="modalVisible = false"
      @close="modalVisible = false"
    >
      <div class="title">
        <y-button icon="left" @click="modalVisible = false" class="no-bg" style="margin-right:4px;"></y-button>
        <span>添加按钮</span>
      </div>
      <y-form-model ref="ruleForm">
        <y-form-model-item label="请选择按钮功能">
          <y-radio-group style="width:100%" v-model="optionData.buttonType">
            <y-radio :style="radioStyle" value="routeJump">
              路由跳转
            </y-radio>
            <y-input v-model="optionData.buttonJumpUrl" autoWidth placeholder="请输入链接" />
            <y-radio :style="radioStyle" value="urlJump">
              URL跳转
            </y-radio>
            <y-input v-model="optionData.buttonJumpUrl" autoWidth placeholder="请输入链接" />
            <y-radio :style="radioStyle" value="add">
              新增该组件
            </y-radio>
            <y-radio :style="radioStyle" value="businessSystem">
              打开业务系统抽屉
            </y-radio>
            <y-radio :style="radioStyle" :value="false">
              不显示
            </y-radio>
          </y-radio-group>
        </y-form-model-item>
      </y-form-model>
    </y-drawer>
  </y-form-model-item>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'AddButton',
  mixins: [mixins],
  data() {
    return {
      modalVisible: false,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
    };
  },
};
</script>
<style lang="less">
.add-button-drawer.y-drawer {
  .ant-form-item label {
    margin-top: 12px;
  }
  .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #1f2229;
  }
  .ant-drawer-content {
    .ant-drawer-wrapper-body {
      margin-top: 0;
    }
    .ant-drawer-header {
      display: none;
    }
  }
}
</style>
