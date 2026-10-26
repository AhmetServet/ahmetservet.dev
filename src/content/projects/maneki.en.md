---
title: "Maneki: Focus & Meditation"
description: A native iOS focus app where every completed session crafts a porcelain lucky-cat figurine for a 3D garden.
locale: en
path: maneki
order: 1
---

Maneki is a native iOS app for focus and meditation. Every session you complete crafts a small porcelain lucky-cat figurine, and the figurines slowly fill a 3D garden. The idea is to make the time you spend focusing visible, without turning it into a stressful streak counter.

The app is currently in App Store review.

## What it does

- Timer, Pomodoro, guided breathing, and meditation modes.
- Real-time group focus rooms, so you can work alongside friends.
- Home Screen widgets, Live Activities, and Control Center controls.
- Apple Health sync for Mindful Minutes.
- Localized into 10 languages.

## How it is built

The app is written in SwiftUI and Swift 6, and the 3D garden is rendered with RealityKit. The backend runs on Convex, and sign-in uses Clerk SSO.

Rewards are handled by the server. The client never decides what a user has earned. The backend verifies completed sessions, StoreKit 2 subscriptions, and in-app purchases before it grants anything, and automated tests cover the reward rules.

## Stack

SwiftUI, Swift 6, RealityKit, WidgetKit, ActivityKit, HealthKit, StoreKit 2, Convex, Clerk.
