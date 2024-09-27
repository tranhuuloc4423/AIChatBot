import { db } from '../firebaseConfig.js'

export const Conversation = {
  async findOneAndUpdate(userId, update, options) {
    const docRef = db.collection('conversations').doc(userId)
    const doc = await docRef.get()

    if (doc.exists) {
      await docRef.update(update)
    } else {
      await docRef.set(update)
    }
    return docRef
  },

  async find(query) {
    const snapshot = await db
      .collection('conversations')
      .where('userId', '==', query.userId)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  },

  async findByIdAndUpdate(conversationId, update) {
    const docRef = db.collection('conversations').doc(conversationId)
    await docRef.update(update)
  }
}
