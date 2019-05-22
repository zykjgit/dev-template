<template>
  <div class="layout-menu">
    <el-menu mode="vertical" router background-color="#2A394C" text-color="#fff">
      <template v-for="(item, index) in dynamicRoutes">
        <template v-if="!item.hidden">
          <router-link
            v-if="item.children.length === 1"
            :to="`${item.path}/${item.children[0].path}`"
            :key="index"
            active-class="is-active"
          >
            <el-menu-item class="reset-menu-color" :index="`${item.path}/${item.children[0].path}`">
              <span slot="title">{{ item.children[0].meta.name }}</span>
            </el-menu-item>
          </router-link>

          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span>{{ item.meta.name }}</span>
            </template>
            <el-menu-item-group>
              <router-link
                v-for="(child, childIndex) in item.children"
                :to="`${item.path}/${child.path}`"
                :key="childIndex"
                active-class="is-active"
              >
                <el-menu-item class="reset-menu-color" :index="`${item.path}/${child.path}`">{{
                  child.meta.name
                }}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { dynamicRoutes } from '@/router/routes.js';
export default {
  created() {
    this.dynamicRoutes = dynamicRoutes;
  }
};
</script>
<style lang="scss">
.layout-menu {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
.reset-menu-color {
  color: #fff !important;
}
.is-active > li {
  color: rgb(64, 158, 255) !important;
}
</style>
