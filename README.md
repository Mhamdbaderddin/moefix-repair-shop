# MOFIXA — Laptop & PC Repair Shop Website

CSC 400 Phase 2 frontend (HTML, CSS, JavaScript) for a Lebanon-based laptop/PC repair + sales shop.

## Phase 2 pages (5+)

1. `index.html` — Home (nav, services, shop, about, contact, repair modal)
2. `login.html` — Login with JavaScript validation
3. `register.html` — Register with JavaScript validation
4. `product.html` — Product details + add to cart
5. `cart.html` — Cart + Order via WhatsApp

## Features

- Responsive layout and mobile nav
- Hero slider, product search/filter/sort
- Stock-aware cart (localStorage)
- Login / register session (localStorage; Laravel comes in Phase 3)
- JS form validation on login, register, contact, and repair modal
- Book-a-repair modal + WhatsApp CTAs

## Run locally (VS / PC)

```bash
# from the project folder
python -m http.server 8000
```

Open `http://127.0.0.1:8000`  
Or use VS Code / Cursor **Live Server** on `index.html`.

## Contact placeholders

Edit `config.js` before go-live:

```js
whatsappNumber: "961XXXXXXXX",
phoneDisplay: "+961 X XXX XXX",
email: "you@yourdomain.com",
```

## Classroom submission

Zip the frontend folder (HTML/CSS/JS/images). Do **not** include `.git`.  
In the Google Classroom comment, include partner name, ID, and section.
