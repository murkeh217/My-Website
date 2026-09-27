const theme = `<style data-archive-dark-theme>
html, body { color-scheme: dark !important; background-color: #11130f !important; background-image: none !important; color: #edf0e5 !important; }
body { min-height: 100vh; }
body a { color: #c5e866; }
</style>
<script data-archive-dark-theme>
(() => {
  const lightSurface = '#1a1d17';
  const lightText = '#edf0e5';

  function colorValues(color) {
    const match = color.match(/rgba?\\(([^)]+)\\)/i);
    if (!match) return null;
    const parts = match[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number);
    if (parts.length < 3 || parts.some(Number.isNaN)) return null;
    return { channels: parts.slice(0, 3), alpha: parts[3] ?? 1 };
  }

  function luminance([r, g, b]) {
    const channel = (value) => {
      const normalized = value / 255;
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  }

  function applyDarkTheme() {
    if (!document.body) return;
    for (const element of document.body.querySelectorAll('*')) {
      if (['IMG', 'VIDEO', 'CANVAS', 'SVG', 'IFRAME'].includes(element.tagName)) continue;
      const styles = getComputedStyle(element);
      const background = colorValues(styles.backgroundColor);
      if (background && background.alpha > 0.02) {
        const [r, g, b] = background.channels;
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);
        if (luminance(background.channels) > 0.68 && chroma < 42) {
          element.style.setProperty('background-color', lightSurface, 'important');
          if (styles.backgroundImage.includes('gradient')) element.style.setProperty('background-image', 'none', 'important');
        }
      }

      const hasText = [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (!hasText) continue;
      const foreground = colorValues(styles.color);
      if (foreground && luminance(foreground.channels) < 0.16) {
        element.style.setProperty('color', lightText, 'important');
      }
    }
  }

  function start() {
    applyDarkTheme();
    const observer = new MutationObserver(applyDarkTheme);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    window.addEventListener('load', applyDarkTheme, { once: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
</script>`;

export function applyArchiveDarkTheme(html) {
  if (html.includes('data-archive-dark-theme')) return html;
  const headClose = new RegExp('</head\\s*>', 'i');
  const bodyOpen = new RegExp('<body\\b', 'i');
  return headClose.test(html)
    ? html.replace(headClose, `${theme}</head>`)
    : html.replace(bodyOpen, `${theme}<body`);
}
