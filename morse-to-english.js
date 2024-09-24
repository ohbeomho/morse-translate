// letter_morse -> key is letter
// morse_letter -> key is morse code
import letter_morse from "./morse.js"
const morse_letter = {}

for (let key in letter_morse) morse_letter[letter_morse[key]] = key
console.log(morse_letter)

const content = document.getElementById("content"),
  content_morse = document.getElementById("content-morse"),
  morse_preview = document.getElementById("morse-preview"),
  letter_preview = document.getElementById("letter-preview")

const morse_content = []

let downTime, inputTimeout
/**
 *
 * @param {KeyboardEvent} e
 */
window.onkeydown = (e) => {
  if (e.key === "Backspace" && content.innerHTML.length) {
    content.innerHTML = content.innerHTML.substring(0, content.innerHTML.length - 1) || "&nbsp;"
    morse_content.pop()
    content_morse.innerHTML = morse_content.join("&nbsp;") || "&nbsp;"
  } else if (e.key === " " && !e.repeat) {
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

  if (morse_preview.innerHTML === "&nbsp;") morse_preview.innerHTML = ""

  const currTime = performance.now()
  // TODO: 누르는 시간, 입력까지 기다리는 시간 설정 가능하게 만들기
  if (currTime - downTime < 200) morse_preview.innerHTML += "."
  else morse_preview.innerHTML += "-"

  const letter = morse_letter[morse_preview.innerHTML]
  if (letter_preview.innerHTML === "&nbsp;") letter_preview.innerHTML = ""
  letter_preview.innerHTML = letter || "&nbsp;"

  inputTimeout = setTimeout(() => {
    const morse = morse_preview.innerHTML
    const letter = morse_letter[morse]
    morse_preview.innerHTML = "&nbsp;"
    letter_preview.innerHTML = "&nbsp;"
    if (!letter) return

    if (content.innerHTML === "&nbsp;") content.innerHTML = ""
    content.innerHTML += letter
    morse_content.push(morse)
    content_morse.innerHTML = morse_content.join("&nbsp;")
  }, 700)
}
