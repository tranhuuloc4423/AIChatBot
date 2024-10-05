import axios from '../../axiosInstance'


export const getConversation = async (id, token) => {
  try {
    const res = await axios.get(`/chat/history/${id}`, {
      headers: {
        Authorization: token
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
} 

export const createNewConversation = async (data, token) => {
  try {
    const { email, title} = data
    const res = await axios.post(
      '/chat/new-chat',
      { email, title },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
} 