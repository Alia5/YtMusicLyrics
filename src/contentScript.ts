
const lyricsPreSuffix = `





`;

const clientAccessToken = '-G8w_neYOP-x1vqIf31GpQjeFb8zZ0PKnypsCCBOW4YKMuAChChWY0wFfAEU2k3K';
const baseSearchUrl = 'https://api.genius.com/search?q=';

const addOverlayElement = (): HTMLElement => {
    const playerElement: HTMLElement = document.getElementById('player');
    const overlayElement = document.createElement('div');
    overlayElement.id = 'lyricsOverlay';
    overlayElement.classList.add('scroller', 'scroller-on-hover', 'style-scope', 'ytmusic-player-page');
    overlayElement.style.backgroundColor = '#000000af';
    overlayElement.style.overflowX = 'hidden';
    overlayElement.style.overflowY = 'scroll';
    overlayElement.style.position = 'absolute';
    overlayElement.style.padding = '2%';
    overlayElement.style.width = '96%';
    overlayElement.style.height = '96%';
    overlayElement.style.display = 'block';
    overlayElement.style.top = '0';
    overlayElement.style.left = '0';
    overlayElement.style.textAlign = 'center';
    const mediaControls = playerElement.getElementsByClassName('song-media-controls')[0];
    mediaControls.insertBefore(overlayElement, mediaControls.childNodes[0]);
    // playerElement.insertBefore(overlayElement, document.getElementById('error-wrapper'));

    return overlayElement;
};

const addLyricsElement = (parent: HTMLElement): HTMLElement => {
    const lyricsTextElement = document.createElement('p');
    /*
    font-family: Roboto, Noto Naskh Arabic UI, Arial, sans-serif;
    font-size: var(--ytmusic-title-2_-_font-size);
    line-height: var(--ytmusic-title-2_-_line-height);
    */
    lyricsTextElement.id = 'lyricsText';
    lyricsTextElement.style.fontFamily = 'Roboto, Noto Naskh Arabic UI, Arial, sans-serif';
    lyricsTextElement.style.fontSize = 'var(--ytmusic-title-2_-_font-size)';
    lyricsTextElement.style.lineHeight = 'var(--ytmusic-title-2_-_line-height)';
    lyricsTextElement.style.wordBreak = 'break-all';
   // lyricsTextElement.style.wordWrap = 'break-word';
    lyricsTextElement.style.whiteSpace = 'pre-line';
    lyricsTextElement.style.display = 'block';
    lyricsTextElement.style.height = 'auto';
    lyricsTextElement.style.width = '100%';
    parent.appendChild(lyricsTextElement);

    return lyricsTextElement;
};

const addShowLyricsButton = (): HTMLElement => {
    const topButtons = document.getElementsByClassName('top-row-buttons')[0];
    const minimizeButton = document.getElementsByClassName('player-minimize-button')[0];
    const showHideLyricsButton = minimizeButton.cloneNode(true);

    (<HTMLElement>showHideLyricsButton).classList.remove('player-minimize-button');
    (<HTMLElement>showHideLyricsButton).title = 'Show/Hide Lyrics';
    (<HTMLElement>showHideLyricsButton).setAttribute('aria-label', 'Show/Hide Lyrics');
    const paths = (<HTMLElement>showHideLyricsButton).getElementsByTagName('path');
    topButtons.insertBefore(showHideLyricsButton,minimizeButton);
    // set paths after element is inserted, otherwise they don't apply (o.O)
    paths[1].setAttribute('d', 'M0 0h24v24H0z');
    paths[0].setAttribute('d', 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z');
    return showHideLyricsButton as HTMLElement;
};

const main = () => {

    const overlay = addOverlayElement();
    const lyricsTextElement = addLyricsElement(overlay);
    const lyricsButton = addShowLyricsButton();

    const playerElement: HTMLElement = document.getElementById('player');
    const mediaControls = playerElement.getElementsByClassName('song-media-controls')[0];

    let isShown = false;
    const onLyricsButtonClick = () => {
        // click on the playerlement to make playback continue;
        // otherwise playback pauses when playing
        // this has no noticeable side-effects
        playerElement.click();

        overlay.remove();
        if (isShown) {
            mediaControls.insertBefore(overlay, mediaControls.childNodes[0]);
            overlay.style.zIndex = '0';
        } else {
            playerElement.insertBefore(overlay, document.getElementById('error-wrapper'));
            overlay.style.zIndex = '999';
        }
        isShown = !isShown;
    };
    lyricsButton.onclick = onLyricsButtonClick;

    window.onmousemove = (event: MouseEvent) => {
        if (isShown) {
            if (event.clientY - overlay.getClientRects()[0].top < 60) {
                overlay.style.zIndex = '0';
            } else {
                overlay.style.zIndex = '999';
            }
        }
    };

    const loadLyrics = async (songName: string, artistName: string) => {
        lyricsTextElement.textContent = lyricsPreSuffix + 'Loading...' + lyricsPreSuffix;
        console.log('song changed: ' + artistName + ' - ' + songName);
        lyricsTextElement.innerHTML = 'Loading';
        const response = await (await fetch(baseSearchUrl+artistName+' '+songName, { headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + clientAccessToken
        }})).json();

        try {
            const bestHit = response.response.hits.find((hit: {[key: string]: {[key: string]: string}}) => {
                return songName.toLowerCase().includes(hit.result.title.toLowerCase())
                    || songName.toLowerCase().includes(hit.result.title_with_feature.toLowerCase())
                    || songName.toLowerCase() === hit.result.title.toLowerCase();
            });
            const pathSuffix: string = bestHit.result.path;

            chrome.runtime.sendMessage({contentScriptQuery: 'queryLyrics', pathSuffix: pathSuffix}, (lyrics) => {
                lyricsTextElement.innerHTML = lyricsPreSuffix + lyrics + lyricsPreSuffix;
            });
        } catch (e) {
            console.error(e, e.stack);
            lyricsTextElement.textContent = lyricsPreSuffix +'Error... :(' + lyricsPreSuffix;
        }

    };

    let currentSongName = '';
    let currentArtistName = '';
    const mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            try {
                if (mutation.type === 'attributes'
                && (mutation.target as HTMLElement).tagName.toLowerCase() === 'yt-formatted-string') {
                    const songName = (document.getElementsByClassName('content-info-wrapper')[0]
                                        .children[0] as HTMLSpanElement).innerText;
                    const artistName = (document.getElementsByClassName('content-info-wrapper')[0]
                                        .children[1] as HTMLSpanElement).innerText.split(/\n/g).shift();
                    if (songName !== currentSongName || artistName !== currentArtistName) {
                        currentSongName = songName;
                        currentArtistName = artistName;
                        loadLyrics(songName, artistName);
                        return;
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });
      });

    mutationObserver.observe(document.getElementsByClassName('content-info-wrapper')[0], {
        attributes: true,
        // characterData: true,
        // childList: true,
         subtree: true
        // attributeOldValue: true,
        // characterDataOldValue: true
    });

};

main();
