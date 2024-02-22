!(function (e, r) {
  'function' == typeof define && define.amd
    ? define(r)
    : 'object' == typeof exports
    ? (module.exports = r(require('@node-rs/jieba')))
    : r()(e.lunr);
})(this, function (e) {
  return function (r, t) {
    if (void 0 === r)
      throw new Error(
        'Lunr is not present. Please include / require Lunr before this script.'
      );
    if (void 0 === r.stemmerSupport)
      throw new Error(
        'Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.'
      );
    var i = '2' == r.version[0];
    (r.zh = function () {
      this.pipeline.reset(),
        this.pipeline.add(r.zh.trimmer, r.zh.stopWordFilter, r.zh.stemmer),
        i
          ? (this.tokenizer = r.zh.tokenizer)
          : (r.tokenizer && (r.tokenizer = r.zh.tokenizer),
            this.tokenizerFn && (this.tokenizerFn = r.zh.tokenizer));
    }),
      (r.zh.tokenizer = function (n) {
        if (!arguments.length || null == n || void 0 == n) return [];
        if (Array.isArray(n))
          return n.map(function (e) {
            return i ? new r.Token(e.toLowerCase()) : e.toLowerCase();
          });
        t && e.load(t);
        var o = n.toString().trim().toLowerCase(),
          s = [];
        e.cut(o, !0).forEach(function (e) {
          s = s.concat(e.split(' '));
        }),
          (s = s.filter(function (e) {
            return !!e;
          }));
        var u = 0;
        return s.map(function (e, t) {
          if (i) {
            var n = o.indexOf(e, u),
              s = {};
            return (
              (s.position = [n, e.length]),
              (s.index = t),
              (u = n),
              new r.Token(e, s)
            );
          }
          return e;
        });
      }),
      (r.zh.wordCharacters = '\\w一 - 龥'),
      (r.zh.trimmer = r.trimmerSupport.generateTrimmer(r.zh.wordCharacters)),
      r.Pipeline.registerFunction(r.zh.trimmer, 'trimmer-zh'),
      (r.zh.stemmer = (function () {
        return function (e) {
          return e;
        };
      })()),
      r.Pipeline.registerFunction(r.zh.stemmer, 'stemmer-zh'),
      (r.zh.stopWordFilter = r.generateStopWordFilter(
        '的 一 不 在 人 有 是 为 為 以 于 於 上 他 而 后 後 之 来 來 及 了 因 下 可 到 由 这 這 与 與 也 此 但 并 並 个 個 其 已 无 無 小 我 们 們 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 當 从 從 得 打 凡 儿 兒 尔 爾 该 該 各 给 給 跟 和 何 还 還 即 几 幾 既 看 据 據 距 靠 啦 另 么 麽 每 嘛 拿 哪 您 凭 憑 且 却 卻 让 讓 仍 啥 如 若 使 谁 誰 虽 雖 随 隨 同 所 她 哇 嗡 往 些 向 沿 哟 喲 用 咱 则 則 怎 曾 至 致 着 著 诸 諸 自'.split(
          ' '
        )
      )),
      r.Pipeline.registerFunction(r.zh.stopWordFilter, 'stopWordFilter-zh');
  };
});
