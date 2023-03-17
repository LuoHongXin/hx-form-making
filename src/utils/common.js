import moment from 'moment';
const XLSX = require('xlsx');

export function getCookie(key) {
  const str = document.cookie;
  const arr = str.split('; '); //注意分号后留空格
  for (let ele of arr) {
    var arr2 = ele.split('=');
    if (arr2[0].includes(key)) {
      return arr2[1];
    } else {
      console.log('没有你要的缓存');
    }
  }
  return null;
}
/**
 * @description 提供给 exportExcel 替换表头字段
 * @author luohongxin
 * @date 04/11/2022
 * @param {*} filterVal
 * @param {*} jsonData
 * @return {*}
 */
function formatExportHeader(filterVal, list) {
  return list.map(v =>
    filterVal.map(j => {
      return v[j];
    })
  );
}
/**
 * @description
 * @author luohongxin
 * @date 04/11/2022
 * @export
 * @param {*} [list=[]] // 表格数据 [{id:1,title:2,author:3}]
 * @param {*} [tHeader=[]] // 表头数据 ['Id', 'Title', 'Author', 'Readings', 'Date']
 * @param {*} [filterVal=[]] // 表头对应表格字段的数据 ['id', 'title', 'author', 'pageviews', 'display_time']
 */
export function exportExcel(tHeader = [], filterVal = [], list = [], filename = '数据模板') {
  import('./Export2Excel.js').then(excel => {
    // 设置表头
    const data = formatExportHeader(filterVal, list); // 自己写的方法处理数据
    excel.export_json_to_excel({
      header: tHeader,
      data,
      filename,
      autoWidth: true, // 是否自动宽度
      bookType: 'xlsx', // 文件类型 'xlsx','csv','txt'
    });
  });
}

export function findIsIncludeElement(el, clsname) {
  let res = null;
  if (Array.isArray(clsname)) {
    clsname.forEach(c => {
      if (judeElement(el, c)) {
        res = true;
      }
    });
  } else {
    res = judeElement(el, clsname);
  }
  if (res === null && el) {
    return findIsIncludeElement(el.parentNode, clsname);
  } else {
    return res;
  }
}
/** *
 * @param {*} el dom节点
 * @param {*} clsname 类名或id
 * @return {*} true
 * el 为目标类名或id的子节点，false 为不是，null 是可以继续往上找
 * */

export function judeElement(el, clsname) {
  if (
    (el && el.parentNode && el.parentNode.className && el.parentNode.className.includes && el.parentNode.className.includes(clsname)) ||
    (el && el.className && el.className.includes && el.className.includes(clsname))
  ) {
    return true;
  }
  if (
    (el && el.parentNode && el.parentNode.id && el.parentNode.id.includes && el.parentNode.id.includes(clsname)) ||
    (el && el.id && el.id.includes && el.id.includes(clsname))
  ) {
    return true;
  } // 找到头为false不存在
  if (!el || (el && el.parentNode && el.parentNode.nodeName === '#document')) {
    return false;
  }
  return null;
}

// 读取 xls 等excel文件内容转出json数据
export function readExcelFileToJSON(file, callback) {
  var reader = new FileReader();
  // 读取上传文件为二进制
  reader.readAsBinaryString(file);
  reader.onload = function(event) {
    var data = event.target.result;
    var workbook = XLSX.read(data, { type: 'binary' });
    workbook.SheetNames.forEach(function(sheetName) {
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if (XL_row_object.length > 0) {
        callback(XL_row_object);
      }
    });
  };
  reader.onerror = function(event) {
    console.error('File could not be read! Code ' + event.target.error.code);
  };
}
/**
 * @description 判断值是否有用
 * @author luohongxin
 * @date 25/10/2022
 * @param {*} value
 * @return {*} Boolean
 */
export function isUsefulValue(value) {
  return value || value === 0 || value === false;
}
/**
 * @description 从数据表详情树中通过表头（即字典项）获取对应的字典值列表选项
 * @author luohongxin
 * @date 15/10/2022
 */
