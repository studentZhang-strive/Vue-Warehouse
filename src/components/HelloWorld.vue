<template>
  <div class="edit_container" style="height:1024px">
    <div style="display:none">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)" ></quill-editor>
      <button @click="getIndex">获取光标位置</button>
      <button @click="setIndex">设置光标到10字符处</button>
      <button @click="getSelect">获取选择内容</button>
      <button @click="setSelect">设置选中10字符处内容</button>
      <button @click="setColor">前五个字符设置颜色</button>
      <button @click="getContent">获取不含html内容</button>
      <!-- <div>{{content}}</div> -->
    </div>
    <div class="cs_box">
      <div class="cs">
        <ul>
          <li
            v-for="item in 5" :key='item'
            @mouseenter="handleMouseenter(item)"
            ref="li">
            <div>
              <span>导航{{item}}</span>
              <i class="el-icon-s-help"></i>
            </div>
          </li>
        </ul>
        <div class="aa"></div>
      </div>
      <div
        class="aab"
        @mouseleave="handelLeave"
        v-show="ifShow">
        <div v-for="(item, index) in list" :key="index">
          <span style="width:100px;overflow:hidden;height:20px;display:inline-block;">Id：{{item.id}}</span>
          <span style="width:200px;overflow:hidden;height:20px;display:inline-block;">邮箱：{{item.email}}</span>
          <span style="width:200px;overflow:hidden;height:20px;display:inline-block;">姓名：{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
// import { getHomeData } from '@/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: `中国近代史的时间为，从1840年鸦片战争到1949年中华人民共和国成立前，这也是中国半殖民地半封建社会的历史。中国近代史分为前后两个阶段，从1840年鸦片战争到1919年“五四”运动前夕，是旧民主主义革命阶段；从1919年“五四”运动到1949年中华人民共和国成立前夕，是新民主主义革命阶段`,
      editorOption: {
        modules: {
          toolbar: [
          ]
        }
      },
      list: [],
      ifShow: false
    }
  },
  methods: {
    getContent () {
      let quill = this.$refs.myQuillEditor.quill
      console.log(quill)
      alert(quill.getText())
    },
    setColor () {
      let quill = this.$refs.myQuillEditor.quill
      quill.formatText(0, 5, 'color', 'red')
    },
    getIndex () {
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index
      console.log(length)
      // alert(length)
    },
    setIndex () {
      let quill = this.$refs.myQuillEditor.quill
      quill.setSelection(10)
    },
    getSelect () {
      let quill = this.$refs.myQuillEditor.quill
      var range = quill.getSelection()
      if (range) {
        if (range.length !== 0) {
          var text = quill.getText(range.index, range.length)
          alert(text)
        }
      }
    },
    setSelect () {
      let quill = this.$refs.myQuillEditor.quill
      quill.setSelection(10, 5)
    },
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},

    async getData (id) {
      let {data} = await this.$axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
      this.list = data
      // console.log(data)
    },

    handleMouseenter (id) {
      this.ifShow = true
      this.getData(id)
    },
    handelLeave () {
      this.ifShow = false
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    let aLi = this.$refs.li
    let idx = 0
    for (let i = 0, len = aLi.length; i < len; i++) {
      aLi[i].onmouseenter = () => {
        aLi[idx].classList.remove('on')
        idx = i
        aLi[idx].classList.add('on')
      }
    }
  }
}
</script>
<style lang="scss" scope>
  .cs_box {
    position: relative;
    .cs {
      display: flex;
      height: 210px;
      ul {
        height: 100%;
        width: 200px;
        cursor: pointer;
        background: #242426;
        li {
          padding: 10px 20px;
          box-sizing: border-box;
          color: #fff;
        }
        li.on {
          background-color: #5f5f5f;
        }
      }
      .aa {
        flex: 1;
        height: 100%;
        background-color: #eee;
      }
    }
    .aab {
      position: absolute;
      left: 200px;
      top: 0;
      width: 800px;
      height: 210px;
      background-color: #fff;
      padding: 15px;
      box-sizing: border-box;
    }
  }
</style>
