'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';

export default function Terms() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-[#f5f5f5] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 pb-4 border-b-2 border-tapple-pink">
              モテメッセ 利用規約
            </h1>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第1条（総則）</h2>
                <p className="leading-relaxed">
                  本利用規約（以下「本規約」といいます）は、モテメッセ運営事務局（以下「当局」といいます）が提供するWebサービス「モテメッセ」（以下「本サービス」といいます）の利用に関する条件を定めるものです。本サービスを利用される方（以下「利用者」といいます）は、本規約に同意したものとみなされます。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第2条（定義）</h2>
                <p className="leading-relaxed mb-2">本規約において使用する用語の定義は、次のとおりとします。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>「本サービス」とは、当局が運営するマッチングアプリ利用者向けメッセージ生成サービス「モテメッセ」をいいます。</li>
                  <li>「利用者」とは、本サービスを利用する個人をいいます。</li>
                  <li>「生成AI」とは、OpenAI社が提供する人工知能技術を含む、テキスト生成機能を有するシステムをいいます。</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第3条（サービス内容）</h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>本サービスは、以下の機能を提供します。
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>マッチングアプリにおける初回挨拶メッセージの生成</li>
                      <li>マッチングした相手への返信メッセージの生成</li>
                      <li>利用者のプロフィール情報および相手のプロフィール情報を参考にしたメッセージのカスタマイズ</li>
                    </ul>
                  </li>
                  <li>本サービスは現在無料で提供されていますが、将来的に有料化する場合があります。有料サービスを利用する場合の料金および支払方法は、別途定めるものとします。また、本サービス内には広告が表示される場合があります。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第4条（利用条件）</h2>
                <p className="leading-relaxed mb-2">本サービスの利用にあたり、利用者は以下の条件を満たす必要があります。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>18歳以上であること</li>
                  <li>本規約および関連する法令を遵守すること</li>
                  <li>反社会的勢力でないこと</li>
                  <li>本サービスに入力する情報（会話履歴等）から、個人を特定できる情報（本名、住所、電話番号、ID等）をあらかじめ削除または伏字にするなどして、個人情報の保護に配慮すること</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第5条（利用制限）</h2>
                <p className="leading-relaxed mb-2">当局は、利用者が以下のいずれかに該当すると判断した場合、事前の通知なく本サービスの利用を制限または停止することができます。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>本規約に違反した場合</li>
                  <li>18歳未満であることが判明した場合</li>
                  <li>虚偽の情報を提供した場合</li>
                  <li>その他、当局が不適切と判断する利用を行った場合</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第6条（禁止事項）</h2>
                <p className="leading-relaxed mb-2">利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>法令に違反する行為またはそのおそれのある行為</li>
                  <li>他者の権利を侵害する行為</li>
                  <li>差別的、中傷的、脅迫的、わいせつ、暴力的、反社会的な内容を含むメッセージの生成を意図する行為</li>
                  <li>本サービスの入力フォーム（プロフィール欄、会話履歴入力欄等を含む）に対し、利用者自身または第三者（マッチング相手を含む）の個人を特定できる情報（本名、詳細な住所、電話番号、メールアドレス、LINE ID等のSNSアカウント、勤務先、学校名、顔写真等）を入力する行為<br/>
                    <span className="text-sm">※ただし、マッチングアプリ内で公開されているニックネーム、年齢、趣味等の、単体で個人を特定できない情報は除きます。</span>
                  </li>
                  <li>本サービスのAIに対し、意図的に不適切な出力を誘導するプロンプトを入力する行為（プロンプトインジェクション等）</li>
                  <li>本サービスを逆アセンブル、逆コンパイル、リバースエンジニアリングする行為</li>
                  <li>本サービスのシステムに過度な負荷をかける行為</li>
                  <li>商用利用を目的とする行為（個人的な恋愛目的を除く）</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第7条（免責事項）</h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>当局は、以下の事項について一切の責任を負いません。
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>生成されたメッセージの内容、品質、およびその利用結果</li>
                      <li>利用者がマッチングアプリの利用規約に違反することにより生じる損害</li>
                      <li>利用者とマッチング相手との間で生じるトラブル</li>
                      <li>利用者が本規約第6条第4項に違反し、本サービス内に個人情報を入力したことにより発生したプライバシー侵害、情報漏洩、その他のトラブル</li>
                      <li>システム障害、通信障害、不正アクセス等により生じる損害</li>
                    </ul>
                  </li>
                  <li>本サービスは「現状有姿」で提供され、当局は明示または黙示を問わず一切の保証をいたしません。</li>
                  <li>本規約が消費者契約法に定める消費者契約に該当する場合、本条の免責規定は適用されないものとします。この場合、当局は、当局の故意または重過失による場合を除き、利用者に生じた損害について、通常生ずべき損害の範囲内で、かつ利用者が過去1ヶ月間に支払った利用料（無料利用の場合は1,000円）を上限として賠償責任を負うものとします。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第8条（知的財産権）</h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>本サービスを利用して生成されたテキストデータの著作権その他一切の権利は、生成した利用者に帰属します。利用者は、当該データを自身の責任において自由に利用することができます。</li>
                  <li>利用者は、当局が本サービスの提供、保守、改善、および学術研究等の目的の範囲内で、利用者が入力した情報および生成されたテキストデータを、個人を特定できない形式において無償かつ無期限に使用（複製、複写、改変、統計データ化等）することを許諾するものとします。</li>
                  <li>本サービス自体のプログラム、デザイン、商標等に関する権利は当局に帰属します。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第9条（個人情報・データの取扱い）</h2>
                <p className="leading-relaxed">
                  本サービスにおけるデータの取扱いについては、別途定める「プライバシーポリシー」に従うものとします。利用者は、本サービスを利用することで、当該プライバシーポリシーに従ってデータが取り扱われることに同意したものとみなされます。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第10条（サービスの変更・終了）</h2>
                <p className="leading-relaxed">
                  当局は、事前の通知なく本サービスの内容を変更、追加、削除、または終了することができます。本サービスの終了により利用者に損害が生じても、当局は一切の責任を負いません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第11条（本規約の変更）</h2>
                <p className="leading-relaxed">
                  当局は、必要に応じて本規約を変更することができます。規約を変更した場合には、本サービス上に掲載することにより利用者に通知いたします。変更後の規約は、掲載時から効力を生じるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第12条（準拠法・管轄裁判所）</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>本規約の準拠法は日本法とします。</li>
                  <li>本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第13条（その他）</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>本規約の一部が無効となった場合でも、残りの部分の効力には影響しません。</li>
                  <li>利用者は、当局の書面による事前の同意なく、本規約上の地位および権利義務を第三者に譲渡することはできません。</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">お問い合わせ先</h2>
                <p className="leading-relaxed">
                  モテメッセ運営事務局<br/>
                  メールアドレス：<a href="mailto:motemesse.contact@gmail.com" className="text-tapple-pink hover:underline">motemesse.contact@gmail.com</a>
                </p>
              </section>
            </div>

            <div className="text-sm text-gray-600 mt-6">
              <p>制定日：2025年●月●日</p>
              <p>施行日：2025年●月●日</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
