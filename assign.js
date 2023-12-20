fetch('https://react-music-api-coral.vercel.app/api/banner')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const banners = data.body.banners;
    const filteredBanners = banners.map((banner) => ({ pic: banner.pic }));
    console.log(filteredBanners);
  });
