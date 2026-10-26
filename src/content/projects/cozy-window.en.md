---
title: "Cozy Window: Pixel-Art Digital Gift Rooms"
description: A web app where people decorate a personal pixel-art room and share it as a digital gift through a private link.
locale: en
path: cozy-window
order: 2
---

[Cozy Window](https://cozywindow.space) is a small web app for making a gift. You decorate a personal pixel-art room, then share it with someone through a private link. More than 100 people have used it so far.

## What it does

- A drag-and-drop room editor with a catalog of 290 pixel-art items.
- Keyboard controls for placing and moving items precisely.
- Live updates on shared rooms, so the recipient sees changes as they happen.
- Anonymous sessions for trying it quickly, and signed-in sessions for keeping rooms.
- Premium items, authorized and served on the server so they can't be pulled from the client.

## How it is built

The app uses Next.js, React, and TypeScript, with Convex as the backend and Clerk for authentication.

Payments go through Polar as one-time purchases. The integration covers signed webhooks, refund handling, and localized pricing.

Cozy Window runs on my own VPS with Coolify behind Cloudflare. Convex production deploys are automated.

## Links

- [cozywindow.space](https://cozywindow.space)
