import Vue from "vue";
import GuessNumber from "@/components/GuessNumber";
import "bulma";

Vue.config.productionTip = false;

new Vue({
  render: h => h(GuessNumber)
}).$mount("#app");
