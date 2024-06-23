import useOptions from "../../../components/options/options.js";
import stopMusic from "../options/stopMusic.js";
import playMusic from "../options/playMusic.js";
import { injectPage } from "../utils/injection.js";

const menuScene = async (changeScene, sceneEngine) => {
  await injectPage("src/pages/menu.html");
  await useOptions();

  document.getElementById("start-game").addEventListener("click", async () => {
    changeScene(sceneEngine.nextScene);
    stopMusic("menu.mp3");
    playMusic("./public/sounds/game.mp3", "game.mp3");
  })
}

export default menuScene
