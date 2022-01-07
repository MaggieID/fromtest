<template>
  <el-select ref="select" :value="value" :clearable="clearable" :placeholder="placeholder" :multiple="multiple" :filterable="filterable" :collapse-tags="collapseTags" :filter-method="filterMethod" @remove-tag="removeSelectedNodes" @clear="removeSelectedNode" @change="changeSelectedNodes">
    <el-tree id="tree-option" ref="selectTree" :filter-node-method="filterNode" default-expand-all :accordion="accordion" :show-checkbox="multiple" :data="options" :props="props" :node-key="props.value" :check-strictly="checkStrictly" :expand-on-click-node="false" :check-on-click-node="multiple" :highlight-current="true" @node-click="handleNodeClick" @check="handleCheckChange">
      <el-option slot-scope="{ node,data }" :value="data[props.value]" :label="data[props.label]">
      </el-option>
    </el-tree>
  </el-select>
</template>
<script>
export default {
  name: 'ElTreeSelect',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'value', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    /* 初始值 */
    value: {
      type: [Number, String, Array],
      default: () => {
        return null
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    valueConsistsOf: {
      type: String,
      default: 'All'
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false
      }
    },
    filterable: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 配置多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      selectedData: [],
      checkedKeys: [],
      selectItems: [],
      selectValue: []
    }
  },
  watch: {
    value() {
      this.initHandle()
    }
  },
  mounted() {
    this.initHandle()
    this.initCheckedData()
  },
  methods: {
    // 初始化值
    initHandle() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll(
          '.el-scrollbar .el-select-dropdown__wrap'
        )[0]
        const scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        )
        scrollWrap.style.cssText =
          'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => (ele.style.width = 0))
      })
    },

    // 搜索树形
    filterMethod(val) {
      this.$refs.selectTree.filter(val)
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    },

    // 切换选项
    handleNodeClick(node) {
      console.log(node, '在这里')
      if (!this.multiple) {
        this.$emit('input', node[this.props.value])
        this.$emit('change', node)
        this.$refs.select.blur()
      }
    },

    // 多选，节点勾选状态发生变化时的回调
    handleCheckChange(data) {
      var checkedKeys = this.$refs.selectTree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
      var getCheckedNodes = this.$refs.selectTree.getCheckedNodes()
      console.log(checkedKeys)
      this.$nextTick(() => {
        if (!this.checkStrictly) {
          switch (this.valueConsistsOf) {
            case 'LEAF_PRIORITY': {
              var selectOption = getCheckedNodes.filter(item => {
                return (
                  !item[this.props.children] ||
                  item[this.props.children].length == 0
                )
              })
              var selectedData = selectOption.map(item => {
                return item[this.props.value]
              })
              this.$emit('input', selectedData)
              this.$emit('change', selectOption)
              break
            }
            case 'BRANCH_PRIORITY': {
              // var data = this.getBranch(getCheckedNodes, this.options, [])
              var thisNode = this.$refs.selectTree.getNode(
                data[this.props.value]
              )
              var parentNode = thisNode.parent
              var resultNodes = []
              var shiftArr = [].concat(this.selectItems)
              debugger
              if (parentNode.checked) {
                while (parentNode.checked) {
                  const currentChildrenkeys = []
                  parentNode.childNodes.forEach(element => {
                    currentChildrenkeys.push(element.data[this.props.value])
                  })
                  resultNodes = shiftArr.filter(
                    node =>
                      !currentChildrenkeys.find(
                        item => item == node.data[this.props.value]
                      )
                  )
                  resultNodes.push(parentNode)
                  shiftArr = resultNodes
                  parentNode = parentNode.parent
                }
                this.selectItems = shiftArr
              } else {
                if (thisNode.checked) {
                  this.selectItems.push(thisNode)
                } else {
                  for (let i = 0; i < this.selectItems.length; i++) {
                    if (
                      this.selectItems[i].data[this.props.value] ==
                      thisNode.data[this.props.value]
                    ) {
                      this.selectItems.splice(i, 1)
                      break
                    }
                  }
                  var brotherNodes = []
                  var isFatherselect = false
                  for (let i = 0; i < this.selectItems.length; i++) {
                    this.selectItems.splice(i, 1)
                    brotherNodes = parentNode.childNodes.filter(
                      node =>
                        thisNode.data[this.props.value] !==
                        node.data[this.props.value]
                    )
                    isFatherselect = true
                    break
                  }
                  if (isFatherselect) {
                    this.selectItems.push.apply(this.selectItems, brotherNodes)
                  }
                }
              }
              console.log(this.selectItems)
              break
            }
            default: {
              this.$emit('change', getCheckedNodes)
              this.$emit('input', checkedKeys)
              break
            }
          }
        } else {
          this.$emit('change', getCheckedNodes)
          this.$emit('input', checkedKeys)
        }
      })
    },

    getBranch(vals, data, res) {
      for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < vals.length; i++) {
          if (data[j][this.props.value] == vals[i][this.props.value]) {
            res.push(vals[i])
            break
          }
        }
      }
      return res
    },

    // 多选,删除任一select选项的回调
    removeSelectedNodes(val) {
      this.$refs.selectTree.setChecked(val, false)
      var node = this.$refs.selectTree.getNode(val)
      if (!this.checkStrictly && node.childNodes.length > 0) {
        this.treeToList(node).map(item => {
          if (item.childNodes.length <= 0) {
            this.$refs.selectTree.setChecked(item, false)
          }
        })
        this.handleCheckChange()
      }
      this.$emit('change', this.selectedData)
    },

    treeToList(tree) {
      var queen = []
      var out = []
      queen = queen.concat(tree)
      while (queen.length) {
        var first = queen.shift()
        if (first.childNodes) {
          queen = queen.concat(first.childNodes)
        }
        out.push(first)
      }
      return out
    },

    // 单选，清空选中
    clearSelectedNode() {
      this.selectedData = ''
      this.$refs.selectTree.setCurrentKey(null)
      this.$emit('input', '')
      this.$emit('change', '')
    },
    // 多选，清空所有勾选
    clearSelectedNodes() {
      var checkedKeys = this.$refs.selectTree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
      for (let i = 0; i < checkedKeys.length; i++) {
        this.$refs.selectTree.setChecked(checkedKeys[i], false)
      }
    },
    removeSelectedNode() {
      this.clearSelectedNode()
      this.$emit('change', this.selectedData)
      this.$emit('input', this.selectedData)
    },

    initCheckedData() {
      this.$nextTick(() => {
        if (this.multiple) {
          // 多选
          if (this.checkedKeys.length > 0) {
            this.checkSelectedNodes(this.checkedKeys)
          } else {
            this.clearSelectedNodes()
          }
        } else {
          // 单选
          if (this.checkedKeys.length > 0) {
            this.checkSelectedNode(this.checkedKeys)
          } else {
            this.clearSelectedNode()
          }
        }
      })
    },
    // 选中的select选项改变的回调
    changeSelectedNodes(selectedData) {
      console.log(selectedData, '555556666')
      if (this.multiple) {
        // 多选,清空select输入框时，清除树勾选
        // if (selectedData.length <= 0) {
        //   this.clearSelectedNodes()
        // }
        // this.$emit('change', this.selectedData)
      } else {
        this.$emit('input', selectedData)
        this.$nextTick(() => {
          this.$refs.selectTree.setCurrentKey(selectedData)
          console.log(this.$refs.selectTree.getCurrentNode())
          this.$emit('change', this.$refs.selectTree.getCurrentNode())
        })
      }
    }
  }
}
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.el-select-dropdown__item {
  width: 100%;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: none;
}
::v-deep .el-tree-node__content {
  height: 34px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected:after {
  display: none;
}
::v-deep .el-tree-node__children {
  padding-left: 15px;
}
</style>