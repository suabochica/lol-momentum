$(document).ready(function() {
  setCurrentTime()

  setInterval(function(){
    setCurrentTime()
  }, 10*10000)

  var username = getCookie('username');

  if(username) {
    $('.overlay--greeting').css('display', 'inline-block')
    $('.overlay--username').css('display', 'none')
    $('.overlay--greeting').html(`Hello <span class="stored-name">${username}</span>`)
  } else {
    $('.overlay--greeting').css('display', 'inline-block')
    $('.overlay--username').css('display', 'inline-block')
    $('.overlay--greeting').html(`What is your name?`)
  }

  $('.overlay--username').keypress(function(event) {
    if(event.which === 13) {
      var value = event.target.value

      if(!value)
        return

      $('.overlay--username').fadeOut(function() {
        $('.overlay--greeting').html(`Hello ${value}.`)
        $('.overlay--greeting').fadeIn(function() {
          setCookie('username', value, 356)
        })
      })
    }
  })
})

function setCurrentTime(){
  var now = new Date();

  $('.overlay--time').html(now.getHours() + ":" + now.getMinutes())
  $('.overlay--date').html(now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
}


function setCookie(cookieName, cookieValue, extraDays) {
  var date = new Date();
  var dateInGTM = date.toGMTString();
  var expires = `expires= ${dateInGTM}`

  date.setTime(date.getTime() + (extraDays*24*60*60*100))
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
}

function getCookie(cookieName) {
  var name = `${cookieName}`
  var decodedCookie = decodeURIComponent(document.cookie)
  var character = decodedCookie.split(';')

  for(var i = 0; i < character.length; i++) {
    var char = character[i]

    while(char.charAt(0) === ' ') {
      char = char.substr(1)
    }

    if(char.indexOf(name) === 0) {
      return char.substring(name.length, char.length)
    }
  }

  return "";
}