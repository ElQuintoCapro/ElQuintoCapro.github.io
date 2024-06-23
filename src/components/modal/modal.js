import injection from "../../js/game-engine/utils/injection.js";
import { injectCss } from "../../utils/inject.js";

const useModal = async () => {
  await injection("src/components/modal/modal.html", document.getElementsByTagName("main").item(0));

  injectCss("src/components/modal/modal.css");
};

export default useModal;
