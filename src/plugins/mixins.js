/*
 * @Author: lzd
 * @Date: 2020-09-07 02:18:37
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-10 16:33:18
 * @Description: content description
 */

export default {
  components: {},
  data() {
    return {
      config: null
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  beforeMount() {
    let config = require("@config/" + this.$options.name + ".config.js");
    config && (this.config = config.default);
  },
  mounted() {},
  updated() {},
  destroyed() {}
};
