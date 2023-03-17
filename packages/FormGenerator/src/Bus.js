import Vue from 'vue';
import Api from '@api';
import { getLibraryOptions, getItemByTree, flatArr } from '@src/utils/common.js';
const Bus = new Vue({
  data() {
    return {
      // props接受传入的共用的额外信息
      metaData: {},
      libraryItemTable: {}, // 当前表单的所有关联表带表头（字典项）详情
      libraryTable: {}, // 当前表单的所有关联表值详情，扁平化接口数据，后续选项从这判断获取
      libraryPromise: [], //
    };
  },
  methods: {
    // 更新表详情，并返回对应表头（字典项）的表值（字典值）
    // uuid 表id ，headId 表头 id
    updateLibraryTable(uuid, headId) {
      return new Promise(resolve => {
        // 判断表详情是否有重复，没有则请求获取
        if (uuid && !this.libraryItemTable[uuid]) {
          Api.getDataCorrelationDetails(uuid)
            .then(res => {
              if (!this.libraryItemTable[uuid]) {
                this.$set(this.libraryItemTable, uuid, getItemByTree(res));
                this.$set(this.libraryTable, uuid, flatArr.get(res, 'children', 'historyKey', 'itemUuid'));
              }
              resolve(getLibraryOptions(headId, this.libraryTable[uuid]));
            })
            .catch(() => {
              resolve([]);
            });
        } else {
          // 已存在则不需请求
          resolve(getLibraryOptions(headId, this.libraryTable[uuid]));
        }
      });
    },
    updateMetaData(obj) {
      if (obj) {
        this.metaData = Object.assign(this.metaData, obj);
      }
    },
    // 查询数据关联 uuid-表uuid headUuid-表头uuid queryUuid-关联的表值uuid
    searchDataAssociate(uuid, headUuid, queryUuid) {
      if (this.libraryTable[uuid]) {
        this.$set(this.libraryTable, uuid, this.handleLibraryOptionsHidden(this.libraryTable[uuid], headUuid, queryUuid)); // 隐藏相关值
        this.$emit('dataAssociateEvent', uuid, headUuid);
      }
    },
    // 遍历关联表值详情，找到对应表头（字典项），若parentUuid符合则显示否则隐藏
    handleLibraryOptionsHidden(arr, headUuid, queryUuid) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.historyKey.indexOf(headUuid) > -1 && element.historyKey.replace(headUuid, '').length > 0) {
          // 更新字典值
          element.isHidden = element.parentUuid !== queryUuid; // fasle 显示 true 隐藏
        }
      }
      return arr;
    },
  },
});
export default Bus;
