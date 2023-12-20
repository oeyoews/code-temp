fetch("https://neotw.tiddlyhost.com/tiddlers.json")
  .then((res) => res.json())
  .then((data) => console.log(data.length));
