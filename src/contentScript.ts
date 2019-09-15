
const debugText = `
start

fghjkdhgjkdfhgjkdfhgoiurifihfihifoghifoihoifjoirtu9ourtoiftzigfhiö
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg


fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg

fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg


fghjkdhgjkdfhgjkdfhg
jkdjfghjkdfhgdfg
jkgdfhgjkdf
jdgfkhkdfjg
ndfgjkdfjkg


done
`;

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
    lyricsTextElement.textContent = debugText;
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
    paths[0].setAttribute('d', 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z');
    paths[1].setAttribute('d', 'M0 0h24v24H0z');

    topButtons.insertBefore(showHideLyricsButton,minimizeButton);
    return showHideLyricsButton as HTMLElement;
};

const main = () => {
    const overlay = addOverlayElement();
    const lyricsTextElement = addLyricsElement(overlay);
    setTimeout(() => {
        const lyricsButton = addShowLyricsButton();
    }, 5000);
};

main();