export function getLibraryOptions(headId, arr) {
  if (arr.length === 0) return []; //没有当前表详情
  let options = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    // 匹配对应表头（字典项）
    if (element.historyKey === headId) {
      // 未隐藏的才显示
      if (!element.isHidden) {
        options.push({
          ...element,
          value: element.codeUuid,
          label: element.codeName,
        });
      }
    }
  }
  return getArrUniq(options, 'value');
}
/**
 * @description 处理接口返回的关联数据表详情树，增添表头（即字典项）
 * @author luohongxin
 * @date 14/10/2022
 */
export function getItemByTree(arr, parentItemUuid = '') {
  let array = [];
  let itemObj = splitGroup(arr, 'itemUuid'); // 根据字典项分类
  for (let key in itemObj) {
    let newUuid = parentItemUuid ? parentItemUuid + '_' + key : key; // 拼接itemUuid作为表头（字典项）新的uuid
    let itemChildren = [];
    // 根据字典值的children的itemUuid继续划分字典项，形成表头（字典项）树
    itemObj[key].forEach(item => {
      if (item.children && item.children.length > 0) {
        itemChildren = itemChildren.concat(getItemByTree(item.children, newUuid));
      }
    });
    // 合并同层的字典项的codeChildren
    let itemChildren2 = [];
    const itemChildrenObj = splitGroup(itemChildren, 'value');
    for (let kk in itemChildrenObj) {
      let kkAObj = null;
      itemChildrenObj[kk].forEach(i => {
        if (!kkAObj) {
          kkAObj = i;
        } else {
          kkAObj.codeChildren = kkAObj.codeChildren.concat(i.codeChildren);
        }
      });
      itemChildren2.push(kkAObj);
    }
    // 字典项对象
    const obj = {
      label: itemObj[key][0].itemName,
      value: newUuid,
      children: itemChildren2,
      codeChildren: itemObj[key], // 该表头下的所有选项
    };
    if (itemChildren.length === 0) {
      delete obj.children;
    }
    array.push(obj);
  }
  return array;
}
/**
 * @description 对数组成员特性进行分组
 * @author luohongxin
 * @date 14/10/2022
 * @export
 * @param {*} [arr=[]]
 * @param {*} key
 * @return {*}  Array
 */
export function splitGroup(arr = [], key) {
  return key ? arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}) : {};
}
/**
 * @description 数组对象去重
 * @author luohongxin
 * @date 29/09/2022
 * @export
 * @param {*} [arr=[]]
 * @param {*} key
 * @return {*}
 */
