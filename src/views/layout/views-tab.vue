<template>
  <span class="layout-tabs__tab" :to="view.path" :class="activeClass">
    <router-link
      class="layout-tabs__name"
      :to="{ path: view.path, fullPath: view.fullPath }"
      tag="span"
      >{{ view.title }}</router-link
    >
    <i class="el-icon-error layout-tabs__close" @click="handleCloseClick"></i>
  </span>
</template>

<script>
export default {
  props: {
    view: {
      type: Object,
      default: null
    }
  },
  computed: {
    activeClass() {
      return this.$route.name === this.view.name ? 'layout-tabs__tab--active' : '';
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('click-close', this.view);
    }
  }
};
</script>

<style lang="scss">
.layout-tabs__tab + .layout-tabs__tab {
  margin-left: 6px;
}
.layout-tabs__tab {
  display: inline-block;
  background-color: #fff;
  color: #495060;
  font-size: 12px;
  border: 1px solid #d8dce5;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}
.layout-tabs__name {
  display: inline-block;
  padding: 4px 0px 4px 6px;
}
.layout-tabs__tab--active {
  color: #fff;
  background-color: #42b983;
}
.layout-tabs__close {
  padding: 6px;
}
</style>
