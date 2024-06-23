import loadingScene from "./scenes/loading.js";
import menuScene from "./scenes/menu.js";
import inGameScene from "./scenes/inGame/index.js";
import deadScene from "./scenes/dead.js";
import winScene from "./scenes/win.js";

export class GameEngine {
  constructor() { }

  initGameEngine = async () => {
    this.dataEngine = await ((await fetch("./public/game-engine.json")).json());
    this.scene = this.dataEngine.startScene;
  }

  onChangeScene = (nextScene) => {
    switch (nextScene) {
      case "loading":
        loadingScene(this.onChangeScene, this.dataEngine.scenes[nextScene])
        break;
      case "menu":
        menuScene(this.onChangeScene, this.dataEngine.scenes[nextScene])
        break;
      case "inGame":
        inGameScene(this.onChangeScene, this.dataEngine.scenes[nextScene])
        break;
      case "win":
        winScene(this.onChangeScene, this.dataEngine.scenes[nextScene])
        break;
      case "dead":
        deadScene(this.onChangeScene, this.dataEngine.scenes[nextScene])
        break;
    }
  }
}

(async () => {
  const gameEngine = new GameEngine();

  await gameEngine.initGameEngine();
  gameEngine.onChangeScene(gameEngine.scene);
})();
