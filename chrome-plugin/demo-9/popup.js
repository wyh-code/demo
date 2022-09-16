
let key
btn.onclick = () => {
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ', result);
    view.innerText = result.key;
    key = result.key;
  });
}

change.onclick = () => {
  chrome.storage.sync.set({key: key + 1}, function(result) {
    console.log('Value currently is ', result);
  });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log("onChanged", changes, namespace)
});