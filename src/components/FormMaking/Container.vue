<template>
  <div class="g-container">
    <el-container style="height: 100%;">
      <el-aside width="300px" style="margin-right: 10px;" unselectable="on" onselectstart="return false" onselect="document.selection.empty()">
        <el-scrollbar style="height:100%">
          <div key="basic" class="control-label">基本控件</div>
          <draggable :list="basicList" :options="dragOptions1" :move="handleMove" @end="handleMoveEnd" @start="handleMoveStart">
            <transition-group class="control-group" name="flip-list" tag="div">
              <div v-for="(item,index) in basicList" :key="'basic'+index" :span="12" class="control-item">
                <e-icon :icon-name="item.icon" class="svg-icon" />{{ item.label }}
              </div>
            </transition-group>
          </draggable>
          <div key="layout" class="control-label">布局控件</div>
          <draggable :list="layoutList" :options="dragOptions1" :move="handleMove" @end="handleMoveEnd" @start="handleMoveStart">
            <transition-group class="control-group" name="flip-list" tag="div">
              <div v-for="(item,index) in layoutList" :key="'layout'+index" :span="12" class="control-item">
                <e-icon :icon-name="item.icon" class="svg-icon" />{{ item.label }}
              </div>
            </transition-group>
          </draggable>
          <div key="custom" class="control-label">自定义控件</div>
          <draggable :list="customList" :options="dragOptions1" :move="handleMove" @end="handleMoveEnd" @start="handleMoveStart">
            <transition-group class="control-group" name="flip-list" tag="div">
              <div v-for="(item,index) in customList" :key="'custom'+index" :span="12" class="control-item">
                <e-icon :icon-name="item.icon" class="svg-icon" />{{ item.label }}
              </div>
            </transition-group>
          </draggable>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-container class="center-container">
          <el-header class="btn-bar">
            <el-button type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button> -->
          </el-header>
          <el-main>
            <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>
      </el-main>
      <el-aside width="350px" style=" margin-left: 3px; padding:5px 0 0;">
        <el-tabs v-model="activeName" class="righttabs">
          <el-tab-pane label="组件属性" name="1">
            <el-scrollbar style="height:100%">
              <widget-config :data="widgetFormSelect"></widget-config>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="表单属性" name="2">
            <form-config :data="widgetForm.config"></form-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
    <el-dialog title="预览" :visible.sync="previewVisible" append-to-body width="1000px" @close="previewVisible = false">
      <el-scrollbar style="height:600px">
        <generate-form v-if="previewVisible" ref="generateForm" insite="true" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" @on-change="handleDataChange">
          <template v-slot:blank="scope">
            Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
            Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
          </template>
        </generate-form>
      </el-scrollbar>
      <span slot="footer">
        <el-button type="primary" @click="handleTest">获取数据</el-button>
        <el-button @click="previewVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="导入JSON" :visible.sync="uploadVisible" append-to-body width="1000px" @close="uploadVisible = false">
      <el-scrollbar style="height:500px">
        <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
        <json-editor ref="jsonEditor" v-model="jsonEg" />
      </el-scrollbar>
      <span slot="footer">
        <el-button type="primary" @click="handleUploadJson">确定</el-button>
        <el-button @click="uploadVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="生成JSON" :visible.sync="jsonVisible" append-to-body width="1000px" @close="jsonVisible = false">
      <el-scrollbar style="height:500px">
        <json-editor ref="jsonEditor" v-model="jsonTemplate" />
      </el-scrollbar>
      <span slot="footer">
        <el-button type="primary" @click="handleCopyValue">复制数据</el-button>
        <el-button @click="jsonVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="生成代码" :visible.sync="codeVisible" append-to-body width="1000px" @close="codeVisible = false">
      <el-tabs v-model="codeActiveName" type="border-card" style="box-shadow: none;">
        <el-tab-pane label="Vue Component" name="vue">
          <el-scrollbar style="height:600px">
            <json-editor ref="jsonEditor" v-model="vueTemplate" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="HTML" name="html">
          <el-scrollbar style="height:600px">
            <json-editor ref="jsonEditor" v-model="htmlTemplate" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <!-- <el-button type="primary" @click="jsonCopyValue">复制数据</el-button> -->
        <el-button @click="codeVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { customList, layoutList, basicList } from './formItem.js';
import draggable from 'vuedraggable';
import WidgetConfig from './WidgetConfig';
import FormConfig from './FormConfig';
import WidgetForm from './WidgetForm';
import GenerateForm from './GenerateForm';
import JsonEditor from '@/components/JsonEditor';
import generateCode from './generateCode.js';
export default {
  name: 'FmMakingForm',
  components: {
    draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    GenerateForm,
    JsonEditor
  },
  data() {
    return {
      customList,
      layoutList,
      basicList,
      activeName: '1',
      sortableItem: [],
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: {},
      uploadEditor: null,
      jsonClipboard: null,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'medium'
        }
      },
      remoteFuncs: {},
      widgetModels: {},
      jsonEg: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'medium'
        }
      },
      codeActiveName: 'vue'
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
    widgetForm: {
      deep: true,
      handler: function(val) {
        console.log(val, 'widgetForm');
      }
    }
  },
  mounted() {},
  methods: {
    handleMoveEnd(evt) {
      console.log('end', evt);
    },
    handleMoveStart({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents);
    },
    handleMove() {
      return true;
    },
    handlePreview() {
      // console.log(this.widgetForm)
      this.previewVisible = true;
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '');
      });
    },
    handleCopyValue() {
      var oInput = document.createElement('input');
      oInput.value = this.jsonTemplate;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.style.display = 'none';
      this.$message({
        message: '恭喜您，已复制成功',
        type: 'success'
      });
    },
    handleReset() {
      this.$refs.generateForm.reset();
    },
    handleGenerateJson() {
      this.jsonVisible = true;
      this.jsonTemplate = JSON.parse(JSON.stringify(this.widgetForm));
    },
    handleGenerateCode() {
      this.codeVisible = true;
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html');
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue');
    },
    handleUpload() {
      this.jsonEg = '';
      this.uploadVisible = true;
    },
    handleUploadJson() {
      console.log(this.jsonEg);
      // try {
      //   this.setJSON(JSON.parse(this.uploadEditor.getValue()))
      //   this.uploadVisible = false
      // } catch (e) {
      //   this.$message.error(e.message)
      //   this.$refs.uploadJson.end()
      // }
    },
    handleClear() {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'medium',
          customClass: ''
        }
      };
      this.widgetFormSelect = {};
    },
    clear() {
      this.handleClear();
    },
    getJSON() {
      return this.widgetForm;
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm));
    },
    setJSON(json) {
      this.widgetForm = json;

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0];
      }
    },
    handleInput(val) {
      console.log(val);
      this.blank = val;
    },
    handleDataChange(field, value, data) {
      console.log(field, value, data);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: white;
  padding: 20px;
  line-height: unset;
  margin: 0;
  height: 100%;
}

.el-main {
  background-color: white;
  display: flex;
  padding: 0;
  height: 100%;
}

.righttabs {
  height: 100%;
  ::v-deep .el-tabs__nav {
    width: 100%;
    text-align: center;
  }

  ::v-deep .el-tabs__item,
  ::v-deep .el-tabs__active-bar {
    width: 50% !important;
    padding: 0 !important;
  }

  ::v-deep .el-tabs__content {
    height: calc(100% - 60px);
  }

  ::v-deep .el-tab-pane {
    padding: 0 15px;
    height: 100%;
  }
}
</style>
