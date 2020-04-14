const socket = io()

const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log('New Message :' + message.text)
    console.log('createdAt :' + moment(message.createdAt).format('h:mm a'))

    const html = Mustache.render(messageTemplate, {
        'message': message.text,
        'createdAt': moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('btn').setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, () => {
        document.getElementById('btn').removeAttribute('disabled')
        document.getElementById('msg').value = ''
        document.getElementById('msg').focus()
        console.log('sent')
    })
})