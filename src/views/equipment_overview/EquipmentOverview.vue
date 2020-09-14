<!--
 * @Author: lzd
 * @Date: 2020-09-08 13:23:01
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-14 09:36:12
 * @Description: content description
-->
<template>
  <div class="equipment-overview">
    <div class="message-box">
      <div class="top-view">
        <div class="title">设备总览</div>
      </div>
      <div class="middle-view">
        <div
          class="card message-bar-outer"
          v-for="(item, index) in messageData"
          :key="'eq-message-' + index"
        >
          <div class="message-bar">
            <div class="message-bar-row message-bar-title">
              {{ item.title }}
            </div>
            <div
              class="message-bar-row"
              v-for="(citem, cindex) in item.list"
              :key="'eq-message-' + index + '-' + cindex"
            >
              <span>{{ citem.name }}</span>
              <span :class="citem.class ? citem.class : ''">{{
                citem.value
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-view">
        <div class="left-view">
          <div class="card">
            <div class="equipment-list">
              <div class="equipment-list-title">设备位置信息</div>
              <div class="equipment-list-content">
                <v-chart
                  v-if="mapShow"
                  class="map-chart"
                  ref="map"
                  :options="mapChartOption"
                  :bmapStyleId="this.appConfig.bmapStyleId"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UserAndListTree class="charts-view"></UserAndListTree>
  </div>
</template>

<script>
import UserAndListTree from "../components/UserAndListTree";
export default {
  name: "EquipmentOverview",
  components: {
    UserAndListTree
  },
  data() {
    return {
      mapShow: true,
      mapChartOption: {
        // backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter: params => {
            return this.tootipAssembly(params);
          }
        },
        bmap: {
          enableMapClick: false,
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false,
          styleJson: this.appConfig.mapStyleConfig
        },
        series: [
          {
            name: "地区设备数",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.convertData([
              { name: "北京", value: 5 },
              { name: "长沙", value: 2 }
            ]),
            encode: {
              value: 2
            },
            symbolSize: function(val) {
              return val[2] * 5;
            },
            label: {
              formatter: "{b}",
              position: "right"
            },
            itemStyle: {
              color: "yellow"
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ]
      },
      messageData: [
        {
          title: "设备统计",
          list: [
            {
              name: "设备总数",
              value: "500"
            },
            {
              name: "在线设备",
              value: "489",
              class: "yellow"
            },
            {
              name: "离线设备",
              value: "11",
              class: "red"
            }
          ]
        },
        {
          title: "在线设备状态",
          list: [
            {
              name: "设备总数",
              value: "489"
            },
            {
              name: "有线连接数",
              value: "481"
            },
            {
              name: "无线连接数",
              value: "8"
            }
          ]
        },
        {
          title: "异常统计",
          list: [
            {
              name: "异常总数",
              value: "132"
            },
            {
              name: "疑似信息",
              value: "132"
            },
            {
              name: "确认信息",
              value: "0"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.appConfig.china[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    toDetails(data) {
      this.$router.push({
        path: "details",
        params: {
          id: data.id
        }
      });
    },
    tootipAssembly(params) {
      let res =
        "" +
        "<div class='tooltip'>" +
        params.name +
        "：" +
        params.value[2] +
        "</div>";
      for (let i = 0; i < params.value[2]; i++) {
        let objRes =
          "<div class='tooltip'><span>" +
          "设备" +
          i +
          "：" +
          "</span>" +
          "<span>" +
          "xxlsk" +
          i +
          "</span></div>";
        res = res + objRes;
      }
      return res;
    }
  },
  created() {
    // this.timer = setInterval(() => {
    //   this.mapShow = window.BMap?true:false;
    //   this.mapShow&&this.timer&&clearInterval(this.timer);
    //   console.log(this.mapShow,window.BMap)
    // }, 1000);
  },
  mounted() {},
  updated() {},
  destroyed() {
    // if (this.timer) {
    //   clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    // }
  },
  activated() {},
  deactivated() {}
};
</script>

<style lang="less" scoped>
@import url("@assets/less/mixins.less");
.equipment-overview {
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
  .top-view {
    text-align: left;
  }
  .middle-view {
    .display();
    justify-content: flex-start;
    // background: var(--main-theme);
  }
  .bottom-view {
    margin: 30px 0 0 0;
    .display();
    flex: auto;
    align-items: flex-start;
    height: calc(100% - 257px);
    // background: var(--menu-bg);
    .left-view {
      height: 100%;
      padding-right: 30px;
      width: 100%;
    }
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
  .message-bar-outer {
    margin-right: 30px;
  }
  .message-bar {
    height: 15 0px;
    width: 300px;
    padding: 10px 20px;
    // margin:2px;
    background: var(--card-background);
    .display();
    justify-content: flex-start;
    flex-direction: column;
    .message-bar-title {
      font-weight: bold;
      font-size: 16px;
    }
    .message-bar-row {
      width: 100%;
      .display();
      justify-content: space-between;
      margin: 5px 0;
    }
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
    height: 30px;
    line-height: 30px;
  }
  .equipment-list-content {
    flex: auto;
    height: calc(100% - 30px);
  }
  .map-chart {
    height: 100%;
    width: 100%;
  }
}
/deep/ .tooltip {
  text-align: left;
  padding: 0 5px;
}
</style>
