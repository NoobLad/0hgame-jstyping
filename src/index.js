import words from './words.json'
import './index.css'


const $gamePlaceholder = document.querySelector('.game-placeholder')
const homeSceneTemplate = document.querySelector('#menu-scene').innerHTML
const gameSceneTemplate = document.querySelector('#game-scene').innerHTML


gotoMenuScene()

function gotoMenuScene() {
    render(homeSceneTemplate)
        .then(() => {
            const button = document.querySelector('#start-game-button')

            button.addEventListener('click', gotoGameScene)
        })
}

let wordApparitionRate = 3000
let gameJustInitialized = false

function gotoGameScene() {
    render(gameSceneTemplate)
        .then(() => {
            gameJustInitialized = true
            addRandomWordAtRandomRate()

            const $typingZone = document.querySelector('.typing-zone')
            const $scoreZone = document.querySelector('.score-zone')

            document.body.addEventListener('keypress', (event) => {
                if (gameJustInitialized) $typingZone.innerText = ''
                gameJustInitialized = false

                const char = event.key || String.fromCharCode(event.keyCode)

                const words = [ ...document.querySelectorAll('.word') ]
                const startWithWord = words.find(word => word.innerText.startsWith($typingZone.innerText + char))

                if (startWithWord) {

                    $typingZone.innerText += char


                    const exactWord = words.find(word => word.innerText === $typingZone.innerText)

                    if (exactWord) {
                        exactWord.remove()
                        $typingZone.innerText = ''
                        $scoreZone.innerText = parseInt($scoreZone.innerText) + 1000;
                    }
                }

            })
        })
}

function render(html) {
    return new Promise((resolve) => {
        $gamePlaceholder.innerHTML = html

        requestAnimationFrame(resolve)
    })
}

function getRandomWord() {
    const indice = Math.floor(Math.random() * words.length)
    return words[ indice ]
}

function addWord() {
    const word = getRandomWord()
    const $word = document.createElement('div')
    $word.classList.add('word')
    $word.innerText = word
    const $zone = document.querySelector('.enemy-zone')

    $zone.appendChild($word)
}

function addRandomWordAtRandomRate() {
    addWord()

    setTimeout(addRandomWordAtRandomRate, 300 + Math.random() * wordApparitionRate)
}