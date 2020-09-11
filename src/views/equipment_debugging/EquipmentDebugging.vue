<!--
 * @Author: lzd
 * @Date: 2020-09-11 09:16:45
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 11:38:32
 * @Description: content description
-->
<template>
  <div class="equipment-debugging">
    <div class="message-row">
      <div class="message-row-label">授时信息自校验：</div>
      <div class="message-row-content">
        <div>精度差 20ms</div>
        <div class="message-btn">校验</div>
      </div>
    </div>
    <div class="message-row message-box">
      <div class="message-row-label">内部信号自校验：</div>
      <div class="message-row-content">
        <div class="message-row">
          <div class="message-row-label">信号幅度频率：</div>
          <div class="message-row-content">
            <div>122hz</div>
            <div class="message-btn">校验</div>
          </div>
        </div>
      </div>
    </div>

    <div class="message-row message-box">
      <div class="message-row-label">采集存储自校验：</div>
      <div class="message-row-content">
        <div
          class="message-row"
          v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
          :key="index + 'ADC'"
        >
          <div class="message-row-label">{{ item }}路ADC参数：</div>
          <div class="message-row-content">
            <div>正常</div>
            <div class="message-btn">校验</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentDebugging",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-debugging {
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
  padding: 0 10px;
  height: 40px;
}
.message-row-label {
  width: 150px;
}
.message-row-content {
  flex: auto;
  .display();
  justify-content: flex-start;
}
.message-btn {
  margin-left: 20px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 0 10px;
  background: var(--submit-color);
  &:hover {
    background: var(--submit-color-active);
  }
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
/deep/ .el-input {
  width: auto;
}
/deep/ .el-input__inner {
  background-color: transparent;
  color: var(--main-color);
  border: none;
  // padding: 0;
  height: 40px;
  border-bottom: 1px solid var(--light-border-bottom);
  border-radius: 0;
}
/deep/ .el-form-item {
  margin: 0;
}
</style>
