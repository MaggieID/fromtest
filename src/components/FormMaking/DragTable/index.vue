<template>
  <table :style="{width:element.options.width}" :border="element.options.bordered" cellspacing="0" cellpadding="0" class="drag-table">
    <tr v-for="(tr,trIndex) in element.trs" :key="trIndex">
      <template v-for="(td,tdIndex) in tr.tds">
        <DragTd :key="trIndex+','+tdIndex" :element="td" :select.sync="selectWidget" :index="tdIndex" :data="tr"></DragTd>
      </template>
    </tr>
  </table>
</template>
<script>
import DragTd from './DragTd'
export default {
  components: {
    DragTd
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
    handleSelectWidget (index) {
      console.log(index)
      this.selectWidget = this.data.list[index]
    }
  }
}
</script>
