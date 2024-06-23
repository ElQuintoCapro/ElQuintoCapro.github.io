const eventState = ({ currentEvent, ...event }) => {
  const choices = [
    { target: document.getElementById("game__card_buttons").children.item(0), object: currentEvent.option1 },
    { target: document.getElementById("game__card_buttons").children.item(1), object: currentEvent.option2 }
  ];

  document.getElementById("game__card_buttons").children.item(1).style = "display: block";
  document.getElementById("game__question").innerHTML = currentEvent.question;
  document.getElementById("game__caracter_card").innerHTML = event.caracters[currentEvent.caracter].picture ?? "<img src=\"./public/images/caracters/king.svg\" style=\"bottom: 0; width: 280px\" />";
  document.getElementById("game__caracter_card").style = `background-color: ${event.caracters[currentEvent.caracter].color}`;
  document.getElementById("game__caracter_name").innerText = event.caracters[currentEvent.caracter].name;

  const abortController = new AbortController();

  choices.map((choice) => {
    choice.target.querySelector("span").innerText = choice.object.value
    choice.target.addEventListener("click", () => {
      abortController.abort();
      if (choice.object.action?.updateScore)
        if (!event.updateScore(choice.object.action.updateScore))
          return;
      if (choice.object.action?.loose) return event.onLoss()
      if (choice.object.nextScenario) return event.nextScenario();
      return event.nextEvent(choice.object.next)
    }, { signal: abortController.signal });
  })
}

export default eventState;
