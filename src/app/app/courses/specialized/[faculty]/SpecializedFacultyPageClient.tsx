'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Breadcrumb } from '@/components/Breadcrumb'
import { GlossaryModal } from '@/components/GlossaryModal'

interface Course {
  id: string
  name: string
  instructor: string
}

const facultyNames: Record<string, string> = {
  'modern-system': '現代システム科学域',
  'science': '理学部',
  'engineering': '工学部',
  'agriculture': '農学部',
  'veterinary': '獣医学部',
  'medicine': '医学部',
  'nursing': '看護学部',
  'human-life': '生活科学部',
  'literature': '文学部',
  'law': '法学部',
  'economics': '経済学部',
  'commerce': '商学部',
}

const facultyData: Record<string, { courses: Course[]; gridCols: string }> = {
  'modern-system': {
    gridCols: 'grid-cols-2 md:grid-cols-3',
    courses: [
      { id: 'marketing-science', name: 'マーケティングサイエンス', instructor: '辻本' },
      { id: 'production-system', name: '生産システム科学', instructor: '岩村' },
      { id: 'algorithm-data-structure', name: 'アルゴリズムとデータ構造', instructor: '柳本' },
      { id: 'geography-basics', name: '地理学基礎', instructor: '福田' },
      { id: 'it-business', name: '情報技術と企業活動', instructor: '渡邊' },
      { id: 'network-basics', name: '情報ネットワーク基礎', instructor: '石橋' },
      { id: 'kis-exercise1', name: '知識情報システム学演習1', instructor: '小島 ほか' },
      { id: 'human-sustainability', name: '人間システムとサスティナビリティ', instructor: '牧岡 ほか' },
      { id: 'info-sustainability', name: '情報システムとサステイナビリティ', instructor: '菅野 ほか' },
      { id: 'social-sustainability', name: '社会システムとサスティナビリティ', instructor: '西田 ほか' },
      { id: 'natural-sustainability', name: '自然システムとサスティナビリティ', instructor: '大塚 ほか' },
      { id: 'ai-a', name: '人工知能A', instructor: '中島' },
      { id: 'hci', name: 'ヒューマンコンピュータインタラクション', instructor: '林' },
      { id: 'kis-development', name: '知識情報システムの開発・運営', instructor: '青木' },
      { id: 'computer-system', name: 'コンピュータシステム', instructor: '太田' },
    ],
  },
  'commerce': {
    gridCols: 'grid-cols-2 md:grid-cols-3',
    courses: [
      { id: 'accounting-basics-asano', name: '会計基礎論', instructor: '浅野' },
      { id: 'marketing-management-kobayashi', name: 'マーケティング管理論', instructor: '小林' },
      { id: 'business-management-matsuo', name: '経営管理論', instructor: '松尾' },
      { id: 'municipal-finance-mizukami', name: '自治体財政論', instructor: '水上' },
      { id: 'urban-transport-kang', name: '都市交通論', instructor: '姜' },
      { id: 'international-management-ishii', name: '国際経営論', instructor: '石井' },
      { id: 'business-admin-nakase', name: '経営学', instructor: '中瀬' },
      { id: 'regional-economics-matsunaga', name: '地域経済論', instructor: '松永' },
      { id: 'sme-theory-honda', name: '中小企業論', instructor: '本多' },
      { id: 'real-estate-intro-kitano', name: '不動産概論', instructor: '北野' },
      { id: 'business-admin-intro-uenoyama', name: '経営学概論', instructor: '上野山' },
      { id: 'management-practice1-kobayashi', name: 'マネジメント実践1', instructor: '小林' },
      { id: 'regional-industry-sekine', name: '地域産業論', instructor: '関根' },
      { id: 'industrial-history-maki', name: '産業史', instructor: '牧' },
      { id: 'business-statistics-takada', name: '経営統計論', instructor: '高田' },
      { id: 'financial-accounting-intro-ishikawa', name: '財務会計概論', instructor: '石川' },
      { id: 'environmental-theory-yokemoto', name: '環境論', instructor: '除本' },
      { id: 'foreign-reading-commerce-maki', name: '外書購読(商学)', instructor: '牧' },
      { id: 'financial-institutions-kitano', name: '金融機関論', instructor: '北野' },
      { id: 'international-accounting-ogata', name: '国際会計論', instructor: '小形' },
      { id: 'public-management-intro-omnibus', name: '公共経営序論', instructor: 'オムニバス' },
      { id: 'international-location-suzuki', name: '国際立地論', instructor: '鈴木' },
      { id: 'foreign-reading-management-ishii', name: '外書講読(経営)', instructor: '石井' },
      { id: 'hrm-theory-ichimura', name: '人的資源管理論', instructor: '市村' },
      { id: 'regional-revitalization-fujitsuka', name: '地域再生論', instructor: '藤塚' },
      { id: 'cultural-policy-yoshida', name: '文化政策論', instructor: '吉田' },
      { id: 'corporate-finance-chen', name: '経営財務論', instructor: '陳' },
      { id: 'business-english-yumiba', name: 'ビジネス英語', instructor: '弓場' },
      { id: 'business-history-nakase', name: '経営史', instructor: '中瀬' },
      { id: 'cost-accounting-boku', name: '原価計算論', instructor: '卜' },
      { id: 'advanced-bookkeeping-okajima', name: '上級簿記', instructor: '岡島' },
      { id: 'business-topics-nakaya', name: 'ビジネス・トピックス', instructor: '中矢' },
      { id: 'corporate-strategy-nakamoto', name: '企業戦略論', instructor: '中本' },
      { id: 'foreign-reading-management-hayashi', name: '外書購読 経営', instructor: '林' },
      { id: 'foreign-reading-accounting-ishikawa', name: '外書購読（会計）', instructor: '石川' },
      { id: 'social-accounting-mukoyama', name: '社会関連会計論', instructor: '向山' },
      { id: 'business-model-ozeki', name: 'ビジネスモデル論', instructor: '小関' },
      { id: 'international-capital-markets-wang', name: '国際資本市場', instructor: '王' },
      { id: 'business-communication-watkins', name: 'ビジネスコミュニケーション', instructor: 'Watkins' },
    ],
  },
}

