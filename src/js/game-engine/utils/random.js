let haveIt = [0];

const generateUniqueRandom = (maxNr) => {
  let random = (Math.random() * maxNr).toFixed();

  random = Number(random);

  if (!haveIt.includes(random)) {
    haveIt.push(random);

    return random;
  } else
    return (haveIt.length < maxNr + 1) ? generateUniqueRandom(maxNr) : false;
}

export default generateUniqueRandom;
