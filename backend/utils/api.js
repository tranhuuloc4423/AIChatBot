import { CohereClientV2 } from 'cohere-ai'
import { v2 as cloudinary } from 'cloudinary'
import { randomUUID } from 'crypto'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
// const cohere = new CohereClientV2({
//   token: process.env.COHERE_API_KEY
// })

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET
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

// const uploadAudio = async (base64Audio) => {
//   const fileName = `${randomUUID()}.wav` // Create a unique filename

//   // Convert base64 string to a Buffer
//   const audioBuffer = Buffer.from(base64Audio, 'base64')

//   try {
//     // Upload the audio file to Cloudinary directly using a Buffer
//     const uploadResult = await cloudinary.uploader.upload(audioBuffer, {
//       resource_type: 'raw', // Specify that it's a raw file (audio)
//       public_id: fileName, // Set the public ID for the uploaded file
//       folder: 'audio'
//     })

//     console.log('Audio uploaded successfully:', uploadResult)
//     return uploadResult.secure_url
//   } catch (error) {
//     console.error('Error uploading audio:', error.message)
//     throw new Error('Error uploading audio to Cloudinary', error.message)
//   }
// }

// const uploadAudio = async (base64Audio) => {
//   const fileName = `${randomUUID()}.wav` // Create a unique filename

//   // Convert base64 string to a Buffer
//   const audioBuffer = Buffer.from(base64Audio, 'base64')

//   try {
//     // Create a new stream to upload to Cloudinary
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: 'raw', // Specify that it's a raw file (audio)
//         public_id: fileName, // Set the public ID for the uploaded file
//         folder: 'audio' // Specify the folder name where you want to save the file
//       },
//       (error, result) => {
//         if (error) {
//           console.error('Error uploading audio:', error.message)
//           throw new Error(
//             'Error uploading audio to Cloudinary: ' + error.message
//           )
//         }
//         console.log('Audio uploaded successfully:', result)
//         return result.secure_url // Return the URL of the uploaded audio file
//       }
//     )

//     // Write the buffer to the upload stream
//     uploadStream.end(audioBuffer)

//     // Wait for the upload to finish
//     return new Promise((resolve, reject) => {
//       uploadStream.on('finish', () => {
//         resolve(uploadStream) // Resolving here is not correct; we need to modify the logic for proper use of Promises
//       })
//       uploadStream.on('error', (error) => {
//         console.error('Error uploading audio:', error.message)
//         reject(
//           new Error('Error uploading audio to Cloudinary: ' + error.message)
//         )
//       })
//     })
//   } catch (error) {
//     console.error('Error in uploadAudio function:', error.message)
//     throw new Error('Error in uploadAudio function: ' + error.message)
//   }
// }

const uploadAudio = async (base64Audio) => {
  const fileName = `${randomUUID()}.wav` // Create a unique filename

  // Convert base64 string to a Buffer
  const audioBuffer = Buffer.from(base64Audio, 'base64')

  return new Promise((resolve, reject) => {
    // Create a new stream to upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // Specify that it's a raw file (audio)
        public_id: fileName, // Set the public ID for the uploaded file
        folder: 'audio' // Specify the folder name where you want to save the file
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading audio:', error.message)
          return reject(
            new Error('Error uploading audio to Cloudinary: ' + error.message)
          )
        }
        console.log('Audio uploaded successfully:', result)
        resolve(result.secure_url) // Resolve with the URL of the uploaded audio file
      }
    )

    // Write the buffer to the upload stream
    uploadStream.end(audioBuffer)
  })
}

export {
  cohereApiCall,
  pollinationsImageApiCall,
  pollinationsTextApiCall,
  uploadAudio
}
