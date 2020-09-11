<!--
 * @Author: lzd
 * @Date: 2020-09-11 09:13:07
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 10:58:52
 * @Description: content description
-->
<template>
  <div class="equipment-log">
    <div
      class="message-log"
      v-for="(item, index) in configData"
      :key="index + 'log'"
    >
      <div class="message-log-title">{{ item.version }}</div>
      <div class="message-log-content">
        <div
          class="message-log-row"
          v-for="(citem, cindex) in item.content"
          :key="cindex + 'log-row'"
        >
          {{ cindex + 1 + "." + citem }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@plugins/mixins.js";
export default {
  name: "EquipmentLog",
  mixins: [mixins],
  components: {},
  data() {
    return {
      configData: null
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  beforeMount() {
    console.log(this.config);
    this.$set(this, "configData", this.config.logMessage);
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-log {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: left;
  overflow-x: hidden;
  color: var(--main-color);
}
.message-log {
  padding: 10px;
  &::after {
    content: "";
    display: block;
    width: 100%;
    bottom: 0;
    left: 0;
    border-bottom: 1px dashed var(--borer-bottom);
  }
  &:nth-last-child(1)::after {
    content: "";
    display: none;
  }
}
.message-log-title {
  font-size: 15px;
  font-weight: bold;
}
.message-log-content {
  padding: 10px 10px 20px 10px;
}
.message-log-row {
  margin-top: 5px;
}
</style>
