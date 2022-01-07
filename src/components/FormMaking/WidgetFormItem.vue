<template>
  <div class="grid-view" :class="{active: selectWidget.key == element.key, 'is_req': element.rules&&element.rules.length>0&&element.rules[0].required}" @click.stop="handleSelectWidget(index)">
    <div v-if="selectWidget.key == element.key" class="drag-view-action">
      <i class="el-icon-copy-document copy" title="复制" @click.stop="handleWidgetClone(index)"></i>
      <i class="el-icon-delete delete" title="删除" @click.stop="handleWidgetDelete(index)"></i>
    </div>
    <template v-if="element && element.key">
      <template v-if="element.type == 'input'">
        <el-form-item :label="element.label">
          <el-input v-model="element.options.defaultValue" :style="{width: element.options.width}" :placeholder="element.options.placeholder" :disabled="element.options.disabled"></el-input>
        </el-form-item>
      </template>

      <template v-if="element.type == 'textarea'">
        <el-form-item :label="element.label">
          <el-input v-model="element.options.defaultValue" type="textarea" :autosize="{minRows: element.options.minRows, maxRows: element.options.maxRows}" :rows="2" :style="{width: element.options.width}" :disabled="element.options.disabled" :placeholder="element.options.placeholder"></el-input>
        </el-form-item>
      </template>

      <template v-if="element.type == 'number'">
        <el-form-item :label="element.label">
          <el-input-number v-model="element.options.defaultValue" :disabled="element.options.disabled" :controls-position="element.options.controlsPosition" :style="{width: element.options.width}"></el-input-number>
        </el-form-item>
      </template>

      <template v-if="element.type == 'radio'">
        <el-form-item :label="element.label">
          <el-radio-group v-model="element.options.defaultValue" :style="{width: element.options.width}" :disabled="element.options.disabled">
            <el-radio v-for="(item, i) in element.options.options" :key="item.value + i" :style="{display: element.options.inline ? 'inline-block' : 'block'}" :label="item.value">
              {{ element.options.showLabel ? item.label : item.value }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <template v-if="element.type == 'checkbox'">
        <el-form-item :label="element.label">
          <el-checkbox-group v-model="element.options.defaultValue" :style="{width: element.options.width}" :disabled="element.options.disabled">
            <el-checkbox v-for="(item, i) in element.options.options" :key="item.value + i" :style="{display: element.options.inline ? 'inline-block' : 'block'}" :label="item.value">
              {{ element.options.showLabel ? item.label : item.value }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>

      <template v-if="element.type == 'time'">
        <el-form-item :label="element.label">
          <el-time-picker v-model="element.options.defaultValue" :is-range="element.options.isRange" :placeholder="element.options.placeholder" :start-placeholder="element.options.startPlaceholder" :end-placeholder="element.options.endPlaceholder" :readonly="element.options.readonly" :disabled="element.options.disabled" :editable="element.options.editable" :clearable="element.options.clearable" :arrow-control="element.options.arrowControl" :style="{width: element.options.width}">
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="element.type == 'date'">
        <el-form-item :label="element.label">
          <el-date-picker v-model="element.options.defaultValue" :type="element.options.type" :is-range="element.options.isRange" :placeholder="element.options.placeholder" :start-placeholder="element.options.startPlaceholder" :end-placeholder="element.options.endPlaceholder" :readonly="element.options.readonly" :disabled="element.options.disabled" :editable="element.options.editable" :clearable="element.options.clearable" :style="{width: element.options.width}">
          </el-date-picker>
        </el-form-item>
      </template>

      <template v-if="element.type == 'rate'">
        <el-form-item :label="element.label">
          <el-rate v-model="element.options.defaultValue" :max="element.options.max" :disabled="element.options.disabled" :allow-half="element.options.allowHalf"></el-rate>
        </el-form-item>
      </template>

      <template v-if="element.type == 'color'">
        <el-form-item :label="element.label">
          <el-color-picker v-model="element.options.defaultValue" :disabled="element.options.disabled" :show-alpha="element.options.showAlpha"></el-color-picker>
        </el-form-item>
      </template>

      <template v-if="element.type == 'select'">
        <el-form-item :label="element.label">
          <el-select v-model="element.options.defaultValue" :disabled="element.options.disabled" :multiple="element.options.multiple" :clearable="element.options.clearable" :placeholder="element.options.placeholder" :style="{width: element.options.width}">
            <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="element.type=='switch'">
        <el-form-item :label="element.label">
          <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled">
          </el-switch>
        </el-form-item>
      </template>

      <template v-if="element.type=='slider'">
        <el-form-item :label="element.label">
          <el-slider v-model="element.options.defaultValue" :min="element.options.min" :max="element.options.max" :disabled="element.options.disabled" :step="element.options.step" :show-input="element.options.showInput" :range="element.options.range" :style="{width: element.options.width}"></el-slider>
        </el-form-item>
      </template>

      <template v-if="element.type=='imgupload'">
        <el-form-item :label="element.label">
          <fm-upload v-model="element.options.defaultValue" :disabled="element.options.disabled" :style="{'width': element.options.width}" :width="element.options.size.width" :height="element.options.size.height" token="xxx" domain="xxx">
          </fm-upload>
        </el-form-item>
      </template>

      <template v-if="element.type == 'cascader'">
        <el-form-item :label="element.label">
          <el-cascader v-model="element.options.defaultValue" :disabled="element.options.disabled" :clearable="element.options.clearable" :placeholder="element.options.placeholder" :style="{width: element.options.width}" :options="element.options.remoteOptions">
          </el-cascader>
        </el-form-item>
      </template>

      <template v-if="element.type == 'icon'">
        <el-form-item :label="element.label">
          <e-icon-picker v-model="element.options.defaultValue" :disabled="element.options.disabled" :clearable="element.options.clearable" :placeholder="element.options.placeholder" :style="{width: element.options.width}" />
        </el-form-item>
      </template>

      <template v-if="element.type == 'treeSelect'">
        <el-form-item :label="element.label">
          <treeselect v-model="element.options.defaultValue" :disabled="element.options.disabled" :options="element.options.options" :clearable="element.options.clearable" :placeholder="element.options.placeholder" :style="{width: element.options.width}" />
        </el-form-item>
      </template>

      <template v-if="element.type == 'editor'">
        <el-form-item :label="element.label" :label-width="element.options.showLabel?'':'0px'" :class="{showLabel:!element.options.showLabel}">
          <vue-editor v-model="element.options.defaultValue" :style="{width: element.options.width}">
          </vue-editor>
        </el-form-item>
      </template>

      <template v-if="element.type=='blank'">
        <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
      </template>

      <template v-if="element.type == 'text'">
        <div :style="{fontSize:element.options.textSize+'px',lineHeight:element.options.lineHeight,color:element.options.textColor,textAlign:element.options.textAlign}" :class="{textBold:element.options.textBold,textItalic:element.options.textItalic,textUnderline:element.options.textUnderline,textStrikethrough:element.options.textStrikethrough}">{{ element.label }}</div>
      </template>

      <template v-if="element.type == 'html'">
        <div v-html="element.options.defaultValue"></div>
      </template>

      <template v-if="element.type == 'divider'">
        <el-divider content-position="left">{{ element.label }}</el-divider>
      </template>

      <template v-if="element.type == 'alert'">
        <el-alert :title="element.label" :type="element.options.type" :description="element.options.defaultValue" :show-icon="element.options.showIcon" :closable="element.options.closable"> </el-alert>
      </template>
    </template>
  </div>
</template>

<script>
import FmUpload from './Upload';
import Treeselect from '@riophae/vue-treeselect';
export default {
  components: {
    FmUpload,
    Treeselect
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
  data() {
    return {
      selectWidget: this.select
    };
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        console.log(val);
        this.$emit('update:select', val);
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    handleSelectWidget(index) {
      console.log(index);
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
    }
  }
};
</script>
