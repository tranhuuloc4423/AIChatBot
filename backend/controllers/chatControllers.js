import { Conversation } from '../models/Conversation.js'
import { User } from '../models/User.js'
import { Message } from '../models/Message.js'
import {
  pollinationsImageApiCall,
  pollinationsTextApiCall
} from '../utils/api.js'
import dotenv from 'dotenv'
import https from 'https'
import querystring from 'querystring'
dotenv.config()

export const newConversation = async (req, res) => {
  const { email, title } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    const newConversation = new Conversation({
      user: user._id,
      title: title || 'Untitled',
      messageIds: []
    })

    await newConversation.save()

    user.conversations.push(newConversation._id)
    await user.save()

    res.json({
      success: true,
      conversationId: newConversation._id,
      title: newConversation.title
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const handleChat = async (req, res) => {
  const { conversationId, message, type } = req.body

  try {
    let result

    // kiểm trả type là text hay image
    if (type === 'image') {
      result = await pollinationsImageApiCall(message)
    } else {
      result = await pollinationsTextApiCall(message)
    }

    // thêm vào conversation
    if (result) {
      const userMessage = await Message.create({
        role: 'user',
        content: message,
        type: 'text',
        conversation: conversationId
      })

      const assistantMessage = await Message.create({
        role: 'assistant',
        content: result,
        type: type,
        conversation: conversationId
      })

      // Cập nhật ID của các tin nhắn vào cuộc hội thoại
      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        {
          $push: {
            messageIds: {
              $each: [userMessage._id, assistantMessage._id]
            }
          }
        },
        { new: true }
      )

      if (!conversation) {
        return res
          .status(404)
          .json({ success: false, msg: 'Conversation not found' })
      }

      // Trả về các tin nhắn mới (của assistant) cùng với ID
      return res.status(200).json({
        success: true,
        assistantMessage: assistantMessage.content
      })
    } else {
      return res
        .status(500)
        .json({ success: false, msg: 'Pollinations API call failed' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getAllConversations = async (req, res) => {
  const { email } = req.query

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    // Lấy tất cả các cuộc hội thoại của người dùng và populate tin nhắn
    const conversations = await Conversation.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'messageIds',
        select: 'role content type' // Chỉ lấy trường cần thiết
      })

    res.json(conversations)
  } catch (err) {
    console.error('Error while fetching conversations:', err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const getConversationById = async (req, res) => {
  const { conversationId } = req.params

  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messageIds',
      select: 'role content type' // Chỉ lấy trường cần thiết
    })

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json(conversation)
  } catch (err) {
    console.error('Error while fetching conversation by ID:', err)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const updateTitle = async (req, res) => {
  const { conversationId } = req.params
  const { title } = req.body

  try {
    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { title: title },
      { new: true }
    )

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json({ success: true, updatedTitle: conversation.title })
  } catch (error) {
    console.error('Error while updating conversation title:', error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const removeConversation = async (req, res) => {
  const { conversationId } = req.params

  try {
    const conversation = await Conversation.findByIdAndDelete(conversationId)

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' })
    }

    res.json({ success: true, msg: 'remove succesfull' })
  } catch (error) {
    console.error('Error while remove conversation :', error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

// export const speechToText = async (req, res) => {
//   const data = req.body
//   const audioUrl = data?.audioUrl
//   const audioConfig = data?.config
//   console.log('running speech to text')

//   if (!audioUrl) return res.status(422).send('No audio URL was provided.')
//   if (!audioConfig) return res.status(422).send('No audio config was provided.')
//   try {
//     console.log('check speech to text')

//     const speechResults = await fetch(
//       'https://speech.googleapis.com/v1/speech:recognize',
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           audio: {
//             content: audioUrl
//           },
//           config: audioConfig
//         }),
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'X-goog-api-key': `${process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY}`
//         }
//       }
//     ).then((response) => response.json())
//     return res.send(speechResults)
//   } catch (err) {
//     console.error('Error converting speech to text: ', err)
//     res.status(404).send(err)
//     return err
//   }
// }

const API_KEY_ID = process.env.SPEECHFLOW_API_KEY_ID
const API_KEY_SECRET = process.env.SPEECHFLOW_API_KEY_SECRET
const LANG = 'en' // Mã ngôn ngữ
const RESULT_TYPE = 1 // Kết quả dạng JSON

export const speechToText = async (req, res) => {
  const data = req.body
  const audioUrl = data?.audioUrl

  console.log('Running speech to text')

  if (!audioUrl) return res.status(422).send('No audio URL was provided.')

  try {
    console.log('Submitting a remote file')

    // Tạo dữ liệu để gửi
    const createData = querystring.stringify({
      lang: LANG,
      remotePath: audioUrl
    })

    // Tạo yêu cầu đến SpeechFlow
    const createRequest = https.request(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': createData.length,
          keyId: API_KEY_ID,
          keySecret: API_KEY_SECRET
        },
        hostname: 'api.speechflow.io',
        path: '/asr/file/v1/create'
      },
      (createResponse) => {
        let responseData = ''

        createResponse.on('data', (chunk) => {
          responseData += chunk
        })

        createResponse.on('end', () => {
          const responseJSON = JSON.parse(responseData)
          console.log(responseJSON)
          if (responseJSON.code === 10000) {
            const taskId = responseJSON.taskId
            checkTranscriptionResult(taskId)
          } else {
            console.log('Create error:', responseJSON.msg)
            return res.status(500).send(responseJSON.msg)
          }
        })
      }
    )

    createRequest.on('error', (error) => {
      console.error(error)
      return res.status(500).send('Request error')
    })

    createRequest.write(createData)
    createRequest.end()

    // Hàm kiểm tra kết quả chuyển đổi
    const checkTranscriptionResult = (taskId) => {
      const intervalID = setInterval(() => {
        const queryRequest = https.request(
          {
            method: 'GET',
            headers: {
              keyId: API_KEY_ID,
              keySecret: API_KEY_SECRET
            },
            hostname: 'api.speechflow.io',
            path: `/asr/file/v1/query?taskId=${taskId}&resultType=${RESULT_TYPE}`
          },
          (queryResponse) => {
            let responseData = ''

            queryResponse.on('data', (chunk) => {
              responseData += chunk
            })

            queryResponse.on('end', () => {
              const responseJSON = JSON.parse(responseData)
              if (responseJSON.code === 11000) {
                console.log('Transcription result:', responseData)
                clearInterval(intervalID)
                res.send(responseJSON) // Gửi kết quả cho client
              } else if (responseJSON.code === 11001) {
                console.log('Waiting for transcription...')
              } else {
                console.log('Transcription error:', responseJSON.msg)
                clearInterval(intervalID)
                return res.status(500).send(responseJSON.msg)
              }
            })
          }
        )

        queryRequest.on('error', (error) => {
          console.error(error)
        })
        queryRequest.end()
      }, 3000)
    }
  } catch (err) {
    console.error('Error converting speech to text:', err)
    res.status(500).send('An error occurred while converting speech to text.')
  }
}
