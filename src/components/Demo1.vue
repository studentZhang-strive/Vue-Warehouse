<template>
  <div id="marcEdit">
    <h2 class="h2-title">欢迎使用Marc数据处理插件</h2>
    <div class="content">
      <div class="menu01">
        <div>
          <el-button><i class="el-icon-location"></i>国图 : 9453231</el-button>
        </div>
        <div>
          <el-tooltip placement="bottom" class="tipBox">
            <div slot="content" class="tooltip">
              <p>保存 F2</p>
              <p>自动生成数据 F9</p>
              <p>取字段缺省值 F10</p>
              <p>▼符号 /</p>
              <p>新增字段 Insert</p>
              <p>修改字段 Ctrl+Insert</p>
              <p>上一行 Ctrl+←</p>
              <p>下一行 Ctrl+→</p>
            </div>
            <el-button class="tipBtn">
              <i class="el-icon-info"></i>
              操作提示
            </el-button>
          </el-tooltip>
        </div>
        <div>
          <el-button><i class="el-icon-sort"></i>切换CALIS</el-button>
        </div>
      </div>
    <div class="vue-table">
    <el-table
      :data="marcData" :cell-style="rowClass"
      style="width: 100%">
      <el-table-column prop="name" width="130"></el-table-column>
      <el-table-column prop="sign" width="50"></el-table-column>
      <el-table-column prop="indi" width="50"></el-table-column>
      <el-table-column prop="" width="10"></el-table-column>
      <el-table-column prop="content">
        <template slot-scope="scope">
          <!-- <el-input
            class="no-border"
            @keydown.8.native="DeleteContent(scope.$index)"
            @dblclick.native="getTextIndex"
            @keydown.38.native="Top"
            @click.native="hideContextMenu($event,scope.$index)"
            @contextmenu.prevent.native="showContextMenu($event,scope.$index)"
            @keydown.40.native="Bot"
            @keyup.220.native="InsertSpace"
            @keyup.120.native="AutoCompleteDialog"
            @keyup.45.native="InsertDialog"
            @focus="onFocu($event,scope.$index)"
            :ref="scope.row.rf"
            type="textarea"
            v-model="scope.row.content"
            placeholder="请输入内容" ></el-input> -->
            <quill-editor
              v-model="scope.row.content"
              :ref="scope.row.rf"
              :options="scope.row.editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)" ></quill-editor>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-dialog
      title="自动生成数据"
      :visible.sync="dialogVisible"
      width="40%">
      <span> <el-link type="primary" icon="el-icon-s-promotion" @click="CompleteInsert">点击将本字段内容追加到001字段</el-link></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
      <ki-context
        ref="kiContext"
        minWidth='1em'
        maxWidth='15em'
        backgroundColor='#fbfbfb'
        fontSize='15px'
        textColor='#35495e'
        iconColor='#41b883'
        borderRadius='0.1'
      />
    <el-dialog title="新增字段" :visible.sync="dialogInsertVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="字段" >
          <el-input v-model="form.sign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指示符" >
          <el-input v-model="form.indi" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInsertVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddRecord">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改字段" :visible.sync="dialogEditVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="字段" >
          <el-input v-model="focusSign" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指示符" >
          <el-input v-model="focusIndi" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditRecord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
