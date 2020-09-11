<!--
 * @Author: lzd
 * @Date: 2020-09-10 16:07:53
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 11:39:59
 * @Description: content description
-->
<template>
  <div class="equipment-monitor">
    <div class="message-row">
      <div class="message-row-label">设备在线状态：</div>
      <div class="message-row-content">
        <el-switch
          style="display: block"
          v-model="zx"
          :disabled="false"
          active-color="var(--safe)"
          inactive-color="var(--err)"
          active-text="在线"
          inactive-text="不在线"
        ></el-switch>
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备工作模式：</div>
      <div class="message-row-content">
        <el-switch
          style="display: block"
          v-model="gz"
          :disabled="false"
          active-color="var(--safe)"
          inactive-color="var(--warn)"
          active-text="工作"
          inactive-text="测试"
        ></el-switch>
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备异常状态信息：</div>
      <div class="message-row-content">{{ yc }}</div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备授时信息：</div>
      <div class="message-row-content">{{ ss }}</div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备位置信息：</div>
      <div class="message-row-content">{{ wz }}</div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备触发模式：</div>
      <div class="message-row-content">{{ cfms }}</div>
    </div>
    <div class="message-row">
      <div class="message-row-label">最近触发信号：</div>
      <div class="message-row-content">{{ cfxh }}</div>
    </div>
    <div class="message-row">
      <div class="message-row-label">最近触发方位：</div>
      <div class="message-row-content">{{ cffw }}</div>
    </div>
  </div>
</template>

<script>
import mixins from "@plugins/mixins.js";
export default {
  name: "EquipmentMonitor",
  mixins: [mixins],
  components: {},
  data() {
    return {
      zx: true,
      gz: true,
      yc: "暂无异常信息",
      ss: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
      wz: "长沙宁乡",
      cfms: "自动",
      cfxh: "疑似雷电",
      cffw: "设备东南"
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    this.timer = setInterval(() => {
      this.ss = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
  mounted() {},
  updated() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-monitor {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: left;
  overflow-x: hidden;
  color: var(--main-color);
}
.message-row {
  .display();
  margin: 5px 0;
  justify-content: flex-start;
  padding: 10px;
  height: 40px;
}
.message-row-label {
  width: 150px;
}
.message-row-content {
  flex: auto;
}
.message-box {
  margin-top: 10px;
  align-items: flex-start;
  height: auto;
  & > .message-row-content {
    border: 1px solid var(--light-border-bottom);
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }
}
/deep/ .el-switch__label {
  color: var(--main-color);
}
/deep/ .el-switch__label.is-active {
  color: var(--light-border-bottom);
}
</style>
