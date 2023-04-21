const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const message = messageInput.value;  
    append(`You: ${message}`,'right'); 
    socket.emit('send', message);   
    messageInput.value = ''
})
const Name = prompt('Enter your Name to join')
socket.emit('new-user-joined', Name);

socket.on('user-joined', Name =>{
    append(`${Name} joined the chat`, 'right');
})
socket.on('receive', data =>{
    append(`${data.Name}:${data.message}`, 'left');
})