<template>
  <div>
    <a-dropdown overlayClassName="yjz-inputCheck-dropdown">
      <y-tag-input autoWidth :showDropdown="false" v-model="modelValue" :data="flatData" />
      <a-menu slot="overlay">
        <template v-for="item in treeData">
          <RecursionMenuItem
            :data="item"
            :key="item[replaceFiled.key] + item.check"
            :replaceFiled="replaceFiled"
            :change="checkChange"
            v-if="item[replaceFiled.children] && item[replaceFiled.children].length"
          />
          <a-sub-menu class="no-children" v-else :key="item[replaceFiled.key] + item.check">
            <a-checkbox :checked="item.check" :indeterminate="item.indeterminate" @change="checkChange(item)">
              {{ item[replaceFiled.label] }}
            </a-checkbox>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import RecursionMenuItem from './recursionMenuItem.vue';
import { flatArr } from '@src/utils/common.js';
export default {
  name: 'InputCheck',
  model: {
    prop: 'value',
    event: 'update-value',
  },
  components: {
    RecursionMenuItem,
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      },
    },
    replaceFiled: {
      type: Object,
      default: function() {
        return {
          label: 'productTypeName',
          key: 'productType',
          children: 'children',
        };
      },
    },
    treeData: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  computed: {
    modelValue: {
      get({ value }) {
        return value;
      },
      set(val) {
        this.$emit('update-value', val);
      },
    },
    flatData({ treeData, replaceFiled }) {
      return flatArr.get(treeData, replaceFiled.children).map(i => {
        return {
          label: i[replaceFiled.label],
          value: i[replaceFiled.key],
        };
      });
    },
  },
  watch: {
    modelValue(val, oldVal) {
      if (oldVal.length > val.length) {
        let unCheckArr = []; // 取消选中的元素
        for (let index = 0; index < oldVal.length; index++) {
          let flag = false;
          const element1 = oldVal[index];
          for (let index = 0; index < val.length; index++) {
            const element2 = val[index];
            if (element1 === element2) flag = true;
          }
          if (!flag) {
            unCheckArr.push(element1);
          }
        }
        unCheckArr.forEach(i => {
          let obj = this.searchTreeItem(i, this.replaceFiled.key);
          if (obj) {
            this.checkChange(obj, false);
          }
        });
      }
    },
  },
  methods: {
    checkChange(obj, bool) {
      let checkBool = typeof bool === 'boolean' ? bool : !obj.check;
      // 修改全部的子
      const updateKeys = [obj[this.replaceFiled.key]];
      if (obj.children && obj.children.length) {
        obj.children.forEach(i => {
          this.$set(i, 'check', checkBool);
          updateKeys.push(i[this.replaceFiled.key]);
        });
      }
      this.$set(obj, 'check', checkBool);
      this.$set(obj, 'indeterminate', false);
      // 修改父元素状态
      if (obj.parentUuid) {
        this.getParentCheckStatus(obj.parentUuid);
      }
      this.updateModelValue(updateKeys, checkBool);
    },
    getParentCheckStatus(key) {
      let obj = this.searchTreeItem(key);
      if (obj.children && obj.children.length) {
        let checkList = [];
        obj.children.forEach(i => {
          if (i.check) {
            checkList.push(i);
          }
        });

        if (checkList.length === obj.children.length) {
          this.$set(obj, 'check', true);
          this.$set(obj, 'indeterminate', false);
        } else if (checkList.length === 0) {
          this.$set(obj, 'check', false);
          this.$set(obj, 'indeterminate', false);
        } else {
          this.$set(obj, 'indeterminate', true);
          this.$set(obj, 'check', true);
        }
        this.$nextTick(function() {
          this.updateModelValue([obj[this.replaceFiled.key]], obj.check);
        });
      }
    },
    // 根据uuid查找
    searchTreeItem(key, keyReplace = 'uuid', arr = this.treeData) {
      let c = null;
      for (let index = 0; index < arr.length; index++) {
        const obj = arr[index];
        if (obj[keyReplace] === key) {
          c = obj;
        } else {
          if (obj.children && obj.children.length) {
            c = this.searchTreeItem(key, keyReplace, obj.children);
          }
        }
        if (c) return c;
      }
      return c;
    },
    updateModelValue(keys, bool) {
      let valueArr = this.modelValue;
      keys.forEach(key => {
        if (bool) {
          if (!valueArr.includes(key)) {
            valueArr.push(key);
          }
        } else {
          valueArr = valueArr.filter(i => i !== key);
        }
      });
      this.modelValue = valueArr;
    },
  },
};
</script>
<style lang="less">
.yjz-inputCheck-dropdown {
  .ant-checkbox-wrapper {
    width: 100%;
  }
  .no-children {
    .ant-dropdown-menu-submenu-arrow {
      display: none;
    }
  }
}
</style>
