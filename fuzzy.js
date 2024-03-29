/*\
title: $:/plugins/tobibeer/appear/widget.js
type: application/javascript
module-type: widget

Use the appear widget for popups, sliders, accordion menus

@preserve
\*/
(function () {
  'use strict';
  var t = require('$:/core/modules/widgets/widget.js').widget,
    e = function (t, e) {
      this.initialise(t, e);
    },
    i = {};
  e.prototype = new t();
  e.prototype.render = function (t, e) {
    this.parentDomNode = t;
    this.nextSibling = e;
    this.computeAttributes();
    this.execute();
    var i,
      s,
      r,
      a,
      h,
      n,
      l = [];
    if (this.handle) {
      this.getHandlerCache(this.handle, 1);
      this.refreshHandler();
    } else {
      s = { type: 'button' };
      s.attributes = this.setAttributes(s, 'button');
      i = s.attributes['class'].value.trim();
      s.attributes['class'].value =
        i + ' appear-show' + (this.handler ? ' tc-popup-absolute' : '');
      s.children = this.wiki.parseText('text/vnd.tiddlywiki', this.show, {
        parseAsInline: true,
      }).tree;
      h = { type: 'reveal', children: this.parseTreeNode.children };
      h.attributes = this.setAttributes(h, 'reveal');
      h.isBlock = !(this.mode && this.mode === 'inline');
      if (h.attributes.type && h.attributes.type.value === 'popup') {
        s.attributes.popup = h.attributes.state;
        l.push(s);
        if (!this.handler) {
          l.push(h);
        } else {
          s.attributes.handler = this.handler;
        }
      } else {
        h.attributes.type = { type: 'string', value: 'match' };
        h.attributes.text = { type: 'string', value: this.currentTiddler };
        s.attributes.set = h.attributes.state;
        s.attributes.setTo = { type: 'string', value: this.currentTiddler };
        a = {
          type: 'reveal',
          isBlock: this.block,
          children: [s],
          attributes: {
            type: { type: 'string', value: 'nomatch' },
            state: h.attributes.state,
            text: { type: 'string', value: this.currentTiddler },
          },
        };
        if (!this.once) {
          r = $tw.utils.deepCopy(s);
          r.attributes['class'].value =
            i +
            ' appear-hide ' +
            (this.attr.button.selectedClass
              ? this.attr.button.selectedClass
              : '');
          r.attributes.setTo = { type: 'string', value: '' };
          r.children = this.wiki.parseText('text/vnd.tiddlywiki', this.hide, {
            parseAsInline: true,
          }).tree;
        }
        n = $tw.utils.deepCopy(a);
        n.children = [];
        if (!this.once) {
          n.children.push(r);
        }
        if (!this.handler) {
          n.children.push(h);
        }
        n.attributes.type.value = 'match';
        l.push(a, n);
      }
      this.makeChildWidgets(l);
      this.renderChildren(this.parentDomNode, e);
      if (this.handler) {
        this.addToHandlerCache(h);
      }
    }
    console.log(i);
  };
  e.prototype.execute = function () {
    var t = this;
    this.attr = {
      map: {
        reveal: {
          class: 1,
          position: 1,
          retain: 1,
          state: 1,
          style: 1,
          tag: 1,
          type: 1,
        },
        button: {
          'button-class': 1,
          'button-style': 1,
          'button-tag': 1,
          tooltip: 1,
          selectedClass: 1,
        },
      },
      rename: {
        'button-class': 'class',
        'button-style': 'style',
        'button-tag': 'tag',
      },
      button: {},
      reveal: {},
    };
    $tw.utils.each(this.attributes, function (e, i) {
      var s;
      $tw.utils.each(t.attr.map, function (r, a) {
        $tw.utils.each(Object.keys(r), function (r) {
          if (r == i) {
            t.attr[a][i] = e;
            s = false;
            return false;
          }
        });
        return s;
      });
    });
    this.currentTiddler = this.getVariable('currentTiddler');
    this.show = this.getValue(this.attributes.show, 'show');
    this.hide = this.getValue(this.attributes.hide, 'hide');
    if (!this.hide) {
      this.hide = this.show;
    }
    this.once = this.attributes.once && this.attributes.once !== 'false';
    this.$state = this.attributes.$state;
    this.mode = this.getValue(this.attributes.mode, 'mode');
    this.handle = this.attributes.handle;
    this.handler = this.attributes.handler;
    this.handlerVariables =
      (this.attributes.variables || '') + ' currentTiddler';
    this.keep =
      ['yes', 'true'].indexOf(
        (this.getValue(this.attributes.keep, 'keep') || '').toLocaleLowerCase()
      ) > -1;
    if (!this.attr.reveal.state) {
      this.attr.reveal.state =
        this.getValue(undefined, 'default-state') +
        this.currentTiddler +
        this.getStateQualifier() +
        '/' +
        (this.attr.reveal.type ? this.attr.reveal.type + '/' : '') +
        (this.mode ? this.mode + '/' : '') +
        (this.once ? 'once/' : '') +
        (this.$state ? '/' + this.$state : '');
    }
  };
  e.prototype.refresh = function (t) {
    var e = this.computeAttributes();
    if (Object.keys(e).length) {
      this.refreshSelf();
      return true;
    }
    if (this.handle) {
      this.refreshHandler();
    }
    return this.refreshChildren(t);
  };
  e.prototype.getValue = function (t, e) {
    var i,
      s,
      r = { show: '»', 'default-state': '$:/temp/appear/' };
    if (t === undefined) {
      i = this.wiki.getTiddler('$:/plugins/tobibeer/appear/defaults/' + e);
      if (i) {
        s = i.getFieldString('undefined');
        if (!s || s === 'false') {
          t = i.getFieldString('text');
        }
      }
    }
    if (t === undefined) {
      t = r[e];
    }
    return t;
  };
  e.prototype.setAttributes = function (t, e) {
    var i = this,
      s = {};
    $tw.utils.each(Object.keys(this.attr.map[e]), function (r) {
      var a,
        h = i.attr.rename[r];
      if (!h) {
        h = r;
      }
      a = i.getValue(i.attr[e][r], r);
      if (h === 'class') {
        a = [
          'appear',
          'appear-' + e,
          e === 'reveal' && i.keep ? 'tc-popup-keep' : '',
          i.mode ? 'appear-' + i.mode : '',
          i.once ? 'appear-once' : '',
          a || '',
        ].join(' ');
      }
      if (a !== undefined) {
        if (h === 'tag') {
          t.tag = a;
        } else {
          s[h] = { type: 'string', value: a };
        }
      }
    });
    return s;
  };
  e.prototype.getHandlerCache = function (t, e) {
    var s = i[t];
    if (!s || e) {
      i[t] = { handled: {}, handle: {} };
      s = i[t];
    }
    return s;
  };
  e.prototype.refreshHandler = function () {
    var t = this,
      e = this.getHandlerCache(this.handle),
      s = e.handle;
    if (Object.keys(s).length) {
      $tw.utils.each(s, function (e, i) {
        t.removeChildNode(i);
        t.children.push(t.makeChildWidget(e));
        t.children[t.children.length - 1].render(
          t.parentDomNode,
          t.nextSibling
        );
      });
      i[this.handle].handle = {};
    }
  };
  e.prototype.removeChildNode = function (t) {
    var e = this;
    $tw.utils.each(this.children, function (i, s) {
      if (i.children[0].state === t) {
        i.removeChildDomNodes();
        e.children.splice(s);
        return false;
      }
    });
  };
  e.prototype.addToHandlerCache = function (t) {
    var e = this,
      i = t.attributes.state.value,
      s = this.getHandlerCache(this.handler),
      r = s.handled[i],
      a = { type: 'vars', children: [t], attributes: {} };
    $tw.utils.each((this.handlerVariables || '').split(' '), function (t) {
      t = t.trim();
      if (t) {
        a.attributes[t] = {
          type: 'string',
          value: (e.getVariable(t) || '').toString(),
        };
      }
    });
    if (a !== r) {
      s.handle[i] = a;
      this.wiki.setText(
        '$:/temp/appear-handler/' + this.handler,
        'text',
        undefined,
        i
      );
    }
  };
  exports.appear = e;
})();
