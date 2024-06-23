import { injectPage } from "../../utils/injection.js";
import infoState from "./infoState.js";
import eventState from "./eventState.js";
import scorebar from "../../../../components/scorebar/scorebar.js";

class GameSenario {
  constructor(caracters, scenarios, deaths, onChangeScene) {
    this.scenarios = scenarios;
    this.scenario = scenarios.at(0);
    this.deaths = deaths;
    this.caracters = caracters;
    this.currentEventName = this.scenario.startState;
    this.currentEvent = this.scenario[this.scenario.startState];
    this.onChangeScene = onChangeScene
    this.scores = { army: 50, loyalty: 50, money: 50, noble: 50, people: 50 };
    this.stimCount = 0;
    this.dopeCount = 0;
  }

  init = async () => {
    await injectPage("src/pages/game.html");
    await scorebar();

    const buttons = [...document.getElementById("game__card_buttons").children];

    buttons.forEach((button, i) => {
      button?.addEventListener("mouseenter", () => {
        const option = [this.currentEvent.option1?.action?.updateScore, this.currentEvent.option2?.action?.updateScore][i]

        if (!option) return;

        Object.entries(option).map(([key, value]) => {
          const bull = document.getElementById(`game__card_footer_${key}`);

          bull.classList.add("scorebar__bull_on");
          switch (true) {
            case Math.abs(value) >= 20:
              bull.style = "width: 16px; height: 16px;";
              break;
            case Math.abs(value) >= 15:
              bull.style = "width: 12px; height: 12px;";
              break;
            case Math.abs(value) >= 10:
              bull.style = "width: 8px; height: 8px;";
              break;
            case Math.abs(value) >= 5:
              bull.style = "width: 4px; height: 4px;";
              break;
          }
        });
      });
      button.addEventListener("mouseleave", () =>
        [...document.getElementsByClassName("scorebar__bull_on")].forEach((bull) => {
          bull.classList.remove("scorebar__bull_on");
          bull.style = "width: 0px; height: 0px";
        }))
    });

  }

  onLoss = () => this.onChangeScene("dead")

  onWin = () => this.onChangeScene("win")

  updateScore = (newScore) => {
    Object.entries(this.scores).map(([key, value]) => {
      document.getElementById(`game__card_footer_${key}_svg`)?.getElementsByTagName("rect").item(0).setAttribute("y", (100 - (value + (newScore[key] ?? 0))) + "%");
      this.scores = ({ ...this.scores, [key]: value += newScore[key] ?? 0 })
    });

    switch (true) {
      case this.scores.noble <= 0:
        this.nextScenario(2, "plague");
        return false;
      case this.scores.people <= 0:
        this.nextScenario(2, "alone")
        return false;
      case this.scores.army <= 0:
        this.nextScenario(2, "army");
        return false;
      case this.scores.money <= 0:
        this.nextScenario(2, "money");
        return false;
      case this.scores.loyalty <= 0:
        this.nextScenario(2, "loyalty");
        return false;
    }

    return true;
  }

  event = () => eventState(this)
  info = () => infoState(this)

  nextEvent = (nextEventName) => {
    this.currentEvent = this.scenario[nextEventName];
    this.stimCount++;

    if (!this.currentEvent) return this.nextScenario(2, "win");
    switch (this.currentEvent.type) {
      case "event":
        this.event()
        break;
      case "info":
        this.info()
        break;
    }
  }

  nextScenario = (nextScenario = 1, firstEventName) => {
    this.scenario = this.scenarios.at(nextScenario);
    this.nextEvent(firstEventName ?? this.scenario.startState)
  }
}

const inGameScene = async (changeScene, sceneEngine) => {
  const gameSceneEngine = new GameSenario(sceneEngine.caracters, sceneEngine.scenarios, sceneEngine.deaths, changeScene);

  await gameSceneEngine.init();
  gameSceneEngine.nextEvent(gameSceneEngine.currentEventName);
}

export default inGameScene;
