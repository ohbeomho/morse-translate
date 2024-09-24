// letter_morse -> key is letter
// morse_letter -> key is morse code
import letter_morse from "./morse.js"
const morse_letter = {}

for (let key in letter_morse) morse_letter[letter_morse[key]] = key
console.log(morse_letter)

const content = document.getElementById("content"),
  morse_preview = document.getElementById("morse-preview"),
  letter_preview = document.getElementById("letter-preview")

let currMorse = ""

let downTime, inputTimeout
/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeydown = (e) => {
  if (e.key === "Backspace" && content.innerText.length)
    content.innerText = content.innerText.substring(
      0,
      content.innerText.length - 1,
    )
  else if (e.key == " " && !e.repeat) {
    downTime = performance.now()
    clearTimeout(inputTimeout)
  }
}

/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeyup = (e) => {
  if (e.key !== " ") return

  const currTime = performance.now()
  if (currTime - downTime < 200) morse_preview.innerText += "."
  else morse_preview.innerText += "-"

  const letter = morse_letter[morse_preview.innerText]
  letter_preview.innerText = letter

  inputTimeout = setTimeout(() => {
    const letter = morse_letter[morse_preview.innerText]
    morse_preview.innerText = ""
    letter_preview.innerText = ""
    if (!letter) return

    content.innerText += letter
  }, 700)
}
