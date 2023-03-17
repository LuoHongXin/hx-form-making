<template>
  <!-- 数据来源配置 -->
  <div>
    <y-form-model-item label="数据来源">
      <y-select v-model="optionData.remoteType" @change="remoteTypeChange">
        <y-select-option :value="item.value" v-for="item in remoteTypeOptions" :key="item.value"> {{ item.label }} </y-select-option>
      </y-select>
    </y-form-model-item>
    <!-- 自定义 -->
    <y-form-model-item v-if="optionData.remoteType === 'custom'" label="选项内容">
      <y-checkbox @change="onChange"> 是否显示标签 </y-checkbox>
      <draggable
        v-bind="{
          group: { name: 'inputOptionGroup' },
        }"
        :sort="true"
        handle=".y-svg-icon-line"
        draggable=".input-option"
        v-model="optionData.options"
      >
        <div class="input-option" v-for="(item, index) in optionData.options" :key="index">
          <y-input autoWidth v-if="labelShow" placeholder="编辑选项名" v-model="item.label" />
          <y-input autoWidth placeholder="编辑选项标识" v-model="item.value">
            <template slot="suffix">
              <a-icon type="delete" @click="deleteCustomOptions(index)" />
              <y-svg-icon icon-class="dragLine" class-name="line" />
            </template>
          </y-input>
        </div>
      </draggable>
      <y-button style="width: 100%" @click="addCustomOptions" icon="plus" type="dashed">添加新选项</y-button>
    </y-form-model-item>
    <!-- 字典型选择 -->
    <y-form-model-item v-if="optionData.remoteType === 'dictionary'" label="请选择字典目录">
      <y-select
        autoWidth
        showSearch
        v-model="optionData.remoteDictionaryId"
        :filter-option="filterOption"
        :options="dictionaryOptions"
      ></y-select>
    </y-form-model-item>
    <!-- 数据关联表 -->
    <y-form-model-item v-if="optionData.remoteType === 'library'" label="是否开启同关系表数据关联">
      <y-switch v-model="optionData.dataAssociation"></y-switch>
    </y-form-model-item>
    <y-form-model-item v-if="optionData.remoteType === 'library'" label="请选择数据关联表名称">
      <y-select
        autoWidth
        showSearch
        v-model="optionData.remoteLibraryId"
        :filter-option="filterOption"
        :options="libraryOptions"
        @change="() => (optionData.remoteLibraryHeadId = '')"
      ></y-select>
    </y-form-model-item>
    <y-form-model-item v-if="optionData.remoteType === 'library'" label="请选择数据关联表表头">
      <a-cascader
        :filter-option="filterOption"
        :show-search="{ filter: cascaderSearch }"
        change-on-select
        v-model="libraryHeadId"
        placeholder=""
        :options="libraryHeadOptions"
        change-on-selectoptionData.remoteLibraryHeadId
      />
    </y-form-model-item>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import Api from '@api';
