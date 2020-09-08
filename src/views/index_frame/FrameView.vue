<template>
  <div class="frame-view">
    <div class="top-view">
      <div class="system-name">xxx设备管理系统</div>
      <div class="top-view-right">
        <div class="system-btn">
          <div>登录</div>
        </div>
        <div class="system-administrator"></div>
      </div>
    </div>
    <div class="left-view">
      <el-menu
        class="menu-bar"
        default-active="1-1"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#c3c3bc"
        active-text-color="#ffd04b"
        style="border:none"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>设备监测</span>
          </template>
          <el-menu-item index="1-1">设备信息实时监测</el-menu-item>
          <el-menu-item index="1-2">异常信息报警</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <span>设备控制</span>
          </template>
          <el-menu-item index="2-1">设备状态控制</el-menu-item>
          <el-menu-item index="2-2">系统升级</el-menu-item>
          <el-menu-item index="2-3">日志回溯</el-menu-item>
          <el-menu-item index="2-4">数据上传</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>信息回溯</span>
          </template>
          <el-menu-item index="3-1">异常信息列表回溯</el-menu-item>
          <el-menu-item index="3-2">异常信息详情</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>设备调试</span>
          </template>
          <el-menu-item index="4-1">内部信号自检配置</el-menu-item>
          <el-menu-item index="4-2">收拾自校验信息展示</el-menu-item>
          <el-menu-item index="4-3">电磁信号触发采集参数配置</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import testApi from "@api/test_api.js";
import mixins from "@plugins/mixins.js";
export default {
  mixins: [mixins],
  name: "FrameView",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    testApi
      .testAplicationProxy({ value: "世界和平1" })
      .then(res => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style scoped>
.top-view {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #374048;
  padding: 0 30px;
}
.left-view {
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
  min-width: 200px;
  max-width: 400px;
  width: 15vw;
  background: #545c64;
}
.top-view-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.system-btn {
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
}
.system-administrator {
  display: flex;
  align-items: center;
}
.system-name {
  color: white;
  font-size: 28px;
}
.frame-view >>> .el-submenu__title {
  font-size: 12px;
  color: white !important;
  font-size: 16px;
}
.frame-view >>> .menu-bar > li {
  border-bottom: 1px solid #6b6963;
}
.frame-view >>> .menu-bar > li:nth-last-child(1) {
  border-bottom: none;
}
</style>