var mdata = [
  [{
    'rf': 'InnerInput0',
    'name': '记录头标区',
    'sign': '000',
    'indi': '',
    'content': '00448nam0 2200217   450 ',
    'editorOption': {
      'modules': {
        'toolbar': [
        ]
      }
    }
  }, {
    'rf': 'InnerInput1',
    'name': '记录控制号',
    'sign': '001',
    'indi': '',
    'content': '▼as das',
    'editorOption': {
      'modules': {
        'toolbar': [
        ]
      }
    }
  }, {
    'rf': 'InnerInput2',
    'name': 'ISBN号',
    'sign': '010',
    'indi': '  ',
    'content': '▼a978-7-302-35456-7▼dCNY48.00',
    'editorOption': {
      'modules': {
        'toolbar': [
        ]
      }
    }
  }, {
    'rf': 'InnerInput3',
    'name': '订购号',
    'sign': '092',
    'indi': '  ',
    'content': '▼aCN▼b人天639-3500',
    'editorOption': {
      'modules': {
        'toolbar': [
        ]
      }
    }
  }, {
    'rf': 'InnerInput4',
    'name': '一般处理数据',
    'sign': '100',
    'indi': '  ',
    'content': '▼a20140718d2014    em y0chiy0110    ea',
    'editorOption': {
      'modules': {
        'toolbar': [
        ]
      }
    }
  }]
]
var dialogVisible = false
export default {
  name: 'Marc',
  components: {
    quillEditor
  },
  data () {
    return {
      top: 0,
      bottom: 16,
      step: 1,
      focusIndex: 0,
      textareaIndex: 0,
      textareaFrist: true,
      textareaClickIndex: 1,
      textareaFocusIndex: 1,
      tabIndex: 0,
      dbClickStart: 0,
      dbClickEnd: 0,
      dialogVisible: dialogVisible,
      dialogInsertVisible: false,
      dialogEditVisible: false,
      marcData: [],
      marcDataIndex: 0,
      focusContent: '',
      focusSign: '',
      focusIndi: '',
      focusName: '',
      form: {
        name: '',
        sign: ''
      }
    }
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    // ResetTextArea () {
    //   this.$nextTick(() => {
    //     const textareaList = this.$refs
    //     console.log(textareaList)
    //     for (let key in textareaList) {
    //       if (key !== 'kiContext') {
    //         if (textareaList[key] !== undefined) {
    //           // textareaList[key].resizeTextarea();
    //           let that = textareaList[key].$el.children[0]
    //           that.style.height = '25px'
    //           this.autoTextarea(that)
    //         }
    //       }
    //     }
    //   })
    // },
    onFocu (e, index) {
    },
    //  显示右键菜单
    showContextMenu (event, index) {
      this.focusIndex = index
      this.focusContent = event.target.value
      this.focusName = this.marcData[index].name
      this.focusSign = this.marcData[index].sign
      this.focusIndi = this.marcData[index].indi
      // 在items数组中定义所需的右键菜单选项
      let items = [
        {
          icon: 'book',
          text: '保存记录 -- F2',
          click: () => {
            this.$refs.kiContext.hide()
            alert('保存记录 -- F2' + event.target.value)
          }
        },
        {
          icon: 'arrow-right',
          text: '自动生成数据 -- F9',
          click: () => {
            this.$refs.kiContext.hide()
            this.AutoCompleteDialog()
          }
        },
        {
          icon: 'audio-description',
          text: '加拼音 -- Ctrl-K',
          click: () => {
            this.$refs.kiContext.hide()
            event.target.value = event.target.value + '-----------------------------'
            this.ResetTextArea()
          }
        },
        {
          icon: 'audio-description',
          text: '修改字段',
          click: () => {
            this.$refs.kiContext.hide()
            this.dialogEditVisible = true
          }
        },
        {
          icon: 'ban',
          text: '删除条目 -- DELETE',
          divider: true,
          click: () => {
            this.$refs.kiContext.hide()
            this.$confirm('此操作将删除此条目, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.marcData.splice(index, 1)
              this.ResetTextArea()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          }
        },
        {
          icon: 'arrow-right',
          text: '模板',
          disabled: true,
          click: () => {
            this.$refs.kiContext.hide()
            alert('---')
          }
        }
      ]
      this.$refs.kiContext.show(event, items)
    },
    //  隐藏右键菜单
    hideContextMenu (e, index) {
      this.focusIndex = index
      this.focusContent = e.target.value
      this.$refs.kiContext.hide()
      this.focusName = this.marcData[index].name
      this.focusSign = this.marcData[index].sign
      this.focusIndi = this.marcData[index].indi
      this.$refs.kiContext.hide()
      this.textareaFocusIndex = (Math.floor((e.offsetY + this.$refs['InnerInput' + index].$el.children[0].scrollTop - 8) / 25) + 1)
    },
    //  左键双击选择
    getTextIndex (e) {
      event.preventDefault()
      console.log(e.target.selectionStart, e.target.selectionEnd)
      var index
      var target = e.target
      index = target.selectionEnd
      if (FindStart(index, target.value) === this.dbClickStart && FindEnd(index, target.value) === this.dbClickEnd) {
        target.selectionStart = FindStart(index, target.value) + 2
        target.selectionEnd = FindEnd(index, target.value)
        this.dbClickStart = target.selectionStart
        this.dbClickEnd = target.selectionEnd
      } else {
        target.selectionStart = FindStart(index, target.value)
        target.selectionEnd = FindEnd(index, target.value)
        this.dbClickStart = target.selectionStart
        this.dbClickEnd = target.selectionEnd
      }
    },
    //  自动生成数据
    AutoCompleteDialog () {
      this.dialogVisible = true
    },
    CompleteInsert () {
      this.dialogVisible = false
      this.marcData[1].content += this.focusContent
      this.ResetTextArea()
    },
    InsertDialog () {
      this.dialogInsertVisible = true
      this.form.sign = ''
      this.form.indi = ''
    },
    //  插入数据
    AddRecord () {
      var ins = {
        name: '新增字段',
        sign: this.form.sign,
        indi: this.form.indi,
        rf: 'InnerInput' + parseInt(this.focusIndex + 1),
        content: ''
      }
      var json = this.marcData
      var tmpData = []
      for (var i = 0; i < json.length; i++) {
        if (i < this.focusIndex) {
          tmpData.push(json[i])
        } else if (i === this.focusIndex) {
          tmpData.push(json[i])
          tmpData.push(ins)
        } else {
          var rf = json[i].rf
          var num = parseInt(rf.replace(/[^0-9]/ig, '')) + 1
          console.log(num)
          json[i].rf = 'InnerInput' + num
          tmpData.push(json[i])
        }
      }
      console.log(tmpData)
      this.marcData = tmpData
      this.$nextTick(() => {
        const textareaList = this.$refs
        console.log(textareaList)
        for (let key in textareaList) {
          if (key !== 'kiContext') {
            // textareaList[key].resizeTextarea();
            let that = textareaList[key].$el.children[0]
            that.style.height = '25px'
            this.autoTextarea(that)
          }
        }
      })
      this.$message({
        type: 'success',
        message: '插入成功:'
      })
      this.dialogInsertVisible = false
    },
    EditDialog () {
      this.dialogEditVisible = true
    },
    EditRecord () {
      this.marcData[this.focusIndex].sign = this.focusSign
      this.marcData[this.focusIndex].indi = this.focusIndi
      this.$message({
        type: 'success',
        message: '修改成功:'
      })
      this.dialogEditVisible = false
    },
    //  删除记录
    DeleteRecord (row) {
      this.marcData.pop(row)
    },
    TopMoving (e) {
      if (this.focusIndex - this.step < this.top) {
        return false
      }
      var fIndex = 0
      if (this.textareaClickIndex === 1) {
        console.log('rf=' + this.textareaClickIndex)
        fIndex = this.focusIndex - this.step
      } else {
        fIndex = this.focusIndex
      }
      let rf = 'InnerInput' + fIndex
      console.log('rf=' + rf)
      var realLine = Math.ceil(this.$refs[rf].$el.children[0].offsetHeight / 25)
      console.log('realLine=' + realLine)
      if (this.textareaFrist && realLine > 1) {
        console.log(111111)
        if (this.textareaClickIndex !== 1) {
          this.textareaIndex = this.textareaClickIndex - 1
          this.textareaClickIndex = 0
          this.textareaFrist = false
          console.log(this.textareaIndex)
        } else {
          this.textareaIndex = realLine + 1
          this.textareaIndex -= 1
          console.log('第一次进入 设置textareaIndex=' + this.textareaIndex)
          this.textareaFrist = false
          this.focusIndex -= this.step
          this.$refs[rf].focus()
          this.$refs[rf].$el.children[0].selectionStart = this.$refs[rf].$el.children[0].value.length
          this.$refs[rf].$el.children[0].selectionEnd = this.$refs[rf].$el.children[0].value.length
        }
      }
      console.log('textareaIndex=' + this.textareaIndex)
      if (this.textareaIndex > 0) {
        console.log('多次进入textareaIndex=' + this.textareaIndex)
        if (!this.textareaFrist) {
          this.textareaIndex -= 1
        }
      } else {
        console.log('最终跳出textareaIndex=' + this.textareaIndex)
        this.focusIndex -= this.step
        rf = 'InnerInput' + this.focusIndex
        this.$refs[rf].focus()
        this.textareaFrist = true
      }
    },
    BottomMoving (e) {
      if (this.focusIndex + this.step > this.bottom) {
        return false
      }
      var fIndex
      console.log('rf=' + this.focusIndex)
      if (this.textareaClickIndex === 1) {
        console.log('rf=' + this.textareaClickIndex)
        let f = 'InnerInput' + this.focusIndex
        var line = Math.ceil(this.$refs[f].$el.children[0].offsetHeight / 25)
        if (line > 1) {
          fIndex = this.focusIndex
        } else {
          fIndex = this.focusIndex + this.step
        }
      } else {
        fIndex = this.focusIndex
      }
      let rf = 'InnerInput' + fIndex
      console.log('rf=' + rf)
      var realLine = Math.ceil(this.$refs[rf].$el.children[0].offsetHeight / 25)
      console.log('realLine=' + realLine + 'qqqqqq' + e)
      if (this.textareaFrist && realLine > 1) {
        if (this.textareaClickIndex !== 1 || (this.textareaClickIndex === 1 && fIndex === this.focusIndex)) {
          this.textareaIndex = realLine - this.textareaClickIndex
          this.textareaClickIndex = 1
          this.textareaFrist = false
          console.log(this.textareaIndex)
        } else {
          this.textareaIndex = realLine
          console.log('第一次进入 设置textareaIndex=' + this.textareaIndex)
          this.textareaFrist = false
          this.focusIndex += this.step
          this.$refs[rf].focus()
          this.$refs[rf].$el.children[0].selectionStart = 0
          this.$refs[rf].$el.children[0].selectionEnd = 0
        }
      }
      console.log('textareaIndex=' + this.textareaIndex)
      if (this.textareaIndex > 0) {
        console.log('多次进入textareaIndex=' + this.textareaIndex)
        if (!this.textareaFrist) {
          this.textareaIndex -= 1
        }
      } else {
        console.log('最终跳出textareaIndex=' + this.textareaIndex)
        this.focusIndex += this.step
        rf = 'InnerInput' + this.focusIndex
        this.$refs[rf].focus()
        this.textareaFrist = true
      }
    },
    Top (e) {
      if (this.focusIndex - this.step < this.top) {
        return false
      }
      var lineFocus = Math.ceil((this.$refs['InnerInput' + this.focusIndex].$el.children[0].offsetHeight - 8) / 25)
      var linePre = Math.ceil((this.$refs['InnerInput' + (this.focusIndex - 1)].$el.children[0].offsetHeight - 8) / 25)
      var focusInd = this.$refs['InnerInput' + (this.focusIndex)].$el.children[0].selectionStart
      if (lineFocus === 1 && linePre === 1) {
        e.preventDefault()
        this.focusIndex -= this.step
        this.$refs['InnerInput' + this.focusIndex].focus()
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
      } else if (lineFocus > 1 && linePre === 1) {
        if (this.textareaFocusIndex === 1 || focusInd === 0) {
          e.preventDefault()
          this.focusIndex -= this.step
          this.$refs['InnerInput' + this.focusIndex].focus()
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
        } else {
          this.textareaFocusIndex -= 1
        }
      } else if (lineFocus === 1 && linePre > 1) {
        e.preventDefault()
        this.focusIndex -= this.step
        this.$refs['InnerInput' + this.focusIndex].focus()
        //    切换到多行光标定位待改
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = this.$refs['InnerInput' + this.focusIndex].$el.children[0].value.length
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = this.$refs['InnerInput' + this.focusIndex].$el.children[0].value.length
        this.textareaFocusIndex = linePre
      } else {
        if (this.textareaFocusIndex === 1 || focusInd === 0) {
          e.preventDefault()
          this.focusIndex -= this.step
          this.$refs['InnerInput' + this.focusIndex].focus()
          //    切换到多行光标定位待改
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = this.$refs['InnerInput' + this.focusIndex].$el.children[0].value.length
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = this.$refs['InnerInput' + this.focusIndex].$el.children[0].value.length
          this.textareaFocusIndex = linePre
        } else {
          this.textareaFocusIndex -= 1
        }
      }
    },
    Bot (e) {
      console.log(this.focusIndex, this.bottom)
      if (this.focusIndex + this.step > this.bottom) {
        return false
      }
      var lineFocus = Math.ceil((this.$refs['InnerInput' + this.focusIndex].$el.children[0].offsetHeight - 8) / 25)
      var lineNext = Math.ceil((this.$refs['InnerInput' + (this.focusIndex + 1)].$el.children[0].offsetHeight - 8) / 25)
      var focusInd = e.target.selectionStart
      var textLength = e.target.value.length
      if (lineFocus === 1 && lineNext === 1) {
        e.preventDefault()
        this.focusIndex += this.step
        this.$refs['InnerInput' + this.focusIndex].focus()
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
        this.textareaFocusIndex = 1
      } else if (lineFocus > 1 && lineNext === 1) {
        if (this.textareaFocusIndex === lineFocus || focusInd === textLength) {
          e.preventDefault()
          this.focusIndex += this.step
          this.$refs['InnerInput' + this.focusIndex].focus()
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
          this.textareaFocusIndex = 1
        } else {
          this.textareaFocusIndex += 1
        }
      } else if (lineFocus === 1 && lineNext > 1) {
        e.preventDefault()
        this.focusIndex += this.step
        this.$refs['InnerInput' + this.focusIndex].focus()
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
        this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
      } else {
        if (this.textareaFocusIndex === lineFocus || focusInd === textLength) {
          e.preventDefault()
          this.focusIndex += this.step
          this.$refs['InnerInput' + this.focusIndex].focus()
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionStart = focusInd
          this.$refs['InnerInput' + this.focusIndex].$el.children[0].selectionEnd = focusInd
          this.textareaFocusIndex = 1
        } else {
          this.textareaFocusIndex += 1
        }
      }
    },
    InsertSpace (e) {
      var target = e.target
      var index = target.selectionStart
      var s1 = target.value.substring(0, index)
      s1 = s1.substring(0, s1.length - 1) + '▼'
      var s2 = target.value.substring(index, target.value.length)
      target.value = s1 + s2
      target.selectionStart = index
      target.selectionEnd = index
    },
    DeleteContent (index) {
      if (event.target.value === '') {
        this.$confirm('此操作将删除此条目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.marcData.splice(index, 1)
          this.ResetTextArea()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    },
    rowClass  ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1 || columnIndex === 0 || columnIndex === 2) {
        return {'background': '#ccc', 'font-weight': 600, 'border-bottom-color': '#bbb'}
      }
    }
  },
  created: function () {
    var _this = this
    document.onkeydown = function (event) {
      let key = window.event.keyCode
      if (event.ctrlKey && key === 66) {
        event.preventDefault()
        var index
        var target = event.target
        index = target.selectionEnd
        console.log(index, FindStart(index, target.value), _this.dbClickStart)
        if (FindStart(index, target.value) === _this.dbClickStart && FindEnd(index, target.value) === _this.dbClickEnd) {
          target.selectionStart = FindStart(index, target.value) + 2
          target.selectionEnd = FindEnd(index, target.value)
          _this.dbClickStart = target.selectionStart
          _this.dbClickEnd = target.selectionEnd
        } else {
          target.selectionStart = FindStart(index, target.value)
          target.selectionEnd = FindEnd(index, target.value)
          _this.dbClickStart = target.selectionStart
          _this.dbClickEnd = target.selectionEnd
        }
      }
      if (event.shiftKey && key === 9) {
        event.preventDefault()
        if ((event.target.selectionEnd - 2) <= 0) {
          if (_this.focusIndex - _this.step < _this.top) {
            return false
          }
          _this.focusIndex -= _this.step
          _this.$refs['InnerInput' + _this.focusIndex].focus()
          _this.tabIndex = _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].value.length
          _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].selectionStart = FindStartTab(_this.tabIndex, _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].value) + 2
          _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].selectionEnd = FindStartTab(_this.tabIndex, _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].value) + 2
        } else {
          _this.tabIndex = event.target.selectionEnd - 2
          event.target.selectionStart = FindStartTab(_this.tabIndex, event.target.value) + 2
          event.target.selectionEnd = FindStartTab(_this.tabIndex, event.target.value) + 2
        }
      } else if (key === 9) {
        event.preventDefault()
        if (FindEndTab(event.target.selectionStart, event.target.value) + 2 >= event.target.value.length) {
          if (_this.focusIndex + _this.step > _this.bottom) {
            return false
          }
          _this.focusIndex += _this.step
          _this.$refs['InnerInput' + _this.focusIndex].focus()
          _this.tabIndex = 0
          _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].selectionStart = FindStartTab(_this.tabIndex, _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].value) + 2
          _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].selectionEnd = FindStartTab(_this.tabIndex, _this.$refs['InnerInput' + _this.focusIndex].$el.children[0].value) + 2
        } else {
          console.log('-------' + _this.tabIndex)
          _this.tabIndex = FindEndTab(event.target.selectionStart, event.target.value) + 2
          event.target.selectionStart = FindStartTab(_this.tabIndex, event.target.value) + 2
          event.target.selectionEnd = FindStartTab(_this.tabIndex, event.target.value) + 2
          console.log(event.target.selectionStart, event.target.selectionEnd)
        }
      }
      //  F2保存
      if (key === 113) {
        alert('保存')
      }
      if (event.ctrlKey && key === 37) {
        if (_this.marcDataIndex === mdata.length) {
          _this.marcDataIndex = 0
        } else {
          _this.marcDataIndex += 1
        }
        _this.marcData = mdata[_this.marcDataIndex]
        _this.$nextTick(() => {
          const textareaList = _this.$refs
          for (let key in textareaList) {
            if (key !== 'kiContext') {
              // textareaList[key].resizeTextarea();
              let that = textareaList[key].$el.children[0]
              that.style.height = '25px'
              _this.autoTextarea(that)
            }
          }
        })
      }
      if (event.ctrlKey && key === 39) {
        if (_this.marcDataIndex === 0) {
          _this.marcDataIndex = mdata.length
        } else {
          _this.marcDataIndex -= 1
        }
        _this.marcData = mdata[_this.marcDataIndex]
        _this.$nextTick(() => {
          const textareaList = _this.$refs
          for (let key in textareaList) {
            if (key !== 'kiContext') {
              // textareaList[key].resizeTextarea();
              let that = textareaList[key].$el.children[0]
              that.style.height = '25px'
              _this.autoTextarea(that)
            }
          }
        })
      }
    }
  },
  mounted () {
    this.marcData = mdata[this.marcDataIndex]
    // this.$nextTick(() => {
    //   const textareaList = this.$refs
    //   for (let key in textareaList) {
    //     if (key !== 'kiContext') {
    //       // textareaList[key].resizeTextarea();
    //       let that = textareaList[key].$el.children[0]
    //       that.style.height = '25px'
    //       this.autoTextarea(that)
    //     }
    //   }
    // })
  },
  watch: {}
}
function FindStart (start, str) {
  if (start === 0) {
    return 0
  }
  for (var i = start - 1; i >= 0; i--) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
}

