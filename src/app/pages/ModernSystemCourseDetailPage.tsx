import { CheckCircle, XCircle, Info } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';

interface ModernSystemCourseDetailPageProps {
  courseId?: string;
  isAuthenticated?: boolean;
  onNavigateToList?: () => void;
}

interface CourseData {
  name: string;
  instructor: string;
  evaluationCriteria: string;
  allowedMaterials: string;
  previousFormat: string;
  pros: string[];
  cons: string[];
  others: string[];
}

export function ModernSystemCourseDetailPage({ courseId = 'marketing-science', isAuthenticated = false, onNavigateToList }: ModernSystemCourseDetailPageProps) {
  const getCourseData = (id: string): CourseData => {
    const courses: Record<string, CourseData> = {
      'marketing-science': {
        name: 'マーケティングサイエンス',
        instructor: '辻本',
        evaluationCriteria: '期末テスト、中間テスト、毎回の課題',
        allowedMaterials: '持ち込みなし、教科書',
        previousFormat: '記載なし',
        pros: [
          '全体的に楽',
          'おそらく出席は必要ない',
          '毎回の課題と3回のテストを受ければ良い',
          '自分の時は最後のテストのみ教科書の持ち込みが可能���った',
        ],
        cons: [
          '特になし',
        ],
        others: [],
      },
      'production-system': {
        name: '生産システム科学',
        instructor: '岩村',
        evaluationCriteria: '出席点あり、期末テスト、中間レポート、毎回の課題（期末テスト、2回に1回対面で課題）',
        allowedMaterials: 'レジュメ、自筆ノート',
        previousFormat: '記載なし',
        pros: [
          '非同期オンラインの授業動画を見る、対面でその内容の演習問題を解き提出するという感じで2週に1回しか出席しなくてよい。期末テストも演習問題とほぼ同じ問題が出る。',
          '授業の偶数回目はオンデマンドで動画を見るだけ。奇数回目は対面であるが、授業をすることはなく動画で出されていた問題を授業中に解くだけ。できた人から先生に確認してもらいOKがもらえればその日の授業は終了。早い人であれば10分程度で終わる。',
          '期末テストも普段の課題から数字を変えたものしか出題されない。ただ、大問3つで60分なので図も書く時間を考えるとあまりゆっくり解いていると間に合わない。解法などは軽く見ておくべき。',
        ],
        cons: [
          '試験時間が60分と短かったため演習問題の模範解答を作って持ち込むぐらいじゃないと全問解けない。',
        ],
        others: [
          '1週目は非同期オンラインで授業、2週目はその内容に関する課題を対面で解いて提出、というサイクルを繰り返す',
          'テストは課題の数字が変わっただけで、持ち込み可なのでテストはカモ',
          '成績は1/4程度がAAでGPCは2.72',
        ],
      },
      'algorithm-data-structure': {
        name: 'アルゴリズムとデータ構造',
        instructor: '柳本',
        evaluationCriteria: '期末テスト（テストが40点以上60点未満の場合のみ、テストの際に持ち込む自筆ノートも対象となる。これの出来によって単位が決まるので、単位が怪しいと思った人はこれをしっかり作る）',
        allowedMaterials: '自筆ノート（表裏1枚のみ）',
        previousFormat: '記載なし',
        pros: [
          '先生がわかるのであれば来なくてもOKとおっしゃっており、出席は自由。ただ、ある程度は出席しておかないとテスト前に大変になる。',
          '基本は期末テスト100%の1本勝負。40〜60点の場合は持ち込み資料が加味されて60点として評価される。',
          'テストの出来が悪そうな人が多かったが、単位を落としたのは10%',
          '副専攻履修者でも8割ほど出席すればBがもらえたので、ちゃんとやれば誰でも単位は取れるはず',
        ],
        cons: [
          '2023年度までの過去問はかなり簡単な印象であったが、2024年は大きく難易度が上がった（特に大問2）。先生も事前に過去問から同じような問題を出すことは絶対にないため、多少難易度は変わる可能性があるが、そこは採点の仕方で考慮するとおっしゃっていた。',
        ],
        others: [
          'GPCは1.90',
          '過去問は前年度のものが配布される代わりに、その問題は絶対に出題されないようです',
        ],
      },
      'geography-basics': {
        name: '地理学基礎',
        instructor: '福田',
        evaluationCriteria: '期末テスト、中間レポート、毎回の課題',
        allowedMaterials: '持ち込みなし',
        previousFormat: '記載なし',
        pros: [
          '出席はたぶんいらない',
          '期末テストの候補問題を事前に公開してくれるのでそこだけ勉強すれば良い',
          'レポートもそこまで難しくない',
          '総評としてとてもおすすめな授業',
        ],
        cons: [
          'とくになし',
        ],
        others: [],
      },
      'it-business': {
        name: '情報技術と企業活動',
        instructor: '渡邊',
        evaluationCriteria: '出席点あり、期末テスト',
        allowedMaterials: '持ち込みなし',
        previousFormat: '記載なし',
        pros: [
          '内容自体はそこまで難しくない',
          '課題などは特にない',
          '一応期末テストの大半は選択問題であること',
          '主に経済について広く学べる。ITパスポートや基本情報・応用情報を取得したい人などにとっては役立つ知識も多いと思う。',
        ],
        cons: [
          '期末テストが範囲が広いのに練習問題などが一切ないのでどう勉強していいのかさっぱりわからず、非常に勉強しにくいこと。周りも苦労していた人が多かった。',
          '100ページくらいある教科書を図表や文章に至るまでひたすら暗記する必要がある',
          '過去問はあるが律儀に毎年問題を変えるらしい',
          '授業を聞いていても説明がよくわからないところがある',
          '教科書を買う必要があるが、担当の先生が書いたものであり誤字脱字が多く見受けられた',
          'テストは○×問題が20問、5択問題が25問程度、論述問題は5題のうちから1題選択する形式。選択式問題の難易度はかなり高く、教科書・資料を細かく覚えておく必要がある。',
          'Cが最も多く、勉強しておかないといい成績をとるのは難しい',
        ],
        others: [
          'GPCは1.76と低め',
        ],
      },
      'network-basics': {
        name: '情報ネットワーク基礎',
        instructor: '石橋',
        evaluationCriteria: '期末テスト、課題（4回程度）',
        allowedMaterials: 'レジュメ、自筆ノート、教科書（紙媒体なら何でもOKだったはず）',
        previousFormat: '記載なし',
        pros: [
          '内容は少し難しく感じるかもしれないが、期末テストは教科書・レジュメ等すべて持ち込み可能なので楽。',
          '試験時間が60分と短いのにもかかわらず大問が10個以上あり、スピーディーに解いていく必要がある。',
          'レジュメにしか書いていないようなことも出題されていたので必ずすべて印刷して持っていくべき。',
          '単位を落とす人はほとんどおらず、半数以上がAとなる。',
        ],
        cons: [
          'お昼ご飯の後＆先生の声が少し小さめなので眠たくなりやすい',
          '話し方がぼそぼそしているため、後ろの方だと声が聞こえません',
          'ほとんどの人が内職するか寝るかしていました',
        ],
        others: [
          'GPCは2.63',
        ],
      },
      'kis-exercise1': {
        name: '知識情報システム学演習1',
        instructor: '小島 ほか',
        evaluationCriteria: '毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          'テストはなく、毎回の課題で100%の成績がつく。普段から頑張っていればそこそこいい成績がつくはず。',
          'Aが最も多くGPCは2.61',
        ],
        cons: [
          '先生によって課題の難易度の差が激しい。',
          '担当教員の1人にほとんど説明をしてくれないような先生もいて、みんなわかっていないような感じだった。',
          '最終課題もかなり難易度差があるのでやりやすいものを選択すると良いと思う。',
          '課題を返してくれる先生と返してくれない先生がいる。',
          '普段の課題と最終課題の配分が分からない。',
        ],
        others: [],
      },
      'human-sustainability': {
        name: '人間システムとサスティナビリティ',
        instructor: '牧岡、東、工藤、高橋',
        evaluationCriteria: '出席点あり、期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          'レポートが書きやすいものが多い',
          '大人数なので内職ばれない',
          '先生が変わるので話のジャンルが広くて面白い',
        ],
        cons: [
          '1限だということ',
          '学類的に興味が無い人はしんどい',
        ],
        others: [
          '内職していてもバレないため、多くの生徒がレポート課題をしている。そのため、PCの打鍵音が聞こえてきて、前の方に座らないと教員の声が聞きとりづらいことがある。',
        ],
      },
      'info-sustainability': {
        name: '情報システムとサステイナビリティ',
        instructor: '菅野、瀬田、宮本、渡邊',
        evaluationCriteria: '期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          '出席取らない',
          '内職しほうだい',
          '学域長の授業がおもしろい',
        ],
        cons: [
          'レポートが難しい',
          '1番成績の付け方がシビア',
        ],
        others: [
          '内職していてもバレないため、多くの生徒がレポート課題をしている。そのため、PCの打鍵音が聞こえてきて、前の方に座らないと教員の声が聞きとりづらいことがある。',
        ],
      },
      'social-sustainability': {
        name: '社会システムとサスティナビリティ',
        instructor: '西田、児島、上柿、山東、田村',
        evaluationCriteria: '出席点あり、期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          '課題が少ない',
          'ミニッツペーパーが50-200語みたいなのもあった',
          '内職ばれない',
          '先生の幅が広く、様々な話が聞ける',
          '座談会がある',
        ],
        cons: [
          'ミニッツペーパーだけの授業があるので、出し忘れると痛い',
          '興味がなければしんどい',
        ],
        others: [
          '内職していてもバレないため、多くの生徒がレポート課題をしている。そのため、PCの打鍵音が聞こえてきて、前の方に座らないと教員の声が聞きとりづらいことがある。',
        ],
      },
      'natural-sustainability': {
        name: '自然システムとサスティナビリティ',
        instructor: '大塚、竹中、伊藤',
        evaluationCriteria: '期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          '課題が無い回が多い',
          'レポートが簡単',
          '小テストの回は友達と協力すればなんとかなる',
          '内職できる',
          '南極の回がおもしろい',
        ],
        cons: [
          '小テストむずい',
          '授業が理系より',
        ],
        others: [],
      },
      'ai-a': {
        name: '人工知能A',
        instructor: '中島',
        evaluationCriteria: '期末テスト、中間テスト、期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '持ち込みなし',
        previousFormat: '記載なし',
        pros: [
          '出席は必要ない',
        ],
        cons: [
          '内容は難しい。テスト自体の難易度が猛烈に高いわけではないが、回数が前半のまとめ、後半のまとめ、期末（全範囲）と3回もある。',
          '囚人のジレンマのコードを組み立てて、そのコードを説明するレポートが2回ある。',
        ],
        others: [],
      },
      'hci': {
        name: 'ヒューマンコンピュータインタラクション',
        instructor: '林',
        evaluationCriteria: '出席点あり、期末レポート、中間レポート、毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          '全体的に楽である',
          '毎回の簡単な課題、3回あるレポートを提出すれば良い',
        ],
        cons: [
          '4回以上欠席すると強制落単なこと',
        ],
        others: [],
      },
      'kis-development': {
        name: '知識情報システムの開発・運営',
        instructor: '青木',
        evaluationCriteria: '出席点・毎回の課題',
        allowedMaterials: '記載なし',
        previousFormat: '記載なし',
        pros: [
          '講義時間中に課題ができたこと',
          '毎回の課題さえ提出していれば単位が出たこと。単位を落としたのはひとりだけ。',
        ],
        cons: [
          '回によって課題の重さが違ったこと',
        ],
        others: [],
      },
      'computer-system': {
        name: 'コンピュータシステム',
        instructor: '太田',
        evaluationCriteria: '毎回の課題、2〜3回に1回のテスト、期末テスト（もしかしたら中間もあったかも。半年以上前の記憶なのであやふやです）',
        allowedMaterials: '持ち込みなし',
        previousFormat: '記載なし',
        pros: [
          'どこかで失敗しても、評価基準が多いため、挽回可能',
          '演習時間をしっかり取ってくれた',
          '知識情報の人には、担当教員が進路相談に乗ってくれていた',
        ],
        cons: [
          'テストが多すぎた',
        ],
        others: [
          '課題は2〜3人で1グループでやります。ちゃんと様式を守らないと未提出扱いになるため注意。',
        ],
      },
    };

    return courses[id] || {
      name: '科目情報',
      instructor: '情報なし',
      evaluationCriteria: '詳細は準備中です。',
      allowedMaterials: '情報なし',
      previousFormat: '情報なし',
      pros: [],
      cons: [],
      others: [],
    };
  };

  const course = getCourseData(courseId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8">
        <Breadcrumb items={[
          { label: 'トップ', href: '/' },
          { label: '現代システム科学域科目一覧', onClick: onNavigateToList },
          { label: course.name },
        ]} />

        <div className="space-y-4 md:space-y-6">
          {/* 科目名 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
            <h1 className="mb-2 text-xl md:text-3xl">{course.name}</h1>
            <p className="text-gray-600 text-sm md:text-base">担当教員：{course.instructor}</p>
          </div>

          {/* 横並び3カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 評価基準 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <h3 className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">評価基準</h3>
              <p className="text-gray-900 text-sm md:text-base">{course.evaluationCriteria}</p>
            </div>

            {/* 前年度授業形態 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <h3 className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">前年度授業形態</h3>
              <p className="text-gray-900 text-sm md:text-base">{course.previousFormat}</p>
            </div>

            {/* テスト持ち込み */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
              <h3 className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">テスト持ち込み</h3>
              <p className="text-gray-900 text-sm md:text-base">{course.allowedMaterials}</p>
            </div>
          </div>

          {/* 良かった点 */}
          {course.pros.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-base md:text-xl">良かった点</h2>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {course.pros.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700 flex-1 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 悪かった点 */}
          {course.cons.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <XCircle className="w-5 h-5 text-red-600" />
                <h2 className="text-base md:text-xl">悪かった点</h2>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {course.cons.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">•</span>
                    <span className="text-gray-700 flex-1 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* その他 */}
          {course.others.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="text-base md:text-xl">その他</h2>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {course.others.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700 flex-1 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 一覧ページに戻るリンク */}
        <div className="mt-6 md:mt-8">
          <a
            href="/courses/specialized/modern-system"
            className="inline-block text-sm md:text-base text-[#2B4DCA] hover:underline"
          >
            ← 現代システム科学域科目一覧に戻る
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}