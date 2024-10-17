import { CohereClientV2 } from 'cohere-ai'
import axios from 'axios'
const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY
})

const cohereApiCall = async (message) => {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    })
    // console.log('Cohere API response:', response.message.content)
    return response
  } catch (err) {
    return { success: false, msg: 'Cohere API call failed' }
  }
}

const pollinationsImageApiCall = async (prompt) => {
  try {
    const width = 500
    const height = 500
    const seed = 4 // Each seed generates a new image variation
    const model = 'flux' // Using 'flux' as default if model is not provided
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=${width}&height=${height}&seed=${seed}&model=${model}`
    await axios.get(imageUrl)

    return imageUrl
  } catch (err) {
    return { success: false, msg: 'Pollinations API call failed' }
  }
}

const pollinationsTextApiCall = async (prompt) => {
  try {
    const response = await axios.get(`https://text.pollinations.ai/${prompt}`)
    return response.data
  } catch (err) {
    return { success: false, msg: 'Pollinations API call failed' }
  }
}

export { cohereApiCall, pollinationsImageApiCall, pollinationsTextApiCall }
