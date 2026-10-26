---
title: Arazi Kullanımı ve Arazi Örtüsü Sınıflandırması
description: EuroSAT uydu görüntülerini on arazi örtüsü sınıfına ayıran ve %96,7 test doğruluğuna ulaşan bir PyTorch transfer learning pipeline'ı.
locale: tr
path: eurosat-land-cover-classification
order: 4
---

Arazi kullanımı ve arazi örtüsü sınıflandırması bir uzaktan algılama problemi. Tarım, şehir planlama, çevre izleme ve afet müdahalesi için önemli. Bu projede, RGB EuroSAT veri setindeki Sentinel-2 görüntü parçalarını ormanlardan nehirlere, otoyollardan yerleşim alanlarına kadar on sınıfa ayıran CNN'leri eğittim ve değerlendirdim.

Çalışmaya Google Colab'de bir notebook ile başladım, sonra yeniden kullanılabilir script'lere dönüştürdüm. Nihai modelleri kiralık bir NVIDIA RTX 6000 sınıfı GPU üzerinde eğittim.

## Veri seti

EuroSAT RGB, on sınıfa dağılmış 64 × 64 piksellik 27.000 görüntü parçasından oluşuyor. Veriyi sabit bir seed ile 70/15/15 oranında tabakalı eğitim, doğrulama ve test kümelerine ayırdım. Test kümesinde 4.050 görüntü kalıyor.

Her sınıftan rastgele örnekler:

![Her satırı bir arazi örtüsü sınıfı olan rastgele EuroSAT örnekleri](./images/eurosat/sample_grid.jpg)

Sınıflar arasında hafif bir dengesizlik var. Her sınıfta 2.000 ile 3.000 arası görüntü bulunduğu için eğitimde sınıf ağırlıklı kayıp kullanılıyor.

![EuroSAT'ta sınıf başına görüntü sayısı](./images/eurosat/class_distribution.png)

![Sınıf bazında RGB piksel yoğunluğu dağılımları](./images/eurosat/pixel_histograms.png)

## Yöntem

İki backbone da torchvision'daki ImageNet ön eğitimli ağırlıklarla başlıyor. Her birine on EuroSAT sınıfı için yeni bir sınıflandırıcı katmanı ekleniyor ve eğitim iki aşamada ilerliyor:

1. **Dondurulmuş backbone:** yalnızca yeni katman, 1e-3 öğrenme oranıyla 10 epoch eğitiliyor.
2. **Fine-tuning:** ağın tamamı çözülüyor ve ilk aşamanın en iyi ağırlıklarından devam edilerek 1e-5 öğrenme oranıyla 20 epoch eğitiliyor.

Görüntüler 224 × 224 boyutuna getiriliyor. Eğitimde yatay çevirme, rastgele döndürme ve renk oynamaları kullanılıyor. Eğitim ayrıca AdamW optimizer'ı, sınıf ağırlıklı cross-entropy, ReduceLROnPlateau, doğrulama kaybına göre erken durdurma, CUDA'da karma hassasiyet ve checkpoint'ten devam etme özelliklerini kullanıyor.

## Sonuçlar

Değerlendirme, ayrılmış 4.050 görüntülük test kümesinde yapıldı.

| Model | Doğruluk | Makro F1 | Makro AUC | ms / görüntü | Parametre |
|---|---:|---:|---:|---:|---:|
| VGG16-BN | %96,69 | 0,9665 | 0,9993 | 139,74 | 134,3M |
| MobileNetV2 | %95,26 | 0,9511 | 0,9986 | 27,97 | 2,9M |

En yüksek doğruluk VGG16-BN'de. MobileNetV2 ise yalnızca 1,4 puan geride kalıyor, buna karşın yaklaşık 46 kat daha küçük ve 5 kat daha hızlı. Bu yüzden gecikme veya bellek önemli olduğunda daha pratik bir seçim.

![VGG16-BN ve MobileNetV2'nin doğruluk, F1 ve gecikme karşılaştırması](./images/eurosat/model_comparison.png)

### VGG16-BN

![Test kümesinde VGG16-BN karışıklık matrisi](./images/eurosat/vgg16_bn_confusion.png)

![VGG16-BN eğitim ve doğrulama eğrileri](./images/eurosat/vgg16_bn_training.png)

En yüksek güvenle yapılan yanlış tahminler hata analizi için faydalı. VGG16-BN'de bunların beşi de kalıcı ürün olarak tahmin edilen yıllık ürün alanları. Bu iki sınıf yukarıdan neredeyse aynı görünebiliyor.

![VGG16-BN'nin en yüksek güvenle yaptığı yanlış sınıflandırmalar](./images/eurosat/vgg16_bn_misclassifications.png)

### MobileNetV2

![Test kümesinde MobileNetV2 karışıklık matrisi](./images/eurosat/mobilenet_v2_confusion.png)

![MobileNetV2 eğitim ve doğrulama eğrileri](./images/eurosat/mobilenet_v2_training.png)

![MobileNetV2'nin en yüksek güvenle yaptığı yanlış sınıflandırmalar](./images/eurosat/mobilenet_v2_misclassifications.png)

## Teknolojiler

Python, PyTorch, torchvision, scikit-learn, pandas, NumPy, Matplotlib, seaborn, Google Colab.

## Bağlantılar

- [GitHub'daki kaynak kodu](https://github.com/AhmetServet/eurosat-cnn)
