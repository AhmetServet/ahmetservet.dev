---
title: "Cozy Window: Piksel Sanatı Dijital Hediye Odaları"
description: Kullanıcıların kişisel bir piksel sanatı odası dekore edip özel bir bağlantıyla dijital hediye olarak paylaştığı bir web uygulaması.
locale: tr
path: cozy-window
order: 2
---

[Cozy Window](https://cozywindow.space), hediye hazırlamak için yaptığım küçük bir web uygulaması. Kişisel bir piksel sanatı odasını dekore ediyorsun, sonra özel bir bağlantıyla birine gönderiyorsun. Şu ana kadar 100'den fazla kişi kullandı.

## Neler yapıyor

- 290 piksel sanatı eşyadan oluşan bir katalogla sürükle-bırak oda editörü.
- Eşyaları hassas şekilde yerleştirmek ve taşımak için klavye kontrolleri.
- Paylaşılan odalarda canlı güncellemeler. Alıcı değişiklikleri anında görüyor.
- Hızlıca denemek için anonim oturumlar, odaları saklamak için giriş yapılmış oturumlar.
- İstemciden çekilemesin diye sunucu tarafında yetkilendirilip sunulan Premium eşyalar.

## Nasıl yapıldı

Uygulama Next.js, React ve TypeScript ile yazıldı. Backend olarak Convex, kimlik doğrulama için Clerk kullanılıyor.

Ödemeler Polar üzerinden tek seferlik satın alma olarak alınıyor. Entegrasyon imzalı webhook'ları, iade süreçlerini ve yerelleştirilmiş fiyatlandırmayı kapsıyor.

Cozy Window, Cloudflare arkasında Coolify ile kendi VPS'imde çalışıyor. Convex production deploy'ları otomatik.

## Bağlantılar

- [cozywindow.space](https://cozywindow.space)
