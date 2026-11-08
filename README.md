# MOFIXA — Laptop & PC Repair Shop Website

Responsive static website for a Lebanon-based laptop and PC repair + sales shop.

**Live path:** open `index.html` locally, or enable GitHub Pages on this repo (Settings → Pages → Deploy from `main` / root).

## Features

- Full-bleed hero slider with repair / shop CTAs
- Services, about, and contact sections
- Product catalog with search, category filter, and sorting
- Product detail pages with stock-aware add-to-cart
- Cart with quantity controls and **Order via WhatsApp**
- Contact form that opens WhatsApp with a prefilled message
- Floating **Book a repair** WhatsApp button
- Mobile navigation and compressed product/hero images

## Stack

HTML5 · CSS3 · Vanilla JavaScript · Font Awesome · Google Fonts

## Quick start

```bash
# from the repo root
python3 -m http.server 8000
# then open http://127.0.0.1:8000
```

Or open `index.html` directly in a browser.

## Before go-live — update contacts

Edit **one file**: [`config.js`](config.js)

```js
whatsappNumber: "961XXXXXXXX",   // digits only, with country code
phoneDisplay: "+961 X XXX XXX",
email: "you@yourdomain.com",
```

Every WhatsApp / email / phone link on the site reads from there.

## Project status

In active development. Next likely upgrades: real owner contacts, Arabic + LBP formatting, more inventory photos, and a real contact backend if WhatsApp-only is not enough.
