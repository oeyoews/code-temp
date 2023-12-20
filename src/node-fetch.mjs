import got from "got";

const { data } = await got
  .post("https://neotw.oeyoewl.top/markdown.json", {
    // json: {
    //   hello: "world",
    // },
  })
  .json();

console.log(data);
//=> {"hello": "world"}
