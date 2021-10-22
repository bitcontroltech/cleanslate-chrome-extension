chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OpenPopup") {
    openPopupPerform(message, sender, sendResponse)
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
