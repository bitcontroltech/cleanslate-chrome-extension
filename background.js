chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OpenPopup") {
    openPopupPerform(message, sender, sendResponse)
  } else if (message.action === "DeleteCookies") {
    deleteCookiesPerform(message, sender, sendResponse)
  }

  return true
})

let openPopupPerform = async (message, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse({})
    } else {
      let tabUrl = tabs[0].url
      sendResponse({ url: tabUrl })
    }
  })
}

let deleteCookiesPerform = async (message, sender, sendResponse) => {
  chrome.cookies.getAll({ domain: message.domain }, (cookies) => {
    for (var cookie of cookies) {
      chrome.cookies.remove({ name: cookie.name, url: `http://${cookie.domain}${cookie.path}`})
      chrome.cookies.remove({ name: cookie.name, url: `https://${cookie.domain}${cookie.path}`})
    }

    sendResponse({ success: true })
  })
}
