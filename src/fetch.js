// 替换成您想要遍历的仓库的信息
const owner = 'oeyoews';
const repo = 'neotw-tiddlers';
const path = 'content';

// 构建 API 请求的 URL
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

// 使用 fetch 发起 GET 请求
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // data 是包含文件和文件夹信息的数组
    data.forEach((item) => {
      if (item.type === 'file') {
        console.log('文件：', item.name);
      } else if (item.type === 'dir') {
        console.log('文件夹：', item.name);
        console.log('=====================');
        return getContents(`${path}/${item.name}`);
        // 如果需要递归遍历文件夹，可以在这里调用相同的函数
      }
    });
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
