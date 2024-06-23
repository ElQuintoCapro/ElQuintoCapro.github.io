const updatePercentage = (onLoaded) => {
  let percentageValue = +document.getElementById("game-loader__value").innerText.replace("%", "");
  let newPercentage = percentageValue + Math.ceil(Math.random() * 5);

  if (newPercentage > 100) newPercentage = 100;
  document.getElementById("game-loader__value").innerText = newPercentage + "%";
  document.getElementById("game-loader__progress-bar").style = `width: ${newPercentage}%`;

  checkPercentage(onLoaded);
}

const checkPercentage = (onLoaded) => {
  setTimeout(function () {
    let percentageValue = document.getElementById("game-loader__value").innerText.replace("%", "");

    if (percentageValue == 100) onLoaded();
    if (percentageValue < 100) updatePercentage(onLoaded);
  }, 100)
}

export default checkPercentage
