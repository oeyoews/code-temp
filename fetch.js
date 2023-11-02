// 针对本地太微nodejs(无密码)实例
// 写入, 导出, 更新, 查询, 删
// TODO: 需要做好条目重写的提示
// https://github.com/Jermolene/TiddlyWiki5/blob/4b56cb42983d4134715eb7fe7b083fdcc04980f0/core/modules/server/server.js#L31
// https://github.com/Jermolene/TiddlyWiki5/blob/4b56cb42983d4134715eb7fe7b083fdcc04980f0/core/modules/server/routes/put-tiddler.js

const title = "servertestdd";
const url = "http://0.0.0.0:8000";
const text = "overwrite";

const putTiddlerUrl = new URL(`recipes/default/tiddlers/${title}`, url);

const tiddler = {
  title,
  text,
};

// 验证是否有条目存在
// 或者直接后面加上随机数字
fetch(putTiddlerUrl)
  .then((res) => {
    if (res.ok) {
      // TODO: 更新条目
      const data = res.json();
      return data;
    }
  })
  .then((data) => {
    const { title, text, type, created, creator, modified, tags } = data;
    console.log(`${title} 已存在`);
    console.log(`Title: ${title}`);
    console.log(`Text: ${text}`);
    // TODO: 只要text 为空就重新写入
    if (text) {
      console.warn("tile 非空, 无法覆盖");
    } else {
      write();
    }
  });

const write = () => {
  fetch(putTiddlerUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-requested-with": "TiddlyWiki",
    },
    body: JSON.stringify(tiddler),
  }).then(() => {
    console.log(`${title} 已成功写入`);
  });
};
