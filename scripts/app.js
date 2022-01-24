const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newName = document.querySelector('form.new-name');

const updateMsg = document.querySelector('.update-mssg');
const chatRooms = document.querySelector('.chat-rooms');

chatRooms.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.nodeName === 'BUTTON') {
    const room = e.target.getAttribute('id');
    chatUi.clear();
    chatroom.updateRoom(room);
    chatroom.getChat((chat) => {
      chatUi.render(chat);
    });
  }
});

//CLASS INSTANCES
const chatUi = new ChatUI(chatList);
const storedUsername = localStorage.getItem('username');
const room = localStorage.getItem('room');
const chatroom = new Chat('music', storedUsername ? storedUsername : 'nan');

newChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();

  chatroom.addChat(message);
  newChatForm.reset();
});

// get chat and render
chatroom.getChat((data) => {
  chatUi.render(data);
});

newName.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = newName.name.value.trim();

  localStorage.setItem('username', username);

  localStorage.getItem(username);
  chatroom.updateUsername(username);
  updateMsg.textContent = `user name has been updated to ${username}`;

  setTimeout(() => {
    updateMsg.textContent = '';
  }, 3000);

  newName.reset();
});
