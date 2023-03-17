<template>
  <div style="height: 100vh">
    <y-button-group reversed style="margin: 8px 12px" :moreBtnNum="5" :buttonList="buttonList"></y-button-group
    ><YjzFormMaking ref="yjzmkform" style="height: 100%" />
    <y-modal :title="type === 1 ? '表单数据' : '渲染表单逻辑规则'" :visible="modalVisible" @ok="ok" @cancel="modalVisible = false">
      <y-textarea v-model="jsonFormData" />
    </y-modal>
  </div>
</template>
<script>
export default {
  name: 'myformMaking',
  data() {
    return {
      jsonFormData: '',
      type: 1, // 1 表单数据、2 渲染表单逻辑规则
      modalVisible: false,
      buttonList: [
        {
          text: '生成数据',
          type: 'primary',
          click: () => {
            this.getjson();
          },
        },
        {
          text: '复制数据',
          click: () => {
            const _this = this;
            this.$copyText(this.$refs.yjzmkform.getJSON()).then(
              function (e) {
                _this.$YMessage.success('数据已复制');
                console.log('复制成功', e);
              },
              function (e) {
                _this.$YMessage.error('数据复制失败，请手动尝试复制');
                console.log('复制失败', e);
              }
            );
          },
        },
        {
          text: '输入渲染数据',
          click: () => {
            this.type = 1;
            this.modalVisible = true;
          },
        },
        {
          text: '输入设计逻辑表单规则',
          click: () => {
            this.type = 2;
            this.modalVisible = true;
          },
        },
        {
          text: '查看表单',
          click: () => {
            this.$refs.yjzmkform.checkFormConfig().then(({ flag, emptyOptionsName, emptyTitleIndex }) => {
              if (flag) {
                localStorage.setItem('makingformData', this.$refs.yjzmkform.getJSON());
                localStorage.setItem('makingformLogicFormRules', JSON.stringify(this.$refs.yjzmkform.getLogicFormRules()));
                this.$router.push({
                  name: 'yjzformGenerator',
                });
                return;
              }
              let errMessage = '';
              if (emptyOptionsName.length > 0) {
                errMessage += emptyOptionsName.join() + '不能存在为空的选项；';
              }
              if (emptyTitleIndex.length > 0) {
                errMessage += '第' + emptyTitleIndex.join() + '个组件名称不能为空；';
              }
              if (errMessage) {
                this.$YMessage.error(errMessage);
              }
            });
          },
        },
      ],
    };
  },
  methods: {
    getjson() {
      alert(this.$refs.yjzmkform.getJSON());
    },
    ok() {
      if (this.type === 1) {
        this.$refs.yjzmkform.setJSON(this.jsonFormData);
      } else {
        // 逻辑表单规则
        this.$refs.yjzmkform.setLogicFormRules(this.jsonFormData);
      }
      this.modalVisible = false;
    },
  },
};
</script>
