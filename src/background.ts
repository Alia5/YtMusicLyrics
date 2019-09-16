// chrome.runtime.onMessage.addListener(
//     (request, sender, sendResponse) => {
//       if (request.contentScriptQuery === "queryPrice") {
//         let url = "https://another-site.com/price-query?itemId=" +
//                 encodeURIComponent(request.itemId);
//         fetch(url)
//             .then(response => response.text())
//             .then(text => parsePrice(text))
//             .then(price => sendResponse(price))
//             .catch(error => ...)
//         return true;  // Will respond asynchronously.
//       }
//     });

const htmlDecode = (input: string) => {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.contentScriptQuery === 'queryLyrics') {
        fetch('https://genius.com' + request.pathSuffix).then(async (lyricsResponse) => {
            try {
                const testText = await lyricsResponse.text();
                const testContentText = htmlDecode(testText.match(/<\/script>(\s*)?(\s*)<meta content=\"(.*)\"/)[3]);
                const testLyrics = testContentText.match(/html\":\"<p>(.*?)<\/p>/)[1].replace(/\\n/g, '').replace(/<a(.*?)>/g, '').replace(/<\/a>/g, '').replace(/\\"/g, '"');
                sendResponse(testLyrics);
            } catch (e) {
                sendResponse('Error ... :( \n' + e);
            }
        });
    }
    return true;
});
