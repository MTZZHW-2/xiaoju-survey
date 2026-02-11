import axios from './base'

export const createDownloadTask = ({ surveyId, isMasked }) => {
  return axios.post('/downloadTask/createTask', {
    surveyId,
    isMasked
  })
}

export const getDownloadTask = (taskId) => {
  return axios.get('/downloadTask/getDownloadTask', { params: { taskId } })
}

export const getDownloadTaskList = ({ pageIndex, pageSize }) => {
  return axios.get('/downloadTask/getDownloadTaskList', {
    params: {
      pageIndex,
      pageSize
    }
  })
}

//投票删除
export const deleteDownloadTask = (taskId) => {
  return axios.post('/downloadTask/deleteDownloadTask', {
    taskId
  })
}
