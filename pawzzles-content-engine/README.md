# Pawzzles Content Engine

A lightweight local content generation system for creating Pawzzles social post briefs, image prompts, and captions for Instagram and Facebook.

This is a standalone Node.js project. It does not depend on the main Pawzzles Hub app.

## Private Internal Tool

This content engine is for local/admin use only.

Do not deploy it publicly, do not add public website routes for it, and do not link it from the live Pawzzles Hub website. Keep it separate from the customer-facing app.

Generated captions, briefs, prompts and mock images are draft planning materials. Review all copy, visual prompts, QR codes, claims and images manually before posting to Instagram, Facebook or any other public channel.

## What It Generates

Running the generator creates:

- Image prompts in `output/prompts/`
- Instagram and Facebook captions in `output/captions/`
- Combined post briefs in `output/briefs/`
- Mock image placeholders in `output/images/` when image generation is run
- A manual image prompt queue in `output/image-generation-queue.md`
- A Meta planning CSV in `output/meta-schedule.csv` when export is run

## Install

```bash
cd pawzzles-content-engine
npm install
```

There are no required third-party dependencies.

## Generate Content

```bash
npm run generate
```

This reads:

- `brand-assets/brand-rules.md`
- `data/content-calendar.json`
- `prompts/image-prompt-template.md`

Then it writes generated files into the `output/` folders.

`prompts/caption-template.md` is included as an editable writing reference for future AI caption generation or manual review.
`output/image-generation-queue.md` contains copy-and-paste prompts for manual `/image` generation in Codex or ChatGPT.

## Generate Mock Images

```bash
npm run generate:images
```

This runs in mock mode only and creates simple SVG placeholders in `output/images/`. These are useful for checking file flow.

Real image generation is intentionally not connected to an API. Use `output/image-generation-queue.md` and generate final visuals manually with `/image` in Codex or ChatGPT.

## Review Posts

```bash
npm run review
```

The review script lists generated briefs, asks for a post ID, then lets you mark it as:

- `approved`
- `rejected`
- `scheduled`

It copies the related brief, caption and image prompt into:

- `output/approved/`
- `output/rejected/`
- `output/scheduled/`

You can also run it directly:

```bash
node scripts/review-posts.js PZ-003 approved
node scripts/review-posts.js PZ-005 scheduled 2026-06-30
```

Rejected posts are copied to `output/rejected/` and returned to `draft` status in the calendar.

## Export Meta CSV

```bash
npm run export:meta
```

This writes `output/meta-schedule.csv` for Meta planning. It exports posts with `approved` or `scheduled` status, plus posts copied into the approved or scheduled review folders.

## Clean Generated Output

```bash
npm run clean
```

This clears generated files from:

- `output/briefs/`
- `output/captions/`
- `output/prompts/`
- `output/images/`
- `output/approved/`
- `output/rejected/`
- `output/scheduled/`
- `output/image-generation-queue.md`
- `output/meta-schedule.csv`

## Where To Put Brand Assets

Place source assets in:

- Dog photos: `product-photos/dogs/`
- Toy photos: `product-photos/toys/`
- QR code images: `product-photos/qr/`
- Brand notes, logo references, palette notes: `brand-assets/`

The content calendar references these files by path. The generator does not need the images to exist yet, but the paths help create better prompts and designer notes.

## Edit The Content Calendar

Open `data/content-calendar.json`.

Each post should include:

- `id`
- `title`
- `platform`
- `postType`
- `theme`
- `goal`
- `headline`
- `supportingText`
- `cta`
- `dogImage`
- `productImage`
- `qrImage`
- `status`
- `suggestedDate`

Supported statuses are:

- `draft`
- `prompt-ready`
- `image-ready`
- `approved`
- `scheduled`
- `posted`

The generator creates prompt, caption and brief files for all calendar posts. The Meta CSV export only includes `approved` and `scheduled` posts.

## Add New Post Types

Add a new calendar item with a new `postType`, then update `src/promptBuilder.js` and `src/captionBuilder.js` if the new type needs special wording.

The current code is intentionally simple, so most new post types will work without code changes.

## Recommended Workflow

1. Add or edit posts in `data/content-calendar.json`.
2. Run `npm run generate`.
3. Review the files in `output/briefs/` and `output/image-generation-queue.md`.
4. Run `npm run generate:images` when you want local mock placeholders.
5. Use `/image` manually for final image creation.
6. Run `npm run review` to approve, reject or schedule posts.
7. Run `npm run export:meta` to create a Meta planning CSV.
