chrome.runtime.sendMessage ({todo: 'blockContent'})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  let keywordsArray = request.keywords;
  arr = Array.from(document.getElementsByTagName('*'));
  res = []
  arr.forEach(el => {
  if (el.innerText && el.innerText.split(" ").includes(keywordsArray[0])) {
      res.push(el)
  }
  });
  res.forEach(el => el.style.backgroundColor = 'red');
  // console.log(res);
});
