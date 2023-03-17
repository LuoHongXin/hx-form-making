export const basicComponents = [
  // 单行文本
  {
    type: 'input',
    icon: 'icon-input',
    title: '单行文本',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      width: '',
      defaultValue: '',
      suffix: '', // 后缀
      prefix: '', // 前缀
      required: false,
      requiredMessage: '请输入',
      dataType: '',
      dataTypeCheck: false,
      dataTypeMessage: '',
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      validatorCheck: false,
      validator: [], // 格式校验规则
      placeholder: '', // 占位提示
      placeholderCheck: false,
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showPassword: false,
      clearable: false,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'textarea',
    title: '多行文本',
    icon: 'icon-textarea',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      width: '',
      defaultValue: '',
      maxLength: 0,
      required: false,
      requiredMessage: '请输入',
      disabled: false,
      pattern: '',
      patternMessage: '',
      validatorCheck: false,
      validator: [], // 格式校验规则
      placeholder: '', // 占位提示
      placeholderCheck: false,
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      clearable: false,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'number',
    icon: 'icon-number',
    title: '计数器',
    options: {
      sumTotal: 0, // 自增情况下同组件标识计数器的数量总和
      sumTotalCheck: false, // 是否开启同组件标识计数器的数值总和
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      placeholder: '', // 占位提示
      placeholderCheck: false,
      width: '140px',
      required: false,
      requiredMessage: '请输入',
      validatorCheck: false,
      validator: [], // 格式校验规则
      formatterCheck: false,
      formatter: '',
      validaeFormatterKey: '',
      defaultValue: 0,
      min: 0,
      max: 9,
      step: 1,
      disabled: false,
      controls: true,
      controlsPosition: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      precision: 0,
      billingType: null, // 费用类型 无-null 关联计费因子 billingFactor
      billingConfig: null, // 费用配置
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'date',
    icon: 'icon-date',
    title: '日期',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      placeholder: '', // 占位提示
      placeholderCheck: false,
      defaultValue: null,
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'YYYY-MM-DD',
      timestamp: false,
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'dateRange',
    icon: 'icon-range',
    title: '起止时间',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      // placeholder: ['', ''], // 占位提示
      // placeholderCheck: false,
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'YYYY-MM-DD',
      timestamp: false,
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'select',
    icon: 'icon-select',
    title: '下拉框',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '', // 占位提示
      placeholderCheck: false,
      required: false,
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      showLabel: false,
      width: '',
      options: [
        {
          value: 'Option 1',
        },
        {
          value: 'Option 2',
        },
        {
          value: 'Option 3',
        },
      ],
      hideOptions: [], // 隐藏的选项值
      remote: false,
      remoteType: 'custom', // 数据来源
      dataAssociation: true, // 数据关联表情况下是否要同表数据关联
      remoteDictionaryId: '', // 字典项id
      remoteLibraryId: '', // 数据关联表id
      remoteLibraryHeadId: '', // 数据关联表表头id
      remoteOption: '',
      filterable: false, // 是否支持搜索
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'radio',
    title: '单选框',
    icon: 'icon-radio',
    options: {
      lineFeed: false, // 选项是否换行，不换行则默认撑开一行，换行则根据内容撑开宽度，选项多则会换行
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      placeholder: '', // 占位提示
      placeholderCheck: false,
      inline: true, // 排序方式 true 横向排布，false 纵向排布
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
        },
        {
          value: 'Option 2',
        },
        {
          value: 'Option 3',
        },
      ],
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      width: '',
      remote: false,
      hideOptions: [], // 隐藏的选项值
      remoteType: 'custom',
      dataAssociation: true, // 数据关联表情况下是否要同表数据关联
      remoteDictionaryId: '', // 字典项id
      remoteLibraryId: '', // 数据关联表id
      remoteLibraryHeadId: '', // 数据关联表表头id
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
    },
    events: {
      onChange: '',
    },
  },
  {
    type: 'checkbox',
    title: '复选框',
    icon: 'icon-check',
    options: {
      lineFeed: false, // 选项是否换行，不换行则默认撑开一行，换行则根据内容撑开宽度，选项多则会换行
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      hideOptions: [], // 隐藏的选项值
      remoteType: 'custom',
      dataAssociation: true, // 数据关联表情况下是否要同表数据关联
      remoteDictionaryId: '', // 字典项id
      remoteLibraryId: '', // 数据关联表id
      remoteLibraryHeadId: '', // 数据关联表表头id
      inline: true,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
        },
        {
          value: 'Option 2',
        },
        {
          value: 'Option 3',
        },
      ],
      required: false,
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      width: '',
      remote: false,
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
    },
    events: {
      onChange: '',
    },
  },
  {
    type: 'fileupload',
    title: '上传附件',
    icon: 'icon-fileupload',
    options: {
      fileType: '1', // 文件类型 1：订单项文件，2：创建工单文件，3：处理工单文件 4:电子印章文件 5:实施回填文件
      defaultValue: [],
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      placeholder: '', // 占位提示
      placeholderCheck: false,
      itemWidth: '100%', // 表单项宽度占比
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      tokenType: 'datasource',
      domain: 'https://tcdn.form.making.link/',
      disabled: false,
      tip: '',
      action: '', // 上传地址
      customClass: '',
      limit: 9, // 限制上传数量
      limitSize: 0, // 限制上传大小
      accept: '', // 限制文件上传类型
      multiple: false, // 是否支持多选文件
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      headers: [],
      required: false,
      requiredMessage: '请上传',
      validatorCheck: false,
      validator: '',
      withCredentials: false,
    },
    events: {
      onChange: '',
      onSelect: '',
      onUploadSuccess: '',
      onUploadError: '',
      onRemove: '',
    },
  },
  {
    type: 'switch',
    title: '开关',
    icon: 'icon-switch',
    options: {
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      placeholder: '', // 占位提示
      placeholderCheck: false,
      itemWidth: '100%', // 表单项宽度占比
      defaultValue: false,
      required: false,
      requiredMessage: '',
      validatorCheck: false,
      validator: '',
      disabled: false,
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      width: '',
    },
    events: {
      onChange: '',
    },
  },
  {
    type: 'layoutTitle',
    title: '标题',
    icon: 'icon-switch',
    options: {
      name: '',
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      hidden: false,
      itemWidth: '100%',
    },
  },
  {
    type: 'layoutDivider',
    title: '分割线',
    icon: 'icon-switch',
    options: {
      name: '',
      hidden: false,
      itemWidth: '100%',
    },
  },
];

