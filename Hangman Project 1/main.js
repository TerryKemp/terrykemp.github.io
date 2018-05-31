
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function createAlph () {
  for (var i = 0; i < alphabet.length; i++) {
    $('<div></div>').attr({ 'class': 'alph', 'id': alphabet[i] }).text(alphabet[i]).appendTo('.alph-wrapper')
  }
}
createAlph()

var moviesList = ['die hard', 'the notebook', 'cat in the hat', 'the grinch who stole christmas']
var songsList = ['final countdown', 'the show must go on', 'we will rock you', 'banana pancakes']
var booksList = ['the dove', 'hitchhikers guide to the galaxy', 'zathura', 'fiddler on the roof']

var cat = $('.cat')
var catList
var wordPlay = ' '
var array = null
var wordCanvas = $('.word')

cat.on('click', startGame)
cat.on('click', setWord)
cat.on('click', setPlaceholder)

function setWord () {
  wordCanvas.html(' ')
  cat.css('text-decoration', 'none')
  $(this).css('text-decoration', 'underline')
  catList = $(this).attr('id')
  if (catList === 'movies') {
    wordPlay = moviesList[Math.floor(Math.random() * moviesList.length)]
  } else if (catList === 'songs') {
    wordPlay = songsList[Math.floor(Math.random() * songsList.length)]
  } else if (catList === 'books') {
    wordPlay = booksList[Math.floor(Math.random() * booksList.length)]
  }
}

function setPlaceholder () {
  array = wordPlay.split('')
  wordCanvas.html('')
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ' ') {
      $('.word').append(' ')
    } else $('.word').append('_')
  }
}

function startGame () {
  var alph = $('.alph')
  var alphPick
  var allPicks = []
  var rightPicks = []
  var wrongPicks = []
  var showRight
  var displayWord
  var getAnswer = $('#answer')
  var endHideElem = $('h2, .word, ul, footer, h1, aside, .word')
  var result = $('#result')
  var playAgain = $('#play-again')

  alph.on('click', alphSelect)
  alph.on('click', alphUsed)
  alph.on('click', addToList)
  alph.on('click', checkPick)
  alph.on('click', reveal)
  alph.on('click', showMan)

  getAnswer.on('click', showAnswer)
  getAnswer.on('click', function () { getAnswer.css({ 'opacity': '0', 'cursor': 'default' }) })

  function alphUsed () { $(this).css({ 'opacity': '0.2', 'cursor': 'auto' }) }
  function alphSelect () { alphPick = $(this).attr('id') }
  function addToList () { allPicks.push(alphPick) }

  function checkPick () {
    if (array.includes(alphPick)) {
      rightPicks.push(alphPick)
    } else {
      wrongPicks.push(alphPick)
      $('.stand-base').text(wrongPicks.join(''))
    }
  }

  function reveal () {
    showRight = array.map((letter) => {
      if (allPicks.includes(letter)) {
        return letter
      } else if (letter === ' ') {
        return ' '
      } else return '_'
    })
    displayWord = showRight.join('')
    wordCanvas.text(displayWord)

    if (displayWord === wordPlay) {
      endHideElem.css('opacity', '0.5')
      result.text('YOU WIN!')
      playAgain.text('play again')
    }
  }

  function showMan () {
    if (wrongPicks.length === 1) {
      $('.head').removeClass('hidden')
    } else if (wrongPicks.length === 2) {
      $('.torso').removeClass('hidden')
    } else if (wrongPicks.length === 3) {
      $('.left-arm').removeClass('hidden')
    } else if (wrongPicks.length === 4) {
      $('.right-arm').removeClass('hidden')
    } else if (wrongPicks.length === 5) {
      $('.left-leg').removeClass('hidden')
    } else if (wrongPicks.length === 6) {
      $('.right-leg').removeClass('hidden')
      getAnswer.text('get answer')
      result.text('YOU LOSE')
      endHideElem.css('opacity', '0.3')
      $('.eyes, .frown').animate({ 'opacity': '1' }, { 'duration': 900 })
      playAgain.text('Try Again')
    }
  }

  function showAnswer () {
    wordCanvas.text(wordPlay)
    $('.word').css('opacity', '1')
  }
}

// playAgain.on('click', function () { playAgain.css({ 'opacity': '0', 'cursor': 'default'}) })
$('#play-again').on('click', replay)
function replay () {
  location.reload()
}
