# 🇯🇵 Japan Rising — Interactive History Website

A polished, animated, responsive single-page website about:

> **Japan’s Emergence as a World Power and Its Impact on International Relations**

The content is based on the supplied history notes and is presented as an interactive learning experience.

## ✨ Features

- Cinematic hero section
- Scroll reveal animations
- Reading progress bar
- Dark/light mode with localStorage
- Interactive Western-model comparison
- Clickable historical timeline
- Animated Battle of Tsushima visual
- Transformation flow from isolation → world power
- Interactive 6-question quiz
- Background theme music toggle (plays/loops an included MP3)
- Fully responsive mobile layout
- No framework required
- GitHub Pages ready

## 📁 Structure

```text
japan-world-power/
├── index.html
├── styles.css
├── script.js
├── wano-theme.mp3
└── README.md
```

Note: `wano-theme.mp3` is the track behind the "Sound" button on the hero. Swap in your own file (keep the name `wano-theme.mp3`, or update the `src` on the `<audio>` tag in `index.html`) if you'd rather use different music.

## 🚀 Run locally

Just open `index.html` in a browser.

For a local server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root`.
6. Save.

Your website will become available through GitHub Pages.

## 🎨 Customization

Most visual variables are at the top of `styles.css`:

```css
:root {
  --bg: #0a0b0e;
  --surface: #111318;
  --red: #e33d43;
  --gold: #d7b16c;
}
```

Change those values to create a different visual identity.

## 📚 Content scope

The website covers:
- Japan before the Meiji Restoration
- Tokugawa shogunate and sakoku
- Perry's arrival in 1853
- Meiji Restoration of 1868
- Fukoku kyōhei
- State-led industrialization
- Western technology and institutions
- Education
- Military modernization
- Zaibatsu
- Resources and imperial expansion
- First Sino-Japanese War
- Anglo-Japanese Alliance
- Russo-Japanese War and Battle of Tsushima
- Annexation of Korea
- Impact on China, Russia, Britain, Asian nationalism and the United States
- Militarism and the changing balance of power