export default function SpecializedFacultyPageClient({ faculty }: { faculty: string }) {
  const router = useRouter()
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  
  console.log('SpecializedFacultyPageClient rendered with faculty:', faculty)
  
  const facultyName = facultyNames[faculty] || '専門科目'
  const data = facultyData[faculty]
  
  // データが未登録の学部の場合
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header onGlossaryOpen={() => setGlossaryOpen(true)} />
        
        <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6 md:py-8">
          <Breadcrumb items={[
            { label: 'トップ', href: '/' },
            { label: facultyName },
          ]} />
          
          <div className="mb-6 md:mb-8">
            <h1 className="mb-2">{facultyName}</h1>
            <p className="text-gray-600">こちらの学部の科目データは現在準備中です。</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-500 mb-4">📚</p>
            <p className="text-gray-600">科目データは順次追加予定です</p>
          </div>
        </main>

        <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
        <Footer />
      </div>
    )
  }

  const handleCourseClick = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onGlossaryOpen={() => setGlossaryOpen(true)} />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <Breadcrumb items={[
          { label: 'トップ', href: '/' },
          { label: `${facultyName}科目一覧` },
        ]} />

        <div className="mb-6 md:mb-8">
          <h1 className="mb-2">{facultyName}科目一覧</h1>
          <p className="text-gray-600">専門科目のレビューを見ることができます</p>
        </div>

        {/* 科目一覧カード（PC3列・スマホ2列レイアウト） */}
        <div className={`grid ${data.gridCols} gap-3 md:gap-4`}>
          {data.courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 hover:border-[#2B4DCA] hover:shadow-md transition-all text-left"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-sm md:text-base text-[#2B4DCA] hover:underline line-clamp-2">
                  {course.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">担当：{course.instructor}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <Footer />
    </div>
  )
}