<template>
  <td class="grid-view" :class="{active: selectWidget.key == element.key}" @click.native="handleSelectWidget(index)">
    <draggable v-model="element.list" :no-transition-on-drag="true" :options="dragOptions2" class="drag-form-list" @end="handleMoveEnd" @add="handleWidgetTdAdd($event, element, trIndex,tdIndex)">
      <transition-group name="fade" tag="div" class="drag-col-list">
        <template v-for="(el, i) in element.list">
          <widget-form-item v-if="el && el.key" :key="el.key" :element="el" :select.sync="selectWidget" :index="i" :data="td"> </widget-form-item>
        </template>
      </transition-group>
    </draggable>
  </td>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable
  },
  props: {
    element: {
      type: Object,
      default: () => {}
    },
    select: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectWidget: this.select
    }
  },
  computed: {
    dragOptions2 () {
      return {
        animation: 300,
        ghostClass: 'ghost',
        group: {
          put: ['shared']
        }
      }
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        console.log(val)
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  methods: {
    handleMoveEnd ({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget (index) {
      console.log(index, '#####')
      this.selectWidget = this.data.tds[index]
    },
    handleWidgetTdAdd ($event, row, trIndex, tdIndex) {
      console.log('tdadd', $event, row, tdIndex)
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.trs[trIndex].tds[tdIndex].list[newIndex]
          )
        row.trs[trIndex].tds[tdIndex].list.splice(newIndex, 1)
        return false
      }
      console.log('from', item)
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(row.trs[trIndex].tds[tdIndex].list, newIndex, {
        ...row.trs[trIndex].tds[tdIndex].list[newIndex],
        options: {
          ...row.trs[trIndex].tds[tdIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.trs[trIndex].tds[tdIndex].list[newIndex].type + '_' + key,
        rules: []
      })
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
        })
      }
      this.selectWidget = row.trs[trIndex].tds[tdIndex].list[newIndex]
    }
  }
}
</script>
