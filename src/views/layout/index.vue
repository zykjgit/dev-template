<template>
  <el-container class="layout">
    <el-aside width="210px">
      <layout-menu></layout-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <layout-header></layout-header>
      </el-header>
      <views-tabs-wrap>
        <views-tab
          v-for="(item, index) in viewTabs"
          :view="item"
          :key="index"
          @click-close="handleCloseTab"
        ></views-tab>
      </views-tabs-wrap>
      <el-main style="height: 100%">
        <keep-alive :include="cacheRoutes">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutMenu from './layout-menu';
import layoutHeader from './layout-header';
import viewsTabsWrap from './views-tabs-wrap';
import viewsTab from './views-tab';
export default {
  name: 'Layout',
  components: {
    layoutMenu,
    layoutHeader,
    viewsTabsWrap,
    viewsTab
  },
  created() {
    this.addView();
  },
  watch: {
    $route() {
      this.addView();
    }
  },
  computed: {
    viewTabs() {
      return this.$store.state.viewTabs.viewTabs;
    },
    cacheRoutes() {
      return this.$store.state.viewTabs.cacheRoutes;
    }
  },
  methods: {
    addView() {
      if (this.$route.name) {
        this.$store.dispatch('viewTabs/addView', this.$route);
      } else {
        this.$store.commit('viewTabs/CLEAR_VIEWTABS');
      }
    },
    handleCloseTab(view) {
      this.$store.dispatch('viewTabs/delView', view).then(res => {
        if (view.name === this.$route.name) {
          //检查关闭的路由是不是当前路由 如果是要进行跳转；
          if (res) {
            this.$router.push(res.path);
          } else {
            this.$router.push('/home');
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  .header {
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>
