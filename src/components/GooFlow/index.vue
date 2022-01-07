<template>
  <div class="g-container">
    <el-container style="height: 100%;">
      <el-header class="flow_head">
        <el-radio-group v-model="nowType" size="small" @change="changeType">
          <el-radio-button v-for="item in tools" :key="item.type" :label="item.type" :title="item.title">
            <i :class="'ico_'+item.type"></i>
          </el-radio-button>
        </el-radio-group>
        <div style="float: right;">
          <el-button circle size="small" title="保存"><i class="ico_save" style="color: #0099cc;"></i></el-button>
          <el-button circle size="small" title="撤销" @click="undo"><i class="ico_undo" style="color: #ff8800;"></i></el-button>
          <el-button circle size="small" title="恢复" @click="redo"><i class="ico_redo" style="color: #ff8800;"></i></el-button>
          <el-button circle size="small" title="刷新" @click="loadData"><i class="ico_reload" style="color: #669900;"></i></el-button>
        </div>
      </el-header>
      <el-main class="flow_work">
        <div ref="workInner" class="flow_work_inner" unselectable="on" onselectstart="return false" onselect="document.selection.empty()" @click="workClick" @mousemove="workMousemove" @mouseup="workMouseup">
          <svg id="draw_demo" ref="draw" style="width:100%; height: 100%;">
            <defs>
              <marker id="arrow1" viewBox="0 0 6 6" refX="5" refY="3" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#3892D3" stroke-width="0" />
              </marker>
              <marker id="arrow2" viewBox="0 0 6 6" refX="5" refY="3" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#ff8800" stroke-width="0" />
              </marker>
              <marker id="arrow3" viewBox="0 0 6 6" refX="5" refY="3" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#ff8800" stroke-width="0" />
              </marker>
            </defs>
            <template v-for="(line,key) in lineDoms">
              <g :id="key" :key="key" :from="line.from" :to="line.to" style="cursor: pointer;" @click="focusItem(key,'line')">
                <path visibility="hidden" stroke-width="9" fill="none" stroke="white" :d="line.d" pointer-events="stroke" />
                <path :d="line.d" :stroke-width="line.strokeWidth" stroke-linecap="round" fill="none" :stroke="focus==key ?'#ff8800':'#3892D3'" :marker-end="focus==key ? 'url(#arrow2)' : 'url(#arrow1)'" />
                <text fill="#333" text-anchor="middle" :x="line.x" :y="line.y" style="cursor: text;">{{ line.name }}</text>
              </g>
            </template>
            <g v-if="showLine" id="flow_tmp_line" :from="tmpLine.from" :to="tmpLine.to" style="cursor: crosshair;">
              <path visibility="hidden" stroke-width="9" fill="none" stroke="white" :d="tmpLine.d" pointer-events="stroke" />
              <path :d="tmpLine.d" stroke-width="2.4" stroke-linecap="round" fill="none" style="stroke-dasharray:6,5" stroke="#ff8800" marker-end="url(#arrow2)" />
            </g>
          </svg>
          <div v-show="showLineMove" ref="lineMove" class="flow_linemove" :style="{width:lineMoveStyle.width+'px',height:lineMoveStyle.height+'px',top:lineMoveStyle.top+'px',left:lineMoveStyle.left+'px',cursor:lineMoveStyle.cursor,background:lineMoveStyle.background}" @mousedown="mousedownLine"></div>
          <div v-for="(node,key) in nodeData" :id="key" :key="key" class="flow_item" :class="{'item_focus': focus==key}" :style="{top:node.top+'px',left:node.left+'px'}" @mouseenter="mouseenterItem(key)" @mouseleave="mouseleaveItem(key)" @mousedown="mousedownItem($event,key)" @mouseup="mouseupItem($event,key)" @click="focusItem(key,'node')">
            <table cellspacing="1" :style="{width:node.width+'px',height:node.height+'px'}">
              <tr>
                <td class="ico" @mousedown="mousedownIcon($event,key)"><i :class="'ico_'+node.type"></i></td>
                <td v-if="node.type!='start' && node.type!='end'">{{ node.name }}</td>
              </tr>
            </table>
            <div :style="{display:focus==key?'block':'none'}">
              <div class="rs_bottom" @mousedown="mousedownResize"></div>
              <div class="rs_right" @mousedown="mousedownResize"></div>
              <div class="rs_rb" @mousedown="mousedownResize"></div>
              <div class="rs_close" @click="delNode(key)"></div>
            </div>
          </div>
        </div>
        <div ref="lineOper" class="flow_line_oper" style="display: none">
          <i class="b_l1" @click="setLineType(focus,'tb')"></i>
          <i class="b_l2" @click="setLineType(focus,'lr')"></i>
          <i class="b_l3" @click="setLineType(focus,'sl')"></i>
          <i class="b_x" @click="delLine(focus)"></i>
        </div>
        <div ref="ghost" class="rs_ghost" unselectable="on" style="display: none" onselectstart="return false" onselect="document.selection.empty()"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {
  mousePosition,
  getElCoordinate,
  calcStartEnd,
  calcPolyPoints,
  getMValue
} from './GooFunc';
import { nodes, lines } from './flowItem';
export default {
  data() {
    return {
      tools: [
        {
          type: 'cursor',
          title: '选择指针'
        },
        {
          type: 'direct',
          title: '转换连线'
        },
        {
          type: 'start',
          title: '开始结点'
        },
        {
          type: 'end',
          title: '结束节点'
        },
        {
          type: 'task',
          title: '任务节点'
        }
      ],
      nowType: 'cursor',
      nodeData: {},
      lineData: {},
      lineDoms: {},
      lineOper: {},
      lineStart: {},
      showGhost: false,
      showLine: false,
      tmpLine: null,
      undoStack: [],
      redoStack: [],
      isUndo: 0,
      focus: '', // 当前被选定的结点/转换线ID,如果没选中或者工作区被清空,则为""
      lineMoveStyle: {},
      showLineMove: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    changeType(val) {
      if (val == 'direct') {
        this.blurItem();
      }
    },

    workClick(e) {
      if (!e) e = window.event;
      var type = this.nowType;
      if (type == 'cursor') {
        const t = e.target;
        var n = t.tagName;
        if (
          n == 'svg' ||
          (n == 'DIV' && t.className.indexOf('flow_work') > -1)
        ) {
          this.blurItem();
        }
        return;
      } else if (type == 'direct') return;
      var X, Y;
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      console.log(this.$refs.workInner);
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      this.addNode('node-' + new Date().getTime(), {
        left: X,
        top: Y,
        type: type
      });
    },

    // 划线或改线时用的绑定
    workMousemove(e) {
      if (this.nowType != 'direct') return;
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      var X, Y;
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      if (!this.lineStart) return;
      this.drawLine([this.lineStart.x, this.lineStart.y], [X, Y]);
    },

    workMouseup() {
      if (this.nowType != 'direct') return;
      this.showLine = false;
    },

    // 绑定鼠标覆盖/移出事件
    mouseenterItem(id) {
      if (this.nowType != 'direct') {
        return;
      }
      var dom = document.getElementById(id);
      dom.setAttribute('class', 'flow_item item_mark crosshair');
    },
    mouseleaveItem(id) {
      if (this.nowType != 'direct') {
        return;
      }
      var dom = document.getElementById(id);
      dom.setAttribute('class', 'flow_item');
    },

    // 绑定结点的RESIZE功能
    mousedownResize(e) {
      if (!e) e = window.event;
      if (e.button == 2) return false;
      var that = this;
      var id = this.focus;
      this.nowType = 'cursor';
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      var X, Y;
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      var vX = this.nodeData[id].left + this.nodeData[id].width - X;
      var vY = this.nodeData[id].top + this.nodeData[id].height - Y;
      var isMove = false;
      document.onmousemove = function(e) {
        if (!e) e = window.event;
        var ev = mousePosition(e);
        X =
          ev.x -
          t.left +
          that.$refs.workInner.parentNode.scrollLeft -
          that.nodeData[id].left +
          vX;
        Y =
          ev.y -
          t.top +
          that.$refs.workInner.parentNode.scrollTop -
          that.nodeData[id].top +
          vY;
        if (X < 104) X = 104;
        if (Y < 26) Y = 26;
        isMove = true;
        that.resizeNode(id, X, Y);
        that.$forceUpdate();
      };
      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        if (!isMove) return;
        if (!e) e = window.event;
        that.resizeNode(id, X, Y);
      };
    },

    // 设置结点的尺寸,仅支持非开始/结束结点
    resizeNode(id, width, height) {
      if (!this.nodeData[id]) return;
      if (
        this.nodeData[id].type == 'start' ||
        this.nodeData[id].type == 'end'
      ) {
        return;
      }
      if (this.undoStack) {
        var paras = [id, this.nodeData[id].width, this.nodeData[id].height];
        this.pushOper('resizeNode', paras);
      }
      this.nodeData[id].width = width;
      this.nodeData[id].height = height;

      // 重画转换线
      this.resetLines(id, this.nodeData[id]);
    },

    // 绑定连线时确定初始点
    mousedownItem(e, id) {
      if (e.button == 2) return false;
      if (this.nowType != 'direct') return;
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      var X, Y;
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      this.lineStart = { x: X, y: Y, id: id };
      this.drawLine([X, Y], [X, Y]);
      this.showLine = true;
    },

    // 绑定连线时确定结束点
    mouseupItem(e, id) {
      if (this.nowType != 'direct') return;
      var lineStart = this.lineStart;
      if (lineStart) {
        this.addLine(new Date().getTime(), {
          from: lineStart.id,
          to: id,
          name: ''
        });
      }
    },

    // 增加一条线
    addLine(id, json, editable) {
      if (json.from == json.to) return;
      if (this.undoStack && !editable) {
        this.pushOper('delLine', [id]);
      }
      var n1 = this.nodeData[json.from];
      var n2 = this.nodeData[json.to]; // 获取开始/结束结点的数据
      if (!n1 || !n2) return;
      for (var k = 0; k < this.lineData.length; k++) {
        if (
          json.from == this.lineData[k].from &&
          json.to == this.lineData[k].to
        ) {
          return;
        }
      }
      var lineData = {};
      if (json.type) {
        lineData.type = json.type;
        lineData.M = json.M;
      } else lineData.type = 'sl'; // 默认为直线
      lineData.from = json.from;
      lineData.to = json.to;
      lineData.name = json.name;
      if (json.marked) lineData.marked = json.marked;
      else lineData.marked = false;
      this.addLineDom(id, lineData);
    },
    addLineDom(id, lineData) {
      var n1 = this.nodeData[lineData.from];
      var n2 = this.nodeData[lineData.to]; // 获取开始/结束结点的数据
      if (!n1 || !n2) return;
      var res;
      if (lineData.type && lineData.type != 'sl') {
        res = calcPolyPoints(n1, n2, lineData.type, lineData.M);
      } else res = calcStartEnd(n1, n2);
      if (!res) return;
      var line = {};
      line = {
        name: lineData.name,
        from: res.start[0] + ',' + res.start[1],
        to: res.end[0] + ',' + res.end[1],
        d:
          'M ' +
          res.start[0] +
          ' ' +
          res.start[1] +
          ' L ' +
          res.end[0] +
          ' ' +
          res.end[1],
        strokeWidth: lineData.marked ? 2.4 : 1.4
      };
      line.x = (res.end[0] + res.start[0]) / 2;
      line.y = (res.end[1] + res.start[1]) / 2;
      this.lineDoms[id] = line;
      this.lineData[id] = lineData;
    },

    // 绘制一条箭头线，并返回线的DOM
    drawLine(sp, ep) {
      // console.log(sp, ep);
      var line = {};
      line = {
        from: sp[0] + ',' + sp[1],
        to: ep[0] + ',' + ep[1],
        d: 'M ' + sp[0] + ' ' + sp[1] + ' L ' + ep[0] + ' ' + ep[1]
      };
      this.tmpLine = line;
    },

    // 画一条只有两个中点的折线
    drawPoly(sp, m1, m2, ep, data) {
      var line = {};
      var strPath = 'M ' + sp[0] + ' ' + sp[1];
      if (m1[0] != sp[0] || m1[1] != sp[1]) {
        strPath += ' L ' + m1[0] + ' ' + m1[1];
      }
      if (m2[0] != ep[0] || m2[1] != ep[1]) {
        strPath += ' L ' + m2[0] + ' ' + m2[1];
      }
      strPath += ' L ' + ep[0] + ' ' + ep[1];
      line = {
        name: data.name,
        from: sp[0] + ',' + sp[1],
        to: ep[0] + ',' + ep[1],
        d: strPath,
        strokeWidth: data.marked ? 2.4 : 1.4,
        x: (m2[0] + m1[0]) / 2,
        y: (m2[1] + m1[1]) / 2
      };
      return line;
    },

    // 添加节点
    addNode(id, json, editable) {
      if (this.undoStack && !editable) {
        this.pushOper('delNode', [id]);
      }
      if (json.type != 'start' && json.type != 'end') {
        if (!json.width || json.width < 104) json.width = 104;
        if (!json.height || json.height < 26) json.height = 26;
        if (!json.top || json.top < 0) json.top = 0;
        if (!json.left || json.left < 0) json.left = 0;
        if (!json.name) json.name = '新节点';
      } else {
        json.width = 26;
        json.height = 26;
        json.name = '';
      }
      this.nodeData[id] = {
        name: json.name,
        left: json.left,
        top: json.top,
        type: json.type,
        width: json.width,
        height: json.height
      };
      this.$forceUpdate();
    },

    // 删除节点
    delNode(id) {
      for (var k in this.lineData) {
        if (this.lineData[k].from == id || this.lineData[k].to == id) {
          this.delLine(k);
        }
      }
      if (this.undoStack) {
        var paras = [id, this.nodeData[id]];
        this.pushOper('addNode', paras);
      }
      delete this.nodeData[id];
      if (this.focus == id) this.$focus = '';
    },

    // 点击节点图标
    mousedownIcon(e, id) {
      var that = this;
      if (!e) e = window.event;
      if (e.button == 2) return false;
      if (this.nowType == 'direct') return;
      this.focusItem(id, 'node');
      var dom = document.getElementById(id);
      var dom1 = dom.childNodes[0].cloneNode(true);
      this.$refs.ghost.appendChild(dom1);
      var node = this.nodeData[id];
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      var X, Y;
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      var vX = X - node.left;
      var vY = Y - node.top;
      var isMove = false;
      document.onmousemove = function(e) {
        if (!e) e = window.event;
        var ev = mousePosition(e);
        if (X == ev.x - vX && Y == ev.y - vY) return false;
        X = ev.x - vX;
        Y = ev.y - vY;
        if (X < t.left - that.$refs.workInner.parentNode.scrollLeft) {
          X = t.left - that.$refs.workInner.parentNode.scrollLeft;
        } else if (
          X + that.$refs.workInner.parentNode.scrollLeft + node.width >
          t.left + that.$refs.workInner.clientWidth
        ) {
          X =
            t.left +
            that.$refs.workInner.clientWidth -
            that.$refs.workInner.parentNode.scrollLeft -
            node.width;
        }
        if (Y < t.top - that.$refs.workInner.parentNode.scrollTop) {
          Y = t.top - that.$refs.workInner.parentNode.scrollTop;
        } else if (
          Y + that.$refs.workInner.parentNode.scrollTop + node.height >
          t.top + that.$refs.workInner.clientHeight
        ) {
          Y =
            t.top +
            that.$refs.workInner.clientHeight -
            that.$refs.workInner.parentNode.scrollTop -
            node.height;
        }
        that.$refs.ghost.setAttribute(
          'style',
          'display:block;width:' +
            node.width +
            'px;height:' +
            node.height +
            'px;top:' +
            (Y + that.$refs.workInner.parentNode.scrollTop - t.top) +
            'px;left:' +
            (X + that.$refs.workInner.parentNode.scrollLeft - t.left) +
            'px;'
        );
        isMove = true;
      };
      document.onmouseup = function() {
        if (isMove) {
          that.moveNode(
            id,
            X + that.$refs.workInner.parentNode.scrollLeft - t.left,
            Y + that.$refs.workInner.parentNode.scrollTop - t.top
          );
          that.$refs.ghost.innerHTML = '';
          that.$refs.ghost.setAttribute('style', 'display:none');
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    // 移动结点到一个新的位置
    moveNode(id, left, top) {
      if (!id) return;
      if (this.undoStack) {
        var paras = [id, this.nodeData[id].left, this.nodeData[id].top];
        this.pushOper('moveNode', paras);
      }
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      this.$set(this.nodeData[id], 'left', left);
      this.$set(this.nodeData[id], 'top', top);
      this.resetLines(id, this.nodeData[id]);
      this.$forceUpdate();
    },

    // 重构所有连向某个结点的线的显示，传参结构为$nodeData数组的一个单元结构
    resetLines(id, node) {
      for (var i in this.lineData) {
        var other = null; // 获取结束/开始结点的数据
        var res = null;
        if (this.lineData[i].from == id) {
          // 找结束点
          other = this.nodeData[this.lineData[i].to] || null;
          if (other == null) continue;
          if (this.lineData[i].type == 'sl') {
            res = calcStartEnd(node, other);
          } else {
            res = calcPolyPoints(
              node,
              other,
              this.lineData[i].type,
              this.lineData[i].M
            );
          }
        } else if (this.lineData[i].to == id) {
          // 找开始点
          other = this.nodeData[this.lineData[i].from] || null;
          if (other == null) continue;
          if (this.lineData[i].type == 'sl') {
            res = calcStartEnd(other, node);
          } else {
            res = calcPolyPoints(
              other,
              node,
              this.lineData[i].type,
              this.lineData[i].M
            );
          }
          if (!res) break;
        }
        if (other == null) continue;
        if (this.lineData[i].type == 'sl') {
          this.lineDoms[i].from = res.start[0] + ',' + res.start[1];
          this.lineDoms[i].to = res.end[0] + ',' + res.end[1];
          this.lineDoms[i].d =
            'M ' +
            res.start[0] +
            ' ' +
            res.start[1] +
            ' L ' +
            res.end[0] +
            ' ' +
            res.end[1];
          this.lineDoms[i].x = (res.end[0] + res.start[0]) / 2;
          this.lineDoms[i].y = (res.end[1] + res.start[1]) / 2;
        } else {
          this.lineDoms[i] = this.drawPoly(
            res.start,
            res.m1,
            res.m2,
            res.end,
            this.lineData[i]
          );
        }
      }
    },

    // 重新设置连线的样式 newType= "sl":直线, "lr":中段可左右移动型折线, "tb":中段可上下移动型折线
    setLineType(id, newType, M) {
      if (
        !newType ||
        newType == null ||
        newType == '' ||
        newType == this.lineData[id].type
      ) {
        return false;
      }
      if (this.undoStack) {
        var paras = [id, this.lineData[id].type, this.lineData[id].M];
        this.pushOper('setLineType', paras);
      }
      var from = this.lineData[id].from;
      var to = this.lineData[id].to;
      this.lineData[id].type = newType;
      if (newType != 'sl') {
        if (M) {
          this.setLineM(id, M, true);
        } else {
          this.setLineM(
            id,
            getMValue(this.nodeData[from], this.nodeData[to], newType),
            true
          );
        }
      } else {
        delete this.lineData[id].M;
        var res = calcStartEnd(this.nodeData[from], this.nodeData[to]);
        if (!res) return;
        this.lineDoms[id].d =
          'M ' +
          res.start[0] +
          ' ' +
          res.start[1] +
          ' L ' +
          res.end[0] +
          ' ' +
          res.end[1];
      }
      if (this.focus == id) {
        this.focusItem(id, 'line');
      }
    },

    // 设置折线中段的X坐标值（可左右移动时）或Y坐标值（可上下移动时）
    setLineM(id, M, noStack) {
      console.log(id, M, this.lineData[id]);
      // debugger;
      if (
        !this.lineData[id] ||
        M < 0 ||
        !this.lineData[id].type ||
        this.lineData[id].type == 'sl'
      ) {
        return false;
      }
      if (this.undoStack && !noStack) {
        var paras = [id, this.lineData[id].M];
        this.pushOper('setLineM', paras);
      }
      var from = this.lineData[id].from;
      var to = this.lineData[id].to;
      this.lineData[id].M = M;
      var ps = calcPolyPoints(
        this.nodeData[from],
        this.nodeData[to],
        this.lineData[id].type,
        this.lineData[id].M
      );
      this.lineDoms[id] = this.drawPoly(
        ps.start,
        ps.m1,
        ps.m2,
        ps.end,
        this.lineData[id]
      );
    },

    // 操作折线移动
    mousedownLine(e) {
      if (e.button == 2) return false;
      var that = this;
      var ev = mousePosition(e);
      var t = getElCoordinate(this.$refs.workInner);
      var X, Y;
      X = ev.x - t.left + this.$refs.workInner.parentNode.scrollLeft;
      Y = ev.y - t.top + this.$refs.workInner.parentNode.scrollTop;
      var vX = X - this.lineMoveStyle.left;
      var vY = Y - this.lineMoveStyle.top;
      var isMove = false;
      document.onmousemove = function(e) {
        if (!e) e = window.event;
        var ev = mousePosition(e);
        X = ev.x - t.left + that.$refs.workInner.parentNode.scrollLeft;
        Y = ev.y - t.top + that.$refs.workInner.parentNode.scrollTop;
        if (that.lineData[that.lineMoveStyle.id].type == 'lr') {
          X = X - vX;
          if (X < 0) X = 0;
          else if (X > that.$refs.workInner.offsetWidth) {
            X = that.$refs.workInner.offsetWidth;
          }
          that.lineMoveStyle.left = X;
        } else if (that.lineData[that.lineMoveStyle.id].type == 'tb') {
          Y = Y - vY;
          if (Y < 0) Y = 0;
          else if (Y > that.$refs.workInner.offsetHeight) {
            Y = that.$refs.workInner.offsetHeight;
          }
          that.lineMoveStyle.top = Y;
        }
        that.lineMoveStyle.background = 'black';
        isMove = true;
      };
      document.onmouseup = function(e) {
        if (isMove) {
          if (that.lineData[that.lineMoveStyle.id].type == 'lr') {
            that.setLineM(that.lineMoveStyle.id, that.lineMoveStyle.left + 3);
          } else if (that.lineData[that.lineMoveStyle.id].type == 'tb') {
            that.setLineM(that.lineMoveStyle.id, that.lineMoveStyle.top + 3);
          }
        }
        if (that.focus == that.lineMoveStyle.id) {
          that.focusItem(that.lineMoveStyle.id, 'line');
        }
        that.$forceUpdate();
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    // 删除连线
    delLine(id) {
      if (!this.lineData[id]) return;
      if (this.undoStack) {
        var paras = [id, this.lineData[id]];
        this.pushOper('addLine', paras);
      }
      delete this.lineDoms[id];
      delete this.lineData[id];
      if (this.focus == id) this.focus = '';
      this.$refs.lineOper.setAttribute('style', 'display:none');
    },

    // 取消所有结点/连线被选定的状态
    blurItem() {
      if (this.focus != '') {
        this.$refs.lineOper.setAttribute('style', 'display:none');
        this.showLineMove = false;
      }
      this.focus = '';
      return true;
    },

    // 选定某个结点/转换线 bool:TRUE决定了要触发选中事件，FALSE则不触发选中事件，多用在程序内部调用。
    focusItem(id, type) {
      // var dom = document.getElementById(id);
      // if (dom.length == 0) return;
      if (!this.blurItem()) return; // 先执行"取消选中",如果返回FLASE,则也会阻止选定事件继续进行.
      if (type == 'line') {
        var item = this.lineDoms[id];
        var x, y, from, to;
        from = item.from.split(',');
        to = item.to.split(',');
        from[0] = parseInt(from[0], 10);
        from[1] = parseInt(from[1], 10);
        to[0] = parseInt(to[0], 10);
        to[1] = parseInt(to[1], 10);
        if (this.lineData[id].type == 'lr') {
          from[0] = this.lineData[id].M;
          to[0] = from[0];
          this.showLineMove = true;
          this.lineMoveStyle = {
            id: id,
            width: 5,
            height: (to[1] - from[1]) * (to[1] > from[1] ? 1 : -1),
            left: from[0] - 3,
            top: (to[1] > from[1] ? from[1] : to[1]) + 1,
            cursor: 'e-resize',
            background: 'transparent'
          };
        } else if (this.lineData[id].type == 'tb') {
          this.showLineMove = true;
          from[1] = this.lineData[id].M;
          to[1] = from[1];
          this.lineMoveStyle = {
            id: id,
            width: (to[0] - from[0]) * (to[0] > from[0] ? 1 : -1),
            height: 5,
            left: (to[0] > from[0] ? from[0] : to[0]) + 1,
            top: from[1] - 3,
            cursor: 's-resize',
            background: 'transparent'
          };
        }
        console.log(this.showLineMove);
        x = (from[0] + to[0]) / 2 - 40;
        y = (from[1] + to[1]) / 2 - 4;
        this.$refs.lineOper.setAttribute(
          'style',
          'display:block;left:' + x + 'px; top:' + y + 'px'
        );
      }
      this.focus = id;
      this.nowType = 'cursor';
      this.$forceUpdate();
    },

    // 撤销上一步操作
    undo() {
      if (this.undoStack.length == 0) return;
      this.blurItem();
      var tmp = this.undoStack.pop();
      this.isUndo = 1;
      if (tmp[0] == 'externalFunc') {
        tmp[1][0](tmp[1][1]);
      } else {
        // 传参的数量,最多支持6个.
        switch (tmp[1].length) {
          case 0:
            this[tmp[0]]();
            break;
          case 1:
            this[tmp[0]](tmp[1][0]);
            break;
          case 2:
            this[tmp[0]](tmp[1][0], tmp[1][1]);
            break;
          case 3:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2]);
            break;
          case 4:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2], tmp[1][3]);
            break;
          case 5:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2], tmp[1][3], tmp[1][4]);
            break;
          case 6:
            this[tmp[0]](
              tmp[1][0],
              tmp[1][1],
              tmp[1][2],
              tmp[1][3],
              tmp[1][4],
              tmp[1][5]
            );
            break;
        }
      }
    },

    // 重做最近一次被撤销的操作
    redo() {
      if (this.redoStack.length == 0) return;
      this.blurItem();
      var tmp = this.redoStack.pop();
      this.isUndo = 2;
      if (tmp[0] == 'externalFunc') {
        tmp[1][0](tmp[1][1]);
      } else {
        // 传参的数量,最多支持6个.
        switch (tmp[1].length) {
          case 0:
            this[tmp[0]]();
            break;
          case 1:
            this[tmp[0]](tmp[1][0]);
            break;
          case 2:
            this[tmp[0]](tmp[1][0], tmp[1][1]);
            break;
          case 3:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2]);
            break;
          case 4:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2], tmp[1][3]);
            break;
          case 5:
            this[tmp[0]](tmp[1][0], tmp[1][1], tmp[1][2], tmp[1][3], tmp[1][4]);
            break;
          case 6:
            this[tmp[0]](
              tmp[1][0],
              tmp[1][1],
              tmp[1][2],
              tmp[1][3],
              tmp[1][4],
              tmp[1][5]
            );
            break;
        }
      }
    },

    pushOper(funcName, paras) {
      // var len = this.undoStack.length;
      if (this.isUndo == 1) {
        this.redoStack.push([funcName, paras]);
        this.isUndo = false;
        if (this.redoStack.length > 40) this.redoStack.shift();
      } else {
        this.undoStack.push([funcName, paras]);
        if (this.undoStack.length > 40) this.undoStack.shift();
        if (this.isUndo == 0) {
          this.redoStack.splice(0, this.redoStack.length);
        }
        this.isUndo = 0;
      }
      // console.log(this.undoStack, len);
      this.$forceUpdate();
    },

    // 加载数据
    loadData() {
      for (var i in nodes) {
        this.addNode(i, nodes[i], true);
      }
      for (var j in lines) {
        this.addLine(j, lines[j], true);
      }
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="sass">
</style>
