let data = {}

chrome.runtime.sendMessage({ action: "OpenPopup" }, (response) => {
  let url = new URL(response.url)
  let domain = url.hostname

  let domainLabel = window.document.getElementById("detect__domain")
  data.domain = domain
  domainLabel.innerHTML = domain
})

let buttonDeleteCookies = document.querySelector("#button__delete_cookies")
let buttonDeleteSessionStorage = document.querySelector("#button__delete_session_storage")
let buttonDeleteLocalStorage = document.querySelector("#button__delete_local_storage")
let buttonReload = document.querySelector("#button__reload")

buttonDeleteCookies.addEventListener("click", event => {
  let button = event.target
  let originalText = button.text

  button.classList.add("processing")
  button.innerHTML = "Processing..."

  chrome.runtime.sendMessage({ action: "DeleteCookies", domain:  data.domain }, (response) => {
    button.innerHTML = originalText
    button.classList.remove("processing")
  })
})

buttonDeleteSessionStorage.addEventListener("click", event => {
  let button = event.target
  let originalText = button.text

  button.classList.add("processing")
  button.innerHTML = "Processing..."

  chrome.runtime.sendMessage({ action: "DeleteSessionStorage" }, () => {
    button.innerHTML = originalText
    button.classList.remove("processing")
  })
})

buttonDeleteLocalStorage.addEventListener("click", event => {
  let button = event.target
  let originalText = button.text

  button.classList.add("processing")
  button.innerHTML = "Processing..."

  chrome.runtime.sendMessage({ action: "DeleteLocalStorage" }, () => {
    button.innerHTML = originalText
    button.classList.remove("processing")
  })
})

buttonReload.addEventListener("click", event => {
  let button = event.target
  let originalText = button.text

  button.classList.add("processing")
  button.innerHTML = "Processing..."

  chrome.runtime.sendMessage({ action: "Reload" }, () => {
    button.innerHTML = originalText
    button.classList.remove("processing")
  })
})
