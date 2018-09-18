let socket = io()
//  permet de faire connexion entre front et back
socket.on('connect', () => {
    console.log(`you're connected`)
})
socket.on('erreur', () => { alert(`There's some trouble here !`) });


// to everyone
jQuery('#everyone').on('submit', function (e) {
    e.preventDefault();
    socket.emit('sendingEveryone', {
        text: jQuery('[name= sendData]').val()
    })
})
socket.on('everyoneReceive', () => { prompt('a data has been sending') })

//to others
jQuery('#other').on('submit', function (e) {
    e.preventDefault();
    socket.emit('sendingOther', {
        text: jQuery('[name= sendInformation]').val()
    })
})
socket.on('otherReceive', (dataReceive) => {
    // alert(`a information has been sending : ${dataReceive.text}`);
    console.log(dataReceive.text)
})


//to me only
jQuery('#me').on('submit', function (e) {
    e.preventDefault();
    socket.emit('justMe')
})
socket.on('meReceive', () => { alert('I talk with myself!!!') });
