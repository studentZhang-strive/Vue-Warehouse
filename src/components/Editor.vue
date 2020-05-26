<template>
  <div class='Editor'>
    <wang-editor v-model="detail" :isClear="isClear" @change="change"></wang-editor>
  </div>
</template>

<script>
import WangEditor from './WangEditor'

export default {
  name: 'Editor',
  components: {
    WangEditor
  },
  data () {
    return {
      test: '',
      isClear: false,
      detail: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    change (val) {
      console.log(val)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
