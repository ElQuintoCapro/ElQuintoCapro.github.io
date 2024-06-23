import injection from "../../js/game-engine/utils/injection.js";
import { injectCss, injectJs } from "../../utils/inject.js";
import useModal from "../modal/modal.js";



const useOptions = async () => {
  await useModal();
  await injection("src/components/options/options.html", document.getElementById("modal__content"));

  
  injectCss("src/components/options/options.css");

  document.getElementsByClassName("options-game__button").item(0).addEventListener("click", () => {
    document.getElementById("backdrop").style = "visibility: visible";
    document.getElementById("modal__options").showModal();
  });

  document.getElementById("modal__close").addEventListener("click", () => {
    document.getElementById("backdrop").style = "visibility: hidden";
    document.getElementById("modal__options").close();
  });
};

export default useOptions;
