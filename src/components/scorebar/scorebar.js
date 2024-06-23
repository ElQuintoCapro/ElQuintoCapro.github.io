import injection from "../../js/game-engine/utils/injection.js";
import { injectCss } from "../../utils/inject.js";

const scorebar = async () => {
  await injection("src/components/scorebar/scorebar.html", document.getElementById("game__card_footer"));

  injectCss("./src/components/scorebar/scorebar.css");
};

export default scorebar;
