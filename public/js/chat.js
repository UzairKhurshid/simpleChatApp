const socket = io()

const $messages = document.querySelector('#messages')
    //$("#container").append("This is demo text.");
    // Templates
    //const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log('New Message :' + message.text)
    console.log('createdAt :' + moment(message.createdAt).format('h:mm a'))
    $("#messages").append(' <div> <p>' + message.text + '</p><span>' + moment(message.createdAt).format('h:mm a') + '</span></div>');
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