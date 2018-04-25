document.addEventListener('DOMContentLoaded', () => {

  displayInList('urls');
  displayInList('keywords');


  let timeInput = document.getElementById('set-timer');
  timeInput.onclick = () => saveTime();

  let urlSubmit = document.getElementById('add-url-block');
  urlSubmit.onclick = () => {
    let urlInput = document.getElementById('block-url-input');
    add('urls',urlInput.value);
    urlInput.value = "";
  };

  let keywordSubmit = document.getElementById('add-word-block');
  keywordSubmit.onclick = () => {
    let keywordInput = document.getElementById('block-word-input');
    add('keywords', keywordInput.value);
    keywordInput.value = "";
  };

});

function saveTime(){
  const time = document.getElementById('time').value;

  if(time !== "00:00"){
    chrome.storage.sync.set({"time": time}, () => {
      document.getElementById('time').innerHTML = "";
    });
  }
}


export function add(type, content){
  chrome.storage.sync.get([type], result => {
    let arr = result[type] ? result[type]:[];
    if (!arr.includes(content)){
      arr.push(content);
      console.log(arr);
      chrome.storage.sync.set({[type]: arr}, addToUl(type, content));
    } else {
      console.log(`${content} already in storage`);
    }
  });
}

function remove(type, content){
  chrome.storage.sync.get([type], result => {
    let arr = result[type] ? result[type]:[];
    let idx = arr.indexOf(content);
    if (idx !== -1){
      arr.splice(idx,1);
      chrome.storage.sync.set({[type]: arr}, deleteFromUl(type, idx));
    } else {
      console.log(`${content} is not in storage`);
    }
  });
}

function displayInList(type) {
    chrome.storage.sync.get([type], result => {
      if (type === 'urls'){
        let ulBlock = document.getElementById('ul-block-url');
        let li;
        result[type].forEach( url => {
          li = document.createElement('li');
          li.innerHTML = url;
          ulBlock.appendChild(li);
        });
      }
      else if (type === 'keywords') {
        let ulBlock = document.getElementById('ul-block-word');
        let li;
        result[type].forEach( word => {
          li = document.createElement('li');
          li.innerHTML = word;
          ulBlock.appendChild(li);
        });
      }
    });
}

function addToUl(type, content) {
  let ul = type === 'urls'? document.getElementById('ul-block-url') : document.getElementById('ul-block-word');
  let li = document.createElement('li');

  li.innerHTML = content;
  ul.appendChild(li);

}

function deleteFromUl(type, idx) {
  let ul = type === 'urls'? document.getElementById('ul-block-url') : document.getElementById('ul-block-word');
  ul.removeChild(ul.childNodes[idx+1]);

}
