// TODO 使用./test
import WnButton from "./test.vue";
import { App } from "Vue";

WnButton.install = function (Vue: App) {
  Vue.component(WnButton.name, WnButton);
};
export default WnButton;
