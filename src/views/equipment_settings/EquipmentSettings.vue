<!--
 * @Author: lzd
 * @Date: 2020-09-11 09:04:21
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-11 11:40:24
 * @Description: content description
-->
<template>
  <div class="equipment-settings">
    <div class="message-row">
      <div class="message-row-label">数据上传模式：</div>
      <div class="message-row-content">
        <el-switch
          style="display: block"
          v-model="ms"
          :disabled="false"
          active-color="var(--safe)"
          inactive-color="var(--warn)"
          active-text="自动"
          inactive-text="手动"
        ></el-switch>
      </div>
    </div>
    <div class="message-row ip-row">
      <div class="message-row-label">ip修改：</div>
      <div class="message-row-content">
        <el-form v-model="ipForm" ref="ipForm">
          <el-form-item
            :prop="'ip'"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="ip" class="ip-input"></el-input>
            <div class="message-btn" @click="submitForm('ipForm')">提交</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备版本号：</div>
      <div class="message-row-content">
        <div>
          {{ bb.value }}
          <span v-if="bb.upgrade">（有最新版本可以升级）</span>
          <span v-else>（已是最新版本）</span>
        </div>
        <div class="message-btn" v-if="bb.upgrade">升级</div>
      </div>
    </div>
    <div class="message-row">
      <div class="message-row-label">双网口设置：</div>
      <div class="message-row-content"></div>
    </div>
    <div class="message-row">
      <div class="message-row-label">双串口设置：</div>
      <div class="message-row-content"></div>
    </div>
    <div class="message-row">
      <div class="message-row-label">设备触发参数设置：</div>
      <div class="message-row-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentSettings",
  components: {},
  data() {
    return {
      ms: true,
      ip: "192.168.0.1",
      ipForm: { ip: "" },
      bb: {
        value: "0.0.1",
        upgrade: true
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-settings {
  height: 100%;
  width: 100%;
  padding-top: 10px;
  text-align: left;
  overflow-x: hidden;
  color: var(--main-color);
}
.message-row {
  .display();
  justify-content: flex-start;
  padding: 0 10px;
  height: 40px;
  margin: 5px 0;
}
.message-row-label {
  width: 150px;
}
.message-row-content {
  flex: auto;
  .display();
  justify-content: flex-start;
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
.ip-input {
  width: 120px !important;
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
.ip-row /deep/ .el-form-item__content {
  .display();
  justify-content: flex-start;
}
</style>
