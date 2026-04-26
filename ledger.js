(function () {
  'use strict';

  const NEWS_JSON = 'newsroom.json';

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  function safeUrl(url) {
    if (typeof url !== 'string') return '';
    const trimmed = url.trim();
    return /^https?:\/\//i.test(trimmed) ? trimmed : '';
  }

  async function fetchNewsroom() {
    try {
      const res = await fetch(NEWS_JSON);
      if (!res.ok) throw new Error('Unable to load newsroom data');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('[Evidence Desk] Data load failed:', err);
      return [];
    }
  }

  function formatDate(isoDate) {
    try {
      const d = new Date(isoDate + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (_e) {
      return isoDate;
    }
  }

  async function renderHomepageFeed() {
    const grid = document.getElementById('evidence-grid');
    if (!grid) return;

    const stories = await fetchNewsroom();
    if (!stories.length) {
      grid.innerHTML = '<p class="ed-empty">No reports published yet.</p>';
      return;
    }

    const top5 = stories.slice(0, 5);
    grid.innerHTML = top5.map(function (story, index) {
      const image = safeUrl(story.image) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=80';
      const cardClass = index === 0 ? 'ed-card ed-card-main' : 'ed-card ed-card-small';
      return (
        '<article class="' + cardClass + '">' +
          '<div class="ed-card-image" style="background-image:url(' + esc(image) + ');"></div>' +
          '<div class="ed-card-content">' +
            '<p class="ed-card-kicker">' + esc(story.category) + '</p>' +
            '<h3>' + esc(story.headline) + '</h3>' +
            '<p class="ed-card-deck">' + esc(story.deck) + '</p>' +
            '<p class="ed-card-meta"><span>' + esc(story.status || 'Report') + '</span> <span>' + esc(formatDate(story.datePublished)) + '</span></p>' +
            '<a class="ed-card-btn" href="ledger-post.html?id=' + encodeURIComponent(story.id) + '">Read Full Report</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  async function renderTrendingDrawer() {
    const body = document.getElementById('ed-drawer-body');
    const trigger = document.getElementById('ed-drawer-trigger') || document.getElementById('wl-drawer-trigger');
    const drawer = document.getElementById('ed-drawer') || document.getElementById('wl-drawer');
    const backdrop = document.getElementById('ed-drawer-backdrop') || document.getElementById('wl-drawer-backdrop');
    const closeBtn = document.getElementById('ed-drawer-close') || document.getElementById('wl-drawer-close');

    if (!trigger || !drawer || !backdrop) return;

    function open() {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('active')) close();
    });

    if (!body) return;
    const stories = await fetchNewsroom();
    const trending = stories.slice(0, 5);

    body.innerHTML = trending.map(function (story) {
      return (
        '<a class="ed-trending-item" href="ledger-post.html?id=' + encodeURIComponent(story.id) + '">' +
          '<span class="ed-trending-title">' + esc(story.headline) + '</span>' +
          '<span class="ed-trending-time">' + esc(formatDate(story.datePublished)) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderGallery(gallery) {
    if (!Array.isArray(gallery) || !gallery.length) {
      return '<div class="ed-gallery-placeholder">High-resolution gallery placeholder</div>';
    }

    return (
      '<div class="ed-gallery-grid">' +
      gallery.slice(0, 4).map(function (img) {
        const safe = safeUrl(img);
        if (!safe) return '';
        return '<div class="ed-gallery-item" style="background-image:url(' + esc(safe) + ');"></div>';
      }).join('') +
      '</div>'
    );
  }

  function renderVideo(videoId) {
    if (!videoId) {
      return '<div class="ed-video-placeholder">YouTube embed placeholder</div>';
    }

    const src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId);
    return '<div class="ed-video-wrap"><iframe src="' + src + '" title="Video briefing" loading="lazy" allowfullscreen></iframe></div>';
  }

  async function renderFullReport() {
    const container = document.getElementById('evidence-report');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      container.innerHTML = '<p class="ed-empty">Report not found.</p>';
      return;
    }

    const stories = await fetchNewsroom();
    const story = stories.find(function (s) { return s.id === id; });

    if (!story) {
      container.innerHTML = '<p class="ed-empty">Report not found.</p>';
      return;
    }

    const hero = safeUrl(story.image) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1800&q=80';

    document.title = esc(story.headline) + ' | The Evidence Desk';

    container.innerHTML =
      '<article class="ed-report">' +
        '<header class="ed-report-hero" style="background-image:url(' + esc(hero) + ');">' +
          '<div class="ed-report-overlay">' +
            '<p class="ed-report-kicker">' + esc(story.category) + ' | ' + esc(formatDate(story.datePublished)) + '</p>' +
            '<h1>' + esc(story.headline) + '</h1>' +
            '<p class="ed-report-verse">"' + esc(story.bibleVerse) + '"</p>' +
            '<p class="ed-report-ref">' + esc(story.bibleReference) + '</p>' +
          '</div>' +
        '</header>' +

        '<div class="ed-report-body">' +
          '<h3>1. The Directive</h3>' +
          '<p>' + esc(story.directive) + '</p>' +

          '<h3>2. The Brief</h3>' +
          String(story.brief || '').split('\n\n').map(function (p) {
            return '<p>' + esc(p) + '</p>';
          }).join('') +

          '<h3>3. The Undercurrent</h3>' +
          '<p>' + esc(story.undercurrent) + '</p>' +

          '<h3>4. The Logic</h3>' +
          '<p>' + esc(story.logic) + '</p>' +

          renderVideo(story.youtubeId) +

          '<h3>5. The Outlook</h3>' +
          '<p>' + esc(story.outlook) + '</p>' +

          renderGallery(story.gallery) +
        '</div>' +
      '</article>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHomepageFeed();
    renderTrendingDrawer();
    renderFullReport();
  });
})();
