const title = "demo";
const url = "http://0.0.0.0:8000";

const getTiddlerUrl = new URL(`recipes/default/tiddlers/${title}`, url);

fetch(getTiddlerUrl)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Tiddler not found");
    }
    return res.json();
  })
  .then((tiddler) => {
    const { title, text, type, created, creator, modified, tags } = tiddler;
    console.log(`Title: ${title}`);
    console.log(`Text: ${text}`);
    console.log(`Type: ${type}`);
    console.log(`Created: ${created}`);
    console.log(`Creator: ${creator}`);
    console.log(`Modified: ${modified}`);
    console.log(`Tags: ${tags}`);
  })
  .catch((e) => {
    console.error(e);
  });
