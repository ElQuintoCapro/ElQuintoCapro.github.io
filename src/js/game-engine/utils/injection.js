/**
 * The `injection` function asynchronously fetches content from a specified path
 * and inserts it into the specified position or by default within the main element of a
 * document.
 * @param path - The `path` parameter in the `injection` function is a string
 * representing the URL from which to fetch the content that will be injected into
 * the specified position in the document.
 * @param [position] - The `position` parameter in the `injection` function is used
 * to specify where the fetched content will be inserted in the DOM. By default, if
 * no `position` is provided when calling the function, it will insert the fetched
 * content as the last child of the `<main>` element in the document
 */
const injection = async (path, position = document.getElementsByTagName("main").item(0)) => {
  const resp = await fetch(path);
  const text = await resp.text()

  position.insertAdjacentHTML("beforeend", text);
}

/**
 * The `injectPage` function clears the content of the main element on the webpage
 * and then injects new content from a specified path asynchronously.
 * @param path - The `path` parameter in the `injectPage` function is a string that
 * represents the path to the content that you want to inject into the main element
 * of the webpage. This path should be a file path
 */
export const injectPage = async (path) => {
  const main = document.getElementsByTagName("main").item(0);

  main.innerHTML = "";
  await injection(path, main);
}

export default injection;
