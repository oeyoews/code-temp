fetch('https://tiddlywiki-starter-kit.oeyoews.top/library/index.html')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.arrayBuffer();
  })
  .then((data) => {
    // 处理获取的数据，这里的例子是保存到文件
    const blob = new Blob([data]);
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filePath;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
  .catch((error) => console.error('Fetch error:', error));
