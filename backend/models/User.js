import { db } from '../firebaseConfig.js'

export const User = {
  async findOne(username) {
    const snapshot = await db
      .collection('users')
      .where('username', '==', username)
      .get()
    if (snapshot.empty) return null
    return snapshot.docs[0].data()
  },

  async create(username, password) {
    const docRef = db.collection('users').doc()
    await docRef.set({ username, password })
    return docRef.id
  }
}
