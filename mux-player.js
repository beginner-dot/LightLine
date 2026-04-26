// mux-player.js
// Utility to create stylish Mux players with custom branding and emojis

/**
 * Creates a Mux player element with a glassmorphic control bar, custom
 * colors and emojis, and returns (or appends) it to the supplied container.
 *
 * @param {string} playbackId - Mux playback ID
 * @param {string} brandColor - CSS color used for accents/glow
 * @param {string} playEmoji - Emoji/string to use for the play button
 * @param {string} pauseEmoji - Emoji/string to use for the pause button
 * @param {HTMLElement} [container=document.body] - Where to append the player
 * @returns {HTMLElement} The generated <mux-player> element
 */
function createMuxExperience(playbackId, brandColor, playEmoji, pauseEmoji, container = document.body) {
    // build the player element
    const player = document.createElement('mux-player');
    player.setAttribute('playback-id', playbackId);
    player.setAttribute('metadata-video-title', 'Powered by createMuxExperience');
    // expose accent color for internal styling and seek bar
    player.style.setProperty('--accent-color', brandColor);
    player.style.borderRadius = '24px';
    // 30% opacity shadow (hex opacity = 4D)
    player.style.boxShadow = `0 8px 20px ${hexWithOpacity(brandColor, 0.3)}`;
    player.style.transition = 'box-shadow 0.3s ease, filter 0.3s ease';

    // add slots for custom emojis/icons
    const playBtn = document.createElement('div');
    playBtn.setAttribute('slot', 'play-button');
    playBtn.innerText = playEmoji;

    const pauseBtn = document.createElement('div');
    pauseBtn.setAttribute('slot', 'pause-button');
    pauseBtn.innerText = pauseEmoji;

    // optional: backward seek slot example (if needed by new prompt)
    const seekBackBtn = document.createElement('div');
    seekBackBtn.setAttribute('slot', 'seek-backward-button');
    seekBackBtn.innerText = playEmoji; // reuse play emoji for demo

    player.appendChild(playBtn);
    player.appendChild(pauseBtn);
    player.appendChild(seekBackBtn);

    // attach hover effect for brighter glow
    player.addEventListener('mouseenter', () => {
        player.style.boxShadow = `0 12px 28px ${hexWithOpacity(brandColor, 0.5)}`;
        player.style.filter = `brightness(1.05)`;
    });
    player.addEventListener('mouseleave', () => {
        player.style.boxShadow = `0 8px 20px ${hexWithOpacity(brandColor, 0.3)}`;
        player.style.filter = ``;
    });

    // glassmorphism control bar via global CSS (injected once)
    ensureMuxGlassStyles();

    // append to container
    container.appendChild(player);
    return player;
}

// helper: convert any valid color to RGBA string with given opacity
function hexWithOpacity(color, opacity) {
    // crude: assume hex format #RRGGBB or rgb()/rgba()
    if (color.startsWith('#')) {
        let hex = color.slice(1);
        if (hex.length === 3) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r},${g},${b},${opacity})`;
    }
    // fallback: return color as-is (opacity may not apply)
    return color;
}

// inject glassmorphism styles if not already present
let _muxGlassStylesInjected = false;
function ensureMuxGlassStyles() {
    if (_muxGlassStylesInjected) return;
    _muxGlassStylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
/* Glassmorphic control bar, no purple highlight except play/pause and loading */
mux-player::part(control) {
    backdrop-filter: blur(12px) saturate(180%);
    background: rgba(30,30,40,0.18);
    border-radius: 24px;
    border: 1.5px solid rgba(255,255,255,0.08);
    box-shadow: 0 2px 12px 0 rgba(80,80,120,0.10);
}

/* Seek bar buffer and progress use accent (purple), rest is glass */
mux-player::part(seek-bar) {
    background: rgba(255,255,255,0.10);
}
mux-player::part(seek-bar-filled) {
    background: var(--accent-color, #a259ff);
}
mux-player::part(seek-bar-buffer) {
    background: var(--accent-color, #a259ff);
    opacity: 0.5;
}

/* Play/Pause button uses accent color, rest are glass/white */
mux-player::part(play-button),
mux-player::part(pause-button) {
    color: var(--accent-color, #a259ff);
    background: rgba(255,255,255,0.18);
    border-radius: 50%;
    box-shadow: 0 2px 8px 0 rgba(162,89,255,0.10);
}
mux-player::part(control-button) {
    color: #fff;
    background: rgba(255,255,255,0.10);
    border-radius: 50%;
}

/* Remove purple highlight from all other controls */
mux-player::part(volume-range),
mux-player::part(time-display),
mux-player::part(settings-menu),
mux-player::part(pip-button),
mux-player::part(fullscreen-button) {
    color: #fff;
    background: rgba(255,255,255,0.10);
    box-shadow: none !important;
    border: none !important;
}
`;
    document.head.appendChild(style);
}

// expose for external use
window.createMuxExperience = createMuxExperience;
