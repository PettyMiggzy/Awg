# AWG Custom Designs

A clearer site for [AWG Custom Designs](https://www.awgcustomdesigns.com/), the Indianapolis FFL at 6269 Coffman Rd. The live site is a thin Wix page. This version puts the published services, prices, firearm listings, and FAQ in one place, and it uses the shop’s own photos.

It is a preview, not a checkout. Firearm sales still happen in person under federal and Indiana law. The inquiry form prepares a note you can call or text. It does not email the shop or charge a card.

The gold mark, the bench film, the engraving film, the page-header engraving texture, and the images on the gift engraving, shotgun receiver, and FFL transfer pages were made for this site. They are not stock photos, and they are not the guns for sale. Listings still use the shop’s own photographs. The Instagram row uses frames from [@mr.awg](https://www.instagram.com/mr.awg/). Copy `.env.example` to `.env` if you regenerate artwork. The key stays on your machine.

## Run it

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm start
```

## What is on purpose

- Prices match what the shop publishes: deposits, starting prices, and flat rates are labeled differently.
- The three firearm listings are request-only. There is no add-to-cart.
- Leftover Wix template portfolio items are not included.
- No public email was on the current site, so none is invented here.
