/*
 * @Author: lzd
 * @Date: 2020-09-06 18:34:53
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-07 11:07:35
 * @Description: content description
 */
import axios from "axios";

class Api {
  testAplicationProxy(data) {
    return axios.post("/api", data || {});
  }
}
export default new Api();
