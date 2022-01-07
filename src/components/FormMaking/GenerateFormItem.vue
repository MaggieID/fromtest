<template>
  <div v-show="!widget.options.hidden">
    <template v-if="widget.type == 'input'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-input v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'" v-model.number="dataModel" type="number" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}" :disabled="widget.options.disabled"></el-input>
        <el-input v-else v-model="dataModel" :type="widget.options.dataType" :clearable="widget.options.clearable" :disabled="widget.options.disabled" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}"></el-input>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-input v-model="dataModel" type="textarea" :autosize='{minRows: widget.options.minRows, maxRows: widget.options.maxRows}' :rows="2" :disabled="widget.options.disabled" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}"></el-input>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'number'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-input-number v-model="dataModel" :style="{width: widget.options.width}" :precision='widget.options.precision' :step="widget.options.step" controls-position="right" :disabled="widget.options.disabled" :min="widget.options.min" :max="widget.options.max"></el-input-number>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-radio-group v-model="dataModel" :style="{width: widget.options.width}" :disabled="widget.options.disabled">
          <el-radio v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index" :style="{display: widget.options.inline ? 'inline-block' : 'block'}" :label="item.value">
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-checkbox-group v-model="dataModel" :style="{width: widget.options.width}" :disabled="widget.options.disabled">
          <el-checkbox v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index" :style="{display: widget.options.inline ? 'inline-block' : 'block'}" :label="item.value">
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'time'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-time-picker v-model="dataModel" :is-range="widget.options.isRange" :placeholder="widget.options.placeholder" :start-placeholder="widget.options.startPlaceholder" :end-placeholder="widget.options.endPlaceholder" :readonly="widget.options.readonly" :disabled="widget.options.disabled" :editable="widget.options.editable" :clearable="widget.options.clearable" :arrow-control="widget.options.arrowControl" :value-format="widget.options.format" :style="{width: widget.options.width}">
        </el-time-picker>
      </el-form-item>
    </template>

    <template v-if="widget.type=='date'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-date-picker v-model="dataModel" :type="widget.options.type" :placeholder="widget.options.placeholder" :start-placeholder="widget.options.startPlaceholder" :end-placeholder="widget.options.endPlaceholder" :readonly="widget.options.readonly" :disabled="widget.options.disabled" :editable="widget.options.editable" :clearable="widget.options.clearable" :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format" :format="widget.options.format" :style="{width: widget.options.width}">
        </el-date-picker>
      </el-form-item>
    </template>

    <template v-if="widget.type =='rate'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-rate v-model="dataModel" :max="widget.options.max" :disabled="widget.options.disabled" :allow-half="widget.options.allowHalf"></el-rate>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'color'">
      <el-form-item :label="widget.label" :prop="widget.model">
        <el-color-picker v-model="dataModel" :disabled="widget.options.disabled" :show-alpha="widget.options.showAlpha"></el-color-picker>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'select'" :rules='widget.rules'>
      <el-form-item :label="widget.label" :prop="widget.model">
        <el-select v-model="dataModel" :disabled="widget.options.disabled" :multiple="widget.options.multiple" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}" :filterable="widget.options.filterable">
          <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
        </el-select>
      </el-form-item>
    </template>

    <template v-if="widget.type=='switch'" :rules='widget.rules'>
      <el-form-item :label="widget.label" :prop="widget.model">
        <el-switch v-model="dataModel" :disabled="widget.options.disabled">
        </el-switch>
      </el-form-item>
    </template>

    <template v-if="widget.type=='slider'" :rules='widget.rules'>
      <el-form-item :label="widget.label" :prop="widget.model">
        <el-slider v-model="dataModel" :min="widget.options.min" :max="widget.options.max" :disabled="widget.options.disabled" :step="widget.options.step" :show-input="widget.options.showInput" :range="widget.options.range" :style="{width: widget.options.width}"></el-slider>
      </el-form-item>
    </template>

    <template v-if="widget.type=='imgupload'">
      <el-form-item :label="widget.label" :prop="widget.model">
        <fm-upload v-model="dataModel" :disabled="widget.options.disabled" :style="{'width': widget.options.width}" :width="widget.options.size.width" :height="widget.options.size.height" :token="widget.options.token" :domain="widget.options.domain" :multiple="widget.options.multiple" :length="widget.options.length" :is-qiniu="widget.options.isQiniu" :is-delete="widget.options.isDelete" :min="widget.options.min" :is-edit="widget.options.isEdit" :action="widget.options.action">
        </fm-upload>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'editor'">
      <el-form-item :label="widget.label" :label-width="widget.options.showLabel?'':'0px'" :class="{showLabel:!widget.options.showLabel}">
        <vue-editor v-model="dataModel" :style="{width: widget.options.width}">
        </vue-editor>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-form-item :label="widget.label" :prop="widget.model" :rules='widget.rules'>
        <el-cascader v-model="dataModel" :disabled="widget.options.disabled" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}" :options="widget.options.remoteOptions">
        </el-cascader>
      </el-form-item>
    </template>

    <template v-if="widget.type == 'text'">
      <div :style="{fontSize:widget.options.textSize+'px',lineHeight:widget.options.lineHeight,color:widget.options.textColor,textAlign:widget.options.textAlign}" :class="{textBold:widget.options.textBold,textItalic:widget.options.textItalic,textUnderline:widget.options.textUnderline,textStrikethrough:widget.options.textStrikethrough}">{{ widget.label }}</div>
    </template>

    <template v-if="widget.type == 'html'">
      <div v-html="widget.options.defaultValue"></div>
    </template>

    <template v-if="widget.type == 'divider'">
      <el-divider content-position="left">{{ widget.label }}</el-divider>
    </template>

    <template v-if="widget.type == 'icon'">
      <el-form-item :label="widget.label" :rules='widget.rules'>
        <e-icon-picker v-model="dataModel" :disabled="widget.options.disabled" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}" />
      </el-form-item>
    </template>

    <template v-if="widget.type == 'alert'">
      <el-alert :title="widget.label" :type="widget.options.type" :description='dataModele' :show-icon='widget.options.showIcon' :closable="widget.options.closable"> </el-alert>
    </template>

    <template v-if="widget.type == 'treeSelect'">
      <el-form-item :label="widget.label">
        <treeselect v-model="dataModel" :disabled="widget.options.disabled" :options="widget.options.options" :clearable="widget.options.clearable" :placeholder="widget.options.placeholder" :style="{width: widget.options.width}" />
      </el-form-item>
    </template>
  </div>
</template>

<script>
import FmUpload from './Upload'
import Treeselect from '@riophae/vue-treeselect'
export default {
  components: {
    FmUpload,
    Treeselect
  },
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
  data () {
    return {
      dataModel: this.models[this.widget.model]
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  },
  created () {
    if (
      this.widget.options.remote &&
      this.remote[this.widget.options.remoteFunc]
    ) {
      this.remote[this.widget.options.remoteFunc](data => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc](data => {
        this.widget.options.token = data
      })
    }
  },
  methods: {}
}
</script>
