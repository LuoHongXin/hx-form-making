<template>
  <div :class="`y-action-button-group yuejizuo-button-group ${reversed ? 'reversed' : ''}`">
    <template v-if="activeButtonList.length <= moreBtnNum">
      <div class="y-act-btn" v-for="item in activeButtonList" :key="item.key || item.text">
        <y-tips-button
          :placement="(item.tips && item.tips.placement) || 'topLeft'"
          :tooltip="boolean(item.tips)"
          :title="(item.tips && item.tips.text) || item.tips"
        >
          <y-button
            :disabled="item.disable"
            :type="item.type || 'default'"
            :icon="item.icon || null"
            @click="
              () => {
                if (item.click) {
                  item.click();
                }
              }
            "
            >{{ item.text }}</y-button
          >
        </y-tips-button>
        <!-- <span v-if="index + 1 !== activeButtonList.length" class="spacing"></span> -->
      </div>
    </template>
    <!-- 出现更多 -->
    <template v-else>
      <div class="y-act-btn" v-for="(item, index) in activeButtonList.slice(0, moreBtnNum - 1)" :key="item.key || item.text">
        <y-tips-button
          :placement="(item.tips && item.tips.placement) || 'topLeft'"
          :tooltip="boolean(item.tips)"
          :title="(item.tips && item.tips.text) || item.tips"
        >
          <y-button
            :disabled="item.disable"
            :icon="item.icon || null"
            :type="item.type || 'default'"
            @click="
              () => {
                if (item.click) {
                  item.click();
                }
              }
            "
            >{{ item.text }}</y-button
          >
        </y-tips-button>
        <y-dropdown v-if="omitType === 'ellipsis' && index === 0" :trigger="moreBtnTrigger" :getPopupContainer="getPopupContainer">
          <y-button type="default">
            <a-icon type="more" />
          </y-button>
          <slot v-if="$scopedSlots.dropdown" name="dropdown" :menuData="activeButtonList.slice(moreBtnNum - 1, 99)" slot="overlay" />
          <y-menu v-else slot="overlay">
            <y-menu-item
              v-for="item in activeButtonList.slice(moreBtnNum - 1, 99)"
              @click="
                () => {
                  if (item.click && !item.disable) {
                    item.click();
                  }
                }
              "
              :disabled="item.disable"
              :key="item.key || item.text"
            >
              <y-tooltip :placement="item.tips.placement || 'top'" v-if="item.tips">
                <template slot="title">
                  <span>{{ item.tips.text || item.tips }}</span>
                </template>
                <span>{{ item.text }}</span>
              </y-tooltip>
              <span v-else>{{ item.text }}</span>
            </y-menu-item>
          </y-menu>
        </y-dropdown>
        <!-- <span v-if="index + 1 !== activeButtonList.length" class="spacing"></span> -->
      </div>
      <y-tooltip>
        <template slot="title">
          <span v-for="(item, index) in activeButtonList.slice(moreBtnNum - 1, 99)" :key="item.key || item.text"
            >{{ item.text }}{{ index + 1 === activeButtonList.slice(moreBtnNum - 1, 99).length ? '' : '、' }}</span
          >
        </template>
        <y-button type="default"> {{ activeButtonList.slice(moreBtnNum - 1, 99).length }}... </y-button>
      </y-tooltip>
    </template>
  </div>
</template>

<script>
export default {
  name: 'YButtonGroup',
  props: {
    // 更多按钮的省略类型
    omitType: {
      type: String,
      default: 'default', //default ellipsis
    },
    reversed: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    // 所有按钮
    buttonList: {
      type: Array,
      default: function () {
        return [
          // {
          //     text:"", // 按钮文字
          //     click:()=>{}, // 按钮点击事件
          //     disabled:Boolean, // 是否禁用
          //     show:Boolean, // 按钮的显示隐藏
          //     icon:"down", // 图标
          //     type:"primary", // 按钮类型
          // }
        ];
      },
    },
    // 显示几个就用更多
    moreBtnNum: {
      type: Number,
      default: function () {
        return 4;
      },
    },
    // 更多按钮触发事件
    moreBtnTrigger: {
      type: Array,
      default: function () {
        return ['hover'];
      },
    },
  },
  computed: {
    activeButtonList: function ({ buttonList }) {
      const arr = buttonList.filter((item) => {
        return item.show || item.show === undefined;
      });
      return arr;
    },
  },
  methods: {
    getPopupContainer: (triggerNode) => {
      return triggerNode || document.body;
    },
    boolean(str) {
      return Boolean(str);
    },
  },
};
</script>
<style lang="less">
.y-action-button-group.yuejizuo-button-group {
  .y-act-btn {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
    .y-btn.ant-btn {
      padding: 0 12px;
    }
  }
}
</style>
