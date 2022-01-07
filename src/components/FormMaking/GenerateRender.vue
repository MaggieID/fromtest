<template>
  <div>
    <template v-if="widget.type == 'grid'">
      <el-row :key="widget.key" class="grid-row" :class="{'grid-row-tabel':widget.options.tableStyle,formBorder:widget.options.formBorder}" :gutter="widget.options.gutter ? widget.options.gutter : 0" :justify="widget.options.justify" :align="widget.options.align">
        <el-col v-for="(col, colIndex) in widget.columns" :key="colIndex" :span="col.span" class="grid-col">
          <template v-for="citem in col.list">
            <generate-render :widget='citem' :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" @input-change="onInputChange"></generate-render>
          </template>
        </el-col>
      </el-row>
    </template>
    <template v-else-if="widget.type == 'table'">
      <table :key="widget.key" :style="{width:widget.options.width}" :border="widget.options.bordered" :class="{bright:widget.options.bright,formBorder:widget.options.formBorder}" cellspacing="0" cellpadding="0">
        <tr v-for="(tr,trIndex) in widget.trs" :key="trIndex">
          <template v-for="(td,tdIndex) in tr.tds">
            <td v-if="td.options.colspan>0&&td.options.rowspan>0" :key="trIndex+','+tdIndex" :colspan="td.options.colspan" :rowspan="td.options.rowspan" :style="{position: 'relative',height:50*td.options.rowspan+'px',minWidth: '80px'}">
              <template v-for="citem in td.list">
                <generate-render :widget='citem' :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" @input-change="onInputChange"></generate-render>
              </template>
            </td>
          </template>
        </tr>
      </table>
    </template>
    <template v-else-if="widget.type == 'card'">
      <el-card :key="widget.key" class="box-card">
        <div slot="header">
          <span>{{ widget.label }}</span>
        </div>
        <template v-for="citem in widget.list">
          <generate-render :widget='citem' :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" @input-change="onInputChange"></generate-render>
        </template>
      </el-card>
    </template>
    <template v-else>
      <genetate-form-item :key="widget.key" :models.sync="models" :rules="rules" :widget="widget" :remote="remote" @input-change="onInputChange"></genetate-form-item>
    </template>
  </div>
</template>
<script>
import GenetateFormItem from './GenerateFormItem'
export default {
  name: 'GenerateRender',
  components: { GenetateFormItem },
  props: {
    widget: {
      type: Object,
      default: () => {}
    },
    models: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    remote: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onInputChange (value, field) {
      this.$emit('on-change', field, value, this.models)
    }
  }
}
</script>
