"use strict";
var __create = Object.create,
  __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __export = (e, t) => {
    for (var r in t) __defProp(e, r, { get: t[r], enumerable: !0 });
  },
  __copyProps = (t, r, a, o) => {
    if ((r && "object" == typeof r) || "function" == typeof r)
      for (let e of __getOwnPropNames(r))
        __hasOwnProp.call(t, e) ||
          e === a ||
          __defProp(t, e, {
            get: () => r[e],
            enumerable: !(o = __getOwnPropDesc(r, e)) || o.enumerable,
          });
    return t;
  },
  __toESM = (e, t, r) => (
    (r = null != e ? __create(__getProtoOf(e)) : {}),
    __copyProps(
      !t && e && e.__esModule
        ? r
        : __defProp(r, "default", { value: e, enumerable: !0 }),
      e
    )
  ),
  __toCommonJS = (e) =>
    __copyProps(__defProp({}, "__esModule", { value: !0 }), e),
  GitHubHeatMap_exports = {},
  ECharts =
    (__export(GitHubHeatMap_exports, { default: () => GitHubHeatMap_default }),
    (module.exports = __toCommonJS(GitHubHeatMap_exports)),
    __toESM(require("$:/plugins/Gk0Wk/echarts/echarts.min.js"))),
  getFilterByDate = (e) => `[sameday:created[${e}]] [sameday:modified[${e}]]`,
  yearDates = new Map(),
  dayTime = 864e5,
  getData = (t, a) => {
    if (!yearDates.has(t)) {
      var r = ECharts.number.parseDate(t + "-01-01").getTime(),
        o = ECharts.number.parseDate(t + 1 + "-01-01").getTime(),
        l = [];
      for (let e = r; e < o; e += dayTime) {
        var i = ECharts.format.formatTime("yyyy-MM-dd", e),
          d = i.replace(/-/g, "");
        l.push([i, d]);
      }
      yearDates.set(t, l);
    }
    let s = 0;
    return [
      yearDates.get(t).map(([e, t]) => {
        var r = $tw.wiki.filterTiddlers(getFilterByDate(t), void 0, a).length;
        return (s += r), [e, r];
      }),
      s,
    ];
  },
  getPlatteColor = (e) =>
    $tw.wiki.renderText(
      "text/plain",
      "text/vnd.tiddlywiki",
      `<$transclude tiddler={{$:/palette}} index="${e}"><$transclude tiddler="$:/palettes/Vanilla" index="${e}"><$transclude tiddler="$:/config/DefaultColourMappings/${e}"/></$transclude></$transclude>`,
      {}
    ),
  checkIfChinese = () => {
    var e;
    return (
      !0 ===
      (null == (e = $tw.wiki.getTiddlerText("$:/language"))
        ? void 0
        : e.includes("zh"))
    );
  },
  checkIfDarkMode = () => {
    var e;
    return (
      "dark" ===
      (null ==
      (e =
        null == (e = $tw.wiki.getTiddler($tw.wiki.getTiddlerText("$:/palette")))
          ? void 0
          : e.fields)
        ? void 0
        : e["color-scheme"])
    );
  },
  GitHubHeatMapAddon = {
    // shouldUpdate: (e, t) => 0 < $tw.utils.count(t),
    shouldUpdate: (_, changedTiddlers) => {
      const filteredTiddlers = Object.keys(changedTiddlers).filter(
        (title) => !(title.startsWith("$:/") || title.startsWith("Draft of"))
      );
      return filteredTiddlers.length ? true : false;
    },
    onUpdate: (e, t, r) => {
      var a = parseInt(r.year, 10) || new Date().getFullYear(),
        o = r.subfilter || "[all[tiddlers]!is[shadow]!is[system]]";
      const p = $tw.wiki.makeTiddlerIterator($tw.wiki.filterTiddlers(o));
      var [o, l] = getData(a, p);
      let i = "",
        d = 0,
        s;
      e.setOption({
        title: {
          top: 0,
          left: "center",
          text: checkIfChinese()
            ? `今年产出 ${l} 篇文章`
            : `Produced ${l} tiddlers this year`,
        },
        tooltip: {
          position: "top",
          formatter: ({ value: [e, t] }) => (
            (e === i && t === d && s) ||
              ((s = ((e, t) => {
                if (0 === t)
                  return checkIfChinese()
                    ? ECharts.format.formatTime("yyyy年M月d日", e) + " 无条目。"
                    : $tw.utils.formatDateString(
                        $tw.utils.parseDate(e.replace(/-/g, "")),
                        "MMM DDD, YYYY"
                      ) + " no tiddler.";
                var r = $tw.utils.domMaker("p", {
                    text: checkIfChinese()
                      ? ECharts.format.formatTime("yyyy年M月d日", e) +
                        ` 共有 ${t} 篇:`
                      : $tw.utils.formatDateString(
                          $tw.utils.parseDate(e.replace(/-/g, "")),
                          "MMM DDD, YYYY"
                        ) + ` ${t} tiddler${1 < t ? "s" : ""}.`,
                  }),
                  a = $tw.utils.domMaker("ul", {}),
                  o = $tw.wiki.filterTiddlers(
                    getFilterByDate(e.replace(/-/g, "")),
                    void 0,
                    p
                  ),
                  l = o.length > 10 ? 10 : o.length;
                for (let s = 0; s < l; s++) {
                  const n = o[s];
                  var i = $tw.utils.domMaker("li", {}),
                    d = $tw.utils.domMaker("a", {
                      text: n,
                      class:
                        "tc-tiddlylink tc-tiddlylink-resolves tc-popup-handle tc-popup-absolute",
                      style: { cursor: "pointer" },
                    });
                  d.addEventListener("click", () =>
                    new $tw.Story().navigateTiddler(n)
                  ),
                    i.appendChild(d),
                    a.appendChild(i);
                }
                return [r, a];
              })(e, t)),
              (i = e),
              (d = t)),
            s
          ),
          // triggerOn: "mousemove|click",
          enterable: !0,
          hideDelay: 800,
          backgroundColor: getPlatteColor("page-background"),
          borderColor: getPlatteColor("very-muted-foreground"),
        },
        visualMap: {
          type: "piecewise",
          orient: "horizontal",
          calculable: !0,
          showLabel: !1,
          right: 0,
          top: 175,
          pieces: [
            { lte: 0, color: "#EBEDF0" },
            { gt: 0, lte: 1, color: "#D3CCF2" },
            { gt: 1, lte: 5, color: "#B3A9F2" },
            { gt: 5, lte: 16, color: "#9087F2" },
            { gt: 16, color: "#6366F1" },
          ],
        },
        calendar: {
          top: 60,
          left: 0,
          right: 0,
          cellSize: 15,
          orient: "horizontal",
          range: a,
          itemStyle: {
            borderWidth: 3,
            borderCap: "round",
            borderJoin: "round",
            borderColor: getPlatteColor("background"),
          },
          splitLine: { show: !1 },
          dayLabel: { show: !0, nameMap: checkIfChinese() ? "ZH" : "EN" },
          monthLabel: { show: !0, nameMap: checkIfChinese() ? "ZH" : "EN" },
          yearLabel: {
            show: !0,
            position: "bottom",
            margin: 12,
            verticalAlign: "top",
          },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: o,
          itemStyle: {
            borderRadius: 3,
          },
        },
      });
    },
  },
  GitHubHeatMap_default = GitHubHeatMapAddon;
