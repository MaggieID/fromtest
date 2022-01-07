<template>
  <draggable :list="data.list" :options="dragOptions2" class="drag-form" @end="handleMoveEnd" @add="handleWidgetAdd">
    <transition-group class="drag-form-list" name="flip-list" tag="div">
      <template v-for="(element,index) in data.list">
        <template v-if="element.type == 'grid'">
          <div v-if="element && element.key" :key="element.key" class="drag-col  grid-view" :class="{active: selectWidget.key == element.key}">
            <el-row :gutter="element.options.gutter ? element.options.gutter : 0" :justify="element.options.justify" :align="element.options.align" @click.native.stop="handleSelectWidget(index)">
              <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0" class="drag-col-list">
                <widget-render :data="col" :select.sync="selectWidget"></widget-render>
              </el-col>
            </el-row>
            <div v-if="selectWidget.key == element.key" class="drag-view-action">
              <i class="el-icon-copy-document copy" title="复制" @click.stop="handleWidgetClone(index)"></i>
              <i class="el-icon-delete delete" title="删除" @click.stop="handleWidgetDelete(index)"></i>
            </div>
          </div>
        </template>
        <template v-else-if="element.type == 'table'">
          <div v-if="element && element.key" :key="element.key" class="drag-col grid-view" :class="{active: selectWidget.key == element.key}" @click.stop="handleSelectWidget(index)">
            <div v-if="selectWidget.key == element.key" class="drag-view-action">
              <i class="icon--charuhang iconfont warning" title="插入行" @click.stop="handleWidgetRow(index)"></i>
              <i class="icon--charulie iconfont warning" title="插入列" @click.stop="handleWidgetCol(index)"></i>
              <i class="el-icon-copy-document copy" title="复制" @click.stop="handleWidgetClone(index)"></i>
              <i class="el-icon-delete delete" title="删除" @click.stop="handleWidgetDelete(index)"></i>
            </div>
            <table :style="{width:element.options.width}" :border="element.options.bordered" cellspacing="0" cellpadding="0" class="drag-table">
              <tr v-for="(tr,trIndex) in element.trs" :key="trIndex">
                <template v-for="(td,tdIndex) in tr.tds">
                  <td v-if="td.options.colspan>0&&td.options.rowspan>0" :key="trIndex+','+tdIndex" :colspan="td.options.colspan" :rowspan="td.options.rowspan" :style="{position: 'relative',height:50*td.options.rowspan+'px',minWidth: '80px'}" class="drag-col-list">
                    <widget-render :data="td" :select.sync="selectWidget"></widget-render>
                    <el-dropdown style="position: absolute;bottom: 2px;left: 2px;" placement="bottom" trigger="click" @command="handleCommand($event,element.trs,trIndex,tr.tds,tdIndex)">
                      <span class="el-dropdown-link">
                        <i class="el-icon-menu" style="cursor: pointer;"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">右插入列</el-dropdown-item>
                        <el-dropdown-item command="b">左插入列</el-dropdown-item>
                        <el-dropdown-item command="c">上插入行</el-dropdown-item>
                        <el-dropdown-item command="d">下插入行</el-dropdown-item>
                        <el-dropdown-item command="e" divided :disabled="rightMerge(element.trs,trIndex,tr.tds,tdIndex)">向右合并</el-dropdown-item>
                        <el-dropdown-item command="f" :disabled="downMerge(element.trs,trIndex,tr.tds,tdIndex)">向下合并</el-dropdown-item>
                        <el-dropdown-item command="g" divided :disabled="td.options.rowspan==1">拆分成行</el-dropdown-item>
                        <el-dropdown-item command="h" :disabled="td.options.colspan==1">拆分成列</el-dropdown-item>
                        <el-dropdown-item command="i" divided :disabled="td.options.rowspan>1">删除当前行</el-dropdown-item>
                        <el-dropdown-item command="j" :disabled="td.options.colspan>1">删除当前列</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </td>
                </template>
              </tr>
            </table>
          </div>
        </template>
        <template v-else-if="element.type == 'card'">
          <div v-if="element && element.key" :key="element.key" class="drag-col grid-view" :class="{active: selectWidget.key == element.key}" @click.stop="handleSelectWidget(index)">
            <div v-if="selectWidget.key == element.key" class="drag-view-action">
              <i class="el-icon-copy-document copy" title="复制" @click.stop="handleWidgetClone(index)"></i>
              <i class="el-icon-delete delete" title="删除" @click.stop="handleWidgetDelete(index)"></i>
            </div>
            <el-card class="drag-card">
              <div slot="header">
                <span>{{ element.label }}</span>
              </div>
              <widget-render :data="element" :select.sync="selectWidget"></widget-render>
            </el-card>
          </div>
        </template>
        <template v-else>
          <widget-form-item v-if="element && element.key" :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
        </template>
      </template>
    </transition-group>
  </draggable>
