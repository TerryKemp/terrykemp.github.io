/* make letters a->z first, then create letters functions.
make variables and arrays for movies, songs, books.
category, category list, player, array, canvas, then event for clicks. (use what you read about jquery)
creat your word function to make words
create category for start, play again, get results/show answer
make a holder for array to split and create words.
make function to start game and create variables for letters, picked letters,results, answer,  show hidden manright and wrong picks etc.
creat clicks for letters and selections. make work, pick letters, show picked
make letters already picked fade
function to check the letter that was picked for right or wrong
function to reveal letters on board or under base.
functiuon to show man as wrong letters are picked
function to show answer after its over.
function to play again

/* why are you all over the place, organize your code and make it look neater
check your functions to make sure they are good and work. once they work make them pretty
stop second guessing how it is. */

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function createLetters () {
  for (var i = 0; i < letters.length; i++) {
    $('<div></div>').attr({
      'class': 'alph',
      'id': letters[i]
    }).text(letters[i]).appendTo('.alph-wrapper')
  }
}
createLetters()
/* topics choices */

var movies = ['die hard', 'the notebook', 'cat in the hat', 'the grinch who stole christmas']
var songs = ['final countdown', 'the show must go on', 'we will rock you', 'banana pancakes']
var books = ['the dove', 'hitchhikers guide to the galaxy', 'zathura', 'fiddler on the roof']

var category = $('.category')
var categoryList
var player = ' '
var array = null
var canvas = $('.word')

/* action buttons */ 
category.on('click', startGame)
category.on('click', makeWord)
category.on('click', holder)

/* creating word */
function makeWord () {
  canvas.html(' ')
  category.css('text-decoration', 'none')
  $(this).css('text-decoration', 'underline')
  categoryList = $(this).attr('id')
  if (categoryList === 'movies') {
    player = movies[Math.floor(Math.random() * movies.length)]
  } else if (categoryList === 'songs') {
    player = songs[Math.floor(Math.random() * songs.length)]
  } else if (categoryList === 'books') {
    player = books[Math.floor(Math.random() * books.length)]
  }
}

function holder () {
  array = player.split('')
  canvas.html('')
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ' ') {
      $('.word').append(' ')
    } else $('.word').append('_')
  }
}

function startGame () {
  var letter = $('.alph')
  var letterPick
  var allPicks = []
  var right = []
  var wrong = []
  var correct
  var displayWord
  var getAnswer = $('#answer')
  var displayHidden = $('h2, .word, ul, footer, h1, aside, .word')
  var result = $('#result')
  var playAgain = $('#play-again')

  letter.on('click', letterSelect)
  letter.on('click', letterUsed)
  letter.on('click', list)
  letter.on('click', checkPick)
  letter.on('click', reveal)
  letter.on('click', showMan)

  /* shows letter already picked */
  getAnswer.on('click', showAnswer)
  getAnswer.on('click', function () {
    getAnswer.css({
      'opacity': '0',
      'cursor': 'default'
    })
  })

  function letterUsed () {
    $(this).css({
      'opacity': '0.2',
      'cursor': 'auto'
    })
  }

  function letterSelect () {
    letterPick = $(this).attr('id')
  }

  function list () {
    allPicks.push(letterPick)
  }

  /* check right or wrong */
  function checkPick () {
    if (array.includes(letterPick)) {
      right.push(letterPick)
    } else {
      wrong.push(letterPick)
      $('.stand-base').text(wrong.join(''))
    }
  }

  /* show letters */

  function reveal () {
    correct = array.map((letter) => {
      if (allPicks.includes(letter)) {
        return letter
      } else if (letter === ' ') {
        return ' '
      } else return '_'
    })
    displayWord = correct.join('')
    canvas.text(displayWord)

    if (displayWord === player) {
      displayHidden.css('opacity', '0.5')
      result.text('YOU WIN!')
      playAgain.text('play again')
    }
  }
  /* show man on wrong answer */
  function showMan () {
    if (wrong.length === 1) {
      $('.head').removeClass('hidden')
    } else if (wrong.length === 2) {
      $('.torso').removeClass('hidden')
    } else if (wrong.length === 3) {
      $('.left-arm').removeClass('hidden')
    } else if (wrong.length === 4) {
      $('.right-arm').removeClass('hidden')
    } else if (wrong.length === 5) {
      $('.left-leg').removeClass('hidden')
    } else if (wrong.length === 6) {
      $('.right-leg').removeClass('hidden')
      getAnswer.text('get answer')
      result.text('YOU LOSE')
      displayHidden.css('opacity', '0.3')
      $('.eyes, .frown').animate({
        'opacity': '1'
      }, {
        'duration': 900
      })
      playAgain.text('Try Again')
    }
  }

  function showAnswer () {
    canvas.text(player)
    $('.word').css('opacity', '1')
  }
}

$('#play-again').on('click', replay)

function replay () {
  location.reload()
}
