import PrivateIpDrawer from '~/FormGenerator/src/components/formGeneratorItem/privateIpDrawer.vue';
export default {
  components: {
    PrivateIpDrawer,
  },
  data() {
    return {
      privateIpVisible: false,
    };
  },
  created() {
    if (this.formItemData.options.remoteType === 'privateIp') {
      this.$nextTick(function() {
        const submitValue = this.submitForm[this.formItemData.options.model];
        if (!submitValue) return;
        if (Array.isArray(submitValue)) {
          this.initOptions = submitValue.map(i => {
            return {
              ...i,
              label: i.businessPrivateIp,
              value: i.uuid,
            };
          });
        } else {
          this.initOptions = [
            {
              ...submitValue,
              label: submitValue.businessPrivateIp,
              value: submitValue.uuid,
            },
          ];
        }
      });
    }
  },
  methods: {
    privateIpCtrl(bool) {
      this.privateIpVisible = bool;
    },
    privateIpSubmit(selectedData) {
      let modelValue = [];
      this.initOptions = selectedData.map(i => {
        // 单选
        if (!this.formItemData.options.multiple) {
          modelValue = selectedData[0];
        } else {
          // 多选
          modelValue.push(i);
        }
        return {
          ...i,
          label: i.businessPrivateIp,
          value: i.uuid,
        };
      });
      // 私网资源类型
      this.$nextTick(function() {
        this.updateSubmitForm(modelValue);
        this.validateFormField();
      });
    },
  },
};
