'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';

export default function Privacy() {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-[#f5f5f5] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 pb-4 border-b-2 border-tapple-pink">
              プライバシーポリシー
            </h1>

            <p className="text-gray-700 leading-relaxed mb-6">
              モテメッセ運営事務局（以下「当サービス」）は、本サービス「モテメッセ」において、利用者の個人情報の保護に関する法律（個人情報保護法）を遵守し、利用者の情報を適切に取り扱います。
            </p>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第1条（適用範囲）</h2>
                <p className="leading-relaxed">
                  本ポリシーは、本サービスにおいて当サービスが取り扱う利用者の情報に適用されます。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第2条（個人情報の定義と本サービスのスタンス）</h2>
                <p className="leading-relaxed">
                  本ポリシーにおいて「個人情報」とは、個人情報保護法に規定する個人情報を指します。<br/>
                  なお、本サービスにおいて収集する「ニックネーム」「年齢」「趣味」「会話履歴」等の情報は、それ単体では特定の個人を識別できない場合が多いですが、当サービスではこれらも利用者のプライバシーに関わる重要な情報として、厳重に管理いたします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第3条（収集する情報の種類）</h2>
                <p className="leading-relaxed mb-2">当サービスは、本サービスの提供にあたり、原則として個人を特定できる情報を収集いたしません。収集する情報は以下の通りです。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>利用者が入力するプロフィール情報（マッチングアプリ内のニックネーム、年齢、趣味等）</li>
                  <li>マッチング相手のプロフィール情報（マッチングアプリ内のニックネーム、年齢、趣味等に限る）</li>
                  <li>メッセージ内容・会話履歴（※ただし、個人を特定できる情報が含まれていないものに限ります）</li>
                  <li>サービス利用に関する技術的情報（IPアドレス、ブラウザ情報、Cookie等）</li>
                  <li>お問い合わせ時に利用者が任意で提供するメールアドレス等</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第4条（情報の利用目的）</h2>
                <p className="leading-relaxed mb-2">当サービスは、収集した情報を以下の目的で利用します。</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AIによるメッセージ生成サービスの提供</li>
                  <li>利用者に最適化されたメッセージの作成</li>
                  <li>サービスの運営、維持、改善、および新機能の開発</li>
                  <li>統計的分析およびサービス品質の向上</li>
                  <li>利用者からのお問い合わせへの対応</li>
                  <li>利用規約違反の調査および対処</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第5条（第三者への提供）</h2>

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">1. OpenAI社への情報提供</h3>
                  <p className="leading-relaxed">
                    本サービスでは、AIメッセージ生成のため、利用者が入力した情報（ニックネーム、年齢、趣味、会話内容）をOpenAI社のAPI（Application Programming Interface）に送信します。<br/>
                    送信される情報には、原則として個人を特定できる情報は含まれませんが、利用者は自身の責任において、個人を特定できる情報を入力しないものとします。<br/>
                    なお、当サービスはOpenAI社のAPIを利用しており、原則として入力データがOpenAI社のAIモデル学習に使用されない設定（または方針）に基づき運用していますが、OpenAI社の利用規約変更等により取り扱いが変わる可能性があります。
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">2. その他の第三者提供</h3>
                  <p className="leading-relaxed">
                    当サービスは、上記および法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供しません。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">3. 将来的な広告配信について</h3>
                  <p className="leading-relaxed">
                    当サービスは、広告配信サービスを導入する場合があり、その際は広告配信事業者に対して、統計的な利用動向や匿名化された情報を提供する場合があります。
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第6条（Cookieの使用について）</h2>
                <p className="leading-relaxed">
                  当サービスでは、サービスの提供（入力情報のブラウザ一時保存等）および改善のためにCookieを使用しています。利用者はブラウザの設定によりCookieを無効にすることができますが、その場合、本サービスの一部機能が利用できなくなる可能性があります。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第7条（情報の保存期間）</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>プロフィール等の入力情報：原則としてCookieにより利用者のブラウザ内に保存され、当サービスのサーバーには恒常的に保存されません。</li>
                  <li>アクセスログ・会話履歴ログ：不正利用の防止およびサービス改善のため、一定期間（最長1年間）保存する場合があります。</li>
                  <li>お問い合わせ情報：対応完了から1年間保存します。</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第8条（セキュリティ対策）</h2>
                <p className="leading-relaxed">
                  当サービスは、情報の漏洩防止のため、通信の暗号化（SSL/TLS）等の適切な安全管理措置を講じています。<br/>
                  なお、当サービスは、利用者が利用規約に違反して入力した個人情報（本名、連絡先等）について、その検知や削除を行う義務を負うものではありませんが、発見した場合には予告なく削除する場合があります。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第9条（利用者の権利）</h2>
                <p className="leading-relaxed">
                  利用者は、当サービスが保有する自己の個人情報について、開示、訂正、追加、削除、利用停止を請求することができます。本ポリシー末尾記載の連絡先までお問い合わせください。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第10条（プライバシーポリシーの変更）</h2>
                <p className="leading-relaxed">
                  当サービスは、法令の改正、サービス内容の変更等に応じて、本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービス上に掲載した時点で効力を生じるものとします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">第11条（準拠法・管轄裁判所）</h2>
                <p className="leading-relaxed">
                  本ポリシーの解釈・適用については日本法が適用されます。本ポリシーに関連して生じた紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">お問い合わせ先</h2>
                <p className="leading-relaxed">
                  サービス名：モテメッセ<br/>
                  運営者：モテメッセ運営事務局<br/>
                  メールアドレス：<a href="mailto:motemesse.contact@gmail.com" className="text-tapple-pink hover:underline">motemesse.contact@gmail.com</a>
                </p>
              </section>
            </div>
            <div className="text-sm text-gray-600 mt-6">
              <p>制定日：2025年12月5日</p>
              <p>最終更新日：2025年12月5日</p>
            </div>

          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
