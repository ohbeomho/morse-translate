// TODO: Also make english to morse code translator

// letter_morse -> key is letter
// morse_letter -> key is morse code
import letter_morse from "./morse.js"
const morse_letter = {}

for (let key in letter_morse) morse_letter[letter_morse[key]] = key
console.log(morse_letter)

const content = document.getElementById("content"),
  morse_preview = document.getElementById("morse-preview"),
  letter_preview = document.getElementById("letter-preview")

let downTime, inputTimeout
/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeydown = (e) => {
  if (e.key === "Backspace" && content.innerHTML.length) content.innerHTML = content.innerHTML.substring(0, content.innerHTML.length - 1)
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
  if (currTime - downTime < 200) morse_preview.innerHTML += "."
  else morse_preview.innerHTML += "-"

  if (morse_preview.innerHTML.startsWith("&nbsp;")) morse_preview.innerHTML = morse_preview.innerHTML.substring(6)

  const letter = morse_letter[morse_preview.innerHTML]
  letter_preview.innerHTML = letter || "&nbsp;"
  if (letter_preview.innerHTML.startsWith("&nbsp;")) letter_preview.innerHTML = letter_preview.innerHTML.substring(6)

  inputTimeout = setTimeout(() => {
    const letter = morse_letter[morse_preview.innerHTML]
    morse_preview.innerHTML = "&nbsp;"
    letter_preview.innerHTML = "&nbsp;"
    if (!letter) return

    content.innerHTML += letter
  }, 700)
}
