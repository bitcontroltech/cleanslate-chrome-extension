let data = {}

chrome.runtime.sendMessage({ action: "OpenPopup" }, (response) => {
  let url = new URL(response.url)
  let domain = url.hostname

  let domainLabel = window.document.getElementById("detect__domain")
  data.domain = domain
  domainLabel.innerHTML = domain
})

let buttonDeleteCookies = document.querySelector("#button__delete_cookies")

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
