import { injectPage } from "../utils/injection.js";
import checkPercentage from "../loader.js";
import playMusic from "../options/playMusic.js"

const loadingScene = async (changeScene, sceneEngine) => {
  await injectPage("src/pages/loading.html");

  playMusic("./public/sounds/menu.mp3", "menu.mp3");

  var buttonStart = document.createElement("button");
  buttonStart.innerText = "Empezar";
  buttonStart.style = "position: absolute; top: calc(50% + 80px);";

  buttonStart.addEventListener("click", () => {
    changeScene(sceneEngine.nextScene);
  });
  checkPercentage(() => document.getElementById("game-loader").append(buttonStart));
}

export default loadingScene;
