<template>
  <div id="app" style="height: 100%">
    <a-config-provider :locale="locale">
      <a-layout style="height: 100%">
        <a-layout-sider v-if="!$route.meta.hideMenu" style="height: 100%; overflow: auto">
          <h3 class="versionTitle">{{ packageInfo.version }}</h3>
          <a-menu :defaultOpenKeys="openKeys" v-model="selectdRoute" mode="inline">
            <template v-for="item in routes">
              <a-sub-menu v-if="item.children" :key="item.name">
                <span slot="title"
                  ><span>{{ item.meta.title }}</span></span
                >
                <a-menu-item v-for="child in item.children" :key="child.name" @click="routerLink(child)">{{
                  child.meta.title
                }}</a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="item.name" @click="routerLink(item)">{{ item.meta.title }}</a-menu-item>
            </template>
          </a-menu>
        </a-layout-sider>
        <!-- <a-layout-content> -->
        <div class="router-views"><router-view /></div>
      </a-layout>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
const packageInfo = require('../package.json');
export default {
  data() {
    return {
      packageInfo,
      locale: zhCN,
      routes: [],
      openKeys: [],
      selectdRoute: [],
      anim: {},
    };
  },
  watch: {
    $route: function(val) {
      this.selectdRoute = [val.name];
    },
  },
  created() {
    this.routes = this.$router.options.routes.filter(item => {
      return item.meta && item.meta.title && this.openKeys.push(item.name);
    }); // 有title的才作为菜单
    this.selectdRoute = [this.routes[0].name];
  },
  methods: {
    routerLink(route) {
      this.$router.push({ name: route.name });
    },
  },
};
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: left;
  .versionTitle {
    font-size: 24px;
    line-height: 24px;
    height: 30px;
    padding-top: 6px;
    padding-left: 24px;
    margin: 0;
  }
  // color: #2c3e50;
  .myLottie {
    svg {
      background: transparent;
    }
  }
  .router-views {
    width: 100%;
    position: relative;
    overflow: auto;
  }
  .ant-layout {
    background: #f7f8fa;
  }
  .ant-layout-sider {
    background: #fff;
    line-height: 120px;
  }
  .ant-layout-content {
    background: #fff;
    height: 100%;
    overflow: auto;
  }
  .com-title {
    text-align: left;
    font-size: 22px;
    font-weight: 600;
  }
  .com-text {
    text-align: left;
    font-size: 14px;
  }
  .fun-title {
    margin-top: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 550;
  }
  .fun-show {
    border: 1px solid #ebedf0;
    padding: 42px 24px 50px;
  }
  .fun-detail-title {
    text-align: left;
    font-size: 18px;
    color: #777;
  }
  .fun-detail-show {
    text-align: left;
    font-size: 14px;
    color: #314659;
    padding-bottom: 10px;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
