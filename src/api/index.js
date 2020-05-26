import {get} from '@/axios/axios'

// aa
export let getHomeData = (id) => {
  return get(`/api/comments?postId=${id}`)
}
