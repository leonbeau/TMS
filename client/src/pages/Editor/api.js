import axios from 'axios'

const token = localStorage.getItem('token')
// 保存笔记
export const saveEssay = (record) => {
  return axios({
    method: 'post',
    url: '/api/essay/add',
    data: record,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 获得详情
export const getDetails = (essayId) => {
  return axios({
    method: 'get',
    url: `/api/essay/${essayId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