export const advanceComponents = [
  {
    type: 'combination',
    title: '组合组件',
    icon: 'icon-combination',
    list: [], // 需组合的基础组件
    options: {
      inline: true, // 排序方式 true 横向排布，false 纵向排布
      showChildComponentLabel: false, // 排序方式 true 横向排布，false 纵向排布
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      requiredMessage: '',
      customClass: '',
      hidden: false,
    },
  },
  {
    type: 'table',
    title: '表格组件',
    icon: 'icon-combination',
    list: [], // 表头组件
    options: {
      name: '',
      itemWidth: '100%', // 表单项宽度占比
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      requiredMessage: '表格不能为空',
      customClass: '',
      hidden: false,
      importData: false,
      exportData: false,
      productTypes: [], // 固定数据源的产品类型
    },
  },
];

// 业务组件（业务逻辑较强）
export const classicComponents = [
  {
    type: 'opinion',
    title: '办理意见',
    icon: 'icon-combination',
    options: {
      lineFeed: true, // 选项是否换行，不换行则默认撑开一行，换行则根据内容撑开宽度，选项多则会换行
      name: '办理意见', // 办理意见名称
      name2: '审批用语', // 审批用语名称
      inline: true,
      isCheck: false, // 审批用语类型
      disabled: false, // 是否禁用
      maxLength: 0, // 办理意见最大输入字数
      defaultValue: '', // 办理意见默认值
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: 'message', // 办理意见的组件标识（固定）
      model2: '', // 审批用语的组件标识
      placeholder: '', // 占位提示
      placeholderCheck: false,
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      options: [{ value: '核查完成' }, { value: '交付成功' }, { value: '交付错误' }], // 审批用语选项
      required: false,
      requiredMessage: '请输入',
      customClass: '',
      hidden: false,
    },
  },
  {
    type: 'electricSealName',
    icon: 'icon-input',
    title: '印章名称',
    options: {
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: '', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      width: '',
      defaultValue: '',
      suffix: '', // 后缀
      prefix: '', // 前缀
      required: false,
      requiredMessage: '请输入',
      dataType: '',
      dataTypeCheck: false,
      dataTypeMessage: '',
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      validatorCheck: false,
      validator: [], // 格式校验规则
      placeholder: '', // 占位提示
      placeholderCheck: false,
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showPassword: false,
      clearable: false,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'workOrderBackfill',
    icon: 'icon-input',
    title: '工单回填',
    options: {
      downloadTmplCheck: true, // 下载模板是否显示
      uploadOrderCheck: true, // 上传工单是否显示
      viewResultCheck: true, // 查看回填结果是否显示
      downloadResultCheck: true, // 下载回填结果是否显示
      flowState: 'implement', // 回填类型，implement 和 backupImplement 备份回填
      downloadTmplText: '下载模板', // 下载模板
      uploadOrderText: '上传工单', // 上传工单
      viewResultText: '查看回填结果', // 查看回填结果
      downloadResultText: '下载回填结果', // 下载回填结果
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: 'attachments', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      width: '',
      defaultValue: '',
      required: false,
      requiredMessage: '请回填',
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      validatorCheck: false,
      validator: [], // 格式校验规则
      placeholder: '', // 占位提示
      placeholderCheck: false,
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      clearable: false,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'designate',
    icon: 'icon-input',
    title: '指派实施组',
    options: {
      nodeCheck: true, // 选择节点是否显示
      roleCheck: false, // 选择角色是否显示
      implementCheck: true, // 选择实施组是否显示
      nodeText: '选择节点', // 选择节点组件名称
      roleText: '选择角色', // 选择角色组件名称
      implementText: '指派实施组', // 指派实施组组件名称
      nodePlaceholderCheck: false, // 占位提示
      nodePlaceholder: '请选择节点', // 占位提示
      nodeLightTipsCheck: false, // 轻提示
      nodeLightTipsContent: '', // 轻提示
      nodeStrongTipsContent: '', // 强提示
      nodeStrongTipsCheck: false, // 强提示
      rolePlaceholderCheck: false, // 占位提示
      rolePlaceholder: '请选择角色', // 占位提示
      roleLightTipsCheck: false, // 轻提示
      roleLightTipsContent: '', // 轻提示
      roleStrongTipsContent: '', // 强提示
      roleStrongTipsCheck: false, // 强提示
      implementPlaceholderCheck: false, // 占位提示
      implementPlaceholder: '请选择指派实施组', // 占位提示
      implementLightTipsCheck: false, // 轻提示
      implementLightTipsContent: '', // 轻提示
      implementStrongTipsContent: '', // 强提示
      implementStrongTipsCheck: false, // 强提示
      nodeRequired: false,
      roleRequired: false,
      implementRequired: false,
      implementMultiple: true,
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      nodeModel: 'approveFlowNodeId', // 与后端绑定的节点组件标识
      nodeModel2: '', // 选择的节点
      roleModel: 'roleId', // 与后端绑定的组件标识
      implementModel: 'groupUuids', // 与后端绑定的实施组组件标识
      width: '322px',
      defaultValue: '',
      requiredMessage: '请选择',
      pattern: '',
      patternMessage: '',
      validatorCheck: false,
      validator: [], // 格式校验规则
      placeholder: '', // 占位提示
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      clearable: false,
    },
    events: {
      onChange: '',
      onFocus: '',
      onBlur: '',
    },
  },
  {
    type: 'approveResult',
    title: '审核结果',
    icon: 'icon-radio',
    options: {
      lineFeed: true, // 选项是否换行，不换行则默认撑开一行，换行则根据内容撑开宽度，选项多则会换行
      itemWidth: '100%', // 表单项宽度占比
      buttonType: false, // 按钮类型， false 不显示
      buttonJumpUrl: '', // 按钮跳转路径
      model: 'approveResult', // 与后端绑定的组件标识
      strongTipsContent: '', // 强提示
      strongTipsCheck: false, // 强提示
      lightTipsContent: '', // 轻提示
      lightTipsCheck: false, // 轻提示
      required: false,
      placeholder: '', // 占位提示
      placeholderCheck: false,
      inline: true, // 排序方式 true 横向排布，false 纵向排布
      defaultValue: '',
      showLabel: false,
      approveCheck: true, // 通过按钮显示
      rejectCheck: true, // 隐藏按钮显示
      options: [
        {
          label: '通过',
          text: '通过',
          value: 'approve',
          check: true,
        },
        {
          label: '驳回',
          text: '驳回',
          value: 'reject',
          check: true,
        },
      ],
      requiredMessage: '请选择',
      validatorCheck: false,
      validator: [], // 格式校验规则
      width: '',
      remote: false,
      hideOptions: [], // 隐藏的选项值
      remoteType: 'custom',
      dataAssociation: true, // 数据关联表情况下是否要同表数据关联
      remoteDictionaryId: '', // 字典项id
      remoteLibraryId: '', // 数据关联表id
      remoteLibraryHeadId: '', // 数据关联表表头id
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
    },
    events: {
      onChange: '',
    },
  },
];
