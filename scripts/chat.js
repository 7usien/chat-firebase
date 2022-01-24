// add new chat docs
// setting up a real-time listiner to get new chats
// updating the username
// updating the room

class Chat {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      room: this.room,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // add chat
    const response = await this.chats.add(chat);
    return response;
  }
  getChat(callback) {
    this.unsub = this.chats
      // query or condition
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            callback(change.doc.data())
            //update UI

          }
        });
      });
  }

  updateUsername(username) {
    this.username = username;
    console.log('username updated');


  }
  updateRoom(room) {
    this.room = room;
    // localStorage.setItem('room', room)
    if (this.unsub) {
      this.unsub();
    }
    console.log('room updated');
  }
}

