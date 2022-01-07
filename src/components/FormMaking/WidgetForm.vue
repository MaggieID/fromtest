<template>
  <div class="drag-form-container" unselectable="on" onselectstart="return false" onselect="document.selection.empty()">
    <div v-if="data.list.length==0" class="hint-text">从左侧选择控件添加</div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <!-- {{data}} -->
      <!-- <draggable :list="data.list" :options="dragOptions2" @end="handleMoveEnd" @add="handleWidgetAdd">
        <transition-group class="drag-form-list" :name="'flip-list'" tag="div">
          <template v-for="(element,index) in data.list"> -->
      <widget-render :select.sync="selectWidget" :data="data"></widget-render>
      <!-- </template>
        </transition-group>
      </draggable> -->
      <!-- <draggable :list="data.list" :options="dragOptions2" @end="handleMoveEnd" @add="handleWidgetAdd">
        <transition-group class="drag-form-list" :name="'flip-list'" tag="div">
          <template v-for="(element,index) in data.list">
            <template v-if="element.type == 'grid'">
              <div v-if="element && element.key" :key="element.key" type="flex" class="drag-col  grid-view" :class="{active: selectWidget.key == element.key}">
                <el-row :gutter="element.options.gutter ? element.options.gutter : 0" :justify="element.options.justify" :align="element.options.align" @click.native="handleSelectWidget(index)">
                  <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                    <draggable v-model="col.list" :no-transition-on-drag="true" :options="dragOptions2" class="drag-form-list" @end="handleMoveEnd" @add="handleWidgetColAdd($event, element, colIndex)">
                      <transition-group name="fade" tag="div" class="drag-col-list">
                        <widget-form-item v-for="(el, i) in col.list" :key="el.key" :element="el" :select.sync="selectWidget" :index="i" :data="col"> </widget-form-item>
                      </transition-group>
                    </draggable>
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
                    <td v-for="(td,tdIndex) in tr.tds" :key="trIndex+','+tdIndex" @click.stop="handleSelectWidget(index)">
                      <draggable v-model="td.list" :no-transition-on-drag="true" :options="dragOptions2" class="drag-form-list" @end="handleMoveEnd" @add="handleWidgetTdAdd($event, element, trIndex,tdIndex)">
                        <transition-group name="fade" tag="div" class="drag-col-list">
                          <template v-for="(el, i) in td.list">
                            <widget-form-item v-if="el && el.key" :key="el.key" :element="el" :select.sync="selectWidget" :index="i" :data="td"> </widget-form-item>
                          </template>
                        </transition-group>
                      </draggable>
                    </td>
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
                  <draggable v-model="element.list" :no-transition-on-drag="true" :options="dragOptions2" @end="handleMoveEnd" @add="handleWidgetCardAdd($event, element)">
                    <transition-group name="fade" tag="div" class="drag-col-list">
                      <div v-if="element.list.length==0" key="drag" style="text-align: center;color: rgb(153, 153, 153);">请将组件拖到此处</div>
                      <template v-for="(el, i) in element.list">
                        <widget-form-item v-if="el && el.key" :key="el.key" :element="el" :select.sync="selectWidget" :index="i" :data="element"> </widget-form-item>
                      </template>
                    </transition-group>
                  </draggable>
                </el-card>
              </div>
            </template>
            <template v-else>
              <widget-form-item v-if="element && element.key" :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable> -->
    </el-form>
    <!-- <div v-show="isshow">
      <ul id="menu1" class="menu1">
        <li>入住</li>
      </ul>
    </div> -->
  </div>