</template>
<script>
import Draggable from 'vuedraggable';
import WidgetFormItem from './WidgetFormItem';
export default {
  name: 'WidgetRender',
  components: {
    Draggable,
    WidgetFormItem
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    select: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectWidget: this.select
    };
  },
  computed: {
    dragOptions1() {
      return {
        animation: 300,
        group: {
          name: 'shared',
          pull: 'clone',
          revertClone: false
        },
        sort: false
      };
    },
    dragOptions2() {
      return {
        animation: 300,
        ghostClass: 'ghost',
        group: {
          put: ['shared']
        }
      };
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  },
  methods: {
    downMerge(trs, trIndex, tds, tdIndex) {
      if (
        trIndex == trs.length - 1 ||
        (trs[trIndex + tds[tdIndex].options.rowspan] != undefined &&
          tds[tdIndex].options.colspan !=
            trs[trIndex + tds[tdIndex].options.rowspan].tds[tdIndex].options
              .colspan) ||
        trs[trIndex + tds[tdIndex].options.rowspan] == undefined
      ) {
        return true;
      }
    },
    rightMerge(trs, trIndex, tds, tdIndex) {
      if (
        tdIndex == tds.length - 1 ||
        (tds[tdIndex + tds[tdIndex].options.colspan] != undefined &&
          tds[tdIndex].options.rowspan !=
            tds[tdIndex + tds[tdIndex].options.colspan].options.rowspan) ||
        tds[tdIndex + tds[tdIndex].options.colspan] == undefined
      ) {
        return true;
      }
    },
    handleCommand(e, trs, trIndex, tds, tdIndex) {
      // console.log(e, trs, trIndex, tds, tdIndex)
      var rowNum = 0;
      var addTds = [];
      switch (e) {
        // 右插入列
        case 'a': {
          trs.forEach(element => {
            element.tds.splice(tdIndex + 1, 0, {
              options: {
                colspan: 1,
                rowspan: 1
              },
              list: []
            });
          });
          break;
        }
        // 左插入列
        case 'b': {
          trs.forEach(element => {
            element.tds.splice(tdIndex, 0, {
              options: {
                colspan: 1,
                rowspan: 1
              },
              list: []
            });
          });
          break;
        }
        // 上插入行
        case 'c': {
          trs[0].tds.forEach(element => {
            rowNum = rowNum + element.options.colspan;
          });
          for (let i = 0; i < rowNum; i++) {
            addTds.push({
              options: {
                colspan: 1,
                rowspan: 1
              },
              list: []
            });
          }
          trs.splice(trIndex, 0, { tds: addTds });
          break;
        }
        // 下插入行
        case 'd': {
          trs[0].tds.forEach(element => {
            rowNum = rowNum + element.options.colspan;
          });
          for (let i = 0; i < rowNum; i++) {
            addTds.push({
              options: {
                colspan: 1,
                rowspan: 1
              },
              list: []
            });
          }
          trs.splice(trIndex + 1, 0, { tds: addTds });
          break;
        }
        // 向右合并
        case 'e': {
          for (let i = tdIndex + 1; i < tds.length; i++) {
            if (tds[i].options.colspan != 0) {
              this.$set(
                tds[tdIndex].options,
                'colspan',
                tds[tdIndex].options.colspan + tds[i].options.colspan
              );
              this.$set(tds[i].options, 'colspan', 0);
              break;
            }
          }
          break;
        }
        // 向下合并
        case 'f': {
          for (let i = trIndex + 1; i < trs.length; i++) {
            if (trs[i].tds[tdIndex].options.rowspan != 0) {
              this.$set(
                tds[tdIndex].options,
                'rowspan',
                tds[tdIndex].options.rowspan +
                  trs[i].tds[tdIndex].options.rowspan
              );
              console.log(
                tds[tdIndex].options.rowspan +
                  trs[i].tds[tdIndex].options.rowspan
              );
              this.$set(trs[i].tds[tdIndex].options, 'rowspan', 0);
              break;
            }
          }
          break;
        }
        // 拆分成行
        case 'g': {
          var trNum = JSON.parse(JSON.stringify(tds[tdIndex].options.rowspan));
          for (let i = trIndex; i < trIndex + trNum; i++) {
            console.log(trNum);
            this.$set(
              trs[i].tds[tdIndex].options,
              'colspan',
              tds[tdIndex].options.colspan
            );
            this.$set(trs[i].tds[tdIndex].options, 'rowspan', 1);
          }
          break;
        }
        // 拆分成列
        case 'h': {
          var tdNum = JSON.parse(JSON.stringify(tds[tdIndex].options.colspan));
          for (let i = tdIndex; i < tdIndex + tdNum; i++) {
            this.$set(tds[i].options, 'colspan', 1);
            this.$set(tds[i].options, 'rowspan', tds[tdIndex].options.rowspan);
          }
          break;
        }
        // 删除当前行
        case 'i': {
          for (let k = 0; k < tds.length; k++) {
            if (tds[k].options.rowspan < 1) {
              for (let i = trIndex; i >= 0; i--) {
                if (trs[i].tds[k].options.rowspan > 1) {
                  this.$set(
                    trs[i].tds[k].options,
                    'colspan',
                    tds[k].options.colspan
                  );
                  this.$set(
                    trs[i].tds[k].options,
                    'rowspan',
                    trs[i].tds[k].options.rowspan - 1
                  );
                  break;
                }
              }
            } else if (tds[k].options.rowspan > 1) {
              this.$set(
                trs[trIndex + 1].tds[k].options,
                'colspan',
                tds[k].options.colspan
              );
              this.$set(
                trs[trIndex + 1].tds[k].options,
                'rowspan',
                tds[k].options.rowspan - 1
              );
            }
          }
          trs.splice(trIndex, 1);
          break;
        }
        // 删除当前列
        case 'j': {
          for (let i = 0; i < trs.length; i++) {
            if (trs[i].tds[tdIndex].options.colspan > 1) {
              this.$set(
                trs[i].tds[tdIndex + 1].options,
                'colspan',
                trs[i].tds[tdIndex].options.colspan - 1
              );
              this.$set(
                trs[i].tds[tdIndex + 1].options,
                'rowspan',
                trs[i].tds[tdIndex].options.rowspan
              );
              console.log(trs[i].tds[tdIndex + 1].options);
            } else if (trs[i].tds[tdIndex].options.colspan < 1) {
              for (let j = tdIndex; j >= 0; j--) {
                if (trs[i].tds[j].options.colspan > 1) {
                  this.$set(
                    trs[i].tds[j].options,
                    'colspan',
                    trs[i].tds[j].options.colspan - 1
                  );
                  this.$set(
                    trs[i].tds[j].options,
                    'rowspan',
                    trs[i].tds[j].options.rowspan
                  );
                  break;
                }
              }
            }
            trs[i].tds.splice(tdIndex, 1);
          }
          break;
        }
      }
    },
    handleWidgetRow(index) {
      var rowNum = 0;
      this.data.list[index].trs[0].tds.forEach(element => {
        rowNum = rowNum + element.options.colspan;
      });
      console.log(rowNum);
      var tds = [];
      for (let i = 0; i < rowNum; i++) {
        tds.push({
          options: {
            colspan: 1,
            rowspan: 1
          },
          list: []
        });
      }
      this.data.list[index].trs.push({ tds: tds });
    },
    handleWidgetCol(index) {
      console.log(this.data.list[index]);
      this.data.list[index].trs.forEach(element => {
        element.tds.push({
          options: {
            colspan: 1,
            rowspan: 1
          },
          list: []
        });
      });
    },
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex);
    },
    handleSelectWidget(index) {
      console.log(index, '#####');
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1);
      });
    },
    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        props: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      };
      if (
        this.data.list[index].type === 'radio' ||
        this.data.list[index].type === 'checkbox' ||
        this.data.list[index].type === 'select'
      ) {
        cloneData = {
          ...cloneData,
          props: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        };
      }
      this.data.list.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1];
      });
    },
    handleWidgetAdd(evt) {
      console.log('add', evt);
      console.log('end', evt);
      const newIndex = evt.newIndex;
      const to = evt.to;
      console.log(to);
      console.log(this.data);
      // 为拖拽到容器的元素添加唯一 key
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key
      });

      if (
        this.data.list[newIndex].type === 'radio' ||
        this.data.list[newIndex].type === 'checkbox' ||
        this.data.list[newIndex].type === 'select'
      ) {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        });
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: [
            {
              span: 12,
              list: []
            },
            {
              span: 12,
              list: []
            }
          ]
        });
      }

      if (this.data.list[newIndex].type === 'table') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          trs: [
            {
              tds: [
                {
                  options: {
                    colspan: 1,
                    rowspan: 1
                  },
                  list: []
                },
                {
                  options: {
                    colspan: 1,
                    rowspan: 1
                  },
                  list: []
                }
              ]
            },
            {
              tds: [
                {
                  options: {
                    colspan: 1,
                    rowspan: 1
                  },
                  list: []
                },
                {
                  options: {
                    colspan: 1,
                    rowspan: 1
                  },
                  list: []
                }
              ]
            }
          ]
        });
      }

      if (this.data.list[newIndex].type === 'card') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          list: []
        });
      }
      this.selectWidget = this.data.list[newIndex];
    }
  }
};
</script>
