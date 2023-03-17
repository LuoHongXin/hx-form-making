<template>
  <div
    style="display: inline-block"
    @click="
      (e) => {
        e.preventDefault();
        this.selectOpen = !this.selectOpen;
      }
    "
    :selectOpen="selectOpen"
    class="y-search-select autoWidth"
  >
    <y-tooltip :title="selectName">
      <a-select
        class="y-select"
        id="service-tree-select"
        style="width: 100%"
        v-model="selectValue"
        autoWidth
        :options="treeFlatData"
        :placeholder="placeholder"
        :dropdownMatchSelectWidth="false"
        :open="selectOpen"
      >
        <template slot="dropdownRender">
          <div style="width: 100%; padding: 12px" id="auto-search">
            <y-auto-complete autoWidth @onSearch="treeSearch" style="width: 100%" placeholder="请输入" optionLabelProp="text">
              <y-input
                autoWidth
                ref="inputSearch"
                id="inputSearch"
                :placeholder="inputPlaceholder"
                @change="$emit('input-change', $event)"
                v-model="search2"
              >
                <a-icon slot="prefix" type="search" />
              </y-input>
            </y-auto-complete>
          </div>
          <div style="padding: 0 8px; max-height: 350px; overflow: auto" id="tree-dropdown-content">
            <y-custom-tree
              @select="treeClick"
              ref="customTree"
              :selectedKeys.sync="selectedKeys"
              :expandedKeys.sync="expandedKeys"
              :replaceFields="replaceFields"
              :treeData="treeData"
              show-line
              :showTooltip="false"
            ></y-custom-tree>
          </div>
        </template> </a-select
    ></y-tooltip>
  </div>
</template>

<script>
import Api from '@api';
import { flatArr, findIsIncludeElement, judeElement } from '@src/utils/common.js';

export default {
  name: 'ServiceTreeSelect',
  model: {
    prop: 'value',
    event: 'update-value',
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      targetEvent: null,
      expandedKeys: [],
      placeholder: '请选择',
      inputPlaceholder: '请输入',
      search2: '',
      selectOpen: false,
      treeData: [],
      replaceFields: { title: 'name' },
    };
  },
  created() {
    this.getTree();
  },
  computed: {
    widthSizeClass({ autoWidth, widthSize }) {
      return autoWidth ? '' : `y-form-width-${widthSize}`;
    },
    // 扁平化的树数据
    treeFlatData() {
      let arr = [];
      // 过滤出产品作为选项
      flatArr.get(this.treeData, 'children').forEach((i) => {
        if (!i.children || i.children.length === 0) {
          arr.push({
            value: i.key,
            label: i.name,
          });
        }
      });
      return arr;
    },
    treeFlatDataKey({ treeFlatData }) {
      return treeFlatData.map((i) => i.value);
    },
    selectName({ selectValue, treeFlatData }) {
      let str = '';
      treeFlatData.forEach((i) => {
        if (i.value === selectValue) {
          str = i.label;
        }
      });
      return str;
    },
    selectValue: {
      get({ value }) {
        return value;
      },
      set(val) {
        if (this.treeFlatDataKey.includes(val)) {
          this.$emit('update-value', val);
          this.$emit('change', val);
        }
      },
    },
    selectedKeys: {
      get(selectValue) {
        return selectValue ? [selectValue] : [];
      },
      set(val) {
        this.selectValue = val[0];
      },
    },
  },
  mounted() {
    document.querySelector('body').addEventListener('click', this.clickEvent, false);
  },
  destroyed() {
    // 移除对body的事件点击事件
    document.querySelector('body').removeEventListener('click', this.clickEvent, false);
  },
  methods: {
    treeClick(s) {
      if (!this.treeFlatDataKey.includes(s[0])) {
        if (!this.expandedKeys.includes(s[0])) {
          this.expandedKeys.push(s[0]);
        } else {
          this.expandedKeys = this.expandedKeys.filter((i) => i !== s[0]);
        }
      }
    },
    clickEvent(e) {
      // 选中数据后关闭
      if (
        findIsIncludeElement(e.target, 'ant-tree-node-content-wrapper') &&
        !judeElement(e.target, 'no-style') &&
        !judeElement(e.target.parentNode.parentNode.parentNode, 'no-style')
      ) {
        return (this.selectOpen = false);
      }

      if (findIsIncludeElement(e.target, ['tree-dropdown-content', 'auto-search'])) {
        // 树选择框下拉内容则展开
        this.selectOpen = true;
      } else if (!findIsIncludeElement(e.target, 'service-tree-select')) {
        // 非树选择框则关闭
        this.selectOpen = false;
      }
      return false;
    },
    // 树搜索
    treeSearch(val) {
      this.getTree(val);
    },
    // 获取树
    getTree(val = '') {
      let params = {};
      if (val.trim()) {
        params = { name: val };
      }
      Api.getMenuMangeTree(params)
        .then((res) => {
          this.flag = false;
          let data = params.name ? res : res[0].children[0].children;
          this.treeData = this.recursion(data); // 只展示广东省里的服务
          this.$emit('fresh');
          this.$nextTick(function () {
            // 未选择数据则默认选中第一个
            if (!this.selectValue) {
              this.selectValue = this.treeFlatData[0]?.value;
            }
          });
        })
        .catch((err) => {
          if (err.message) {
            this.$YMessage.error(err.message);
          }
        });
    },
    // 处理tree数据
    recursion(arr, children = 'children') {
      return arr.map((item) => {
        item.key = item.productType || item.uuid;
        delete item.icon;
        if (item[children] && item[children].length > 0) {
          item = Object.assign(item, { class: 'no-style', selectable: true }); // 产品才可以选
          item[children] = this.recursion(item[children], children);
        }
        return item;
      });
    },
  },
};
</script>
