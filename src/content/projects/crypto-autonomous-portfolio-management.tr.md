---
title: Kripto Spot Piyasalarında Otonom Portföy Yönetimi
description: BTCUSDT spot işlemleri için tahmin modellerini, LLM tabanlı bir karar agent'ını ve katı risk kontrollerini birleştiren TÜBİTAK 2209-A araştırma prototipi.
locale: tr
path: crypto-autonomous-portfolio-management
order: 3
---

*Deneysel Analiz ve Hibrit Yapay Zekâ Yaklaşımlarının Geliştirilmesi.* Bu proje, TÜBİTAK 2209-A programı kapsamında desteklenen bitirme projemizdi. Kenan Koçoğlu ve Mehmet Enes Odabaş ile birlikte üç kişilik ekibi ben yönettim.

Kripto spot piyasaları oynak ve gürültülü. Yatırımcılar yoğun bir bilgi yüküyle karşılaşıyor ve çoğu zaman duygusal kararlar veriyor. Sistematik bir pipeline'ın ne kadar ileri gidebileceğini görmek istedik. Bu pipeline piyasa verisini topluyor, özellikler üretiyor, tahmin modellerini karşılaştırıyor, model sinyallerini bir LLM agent'ıyla karara dönüştürüyor ve her emrin önüne katı bir risk kapısı koyuyor.

Sonuçta BTCUSDT için uçtan uca çalışan bir prototip ortaya çıktı. Bu kârlı bir alım satım sistemi değil ve hiçbir zaman gerçek parayla kullanılmak için tasarlanmadı.

![Üst düzey mimari: veri toplama ve saklama, özellik mühendisliği, hibrit tahmin ile otonom karar ve emir katmanı](./images/crypto/architecture.png)

## Veri ve özellikler

Sistem, Binance'ten Mayıs 2021 ile Haziran 2026 arasını kapsayan 1 dakikalık BTCUSDT OHLCV mumlarını çekiyor. Büyük geçmiş veriler Binance'in herkese açık aylık veri dump'larından alınıyor, yakın dönemdeki boşluklar REST ile dolduruluyor. Kapsama tabloları neyin zaten kayıtlı olduğunu tuttuğu için tekrar çalıştırmalarda var olan veri atlanıyor.

RSI, MACD, hareketli ortalamalar ve Bollinger Bantları gibi teknik göstergeler ham mumlardan hesaplanıyor ve PostgreSQL'de özellik satırları olarak saklanıyor.

## Modelleri karşılaştırmak

Altı model ailesini walk-forward değerlendirme ve holdout testleriyle karşılaştırdık. Veriyi zamana göre bölmek, gelecekteki verinin eğitime sızmasını önlüyor.

| Model | Aile | Yön doğruluğu |
|---|---|---:|
| ARIMA | İstatistiksel | %75,00 |
| Prophet | İstatistiksel | %72,73 |
| LSTM | Derin öğrenme | %53,92 |
| LightGBM | Tabular ML | %52,64 |
| XGBoost | Tabular ML | %52,35 |
| GRU | Derin öğrenme | %50,68 |

İstatistiksel modeller yön tahmininde açıkça daha iyiydi. ML ve derin öğrenme modelleri %50–54 civarında kaldı. Daha yüksek doğruluğun daha yüksek portföy getirisi anlamına gelmediğini de gördük. Model tabanlı stratejilerin hiçbiri buy & hold'u geçemedi.

## Karar agent'ı

Canlı döngü, kapanan her mumda eksik veriyi tamamlıyor, göstergeleri yeniden hesaplıyor, vadesi gelen tahminleri sonuçlandırıyor ve aktif modellerin hepsini çalıştırıyor. Ardından tek bir LLM çağrısı yapıyor. Prompt; güncel fiyatı, son mumları, göstergeleri, model tahminlerini, portföy bakiyelerini ve risk limitlerini içeriyor.

LLM'in cevabı hiçbir zaman doğrudan uygulanmıyor. Her karar önce ayrı bir risk katmanından geçiyor. Bu katman maksimum işlem ve pozisyon büyüklüğünü, günlük gerçekleşen zarar limitini, günlük maksimum emir sayısını, emirler arası bekleme süresini, maruziyet limitlerini ve acil durdurmayı uyguluyor. Kararlar, prompt'lar, ham cevaplar ve emirler günlüklere yazılıyor. Böylece her işlem sonradan denetlenebiliyor.

## Spot Demo sonuçları

Döngünün tamamını gerçek para kullanılmayan Binance Spot Demo ortamında çalıştırdık. Art arda 100 BTCUSDT kararında agent 92 kez beklemeyi, 8 kez almayı seçti. Beş alım emri gerçekleşti. Risk katmanı kalan üçünü maksimum pozisyon büyüklüğünü aşacakları için reddetti. Ortalama LLM gecikmesi 8,4 saniyeydi ve bu 1 dakikalık döngüye sığıyor.

Model sinyalleri çeliştiğinde agent çoğunlukla bekledi. İstediğimiz temkinli davranış buydu. Bu çalışma, risk kapısının gerçek karar akışında çalıştığını da gösterdi.

## Dashboard

30'dan fazla endpoint'e sahip bir FastAPI backend'i altı sekmeli bir React dashboard'u besliyor:

- **Overview:** fiyat ve gösterge grafikleri, alım, satım ve bekleme işaretleri ile pozisyon ve risk durumu.
- **Trade:** Spot Demo portföyü ve onaylı manuel emirler.
- **Agent:** çalışma ayarları, risk limitleri ve canlı döngü kontrolleri.
- **Data:** veri alımı, kapsama ve boşluk onarımı.
- **Models:** eğitim işleri ve model kaydı.
- **Journal:** kararlar, tahminler, emirler ve her kararın arkasındaki prompt.

## Sınırlılıklar

Model doğruluğu, kısa vadeli yön tahmini için güvenilir olacak kadar yüksek değildi. Çoklu coin desteği ve uzun süreli kesintisiz çalışma kapsam dışında kaldı. Haber ve sosyal medya duyarlılığı sinyalleri, Transformer tabanlı modeller ve başka piyasalara genişleme doğal sonraki adımlar olurdu.

## Teknolojiler

Python, uv, PostgreSQL, SQLAlchemy, statsmodels, Prophet, XGBoost, LightGBM, PyTorch, Backtrader, FastAPI, React, Vite, Chart.js, Binance API, OpenRouter.

## Bağlantılar

- [GitHub'daki kaynak kodu](https://github.com/AhmetServet/crypto-autonomous-portfolio-management)
