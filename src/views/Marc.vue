<template>
  <div id="marcEdit" style="margin:130px">

    <h2>Marc数据处理</h2>
    <hr>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><i class="el-icon-location"></i>国图 : 9453231</el-menu-item>
      <el-submenu index="2">
        <template slot="title">操作提示</template>
        <el-menu-item index="2-1">保存 F2</el-menu-item>
        <el-menu-item index="2-2">自动生成数据 F9</el-menu-item>
        <el-menu-item index="2-3">取字段缺省值 F10</el-menu-item>
        <el-menu-item index="2-4">▼符号 / </el-menu-item>
        <el-menu-item index="2-5">新增字段 Insert</el-menu-item>
        <el-menu-item index="2-6">修改字段</el-menu-item>
        <el-menu-item index="2-7">上一行 Ctrl+←</el-menu-item>
        <el-menu-item index="2-8">下一行 Ctrl+→</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">切换CALIS</el-menu-item>
    </el-menu>
    <el-table
              :data="marcData" :cell-style="rowClass"
      style="width: 100%">
      <el-table-column
        label="日期"
        prop="name"
        width="130">
      </el-table-column>
      <el-table-column
        prop="sign"
        width="45">
      </el-table-column>
      <el-table-column
        prop="indi"
        width="45">
      </el-table-column>
      <el-table-column
        prop="content"
       >
        <template slot-scope="scope">
            <el-input class="no-border"  @keydown.8.native="DeleteContent(scope.$index)" @dblclick.native="getTextIndex"
                      @keyup.38.native="TopMoving" @click.native="hideContextMenu($event,scope.$index)" @contextmenu.prevent.native="showContextMenu($event,scope.$index)"
                      @keyup.40.native="BottomMoving" @keyup.220.native="InsertSpace" @keyup.120.native="AutoCompleteDialog"
                      @keyup.45.native="InsertDialog"  autosize="true"
                      :ref="scope.row.rf"  type="textarea" v-model="scope.row.content" placeholder="请输入内容" ></el-input>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog
      title="自动生成数据"
      :visible.sync="dialogVisible"
      width="40%">
      <span> <el-link type="primary" icon="el-icon-s-promotion" @click="CompleteInsert">点击将本字段内容追加到001字段</el-link></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
