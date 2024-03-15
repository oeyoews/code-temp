fetch('https://blog2s.vercel.app/api/info')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
