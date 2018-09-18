let socket = io()
//  permet de faire connexion entre front et back
socket.on('connect', () => {
    console.log(`you're connected`)
    console.log(socket.id)
})
socket.on('erreur', () => { alert(`There's some trouble here !`) });

let named = prompt(`hello, who are you ?`)
document.getElementById("yourName").innerHTML = 'you are :' + named;

// to everyone
jQuery('#everyone').on('submit', function (e) {
    e.preventDefault();
    socket.emit('sendingEveryone', {
        text: jQuery('[name= sendData]').val()
    })
})
socket.on('everyoneReceive', (received) => { console.log(`for everyone : ${received.text} !!!!!!!!!`) })

//to others
jQuery('#other').on('submit', function (e) {
    e.preventDefault();
    socket.emit('sendingOther', {
        text: jQuery('[name= sendInformation]').val()
    })
})
socket.on('otherReceive', (received) => { console.log(`a information has been sending => ${received.text}.`) })


//to me only
jQuery('#me').on('submit', function (e) {
    e.preventDefault();
    socket.emit('justMe')
})
socket.on('meReceive', (theSum) => { document.getElementById("calculate").innerHTML = '4 +2 = ' + theSum; });


//poke time
jQuery('#oneUser').on('submit', function (e) {
    e.preventDefault();
    socket.emit('pokeHim',
        jQuery('[name= sendTo]').val()
    )
})
socket.on('poke', () => {
    alert('POKE')
})