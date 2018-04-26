chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

  keywordsArray = ['the'];
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {todo: 'blockContent', keywords: keywordsArray})
  });
})
