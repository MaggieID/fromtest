<template>
  <div v-if="show">
    <el-form label-position="left" label-width="100px" size="small">
      <el-form-item v-if="data.type!='grid'" label="字段标识">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item v-if="data.type!='grid'" label="标题">
        <el-input v-model="data.label"></el-input>
      </el-form-item>
      <el-form-item v-if="Object.keys(data.options).indexOf('width')>=0" label="宽度">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item v-if="data.type=='textarea'" label="内容高度">
        <el-input v-model="data.options.minRows" placeholder='最小高度' controls-position="right" style="margin-bottom: 22px"></el-input>
        <el-input v-model="data.options.maxRows" placeholder='最大高度' controls-position="right"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('height')>=0" label="高度">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('size')>=0" label="大小">
        宽度 <el-input v-model.number="data.options.size.width" style="width: 90px;" type="number"></el-input>
        高度 <el-input v-model.number="data.options.size.height" style="width: 90px;" type="number"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')" label="占位内容">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('inline')>=0" label="布局方式">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('showInput')>=0" label="显示输入框">
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('min')>=0" label="最小值">
        <el-input-number v-model="data.options.min" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('max')>=0" label="最大值">
        <el-input-number v-model="data.options.max" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('step')>=0" label="步长">
        <el-input-number v-model="data.options.step" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('precision')>=0" label="精度">
        <el-input-number v-model="data.options.precision" :min="0" :max="10" :step="1"></el-input-number>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('textAlign')>=0" label="对齐方式">
        <el-radio-group v-model="data.options.textAlign" size="small">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('textSize')>=0" label="字体大小">
        <el-input v-model="data.options.textSize"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('lineHeight')>=0" label="字体行高">
        <el-input v-model="data.options.lineHeight"></el-input>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('textColor')>=0" label="字体颜色">
        <el-input v-model="data.options.textColor" style="width: calc(100% - 40px);vertical-align: top;"></el-input>
        <el-color-picker v-model="data.options.textColor"></el-color-picker>
      </el-form-item>

      <el-form-item v-if="data.type=='text'" label="字体样式" class="operateStyle">
        <el-checkbox v-model="data.options.textBold">加粗</el-checkbox>
        <el-checkbox v-model="data.options.textItalic">斜体</el-checkbox>
        <el-checkbox v-model="data.options.textUnderline">下划线</el-checkbox>
        <el-checkbox v-model="data.options.textStrikethrough">删除线</el-checkbox>
      </el-form-item>

      <el-form-item v-if="data.type=='alert'" label="类型" class="operateStyle">
        <el-radio-group v-model="data.options.type">
          <el-radio label="success">成功</el-radio>
          <el-radio label="info">提示</el-radio>
          <el-radio label="warning">警告</el-radio>
          <el-radio label="error">错误</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('allowHalf')>=0" label="允许半选">
        <el-switch v-model="data.options.allowHalf">
        </el-switch>
      </el-form-item>

      <el-form-item v-if="Object.keys(data.options).indexOf('defaultValue')>=0" label="默认值">
        <el-input-number v-if="data.type == 'number'" v-model="data.options.defaultValue"></el-input-number>
        <el-input v-if="data.type=='textarea'||data.type=='html'" v-model="data.options.defaultValue" type="textarea" :rows="5"></el-input>
        <el-input v-if="data.type=='input'||data.type=='text'||data.type=='alert'" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type == 'rate'" v-model="data.options.defaultValue" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf"></el-rate>
        <el-button v-if="data.type == 'rate'" type="text" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker v-if="data.type == 'color'" v-model="data.options.defaultValue" :show-alpha="data.options.showAlpha"></el-color-picker>
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue"></el-switch>
        <el-select v-if="data.type=='select'" v-model="data.options.defaultValue" :multiple="data.options.multiple" clearable style="width:100%">
          <el-option v-for="item in data.options.options" :key="item.value" :value="item.value" :label="item.value"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item v-if="data.type == 'date'" label="显示类型">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="data.type == 'time'" label="是否为范围选择">
          <el-switch v-model="data.options.isRange">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="data.type == 'date'" label="是否获取时间戳">
          <el-switch v-model="data.options.timestamp">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')" label="占位内容">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'" label="开始时间占位内容">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'" label="结束时间占位内容">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0" label="默认值">
          <el-time-picker v-if="!data.options.isRange" key="1" v-model="data.options.defaultValue" style="width: 100%;" :arrow-control="data.options.arrowControl" :value-format="data.options.format">
          </el-time-picker>
          <el-time-picker v-if="data.options.isRange" key="2" v-model="data.options.defaultValue" style="width: 100%;" is-range :arrow-control="data.options.arrowControl" :value-format="data.options.format">
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type=='imgupload'">

        <el-form-item label="最大上传数">
          <el-input v-model.number="data.options.length" type="number"></el-input>
        </el-form-item>
        <el-form-item label="使用七牛上传">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item label="获取七牛Token方法" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="图片上传地址" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input v-model.number="data.options.gutter" type="number"></el-input>
        </el-form-item>
        <el-form-item label="表格样式">
          <el-checkbox v-model="data.options.tableStyle">启用表格样式</el-checkbox>
          <el-checkbox v-model="data.options.formBorder">隐藏组件边框</el-checkbox>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable tag="ul" :list="data.columns" v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}" handle=".drag-item">
            <li v-for="(item, index) in data.columns" :key="index">
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input v-model.number="item.span" placeholder="栅格值" size="mini" style="width: 100px;" type="number"></el-input>
              <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)"></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-divider content-position="left">选项配置</el-divider>
        <el-radio-group v-model="data.options.dataType" size="mini" style="margin-bottom:10px;">
          <el-radio-button label="static">静态数据</el-radio-button>
          <el-radio-button label="dynamic">接口数据</el-radio-button>
        </el-radio-group>
        <div v-if="Object.keys(data.options).indexOf('options')>=0" label="选项">
          <template v-if="data.options.dataType=='dynamic'">
            <div class="ruleStyle">
              <el-input v-model="data.options.remoteFunc" size="mini" style="">
                <template slot="prepend">接口方法</template>
              </el-input>
              <el-input v-model="data.options.options.value" size="mini" style="">
                <template slot="prepend">值</template>
              </el-input>
              <el-input v-model="data.options.options.label" size="mini" style="">
                <template slot="prepend">标签</template>
              </el-input>
            </div>
          </template>
          <template v-else>
            <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
              <el-radio-group v-model="data.options.defaultValue">
                <draggable tag="ul" :list="data.options.options" v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}" handle=".drag-item">
                  <li v-for="(item, index) in data.options.options" :key="index" style="margin-bottom: 5px;">
                    <el-radio :label="item.value" style="margin-right: 5px;">
                      <el-input v-model="item.value" :style="{'width': data.options.showLabel? '90px': '150px' }" size="mini"></el-input>
                    </el-radio>
                    <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="fa fa-reorder"></i></i>
                    <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)"></el-button>
                  </li>
                </draggable>
              </el-radio-group>
            </template>

            <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
              <el-checkbox-group v-model="data.options.defaultValue">
                <draggable tag="ul" :list="data.options.options" v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}" handle=".drag-item">
                  <li v-for="(item, index) in data.options.options" :key="index" style="margin-bottom: 5px;">
                    <el-checkbox :label="item.value" style="margin-right: 5px;">
                      <el-input v-model="item.value" :style="{'width': data.options.showLabel? '90px': '150px' }" size="mini"></el-input>
                    </el-checkbox>
                    <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="fa fa-reorder"></i></i>
                    <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)"></el-button>
                  </li>
                </draggable>
              </el-checkbox-group>
            </template>
            <div style="margin-left: 22px;">
              <el-button type="text" @click="handleAddOption">添加选项</el-button>
            </div>
          </template>
        </div>
        <el-form-item v-if="data.type=='cascader'" label="远端数据">
          <div class="ruleStyle">
            <el-input v-model="data.options.remoteFunc" size="mini" style="">
              <template slot="prepend">接口</template>
            </el-input>
            <el-input v-model="data.options.options.value" size="mini" style="">
              <template slot="prepend">值</template>
            </el-input>
            <el-input v-model="data.options.options.label" size="mini" style="">
              <template slot="prepend">标签</template>
            </el-input>
            <el-input v-model="data.options.options.children" size="mini" style="">
              <template slot="prepend">子选项</template>
            </el-input>
          </div>
        </el-form-item>
      </template>

      <template v-if="data.type != 'grid'">
        <div class="operateStyle">
          <el-divider content-position="left">操作属性</el-divider>
          <el-checkbox v-if="Object.keys(data.options).indexOf('bordered')>=0" v-model="data.options.bordered">显示边框</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('bright')>=0" v-model="data.options.bright">鼠标经过高亮</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('formBorder')>=0" v-model="data.options.formBorder">隐藏组件边框</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('readonly')>=0" v-model="data.options.readonly">只读</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('hidden')>=0" v-model="data.options.hidden">隐藏</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('disabled')>=0" v-model="data.options.disabled">禁用 </el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('editable')>=0" v-model="data.options.editable">文本框可输入</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('clearable')>=0" v-model="data.options.clearable">可清空 </el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('filterable')>=0" v-model="data.options.filterable">可搜索</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('showLabel')>=0" v-model="data.options.showLabel">显示标题</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('showIcon')>=0" v-model="data.options.showIcon">显示图标</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('multiple')>=0" v-model="data.options.multiple" @change='handleSelectMuliple'>可多选</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('closable')>=0" v-model="data.options.closable">可关闭</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('arrowControl')>=0" v-model="data.options.arrowControl">使用箭头进行时间选择</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('isDelete')>=0" v-model="data.options.isDelete">删除</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('isEdit')>=0" v-model="data.options.isEdit">编辑</el-checkbox>
        </div>
        <div v-if="Object.keys(data).indexOf('rules')>=0 && data.rules.length>0" class="ruleStyle">
          <el-divider content-position="left">校验</el-divider>
          <el-checkbox v-model="data.rules[0].required">必填</el-checkbox>
          <el-input v-model="data.rules[0].message" size="mini" placeholder="必填校验提示信息"></el-input>
          <template v-for="(item,index) in data.rules">
            <div :key="index" v-if="index>0" style="width:calc(100% - 40px);position: relative;">
              <el-input v-model="item.message" size="mini" placeholder="提示信息"></el-input>
              <el-input v-model="item.pattern" size="mini" placeholder="填写正则表达式"></el-input>
              <i class="el-icon-delete delRule" @click="delRule(index)"></i>
            </div>
          </template>
          <div style="margin-top: 10px;font-size: 14px;">
            <el-button type="text" @click="addRules">增加校验</el-button>
          </div>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    addRules () {
      this.data.rules.push({
        pattern: '',
        message: ''
      })
    },
    delRule (index) {
      this.data.rules.splice(index, 1)
    },
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    },
    handleAddOption () {
      this.data.options.options.push({ value: '新选项' })
    },
    handleAddColumn () {
      this.data.columns.push({
        span: 12,
        list: []
      })
    },
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }
      }
    }
  }
}
</script>
