<template>
  <div class="layout-tabs-wrap">
    <div class="layout-tabs">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.layout-tabs-wrap {
  height: 40px;
  overflow: hidden;
  box-shadow: 0 2px 2px rgba(0, 21, 41, 0.08);
}
.layout-tabs {
  width: 100%;
  height: 57px;
  white-space: nowrap;
  box-shadow: 0 2px 2px rgba(0, 21, 41, 0.08);
  box-sizing: border-box;
  padding: 6px 20px;
  overflow: scroll;
}
</style>
