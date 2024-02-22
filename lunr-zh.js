const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support')(lunr);
require('lunr-languages/lunr.multi')(lunr);
require('lunr-languages/lunr.zh')(lunr);

var idx = lunr(function () {
  this.use(lunr.fr);
  this.ref('id');
  this.field('text');

  this.add({
    id: 1,
    text: "Ceci n'est pas une pipe",
  });
});

idx.search('pipe');
