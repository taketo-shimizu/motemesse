'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useEmblaCarousel from 'embla-carousel-react';

// 画像データ型の定義
interface ImageData {
  src: string;
  alt: string;
}

// カルーセルコンポーネント
function Carousel({ images }: { images: ImageData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-gray-100">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div key={index} className="flex-none w-full min-w-0 flex items-center justify-center bg-gray-50 p-4">
              <img
                src={img.src}
                alt={img.alt}
                className="max-w-full max-h-[400px] w-auto h-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4 pb-2">
          <button
            onClick={scrollPrev}
            className="bg-tapple-pink/90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="前の画像"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer hover:bg-tapple-pink-light ${
                  index === selectedIndex
                    ? 'bg-tapple-pink scale-125'
                    : 'bg-gray-300'
                }`}
                aria-label={`画像 ${index + 1} へ移動`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="bg-tapple-pink/90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="次の画像"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ステップアイテムコンポーネント
function StepItem({
  stepNumber,
  title,
  description,
  images
}: {
  stepNumber: number;
  title: string;
  description: React.ReactNode;
  images: ImageData[];
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-8 mb-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <header className="mb-4">
        <h2 className="text-xl font-bold text-tapple-pink mb-3 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tapple-pink text-white text-lg font-bold">
            {stepNumber}
          </span>
          {title}
        </h2>
        <div className="text-gray-700 leading-relaxed text-sm">{description}</div>
      </header>

      <Carousel images={images} />
    </section>
  );
}

export default function Guide() {
  // 各ステップの画像データ
  const step1Images: ImageData[] = [
    { src: "/guide/１．自身のプロフィールを入力する.png", alt: "自身のプロフィールを入力する画面" }
  ];

  const step2Images: ImageData[] = [
    { src: "/guide/２．マッチングした女性を追加する①.png", alt: "メニューから新規追加を選択" },
    { src: "/guide/２．マッチングした女性を追加する②.jpg", alt: "女性の名前を入力" },
    { src: "/guide/２．マッチングした女性を追加する③.png", alt: "女性のプロフィール情報を入力" }
  ];

  const step3Images: ImageData[] = [
    { src: "/guide/３．初回挨拶を作成する①.png", alt: "チャット履歴画面を開く" },
    { src: "/guide/３．初回挨拶を作成する②.png", alt: "初回挨拶を作成するボタンをクリック" },
    { src: "/guide/３．初回挨拶を作成する③.png", alt: "AIが生成した候補から選択" },
    { src: "/guide/３．初回挨拶を作成する④.png", alt: "確定した挨拶をコピー" }
  ];

  const step4Images: ImageData[] = [
    { src: "/guide/４．返信案を作成する①.png", alt: "チャット履歴画面で返信を作成" },
    { src: "/guide/４．返信案を作成する②.png", alt: "画像アップロードまたはテキスト入力" },
    { src: "/guide/４．返信案を作成する③.png", alt: "AIが生成した返信候補を確認" },
    { src: "/guide/４．返信案を作成する④.png", alt: "確定した返信をコピー" }
  ];

  const step5Images: ImageData[] = [
    { src: "/guide/５．積極的に活用する①.jpg", alt: "マッチするたびに女性を追加" },
    { src: "/guide/５．積極的に活用する②.png", alt: "追撃メッセージも活用" }
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-tapple-pink-pale">
        {/* ヘッダー */}
        <header className="bg-gradient-to-r from-tapple-pink to-tapple-pink-light text-white py-4 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
            <FiBook className="w-6 h-6" />
            <h1 className="text-2xl font-bold">使い方ガイド</h1>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-4xl mx-auto px-4 py-4">
          <StepItem
            stepNumber={1}
            title="自身のプロフィールを入力する"
            description="マッチングアプリで登録しているお名前（ニックネーム）、年齢、趣味・関心事を入力して保存します。"
            images={step1Images}
          />

          <StepItem
            stepNumber={2}
            title="マッチングした女性を追加する"
            description={
              <>
                左上のボタンでメニューを開き、その中の「＋新規追加」を押すと出てくるポップアップにお相手の女性の名前を入力します。<br />
                さらに、お相手の女性の年齢、趣味・関心事を入力します。
              </>
            }
            images={step2Images}
          />

          <StepItem
            stepNumber={3}
            title="初回挨拶を作成する"
            description={
              <>
                左上のメニューボタンでサイドバーを開き、任意の女性が選択された状態で「チャット履歴」を押します。<br />
                「初回挨拶を作成する」を押すと、AIが返信候補を作成してくれるので、好みの候補を選択・修正して確定を押します。<br />
                チャット欄に確定した初回挨拶が反映するので、「コピー」を押すと、マッチングアプリのメッセージボックスにペーストできます。
              </>
            }
            images={step3Images}
          />

          <StepItem
            stepNumber={4}
            title="返信案を作成する"
            description={
              <>
                左上のボタンでメニューを開き、任意の相手が選択された状態で「チャット履歴」を押します。<br />
                お相手からのメッセージを下のボックスに入力します。左にある画像アイコンからお相手とのチャット欄のスクリーンショットをアップすれば、自動的にお相手の最新メッセージが入力されます。<br />
                AIが返信候補を作成してくれるので、好みの候補を選択・修正して「確定」を押します。返信候補がしっくりこない場合は、「再生成」を押すと、再度AIが返信候補を作成します。<br />
                チャット欄に確定した返信案が反映するので、「コピー」を押すと、マッチングアプリのメッセージボックスにペーストできます。
              </>
            }
            images={step4Images}
          />

          <StepItem
            stepNumber={5}
            title="積極的に活用する"
            description={
              <>
                あとはマッチするたびにお相手を追加して、どんどん返信案を活用しましょう。<br />
                返信が来ないときは「追撃」メッセージも試してみてください！
              </>
            }
            images={step5Images}
          />
        </main>
      </div>
    </DefaultLayout>
  );
}