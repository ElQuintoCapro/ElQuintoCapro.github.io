import { injectPage } from "../utils/injection.js";

const deadScene = async (changeScene, sceneEngine) => {
  await injectPage("src/pages/win.html");

  document.getElementById("win__back_button").addEventListener("click", async () => {
    changeScene(sceneEngine.nextScene)
  })
}

export default deadScene;
