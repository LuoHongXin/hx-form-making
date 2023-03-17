import request from '@src/utils/request';

const base = '/service-manager';
const base2 = '/service-resource-manager';
const base3 = '/order';
const base4 = '/third-party';
const base5 = '/workflow';
const base6 = '/identify';
const base7 = '/billing';
export default {
  /** 
  /dictionaryManage/getItemTree
  获取字典项列表树 
  name 字典项名称
  */
  getDictionary(name) {
    return request({
      url: base + `/dictionaryManage/getItemTree`,
      method: 'get',
      params: { name },
    });
  },
  /** 
  /dictionaryManage/getCode
  获取字典值列表
  code字典值
  itemUuid字典项uuid
  */
  getDictionaryCode({ code, itemUuid }) {
    return request({
      url: base + `/dictionaryManage/getCode`,
      method: 'get',
      params: { code, itemUuid },
    });
  },
  /** 
  /dataCorrelation/getCorrelationList
  获取数据关联表列表
  areaCode区域编码
  current当前页
  order排序类型：asc为升序，desc为降序
  size每页显示条数
  sort排序组件
  tableName表名
  */
  getDataCorrelation(params) {
    return request({
      url: base + `/dataCorrelation/getCorrelationList`,
      method: 'get',
      params,
    });
  },
  /** 
  /dataCorrelation/{uuid}/details
  获取数据关联表详情
  headUuid查询组件名uuid
  queryInformation查询信息
  uuid *uuid
  */
  getDataCorrelationDetails(uuid) {
    return request({
      url: base + `/dataCorrelation/${uuid}/details`,
      method: 'get',
    });
  },
  /** 
  /business-system/pure-list
  查询总系统下拉列表
  */
  getBusinessSystem(params) {
    return request({
      url: base2 + `/business-system/pure-list`,
      method: 'get',
      params: { personData: 1, ...params },
    });
  },
  /** 
  /instance-descriptors
  获取定义列表（固定数据源）
  */
  getInstanceDescriptors() {
    return request({
      url: base2 + `/instance-descriptors`,
      method: 'get',
    });
  },
  /** 
  /instance-descriptors/tree
  获取定义列表（固定数据源树）
  */
  getInstanceDescriptorsTree() {
    return request({
      url: base2 + `/instance-descriptors/tree`,
      method: 'get',
    });
  },
  /** 
  /instance-descriptors/cross-metadata
  获取属性交集（固定数据源表头）
  */
  getCrossMetadata(productTypes) {
    return request({
      url: base2 + `/instance-descriptors/cross-metadata`,
      method: 'get',
      params: { productTypes },
    });
  },
  /** 
  /instance-descriptors/{productType}/operation-details
  获取产品类型的运营门户属性描述
  */
  getOperationDescriptors(productType) {
    return request({
      url: base2 + `/instance-descriptors/${productType}/operation-details`,
      method: 'get',
      params: { productType },
    });
  },
  /** 
  /instance-descriptors/{productType}/service-details
  获取产品类型的服务门户属性描述
  */
  getServiceDescriptors(productType) {
    return request({
      url: base2 + `/instance-descriptors/${productType}/service-details`,
      method: 'get',
      params: { productType },
    });
  },
  /** 
  /instances/{productType}/normalized-page
  获取统一字段的实例列表
  */
  getNormalizedPage(params) {
    return request({
      url: base2 + `/instances/${params.productType}/normalized-page`,
      method: 'get',
      params,
    });
  },
  /** 
/files/uploadAttachment
附件上传
formData {
  file 文件
  fileName 文件名
  fileType
  文件类型。1：订单项文件，2：创建工单文件，3：处理工单文件 4:电子印章文件 5:实施回填文件
}
*/
  uploadAttachment(params) {
    return request({
      url: base3 + `/files/uploadAttachment`,
      method: 'post',
      data: params,
    });
  },
  /**
 /files/{uuid}/delete
附件删除
 */
  deleteAttachment(uuid) {
    return request({
      url: base3 + `/files/${uuid}/delete`,
      method: 'post',
    });
  },
  /**
 /electronicSeal/checkSealName
  检查印章名称
 */
  checkSealName(sealName) {
    return request({
      url: base4 + `/electronicSeal/checkSealName`,
      method: 'post',
      data: {
        sealName,
      },
    });
  },
  /**
 /orders/{uuid}/operation/smart-writeback-template
  获取工单回填模版
  taskId *taskId
  uuid 运营工单Uuid，亦订单项Uuid
 */
  getTemplateDocument({ taskId, uuid }) {
    return request({
      url: base3 + `/orders/${uuid}/operation/smart-writeback-template`,
      method: 'post',
      responseType: 'blob',
      params: { taskId },
    });
  },
  /**
  /files/{uuid}/download
   附件下载（可用于下载回填工单）
 */
  downloadFiles(uuid) {
    return request({
      url: base3 + `/files/${uuid}/download`,
      method: 'get',
      responseType: 'blob',
    });
  },
  /**
   * /orders/{uuid}/operation/smart-writeback
      进行工单回填
   * 工单回填
    file *(formData)
    taskId taskId
    uuid 运营工单Uuid，亦订单项Uuid
   */
  writeback({ file, uuid, taskId }) {
    return request({
      url: base3 + `/orders/${uuid}/operation/smart-writeback`,
      method: 'post',
      params: {
        taskId,
      },
      data: file,
    });
  },
  /**
   * /orders/listAllWorkflowNodes
      获取节点类型
   */
  getWorkflowNodes() {
    return request({
      url: base3 + `/orders/listAllWorkflowNodes`,
      method: 'get',
    });
  },
  /* 
  /workflows/{workflowUuid}/nodes
  workflowUuid 查询的工作流Uuid 
  */
  getWorkflowsNodes(workflowUuid) {
    return request({
      url: base5 + `/workflows/${workflowUuid}/nodes`,
      method: 'get',
    });
  },
  /* 
/roles
查询角色列表
*/
  getRoles(params) {
    return request({
      url: base6 + `/roles`,
      method: 'get',
      params,
    });
  },
  /* 
  /roles/{roleId}
  查询单个角色
*/
  getSingleRoles(roleId) {
    return request({
      url: base6 + `/roles/${roleId}`,
      method: 'get',
    });
  },
  /* 
  /comments/user-comments
  查询用户常用语列表
*/
  getUserComments() {
    return request({
      url: base + `/comments/user-comments`,
      method: 'get',
    });
  },
  /* 
  /comments/{commentUuid}/stat
  统计常用语
*/
  statComments(commentUuid) {
    return request({
      url: base + `/comments/${commentUuid}/stat`,
      method: 'get',
    });
  },
  /* 
  /instVm
  虚拟机资源实例
  busPrivateIpOrBusElasticIp 关键字查询(业务私网Ip或弹性Ip)
  busSysName 业务系统名称
  busSysUuid 业务系统Uuid
  businessElasticIp 弹性业务Ip
  businessPrivateIp 业务私网Ip
  columns 需要显示的列(列: [“busSysName","name","businessPrivateIp","businessElasticIp”])
  current 当前页
  dutyDays 工作日
  keyword 关键字搜索
  name 虚拟机名称
  networkArea 网络区域
  order 排序类型：asc为升序，desc为降序
  resourceType 资源类型
  roomName 机房名称
  size 每页显示条数
  sort 排序字段
  strStartDate 开始工作日时间
  sysIds 系统uuid
  undoStatus 撤销状态(0:正常 1：撤销)
  unitId 单位Id
  unitName 单位名称
  uuid uuid
  vmUuid 绑定的虚拟机uuid
*/
  getInstVm(params) {
    return request({
      url: base2 + `/instVm`,
      method: 'get',
      params,
    });
  },
  /* 
    menuManage/tree 
    菜单目录树 
  */
  getMenuMangeTree({ name }) {
    return request({ url: base + `/menuManage/tree`, method: 'get', params: { name } });
  },
  /**
   *  @description 获取计费因子
   *  @data
   */
  getBillingFactorList(params) {
    if (params.name) {
      params.name = params.name.replace(/%/g, '[percentSign]');
    }
    return request({
      url: `${base7}/billing-factor`,
      method: 'get',
      params: {
        createTimeSort: 'desc',
        ...params,
      },
    });
  },
  /* /dictionaryManage/getCodePage 获取字典值列表(分页) 
  code字典值 
  current当前页 
  itemUuid字典项uuid 
  order排序类型：asc为升序，desc为降序 
  size每页显示条数 
  sort排序字段 
  */

  getDictionaryCodePage({ code, itemUuid, current, size, sort, order }) {
    return request({ url: base + `/dictionaryManage/getCodePage`, method: 'get', params: { code, itemUuid, current, size, sort, order } });
  },
};
