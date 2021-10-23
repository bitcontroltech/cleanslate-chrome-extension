chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OpenPopup") {
    openPopupPerform(message, sender, sendResponse)
  } else if (message.action === "DeleteCookies") {
    deleteCookiesPerform(message, sender, sendResponse)
  } else if (message.action === "DeleteSessionStorage") {
    deleteSessionStoragePerform(message, sender, sendResponse)
  } else if (message.action === "DeleteLocalStorage") {
    deleteLocalStoragePerform(message, sender, sendResponse)
  } else if (message.action === "Reload") {
    reloadPerform(message, sender, sendResponse)
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

let deleteSessionStoragePerform = async (message, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse({})
    } else {
      let tab = tabs[0]

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          sessionStorage.clear()
        }
      }, () => { sendResponse({ success: true }) })
    }
  })
}

let deleteLocalStoragePerform = async (message, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse({})
    } else {
      let tab = tabs[0]

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          localStorage.clear()
        }
      }, () => { sendResponse({ success: true }) })
    }
  })
}

let reloadPerform = async (message, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, (tabs) => {
    if (tabs.length === 0) {
      sendResponse({})
    } else {
      let tab = tabs[0]

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          location.reload()
        }
      }, () => { sendResponse({ success: true }) })
    }
  })
}