</template>
<script>
// import Draggable from 'vuedraggable'
// import WidgetFormItem from './WidgetFormItem'
import WidgetRender from './WidgetRender';
export default {
  components: {
    // Draggable,
    // WidgetFormItem,
    WidgetRender
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
      selectWidget: this.select,
      isshow: false,
      tableItem: {}
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
    itemClick(e, item, tdIndex) {
      console.log(item, tdIndex);
      this.tableItem = item;
      this.isshow = false;
      this.isshow = true;
      var menu = document.querySelector('#menu1');
      this.$nextTick(() => {
        const maxLeft = window.innerWidth - 120;
        const maxTop = window.innerHeight - menu.offsetHeight;
        menu.style.left = (e.x > maxLeft ? maxLeft : e.x) + 'px';
        menu.style.top = (e.y > maxTop ? maxTop : e.y) + 'px';
      });
      document.addEventListener('click', this.foo);
    },
    foo() {
      this.isshow = false;
      document.removeEventListener('click', this.foo);
    },
    handleWidgetCardAdd($event, row) {
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' &&
          this.data.list.splice(oldIndex, 0, row.list[newIndex]);

        row.list.splice(newIndex, 1);
        return false;
      }
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(row.list, newIndex, {
        ...row.list[newIndex],
        options: {
          ...row.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.list[newIndex].type + '_' + key
      });
      if (
        row.list[newIndex].type === 'radio' ||
        row.list[newIndex].type === 'checkbox' ||
        row.list[newIndex].type === 'select'
      ) {
        this.$set(row.list, newIndex, {
          ...row.list[newIndex],
          options: {
            ...row.list[newIndex].options,
            options: row.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        });
      }
      this.selectWidget = row.list[newIndex];
    },
    handleWidgetRow(index) {
      console.log(this.data.list[index]);
      // this.$set(this.data.list, index, {
      //   ...this.data.list[newIndex],
      //   trs: this.data.list[newIndex].trs.map(item => ({
      //     ...item,
      //     tds: item.tds.map(tdItem => ({
      //       ...tdItem
      //     }))
      //   }))
      // })
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
    handleWidgetTdAdd($event, row, trIndex, tdIndex) {
      console.log('tdadd', $event, row, tdIndex);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.trs[trIndex].tds[tdIndex].list[newIndex]
          );

        row.trs[trIndex].tds[tdIndex].list.splice(newIndex, 1);
        return false;
      }
      console.log('from', item);
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(row.trs[trIndex].tds[tdIndex].list, newIndex, {
        ...row.trs[trIndex].tds[tdIndex].list[newIndex],
        options: {
          ...row.trs[trIndex].tds[tdIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.trs[trIndex].tds[tdIndex].list[newIndex].type + '_' + key
      });
      if (
        row.trs[trIndex].tds[tdIndex].list[newIndex].type === 'radio' ||
        row.trs[trIndex].tds[tdIndex].list[newIndex].type === 'checkbox' ||
        row.trs[trIndex].tds[tdIndex].list[newIndex].type === 'select'
      ) {
        this.$set(row.trs[trIndex].tds[tdIndex].list, newIndex, {
          ...row.trs[trIndex].tds[tdIndex].list[newIndex],
          options: {
            ...row.trs[trIndex].tds[tdIndex].list[newIndex].options,
            options: row.trs[trIndex].tds[tdIndex].list[
              newIndex
            ].options.options.map(item => ({
              ...item
            }))
          }
        });
      }
      this.selectWidget = row.trs[trIndex].tds[tdIndex].list[newIndex];
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex);
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.columns[colIndex].list[newIndex]
          );

        row.columns[colIndex].list.splice(newIndex, 1);

        return false;
      }
      console.log('from', item);
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key
      });

      if (
        row.columns[colIndex].list[newIndex].type === 'radio' ||
        row.columns[colIndex].list[newIndex].type === 'checkbox' ||
        row.columns[colIndex].list[newIndex].type === 'select'
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
              item => ({
                ...item
              })
            )
          }
        });
      }
      this.selectWidget = row.columns[colIndex].list[newIndex];
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
          columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
        });
      }

      if (this.data.list[newIndex].type === 'table') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          trs: this.data.list[newIndex].trs.map(item => ({
            ...item,
            tds: item.tds.map(tdItem => ({
              ...tdItem
            }))
          }))
        });
      }
      this.selectWidget = this.data.list[newIndex];
    }
  }
};
</script>
<style lang="scss" scoped>
// .form-panel {
//   position: relative;
//   width: 100%;
// }
// .drag-form-list {
//   width: 100%;
//   height: 100%;
//   .list-group {
//     width: 100%;
//     height: 100%;
//     padding: 15px;
//   }
// }
// .widget-col-list {
//   min-height: 50px;
//   border: 1px dashed #ccc;
//   background: #fff;
//   padding: 5px;
// }

// .grid-view {
//   position: relative;
//   box-sizing: border-box;
//   padding: 5px;
//   width: 100%;
//   transition: all 0.3s;
//   border: 1px dashed #e2e0e0;
//   margin-bottom: 10px;
//   cursor: pointer;
//   overflow: inherit;
//   td {
//     padding: 5px;
//   }
// }
</style>
