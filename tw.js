// fetch(
//   'http://localhost:8000/recipes/default/tiddlers.json?filter=<!is[system]>'
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

fetch(
  'http://localhost:8000/recipes/default/tiddlers.json?filter=[!is[system]]',
  {
    method: 'GET',
  }
)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // 在这里处理返回的 JSON 数据
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
