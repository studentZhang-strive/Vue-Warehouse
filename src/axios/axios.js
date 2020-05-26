import axios from 'axios'
import {Loading} from 'element-ui'

axios.defaults.timeout = 0
// 设置loading
let loadingInstance

// 设置数据的返回格式
axios.interceptors.response.use(
  response => {
    if (loadingInstance !== undefined) {
      loadingInstance.close()
    }
    return response.data
  }
)

const post = (url, params, config = {}) => {
  // 请求到数据前打开遮罩
  if (config.hideLoading === undefined) {
    loadingInstance = Loading.service({fullscreen: true, lock: true, text: '处理中，请稍候...'})
  }
  return axios.post(url, params, config).catch(error => {
    console.log(error)
    if (loadingInstance !== undefined) {
      loadingInstance.close()
    }
  })
}

const get = (url, params, config = {}) => {
  // 请求到数据前打开遮罩
  if (config.hideLoading === undefined) {
    loadingInstance = Loading.service({fullscreen: true, lock: true, text: '处理中，请稍候...'})
  }
  return axios.get(url, params, config).catch(error => {
    console.log(error)
    if (loadingInstance !== undefined) {
      loadingInstance.close()
    }
  })
}

export {post, get}

// 获取MARC转excel的数据
// export let getMarcToExcel = () => {
// get中是请求的数据接口
// return axios.get('/api/uniauth/cxinter/province')
// }