function FindEnd (start, str) {
  if (start === 0) {
    start += 1
  }
  for (var i = start; i <= str.length; i++) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
  return str.length
}
function FindStartTab (start, str) {
  if (start === 0) {
    return 0
  }
  for (var i = start - 1; i >= 0; i--) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
}

function FindEndTab (start, str) {
  if (start === 0) {
    start += 1
  }
  for (var i = start; i <= str.length; i++) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
  return str.length
}
</script>
<style lang="scss" scoped>
  #marcEdit {
    .h2-title {
      font-size: 26px;
      color: #fff;
      text-align: center;
      background-color: rgb(84, 92, 100);
      padding: 25px 0;
    }

    .menu01 {
      background-color: #f8f8f1;
      border: 1px solid #eee;
      padding: 10px 15px;
      margin: 25px 25px 0;
      & > div {
        display: inline-block;
        margin-right: 15px;
      }
      & >>> .el-button {
        padding: 12px 15px;
      }
    }

    .vue-table {
      border: 1px solid #cacaca;
      border-top: 0;
      margin: 0 25px 25px;
      & >>> .has-gutter {
        display: none;
      }
      & >>> .no-border .el-textarea__inner {
        font-family: '宋体','Avenir', Helvetica, Arial, sans-serif;
        padding:2px;
        background-color:transparent;
        border: 1px;
        font-size: 14pt;
      }
      & >>> .el-table td {
        border-color: #cacaca;
        padding: 6px 0;
        .cell {
          .quill-editor > div:first-child {
            height: 0;
            padding: 0;
            border: 0;
          }
        }
      }
      & >>> .el-table td.el-el-table_1_column_1 {
        background-color: #eee;
      }
      & >>> .el-table td.el-table_1_column_4 {
        background-color: #eee;
      }
    }

  }
  .el-tooltip__popper {
    .tooltip {
      font-size: 14px;
      p {
        text-align: center;
        padding: 5px 0;
        border-bottom: 1px dashed rgba(255, 255, 255, .15);
      }
      p:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
