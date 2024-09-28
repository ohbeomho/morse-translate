// letter_morse -> key is letter
// morse_letter -> key is morse code
import letter_morse from "./morse.js"
const morse_letter = {}

for (let key in letter_morse) morse_letter[letter_morse[key]] = key

const content = document.getElementById("content"),
  content_morse = document.getElementById("content-morse"),
  morse_preview = document.getElementById("morse-preview"),
  letter_preview = document.getElementById("letter-preview"),
  morse_read = document.getElementById("morse-read")
const morse_toggle = document.getElementById("morse-input-toggle"),
  morse_input = document.getElementById("morse-input"),
  input_feedback = document.getElementById("input-feedback")

const morse_content = []

function read_morse() {
  const synth = new Tone.Synth().toDestination()
  let now = Tone.now()

  for (let morse of morse_content) {
    for (let char of morse) {
      const isShort = char === "."
      synth.triggerAttackRelease(400, isShort ? 0.15 : 0.4, now)
      now += isShort ? 0.2 : 0.4
    }

    now += 0.3
  }
}

/**
 * @param {InputEvent} e
 */
content.oninput = () => {
  morse_content.length = 0
  for (let char of content.value) morse_content.push(letter_morse[char.toUpperCase()])
  content_morse.value = morse_content.filter((x) => x).join(" ")
}

/**
 * @param {InputEvent} e
 */
content_morse.oninput = () => {
  content.value = ""
  morse_content.length = 0

  for (let morse of content_morse.value.split(" ")) {
    if (!morse || !morse_letter[morse]) continue

    content.value += morse_letter[morse]
    morse_content.push(morse)
  }
}

let isMorseInput = false
let downTime, inputTimeout
/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeydown = (e) => {
  if (e.key !== " " || e.repeat || !isMorseInput || [content, content_morse].includes(e.target)) return

  downTime = performance.now()
  clearTimeout(inputTimeout)
  input_feedback.classList.add("active")
  e.preventDefault()
}

/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeyup = (e) => {
  if (!isMorseInput || e.key !== " ") return
  if (morse_preview.innerHTML === "&nbsp;") morse_preview.innerHTML = ""

  const currTime = performance.now()
  // TODO: 누르는 시간, 입력까지 기다리는 시간 설정 가능하게 만들기
  if (currTime - downTime < 200) morse_preview.innerHTML += "."
  else morse_preview.innerHTML += "-"

  const letter = morse_letter[morse_preview.innerHTML]
  if (letter_preview.innerHTML === "&nbsp;") letter_preview.innerHTML = ""
  letter_preview.innerHTML = letter || "&nbsp;"

  input_feedback.classList.remove("active")

  inputTimeout = setTimeout(() => {
    const morse = morse_preview.innerHTML
    const letter = morse_letter[morse]
    morse_preview.innerHTML = "&nbsp;"
    letter_preview.innerHTML = "&nbsp;"
    if (!letter) return

    content.value += letter
    morse_content.push(morse)
    content_morse.value = morse_content.join(" ")
  }, 700)

  e.preventDefault()
}

morse_toggle.onclick = () => {
  morse_toggle.innerText = isMorseInput ? "Enable Morse Input" : "Disable Morse Input"
  morse_input.style.display = isMorseInput ? "none" : "flex"
  isMorseInput = !isMorseInput
}

morse_read.onclick = read_morse
