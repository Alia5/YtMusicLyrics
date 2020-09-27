const clientAccessToken = '-G8w_neYOP-x1vqIf31GpQjeFb8zZ0PKnypsCCBOW4YKMuAChChWY0wFfAEU2k3K';
const baseSearchUrl = 'https://api.genius.com/search?q=';

const htmlDecode = (input: string) => {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

function strip(html: string){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }

const queryLyrics = async (request: any, sender: any, sendResponse: (arg: any) => void) => {
    const { artistName, songName } = request;
    const response = await (await fetch(baseSearchUrl+artistName+' '+songName, { headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + clientAccessToken
    }})).json();

    const bestHit = response.response.hits.find((hit: {[key: string]: {[key: string]: string}}) => {
        return songName.toLowerCase().includes(hit?.result?.title?.toLowerCase())
            || songName.toLowerCase().includes(hit?.result?.title_with_feature?.toLowerCase())
            || songName.toLowerCase() === hit?.result?.title.toLowerCase();
    });
    try {
        const pathSuffix: string = bestHit.result.path;

        fetch('https://genius.com' + pathSuffix).then(async (lyricsResponse) => {
            try {
                const testText = await lyricsResponse.text();
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(testText, 'text/html');
                const lyrContainer = [ ...htmlDoc.querySelectorAll("[class^=Lyrics__Container]")];
                const lyrContainer2 = [ ...htmlDoc.querySelectorAll("[class^=lyrics]")];
                const lyrics = (lyrContainer.length >= 1 ? lyrContainer : lyrContainer2).map((c) => strip(c.innerHTML)).join("\n");
                sendResponse(lyrics);
            } catch (e) {
                sendResponse('Error ... :( \n' + e);
            }
        });
    } catch (e) {
        sendResponse('Error ... :( \n' + e);
    }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.contentScriptQuery === 'queryLyrics') {
        queryLyrics(request, sender, sendResponse);
        return true;
    }
});
