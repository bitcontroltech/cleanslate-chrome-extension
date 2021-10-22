chrome.runtime.sendMessage({ action: "OpenPopup" }, (response) => {
  let url = new URL(response.url)
  let domain = url.hostname

  let domainLabel = window.document.getElementById("detect__domain")
  domainLabel.innerHTML = domain
})
