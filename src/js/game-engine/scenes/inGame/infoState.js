const infoState = ({ currentEvent, ...event }) => {
  const choice = { target: document.getElementById("game__card_buttons").children.item(0), object: currentEvent.option };

  document.getElementById("game__card_buttons").children.item(1).style = "display: none";
  document.getElementById("game__question").innerHTML = currentEvent.question;
  document.getElementById("game__caracter_card").innerHTML = event.caracters[currentEvent.caracter]?.picture ?? currentEvent.picture;
  document.getElementById("game__caracter_card").style = `background-color: ${event.caracters[currentEvent.caracter]?.color ?? currentEvent.color}`;
  document.getElementById("game__caracter_name").innerText = event.caracters[currentEvent.caracter]?.name ?? "";
  const abortController = new AbortController();

  choice.target.querySelector("span").innerText = choice.object.value
  choice.target.addEventListener("click", () => {
    abortController.abort();
    if (choice.object.action?.loose) return event.onLoss()
    if (choice.object.action?.win) return event.onWin()
    if (choice.object.nextScenario) return event.nextScenario();
    else return event.nextEvent(choice.object.next)
  }, { signal: abortController.signal });
}

export default infoState;
