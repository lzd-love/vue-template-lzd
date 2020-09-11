<!--
 * @Author: lzd
 * @Date: 2020-09-09 17:29:14
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 11:40:08
 * @Description: content description
-->
<template>
  <div class="equipment-details">
    <div class="message-box">
      <div class="top-view">
        <div class="title">设备详情</div>
        <div v-if="equipmentMessage.id" class="equipment-message">
          <div>设备名：{{ this.equipmentMessage.label }}</div>
          <div>设备id：{{ this.equipmentMessage.id }}</div>
        </div>
      </div>
      <div class="bottom-view">
        <div class="left-view">
          <div class="card">
            <div class="equipment-list">
              <div class="equipment-list-title menu-bar">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="transparent"
                  text-color="black"
                  active-text-color="var(--active-text)"
                  menu-trigger="click"
                >
                  <el-menu-item index="1">设备监测</el-menu-item>
                  <el-submenu index="2" :popper-append-to-body="false">
                    <template slot="title">
                      <!-- <i class="el-icon-location"></i> -->
                      <span>设备控制</span>
                    </template>
                    <el-menu-item index="2-1">设备设置</el-menu-item>
                    <el-menu-item index="2-2">日志回溯</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="3">设备调试</el-menu-item>
                </el-menu>
              </div>
              <div class="equipment-list-content">
                <component :is="isComponent"></component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <user-and-list-tree
      :returnBtn="true"
      class="charts-view"
    ></user-and-list-tree>
  </div>
</template>

<script>
import UserAndListTree from "../components/UserAndListTree";
import EquipmentMonitor from "../equipment_monitor/EquipmentMonitor";
import mixins from "@plugins/mixins.js";
export default {
  name: "EquipmentDetails",
  mixins: [mixins],
  components: {
    UserAndListTree,
    EquipmentMonitor,
    EquipmentSettings: () =>
      import(
        /* webpackChunkName: "about" */ "../equipment_settings/EquipmentSettings.vue"
      ),
    EquipmentLog: () =>
      import(
        /* webpackChunkName: "about" */ "../equipment_log/EquipmentLog.vue"
      ),
    EquipmentDebugging: () =>
      import(
        /* webpackChunkName: "about" */ "../equipment_debugging/EquipmentDebugging.vue"
      )
  },
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    equipmentMessage() {
      return this.$store.state.equipmentMessage;
    },
    isComponent() {
      let val = this.config.getComponentMap.get(this.activeIndex);
      return val ? val : "EquipmentMonitor";
    }
  },
  watch: {
    equipmentMessage(oldVal, newVal) {
      return oldVal, newVal;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$set(this, "activeIndex", key);
      return key, keyPath;
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-details {
  height: 100%;
  padding-bottom: 30px;
  .display();
  align-items: flex-start;
  .message-box {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 1005px;
  }
  .charts-view {
    width: 400px;
    height: 100%;
    margin-left: 40px;
    // padding-bottom: 30px;
  }
  .card {
    background: linear-gradient(var(--light-blue), var(--light-blue)) left top,
      linear-gradient(var(--light-blue), var(--light-blue)) left top,
      linear-gradient(var(--light-blue), var(--light-blue)) right top,
      linear-gradient(var(--light-blue), var(--light-blue)) right top,
      linear-gradient(var(--light-blue), var(--light-blue)) right bottom,
      linear-gradient(var(--light-blue), var(--light-blue)) right bottom,
      linear-gradient(var(--light-blue), var(--light-blue)) left bottom,
      linear-gradient(var(--light-blue), var(--light-blue)) left bottom;
    background-repeat: no-repeat;
    background-size: 2px 20px, 20px 2px;
    width: 100%;
    height: 100%;
    padding: 2px;
  }
  .title {
    margin: 20px 0;
    font-size: 34px;
    font-weight: bold;
  }
  .yellow {
    color: yellow;
    // font-weight: bold;
  }
  .red {
    color: red;
    // font-weight: bold;
  }

  .top-view {
    .display();
    justify-content: flex-start;
  }
  .bottom-view {
    margin: 0 0 0 0;
    .display();
    flex: auto;
    align-items: flex-start;
    // background: var(--menu-bg);
    .left-view {
      height: 100%;
      padding-right: 30px;
      width: 100%;
    }
  }
  .equipment-list {
    width: 100%;
    height: 100%;
    background: var(--card-background);
    overflow: hidden;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
  }
  .equipment-list-title {
    font-weight: bold;
    text-align: left;
    font-size: 16px;
  }
  .equipment-list-content {
    flex: auto;
    margin-top: 10px;
  }
  .equipment-message {
    font-weight: bold;
    .display();
    align-items: flex-start;
    margin-left: 15px;
    flex-direction: column;
  }
  .menu-bar {
    // border-bottom: 2px solid var(--borer-bottom);
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: var(--borer-bottom);
    }
  }
  /deep/ .el-menu.el-menu--horizontal {
    border: none;
  }
  /deep/ .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom-color: var(--borer-bottom);
  }
  /deep/ .el-menu-item,
  /deep/ .el-submenu__title {
    font-size: 15px;
    background: transparent !important;
  }

  /deep/ .el-menu-item:hover {
    background-color: transparent !important;
    &:hover,
    &:focus {
      background-color: var(--menu-active) !important;
    }
  }
  /deep/ .el-submenu__title:hover {
    background-color: transparent !important;
    &:hover,
    &:focus {
      background-color: var(--menu-active) !important;
    }
  }
  /deep/ .el-menu--popup .el-menu-item {
    font-weight: 400;
    font-size: 14px;
  }
  /deep/ .el-menu--popup {
    background: #3f7784 !important;
  }
  /deep/ .el-submenu__icon-arrow {
    color: var(--main-color);
  }
}
</style>
