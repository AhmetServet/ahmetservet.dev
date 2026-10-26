---
title: "Maneki: Odaklanma ve Meditasyon"
description: Tamamlanan her oturumun bir 3D bahçe için porselen şans kedisi figürü ürettiği native bir iOS odaklanma uygulaması.
locale: tr
path: maneki
order: 1
---

Maneki, odaklanma ve meditasyon için geliştirdiğim native bir iOS uygulaması. Tamamladığın her oturum küçük bir porselen şans kedisi figürü üretiyor ve bu figürler zamanla bir 3D bahçeyi dolduruyor. Amaç, odaklanmaya ayırdığın zamanı stres yaratan bir seri sayacına dönüştürmeden görünür kılmak.

Uygulama şu anda App Store incelemesinde.

## Neler yapıyor

- Zamanlayıcı, Pomodoro, rehberli nefes ve meditasyon modları.
- Arkadaşlarınla birlikte çalışabileceğin gerçek zamanlı grup odak odaları.
- Ana ekran widget'ları, Live Activities ve Denetim Merkezi kontrolleri.
- Apple Sağlık ile Farkındalık Dakikaları senkronizasyonu.
- 10 dilde yerelleştirme.

## Nasıl yapıldı

Uygulama SwiftUI ve Swift 6 ile yazıldı, 3D bahçe RealityKit ile çiziliyor. Backend Convex üzerinde çalışıyor, giriş için Clerk SSO kullanılıyor.

Ödülleri sunucu yönetiyor. Kullanıcının ne kazandığına istemci karar vermiyor. Backend, bir şey vermeden önce tamamlanan oturumları, StoreKit 2 aboneliklerini ve uygulama içi satın almaları doğruluyor. Ödül kuralları otomatik testlerle kapsanıyor.

## Teknolojiler

SwiftUI, Swift 6, RealityKit, WidgetKit, ActivityKit, HealthKit, StoreKit 2, Convex, Clerk.
