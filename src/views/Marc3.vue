<template>
  <div id="marcEdit" style="margin:130px">
    <h2>Marc数据处理</h2>
    <hr>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><i class="el-icon-location"></i>国图 : 9453231</el-menu-item>
      <el-submenu index="2">
        <template slot="title">文件</template>
        <el-menu-item index="2-1">保存F8</el-menu-item>
        <el-menu-item index="2-2">自动生成F9</el-menu-item>
        <el-menu-item index="2-3">新增条目F7</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">快捷指令</template>
        <el-menu-item index="3-1">查找Ctrl+F</el-menu-item>
        <el-menu-item index="3-2">复制Ctrl+C</el-menu-item>
        <el-menu-item index="3-3">粘贴Ctrl+V</el-menu-item>
        <el-menu-item index="3-4">上一条Ctrl+A</el-menu-item>
        <el-menu-item index="3-5">下一条Ctrl+D</el-menu-item>

      </el-submenu>
      <el-menu-item index="4">切换CALIS</el-menu-item>

    </el-menu>
    <el-table
      :data="marcData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="标识符"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sign"
        width="45">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
        <template slot-scope="scope">
          <div v-for="(content, index) in scope.row.contents" :key="index" class="aizhe">
            <el-span>
            ▼<el-input class="sig"   maxlength="1" type="text" v-model="scope.row.contents[index].sig" placeholder="请输入内容" v-direction="{x: index*2, y: scope.$index}"> </el-input>
            <el-input class="no-border"  type="text" v-model="scope.row.contents[index].content" placeholder="请输入内容"  v-direction="{x: index*2+1, y: scope.$index}"></el-input>
            </el-span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
var marcData = [{
  name: 'ISBN号',
  sign: '010',
  contents: [{
    sig: 'a',
    content: 'a978-7-220-09196-4'
  }, {
    sig: 'd',
    content: 'CNY40.00'
  }
  ]
}, {
  name: '订购号',
  sign: '092',
  contents: [{
    sig: 'a',
    content: 'CN'
  }, {
    sig: 'b',
    content: 'RT2015060-0006'
  }
  ]
}, {
  name: '新增字段',
  sign: '098',
  contents: [{
    sig: 'b',
    content: 'RT2015060'
  }
  ]
}, {
  name: '一般处理数据',
  sign: '100',
  contents: [{
    sig: 'a',
    content: 'a20140722d2014    em y0chiy0110    ea'
  }
  ]
}, {
  name: '出版国别',
  sign: '102',
  contents: [{
    sig: 'a',
    content: 'CN'
  }, {
    sig: 'b',
    content: '510000'
  }]
}, {
  name: '图书编码数据',
  sign: '105',
  contents: [{
    sig: 'a',
    content: 'f   z   000yc'
  }]
}, {
  name: '形态特征编码',
  sign: '106',
  contents: [{
    sig: 'a',
    content: 'r'
  }]
}, {
  name: '题名与责任者',
  sign: '200',
  contents: [{
    sig: 'a',
    content: '毛泽东与朱德'
  }, {
    sig: 'A',
    content: 'MAO ZE DONG YU ZHU DE'
  }, {
    sig: 'f',
    content: '赵鲁杰著'
  }]
}, {
  name: '版本项',
  sign: '205',
  contents: [{
    sig: 'a',
    content: '2版'
  }]
}, {
  name: '出版发行项',
  sign: '210',
  contents: [{
    sig: 'a',
    content: '成都'
  }, {
    sig: 'c',
    content: '四川人民出版社'
  }, {
    sig: 'd',
    content: '2014.07'
  }]
}, {
  name: '出版国别',
  sign: '102',
  contents: [{
    sig: 'a',
    content: 'CN'
  }, {
    sig: 'b',
    content: '510000'
  }]
}, {
  name: '出版国别',
  sign: '102',
  contents: [{
    sig: 'a',
    content: 'CN'
  }, {
    sig: 'b',
    content: '510000'
  }]
}, {
  name: '出版国别',
  sign: '102',
  contents: [{
    sig: 'a',
    content: 'CN'
  }, {
    sig: 'b',
    content: '510000'
  }]
}
]
export default {
  name: 'Marc',
  data () {
    return {
      marcData: marcData,
      fo: '1'
    }
  },
  methods: {
    addRecord () {
      this.marcData.push({
        name: '新增',
        sign: '新增',
        content: '新增'
      })
    },
    removeRecord (row) {
      marcData.pop(row)
    }
  },
  created: function () {
    var _this = this
    document.onkeydown = function () {
      let key = window.event.keyCode
      //  F9自动补充数据
      if (key === 120) {
        alert('自动填充数据')
        _this.autoComplete()
      }
      //  F7新增条目
      if (key === 118) {
        _this.addRecord()
      }
    }
    let direction = this.$getDirection()
    direction.on('keyup', function (e, val) {
      console.log(val)
      if (e.keyCode === 39) {
        direction.next()
      }
      if (e.keyCode === 37) {
        direction.previous()
      }
      if (e.keyCode === 38) {
        direction.previousLine()
      }
      if (e.keyCode === 40) {
        direction.nextLine()
      }
    })
  },
  watch: {
    deleteData: function (val) {
      this.mi = val
      this.qianmi = val / 1000
    }
  }
}
</script>
<style>
  .no-border .el-input__inner{
    padding:2px;
    background-color:transparent;border:0;
  }
  .sig .el-input__inner{
    background-color:transparent;border:0;
    width:15px;
    padding:2px;
  }
  .aizhe .el-input{
    width:auto;
    float: left;
  }
</style>
