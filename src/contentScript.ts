
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

const main = () => {
    const overlay = addOverlayElement();
    const lyricsTextElement = addLyricsElement(overlay);
};

main();
