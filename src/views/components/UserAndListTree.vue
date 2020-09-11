<!--
 * @Author: lzd
 * @Date: 2020-09-10 08:56:34
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-10 15:45:30
 * @Description: content description
-->
<template>
  <div class="user-and-list-tree">
    <div class="btn-box">
      <div class="btn" @click="returnHome" v-if="returnBtn">
        <span class="btn-icon iconfont icon-withdraw-fill"></span>
        <span class="btn-name">返回</span>
      </div>
      <div class="btn">
        <span class="btn-icon el-icon-user"></span>
        <span class="btn-name">admin</span>
      </div>
    </div>
    <div class="card tree-list">
      <div>
        <div class="equipment-list-title">设备位置信息</div>
        <div class="tree-box">
          <el-tree
            :data="data"
            :highlight-current="false"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <span
                  @click="toDetails(data)"
                  v-if="!data.children || data.children.legth == 0"
                  style="color:var(--green-active)"
                  >详情</span
                >
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserAndListTree",
  components: {},
  props: {
    returnBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [
        {
          label: "湖南",
          children: [
            {
              label: "EPM宁乡一号机",
              id: "1"
            }
          ]
        },
        {
          label: "北京",
          children: [
            {
              label: "EPM北京一号机",
              id: "2"
            },
            {
              label: "EPM北京二号机",
              id: "3"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleNodeClick(data) {
      // console.log(data);
      return data;
    },
    toDetails(data) {
      let params = {
        id: data.id,
        label: data.label
      };
      this.$store.commit("setEquipmentMessage", params);
      this.$router.push({
        path: "details"
      });
      return params;
    },
    returnHome() {
      this.$router.push({
        path: "overview"
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
.user-and-list-tree {
  .btn-box {
    height: 85px;
    .display();
    justify-content: flex-end;
    .btn {
      .display();
      font-size: 18px;
      position: relative;
      &:hover {
        color: var(--light-green);
        cursor: pointer;
      }
      & > span {
        margin-left: 3px;
        display: inline-block;
      }
      .btn-icon {
        font-size: 18px;
        margin-left: 5px;
      }
      padding-right: 10px;
      &::after {
        content: "";
        display: block;
        height: 100%;
        width: 1px;
        position: absolute;
        right: 0;
        top: 0;
        background: black;
      }
    }
    .btn:nth-last-child(1) {
      padding-right: 0;
      &::after {
        content: "";
        display: none;
      }
    }
  }
  .tree-list {
    height: calc(100% - 85px);
    padding: 2px;
    & > div {
      background-color: var(--card-background);
      height: 100%;
      padding: 10px 0 10px 20px;
    }
  }
  .tree-box {
    height: calc(100% - 30px);
    overflow-x: hidden;
    /deep/ .el-tree {
      background: rgba(0, 0, 0, 0);
      color: black;
    }
    /deep/ .el-tree-node__content:hover {
      background: var(--tree-active);
    }
    /deep/
      .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      background: var(--tree-active);
    }
    /deep/ .el-tree-node:focus > .el-tree-node__content {
      background: rgba(0, 0, 0, 0);
    }
    overflow-y: scroll;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .equipment-list-title {
    font-weight: bold;
    text-align: left;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
