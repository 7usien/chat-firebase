// render chat templates to the dom

// clear the list of chats when the room changes



class ChatUI {

  constructor(list) {
    this.list = list;


  }
  clear() {
    this.list.innerHTML = '';

  }
  render(data) {
    const time = dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true });
    const html = `
    
    <li class="list-group-item">
      <span class="username">📝 ${data.username}  </span>
      <span class="message">${data.message}</span>
      <span class="room">${data.room}</span>
      <div class="time">${time}</div>
    </li>
    `;
    this.list.innerHTML += html;
  }
}