</template>
<script>
var mdata = [
  [{
    'rf': 'InnerInput0',
    'name': '记录头标区',
    'sign': '000',
    'indi': '',
    'content': '00448nam0 2200217   450 '
  }, {
    'rf': 'InnerInput1',
    'name': '记录控制号',
    'sign': '001',
    'indi': '',
    'content': 'as das'
  }, {
    'rf': 'InnerInput2',
    'name': 'ISBN号',
    'sign': '010',
    'indi': '  ',
    'content': '▼a978-7-302-35456-7▼dCNY48.00'
  }, {
    'rf': 'InnerInput3',
    'name': '订购号',
    'sign': '092',
    'indi': '  ',
    'content': '▼aCN▼b人天639-3500'
  }, {
    'rf': 'InnerInput4',
    'name': '一般处理数据',
    'sign': '100',
    'indi': '  ',
    'content': '▼a20140718d2014    em y0chiy0110    ea'
  }, {
    'rf': 'InnerInput5',
    'name': '作品语种',
    'sign': '101',
    'indi': '0 ',
    'content': '▼achi'
  }, {
    'rf': 'InnerInput6',
    'name': '出版国别',
    'sign': '102',
    'indi': '  ',
    'content': '▼aCN▼b110000'
  }, {
    'rf': 'InnerInput7',
    'name': '图书编码数据',
    'sign': '105',
    'indi': '  ',
    'content': '▼ay   z   000yy'
  }, {
    'rf': 'InnerInput8',
    'name': '形态特征编码',
    'sign': '106',
    'indi': '  ',
    'content': '▼ar'
  }, {
    'rf': 'InnerInput9',
    'name': '题名与责任者',
    'sign': '200',
    'indi': '1 ',
    'content': '▼a雕虫故事▼e清华“中国古典建筑法式制度”课堂闲谈▼f刘畅著'
  }, {
    'rf': 'InnerInput10',
    'name': '出版发行项',
    'sign': '210',
    'indi': '  ',
    'content': '▼a北京▼c清华大学出版社▼d2014.06'
  }, {
    'rf': 'InnerInput11',
    'name': '载体形态项',
    'sign': '215',
    'indi': '  ',
    'content': '▼a199页▼d26cm'
  }, {
    'rf': 'InnerInput12',
    'name': '提要或文摘',
    'sign': '330',
    'indi': '  ',
    'content': '▼a本文在教学内容基础上，闲来随笔，写了与专业有关的东西，写中国古建筑里面那些看似信手拈来一般的智慧，看似雕虫小技一般的大智慧；于是，写下来的关于术语、算法、名作、哲匠的故事将不是针对概念的严格阐发，甚至其中不少故事只是头脑工厂中的虚幻产物，仅仅是现实产物的参照版——只要它能够成为长久而有趣的参照版。'
  }, {
    'rf': 'InnerInput13',
    'name': '新增字段',
    'sign': '333',
    'indi': '  ',
    'content': '▼a建筑业从业者及高校建筑专业师生'
  }, {
    'rf': 'InnerInput14',
    'name': '中图法分类号',
    'sign': '690',
    'indi': '  ',
    'content': '▼aTU-092.2▼v5'
  }, {
    'rf': 'InnerInput15',
    'name': '人名等同责任',
    'sign': '701',
    'indi': ' 0',
    'content': '▼4著▼a刘畅'
  }, {
    'rf': 'InnerInput16',
    'name': '记录来源字段',
    'sign': '801',
    'indi': ' 0',
    'content': '▼aCN▼b人天书店▼c20140724'
  }],
  [{
    'rf': 'InnerInput0',
    'name': '记录头标区',
    'sign': '000',
    'indi': '',
    'content': '00512nam0 2200229   450 '
  }, {
    'rf': 'InnerInput1',
    'name': '记录控制号',
    'sign': '001',
    'indi': '',
    'content': '人天639-3501'
  }, {
    'rf': 'InnerInput2',
    'name': 'ISBN号',
    'sign': '010',
    'indi': '  ',
    'content': '▼a978-7-302-36979-0▼dCNY148.00'
  }, {
    'rf': 'InnerInput3',
    'name': '订购号',
    'sign': '092',
    'indi': '  ',
    'content': '▼aCN▼b人天639-3501'
  }, {
    'rf': 'InnerInput4',
    'name': '一般处理数据',
    'sign': '100',
    'indi': '  ',
    'content': '▼a20140722d2014    em y0chiy0110    ea'
  }, {
    'rf': 'InnerInput5',
    'name': '作品语种',
    'sign': '101',
    'indi': '0 ',
    'content': '▼achi'
  }, {
    'rf': 'InnerInput6',
    'name': '出版国别',
    'sign': '102',
    'indi': '  ',
    'content': '▼aCN▼b110000'
  }, {
    'rf': 'InnerInput7',
    'name': '图书编码数据',
    'sign': '105',
    'indi': '  ',
    'content': '▼ay   z   000yy'
  }, {
    'rf': 'InnerInput8',
    'name': '形态特征编码',
    'sign': '106',
    'indi': '  ',
    'content': '▼ar'
  }, {
    'rf': 'InnerInput9',
    'name': '题名与责任者',
    'sign': '200',
    'indi': '1 ',
    'content': '▼a中国近代建筑研究与保护▼f张复合，刘亦师主编▼h九'
  }, {
    'rf': 'InnerInput10',
    'name': '出版发行项',
    'sign': '210',
    'indi': '  ',
    'content': '▼a北京▼c清华大学出版社▼d2014.06'
  }, {
    'rf': 'InnerInput11',
    'name': '载体形态项',
    'sign': '215',
    'indi': '  ',
    'content': '▼a816页▼d28cm'
  }, {
    'rf': 'InnerInput12',
    'name': '提要或文摘',
    'sign': '330',
    'indi': '  ',
    'content': '▼a此书所载约70篇论文，是第13次中国近代建筑史学术年会从所征集的90余篇学术论文中经审阅选出，涉及中国近代建筑史学领域研究与保护工作诸方面。反映了近两年的最新成果，具有学术代表性。此书对城市规划、建筑设计人员吸取近代建筑历史经验从事现代城市规划和建筑设计有指导作用，对文物保护部门和开发单位保护与再利用近代建筑、开发历史地段具参考价值，可作为建筑历史研究资料、高等院校建筑学专业历史理论教学教材。'
  }, {
    'rf': 'InnerInput13',
    'name': '新增字段',
    'sign': '333',
    'indi': '  ',
    'content': '▼a建筑历史研究者、高等院校建筑学专业师生'
  }, {
    'rf': 'InnerInput14',
    'name': '中图法分类号',
    'sign': '690',
    'indi': '  ',
    'content': '▼aTU-092.5▼v5'
  }, {
    'rf': 'InnerInput15',
    'name': '人名等同责任',
    'sign': '701',
    'indi': ' 0',
    'content': '▼4主编▼a刘亦师'
  }, {
    'rf': 'InnerInput16',
    'name': '记录来源字段',
    'sign': '801',
    'indi': ' 0',
    'content': '▼aCN▼b人天书店▼c20140724'
  }],
  [{
    'rf': 'InnerInput0',
    'name': '记录头标区',
    'sign': '000',
    'indi': '',
    'content': '00451nam0 2200229   450 '
  }, {
    'rf': 'InnerInput1',
    'name': '记录控制号',
    'sign': '001',
    'indi': '',
    'content': '人天639-3502'
  }, {
    'rf': 'InnerInput2',
    'name': 'ISBN号',
    'sign': '010',
    'indi': '  ',
    'content': '▼a978-7-112-16288-8▼dCNY43.00'
  }, {
    'rf': 'InnerInput3',
    'name': '订购号',
    'sign': '092',
    'indi': '  ',
    'content': '▼aCN▼b人天639-3502'
  }, {
    'rf': 'InnerInput4',
    'name': '一般处理数据',
    'sign': '100',
    'indi': '  ',
    'content': '▼a20140717d2014    em y0chiy0110    ea'
  }, {
    'rf': 'InnerInput5',
    'name': '作品语种',
    'sign': '101',
    'indi': '0 ',
    'content': '▼achi'
  }, {
    'rf': 'InnerInput6',
    'name': '出版国别',
    'sign': '102',
    'indi': '  ',
    'content': '▼aCN▼b110000'
  }, {
    'rf': 'InnerInput7',
    'name': '图书编码数据',
    'sign': '105',
    'indi': '  ',
    'content': '▼aak  z   000yy'
  }, {
    'rf': 'InnerInput8',
    'name': '形态特征编码',
    'sign': '106',
    'indi': '  ',
    'content': '▼ar'
  }, {
    'rf': 'InnerInput9',
    'name': '题名与责任者',
    'sign': '200',
    'indi': '1 ',
    'content': '▼a可再生能源与建筑能源利用技术▼f郝小礼等编著'
  }, {
    'rf': 'InnerInput10',
    'name': '出版发行项',
    'sign': '210',
    'indi': '  ',
    'content': '▼a北京▼c中国建筑工业出版社▼d2014.07'
  }, {
    'rf': 'InnerInput11',
    'name': '载体形态项',
    'sign': '215',
    'indi': '  ',
    'content': '▼a313页▼c图▼d26cm'
  }, {
    'rf': 'InnerInput12',
    'name': '一般性附注',
    'sign': '300',
    'indi': '  ',
    'content': '▼a欧洲联盟Asia-Link资助项目 可持续建筑系列教材/张国强，尚守平，徐峰主编'
  }, {
    'rf': 'InnerInput13',
    'name': '提要或文摘',
    'sign': '330',
    'indi': '  ',
    'content': '▼a本书共分为两篇，共十章。第一篇主要介绍可再生能源及其在建筑领域呢的应用，重点介绍了各种可再生能源，包括太阳能、风能、地热能等。；第二篇主要讲述建筑能源利用的节能新技术，包括热泵技术、吸收式制冷技术等。'
  }, {
    'rf': 'InnerInput14',
    'name': '新增字段',
    'sign': '333',
    'indi': '  ',
    'content': '▼a建筑环境与能源应用工程专业师生及相关专业工程技术人员'
  }, {
    'rf': 'InnerInput15',
    'name': '中图法分类号',
    'sign': '690',
    'indi': '  ',
    'content': '▼aTU18▼v5'
  }, {
    'rf': 'InnerInput16',
    'name': '人名等同责任',
    'sign': '701',
    'indi': ' 0',
    'content': '▼4编著▼a郝小礼'
  }, {
    'rf': 'InnerInput17',
    'name': '记录来源字段',
    'sign': '801',
    'indi': ' 0',
    'content': '▼aCN▼b人天书店▼c20140724'
  }]
]
var dialogVisible = false
export default {
  name: 'Marc',
  data () {
    return {
      top: 0,
      bottom: 16,
      step: 1,
      focusIndex: 0,
      textareaIndex: 0,
      textareaFrist: true,
      dialogVisible: dialogVisible,
      dialogInsertVisible: false,
      dialogEditVisible: false,
      marcData: '',
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
    },
    //  左键双击选择
    getTextIndex (e) {
      var index
      var target = e.target
      index = target.selectionStart
      target.selectionStart = FindStart(index, target.value)
      target.selectionEnd = FindEnd(index, target.value)
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
        content: ''
      }
      this.marcData.splice(this.focusIndex + 1, 0, ins)
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
      var fIndex = this.focusIndex - this.step
      let rf = 'InnerInput' + fIndex
      var realLine = Math.ceil(this.$refs[rf].$el.children[0].offsetHeight / 25)
      console.log('realLine=' + realLine)
      if (this.textareaFrist && realLine > 1) {
        this.textareaIndex = realLine + 1
        this.textareaIndex -= 1
        console.log('第一次进入 设置textareaIndex=' + this.textareaIndex)
        this.textareaFrist = false
        this.focusIndex -= this.step
        this.$refs[rf].focus()
        this.$refs[rf].$el.children[0].selectionStart = this.$refs[rf].$el.children[0].value.length
        this.$refs[rf].$el.children[0].selectionEnd = this.$refs[rf].$el.children[0].value.length
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
      var fIndex = this.focusIndex + this.step
      let rf = 'InnerInput' + fIndex
      var realLine = Math.ceil(this.$refs[rf].$el.children[0].offsetHeight / 25)
      console.log('realLine=' + realLine)
      if (this.textareaFrist && realLine > 1) {
        this.textareaIndex = realLine
        this.textareaIndex -= 1
        console.log('第一次进入 设置textareaIndex=' + this.textareaIndex)
        this.textareaFrist = false
        this.$refs[rf].focus()
        this.$refs[rf].$el.children[0].selectionStart = 0
        this.$refs[rf].$el.children[0].selectionEnd = 0
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    },
    rowClass  ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 0 || columnIndex === 2) {
        return {'background': '#b6bbc5', 'font-weight': 700}
      }
    }
  },
  created: function () {
    var _this = this
    var ctrl = 0
    document.onkeydown = function () {
      let key = window.event.keyCode
      //  F2保存
      if (key === 113) {
        alert('保存')
      }
      if (key === 17) {
        ctrl = 1
      }
      //  PageUp
      if (key === 39 && ctrl === 1) {
        ctrl = 0
        if (_this.marcDataIndex === mdata.length) {
          _this.marcDataIndex = 0
        } else {
          _this.marcDataIndex += 1
        }
        _this.marcData = mdata[_this.marcDataIndex]
      }
      //  PageDown
      if (key === 37 && ctrl === 1) {
        ctrl = 0
        if (_this.marcDataIndex === 0) {
          _this.marcDataIndex = mdata.length
        } else {
          _this.marcDataIndex -= 1
        }
        _this.marcData = mdata[_this.marcDataIndex]
      }
    }
  },
  mounted () {
    this.marcData = mdata[this.marcDataIndex]
    this.$nextTick(() => {
      const textareaList = this.$refs
      for (let key in textareaList) {
        if (key !== 'kiContext') {
          textareaList[key].resizeTextarea()
        }
      }
    })
  },
  watch: {
  }
}
function FindStart (start, str) {
  for (var i = start - 1; i >= 0; i--) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
}

function FindEnd (start, str) {
  for (var i = start; i <= str.length; i++) {
    if (str.charAt(i) === '▼') {
      return i
    }
  }
  return str.length
}
</script>
<style>
  .no-border .el-textarea__inner {
    font-family: '宋体','Avenir', Helvetica, Arial, sans-serif;
    padding:2px;
    background-color:transparent;border: 1px;
  }
</style>
