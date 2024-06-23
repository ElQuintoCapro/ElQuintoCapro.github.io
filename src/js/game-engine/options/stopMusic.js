/**
 * The `playAudio` function creates an HTML audio element, sets its source to the
 * provided music file, and plays it on click or when it ends.
 * @param music - The `music` parameter in the `playAudio` function is expected
 * to be a string representing the URL or path to an audio file that you want to
 * play. This function dynamically creates an HTML5 audio element, sets its source
 * to the provided music URL, and adds event listeners to handle playing the music
 */
const stopMusic = (id) => {
  const audio = document.getElementById(id);

  audio.pause();
  audio.currentTime = 0;
}

export default stopMusic;