import mixins from './mixins';
import { getItemByTree, getLibraryOptions, flatArr } from '@src/utils/common.js';
export default {
  name: 'DataSource',
  mixins: [mixins],
  components: {
    draggable,
  },
  props: {
    hiddenRemoteType: {
      type: Array,
      default: function() {
        return ['privateIp'];
      },
    },
    //类型
    type: {
      type: String,
      default: 'input',
    },
  },
  created() {
    this.initOptions();
  },
  computed: {
    remoteTypeOptions({ hiddenRemoteType, type }) {
      let arr = [
        {
          label: '自定义',
          value: 'custom',
        },
        {
          label: '字典型',
          value: 'dictionary',
        },
        {
          label: '数据关联表',
          value: 'library',
        },
        {
          label: '系统名称',
          value: 'businessSystemName',
        },
        {
          label: '私网地址',
          value: 'privateIp',
        },
      ];
      // 单选不需要系统名称
      if (['radio'].includes(type)) {
        arr = [
          {
            label: '自定义',
            value: 'custom',
          },
          {
            label: '字典型',
            value: 'dictionary',
          },
          {
            label: '数据关联表',
            value: 'library',
          },
          {
            label: '私网地址',
            value: 'privateIp',
          },
        ];
      }
      return arr.filter(i => !hiddenRemoteType.includes(i.value));
    },
    libraryHeadId: {
      get({ optionData }) {
        const arr = [];
        let str = '';
        optionData.remoteLibraryHeadId.split('_').forEach(i => {
          str += str ? '_' + i : i;
          arr.push(str);
        });
        return arr;
      },
      set(arr) {
        let idx = arr.length > 0 ? arr.length - 1 : 0;
        this.$set(this.optionData, 'remoteLibraryHeadId', arr[idx]);
      },
    },
  },
  data() {
    return {
      labelShow: false, // 自定义选项是否显示label设置
      dictionaryOptions: [], // 字典型选项
      libraryOptions: [], // 数据关联表选项
      libraryHeadOptions: [], // 处理表详情后带有数据关联表表头（字典项）的树数据选项
      // 单选搜索过滤选项
      filterOption: (input, option) => {
        return (
          option.componentOptions.children[0].componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    };
  },
  watch: {
    'optionData.remoteDictionaryId': {
      handler: function(val) {
        if (val && this.optionData.remoteType === 'dictionary') {
          this.getDictionaryCode(val);
        }
      },
      immediate: true,
    },
    // 数据关联表
    'optionData.remoteLibraryId': {
      handler: function(val) {
        if (val && this.optionData.remoteType === 'library') {
          this.getLibraryHeadOptions(val);
        }
      },
      immediate: true,
    },
    // 数据关联表表头
    'optionData.remoteLibraryHeadId': {
      handler: function(val) {
        if (val && this.optionData.remoteType === 'library') {
          this.getLibraryColumnOptions(val);
        }
      },
      immediate: true,
    },
    'optionData.remoteType': {
      handler(val) {
        this.initOptions(val);
      },
      immediate: true,
    },
  },
  methods: {
    cascaderSearch(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
    // 初始化远程数据来源的选项
    initOptions(remoteType) {
      if (remoteType === 'dictionary') {
        this.getDictionary();
      } else if (remoteType === 'library') {
        this.getDataCorrelation();
      } else if (remoteType === 'businessSystemName') {
        this.getBusinessSystemOptions();
      }
    },
    // 数据来源切换时清空数据
    remoteTypeChange() {
      const remoteType = this.optionData.remoteType;
      if (remoteType === 'custom') {
        this.$set(this.optionData, 'options', [{ value: '' }]);
      } else {
        this.$set(this.optionData, 'options', []);
      }
      this.$set(this.optionData, 'remoteDictionaryId', '');
      this.$set(this.optionData, 'remoteLibraryId', '');
      this.$set(this.optionData, 'remoteLibraryHeadId', '');
    },
    onChange(e) {
      this.labelShow = e.target.checked;
      if (!e.target.checked) {
        this.optionData.options.forEach(i => {
          i.label = '';
        });
      }
    },
    // 自定义新增选项
    addCustomOptions() {
      const options = this.optionData.options;
      options.push({ value: '' });
      this.$set(this.optionData, 'options', options);
    },
    deleteCustomOptions(index) {
      let options = this.optionData.options;
      options = options.filter((i, idx) => {
        return idx !== index;
      });
      this.$set(this.optionData, 'options', options);
    },
    // 获取字典项
    getDictionary() {
      Api.getDictionary().then(res => {
        this.dictionaryOptions = res.map(i => {
          return {
            ...i,
            value: i.uuid,
            label: i.name,
          };
        });
      });
    },
    // 获取字典值
    getDictionaryCode(val) {
      Api.getDictionaryCode({ itemUuid: val }).then(res => {
        this.optionData.options = res.map(i => {
          return {
            ...i,
            value: i.uuid,
            label: i.code,
          };
        });
      });
    },
    // 获取数据关联表
    getDataCorrelation() {
      Api.getDataCorrelation({ scope: 'my' }).then(res => {
        if (res) {
          this.libraryOptions = res.map(i => {
            return {
              ...i,
              value: i.uuid,
              label: i.tableName,
            };
          });
        }
      });
    },
    // 获取数据表数据和表头选项
    getLibraryHeadOptions(uuid) {
      Api.getDataCorrelationDetails(uuid).then(res => {
        this.libraryHeadOptions = getItemByTree(res);
        this.libraryColumnOptions = flatArr.get(res, 'children', 'historyKey', 'itemUuid');
        // 表头选项有值后且已选表头则更新列表选项值
        if (this.optionData.remoteLibraryHeadId) {
          this.getLibraryColumnOptions(this.optionData.remoteLibraryHeadId);
        }
      });
    },
    // 获取表头（字典项）对应字典值列表选项
    getLibraryColumnOptions(val, arr = this.libraryColumnOptions) {
      if (!arr) return;
      let options = getLibraryOptions(val, arr);
      this.$set(this.optionData, 'options', options);
    },
    // 获取业务系统
    getBusinessSystemOptions() {
      Api.getBusinessSystem().then(res => {
        this.$set(
          this.optionData,
          'options',
          res.map(i => {
            return {
              ...i,
              label: i.name,
              value: i.uuid,
            };
          })
        );
      });
    },
  },
};
</script>
<style lang="less">
.input-option {
  position: relative;
  margin-bottom: 4px;
  .y-svg-icon-line,
  .y-svg-icon-edit,
  .anticon-delete {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    // top: 8px;
    // position: absolute;
    z-index: 1;
  }
  .y-svg-icon-line {
    // right: 10px;
    cursor: move;
  }
  .anticon-delete {
    // right: 30px;
    // top: 9px;
    cursor: pointer;
  }
  .y-svg-icon-edit {
    // right: 50px;
    // top: 9px;
    cursor: pointer;
  }
}
</style>