export function getArrUniq(arr = [], key) {
  if (key) {
    // 根据对象的某个 key 值去重
    return arr.reduce((t, v) => {
      return t.some(o => o[key] === v[key]) ? t : [...t, v];
    }, []);
  } else {
    return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), []);
  }
}
// 防抖
export function debounce(f, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f(...args);
    }, wait);
  };
}
// 深度拷贝对象或数组
export function deepCopy(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] && obj[key]._isAMomentObject) {
        newObj[key] = moment(obj[key]);
      } else if (obj[key] && typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
/**
 * @description 数组扁平化
 * @author luohongxin
 * @date 2/05/2022
 * @param {*} {
 *  带child为引用对象类型数组，不带child为普通数组扁平化
 * historyKey 累计父辈的新标识
 * historyByKey 累计父辈的来源标识
 * }
 * @return {*}
 */
export const flatArr = {
  get(arr = [], child, historyKey, historyByKey, parent) {
    if (child) {
      return arr.reduce((t, v) => {
        if (historyKey) {
          v[historyKey] = parent ? parent[historyKey] + '_' + v[historyByKey] : v[historyByKey];
        }
        t.push(v);
        if (Array.isArray(v[child])) {
          t = t.concat(this.get(v[child], child, historyKey, historyByKey, v));
        }
        return t;
      }, []);
    } else {
      return arr.reduce((t, v) => t.concat(Array.isArray(v) ? this.get(v) : v), []);
    }
  },
};

// 支持移动类
export const dragClass = function({ trigerArr, drageBox, eventTarget } = {}) {
  this.trigerArr = trigerArr || null; // 触发拖拽元素类名
  this.drageBox = drageBox; // 拖拽元素
  this.eventTarget = eventTarget || document.body; // 鼠标事件触发对象，默认为document.body
  this.mouseDown2 = null; // 鼠标点击中间函数（为了处理ev传参）
};
dragClass.prototype.mouseDown = function(ev, _this) {
  // 只有触发拖拽元素类名才可以拖拽
  if (!_this.trigerArr || _this.trigerArr.includes(ev.target.className)) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;
    let content = document.querySelector(_this.drageBox);
    content.style.position = 'absolute';
    content.style.padding = 0;
    content.style.left = ev.clientX - offsetX + 'px';
    content.style.top = ev.clientY - offsetY + 'px';
    content.style.bottom = 'unset';
    content.style.right = 'unset';
    // 滑动事件添加到 body 上会更顺滑，避免滑动过快突然卡顿现象
    document.body.onmousemove = function(ev2) {
      let left = ev2.clientX - offsetX;
      let top = ev2.clientY - offsetY;
      const maxLeft = document.body.clientWidth - content.offsetWidth;
      const maxTop = document.body.clientHeight - content.offsetHeight;
      if (left <= 0) {
        left = 0;
      } else if (left >= maxLeft && maxLeft > 0) {
        left = maxLeft;
      }
      if (top <= 0) {
        top = 0;
      } else if (top >= maxTop && maxTop > 0) {
        top = maxTop;
      }
      content.style.left = left + 'px';
      content.style.top = top + 'px';
    };
  }
};
dragClass.prototype.mouseup = function() {
  document.body.onmousemove = null;
};
dragClass.prototype.setMove = function() {
  const _this = this;
  this.mouseDown2 = function(ev) {
    _this.mouseDown(ev, _this);
  };
  this.eventTarget.addEventListener('mousedown', this.mouseDown2);
  this.eventTarget.addEventListener('mouseup', this.mouseup);
};
dragClass.prototype.relMove = function() {
  this.eventTarget.removeEventListener('mouseup', this.mouseup);
  this.eventTarget.removeEventListener('mousedown', this.mouseDown2);
};

// 数字转换成字母
export function numTransLetter(num) {
  num = num - 0; // 兼容字符串数字
  return String.fromCharCode(num + 65);
}
// 生成唯一英文字符
export function unLetter() {
  const timestamp = new Date().getTime();
  let numArr = JSON.stringify(timestamp).split('');
  const newNumArr = numArr.map(item => {
    return numTransLetter(item);
  });
  return newNumArr.join('');
}
/**
 * @description 递归树并返回目标节点的经历节点
 * @author luohongxin
 * @date 27/05/2022
 * @param treeData - Array,
 * @param targetKey - 目标值,
 * @return {*} Array
 */
export const getTreeParentKeys = {
  get(treeData, targetKey, key = 'key', children = 'children') {
    return treeData.reduce((t, v) => {
      if (t.includes(targetKey)) return t;
      if (v[key] === targetKey) {
        t.push(v[key]);
        return t;
      }
      if ((!v[children] || !v[children].length === 0) && v[key] !== targetKey) return [];
      t.push(v[key]);
      let childKeys = this.get(v[children], targetKey, key, children);
      if (childKeys.length > 0) return t.concat(childKeys);
      return [];
    }, []);
  },
};

export function downLoadXls(fileArrayBuffer, filename) {
  let data = new Blob([fileArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,charset=utf-8',
  });
  if (typeof window.chrome !== 'undefined') {
    //Chrome
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = filename;
    link.click();
  } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //IE
    var blob = new Blob([data], { type: 'application/force-download' });
    window.navigator.msSaveBlob(blob, filename);
  } else {
    //Firefox
    var file = new File([data], filename, { type: 'application/force-download' });
    window.open(URL.createObjectURL(file));
  }
}
