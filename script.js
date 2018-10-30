var imagesURLs = {
  "images": {
    "janna": {
      "background_name": "Star Guardian Janna",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c4/Janna_StarGuardianSkin.jpg",
    },
    "jinx": {
      "background_name": "Star Guardian Jinx",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/7/70/Jinx_StarGuardianSkin.jpg",
    },
    "lulu": {
      "background_name": "Star Guardian Lulu",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/0/01/Lulu_StarGuardianSkin.jpg",
    },
    "lux": {
      "background_name": "Star Guardian Lux",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/3/31/Lux_StarGuardianSkin.jpg",
    },
    "poopy": {
      "background_name": "Star Guardian Poopy",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/5/5c/Poppy_StarGuardianSkin.jpg",
    },
    "ahri": {
      "background_name": "Star Guardian Ahri",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/7/73/Ahri_StarGuardianSkin.jpg",
    },
    "ezreal": {
      "background_name": "Star Guardian Ezreal",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/4/42/Ezreal_StarGuardianSkin.jpg",
    },
    "miss_fortune": {
      "background_name": "Star Guardian MissFortune",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/6/65/Miss_Fortune_StarGuardianSkin.jpg",
    },
    "syndra": {
      "background_name": "Star Guardian Syndra",
      "background_url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/a/ad/Syndra_StarGuardianSkin.jpg"
    }
  }
}

$(document).ready(function() {
  setCurrentTime()
  setBackgroundImage()

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

function setBackgroundImage() {
  var picture_url = imagesURLs.images.janna.background_url;
  var picture_name = imagesURLs.images.janna.background_name;
  console.log({picture_url})
  console.log({picture_name})
}

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
