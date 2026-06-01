"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TimetableView } from "@/components/TimetableView";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GlossaryModal } from "@/components/GlossaryModal";
import { convertToTimetableSlots } from "@/lib/generalEducationHelpers";

const categoryNames: Record<string, string> = {
  general: "総合教養科目（般教）",
  "second-language": "第二外国語",
  foundation: "基礎教育科目",
  "first-year-seminar": "初年次教育科目（初ゼミ）",
  "health-sports": "健康・スポーツ科学",
  english: "英語",
  specialized: "専門科目",
};

export default function CategoryPageClient({
  category,
}: {
  category: string;
}) {
  const router = useRouter();
  const categoryName = categoryNames[category] || "カテゴリ";
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  // 初年次教育科目（初ゼミ）用のモックデータ
  const firstYearSeminarSlots = [
    {
      period: 1,
      day: 1, // 火曜日
      courses: [
        {
          id: "fys-3",
          courseCode: "1GBA001005",
          name: "日本近現代史の諸問題について",
          instructor: "住友 陽文",
          credits: 2.0,
          format: "対面",
          level: "A" as const,
          rating: 4.2,
          ratingCount: 8,
        },
        {
          id: "fys-4",
          courseCode: "1GBA001006",
          name: "日本近現代史の諸問題について",
          instructor: "住友 陽文",
          credits: 2.0,
          format: "対面",
          level: "A" as const,
          rating: 4.2,
          ratingCount: 8,
        },
        {
          id: "fys-5",
          courseCode: "1GBA001007",
          name: "判例を読むー法学や刑事事件が好きな人へー",
          instructor: "松倉 治代",
          credits: 2.0,
          format: "対面",
          level: "B" as const,
          rating: 4.0,
          ratingCount: 10,
        },
      ],
    },
    {
      period: 2,
      day: 1, // 火曜日
      courses: [
        {
          id: "fys-1",
          courseCode: "1GBA001003",
          name: "人工知能を知り、考える",
          instructor: "増山 直輝",
          credits: 2.0,
          format: "対面",
          level: "AA" as const,
          rating: 4.5,
          ratingCount: 12,
        },
      ],
    },
    {
      period: 5,
      day: 1, // 火曜日
      courses: [
        {
          id: "fys-2",
          courseCode: "1GBA001004",
          name: "GISを使って地域のことを考えよう",
          instructor: "根本 達也",
          credits: 2.0,
          format: "対面",
          level: "A" as const,
          rating: 4.3,
          ratingCount: 9,
        },
      ],
    },
  ];

  // 般教用のサンプルデータ
  const generalSlots = [
    {
      period: 1,
      day: 0,
      courses: [
        {
          id: "1",
          courseCode: "1GBB001001",
          name: "マクロ経済学入門",
          instructor: "山田太郎",
          credits: 2.0,
          format: "対面",
          level: "AA" as const,
          rating: 4.5,
          ratingCount: 12,
        },
      ],
    },
    {
      period: 1,
      day: 2,
      courses: [
        {
          id: "2",
          courseCode: "1GBB001002",
          name: "心理学概論",
          instructor: "佐藤花子",
          credits: 2.0,
          format: "遠隔",
          level: "A" as const,
          rating: 3.8,
          ratingCount: 2, // 評価数不足
        },
      ],
    },
    {
      period: 2,
      day: 1,
      courses: [
        {
          id: "3",
          courseCode: "1GBB001003",
          name: "社会学入門",
          instructor: "鈴木次郎",
          credits: 2.0,
          format: "対面",
          level: "B" as const,
          rating: 4.2,
          ratingCount: 8,
        },
        {
          id: "4",
          courseCode: "1GBB001004",
          name: "哲学基礎",
          instructor: "田中三郎",
          credits: 2.0,
          format: "遠隔",
          level: "A" as const,
          rating: 4.8,
          ratingCount: 15,
        },
      ],
    },
    {
      period: 3,
      day: 3,
      courses: [
        {
          id: "5",
          courseCode: "1GBB001005",
          name: "文化人類学",
          instructor: "伊藤美咲",
          credits: 2.0,
          format: "対面",
          level: "C" as const,
          rating: 3.5,
          ratingCount: 6,
        },
      ],
    },
    {
      period: 4,
      day: 4,
      courses: [
        {
          id: "6",
          courseCode: "1GBB001006",
          name: "現代社会論",
          instructor: "高橋健一",
          credits: 2.0,
          format: "対面",
          level: "AA" as const,
          rating: 4.9,
          ratingCount: 20,
        },
      ],
    },
  ];

  // カテゴリに応じてデータを切り替え
  const sampleSlots =
    category === "first-year-seminar"
      ? firstYearSeminarSlots
      : category === "general"
        ? convertToTimetableSlots()
        : generalSlots;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onGlossaryOpen={() => setGlossaryOpen(true)} />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8">
        <Breadcrumb
          items={[
            { label: "トップ", href: "/" },
            { label: categoryName },
          ]}
        />

        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="mb-2">{categoryName}</h1>
            <p className="text-gray-600 text-sm">
              授業を選択すると詳細が表示されます
            </p>
          </div>
        </div>

        {/* 凡例（初ゼミと般教のみ表示） */}
        {(category === "first-year-seminar" ||
          category === "general") && (
          <div className="bg-theme-primary-light border border-[#2B4DCA] rounded-xl p-4 mb-6">
            <h3 className="text-sm mb-2">
              Lv（難易度・推奨度）
            </h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: "rgba(252, 156, 90, 0.05)",
                    borderColor: "#fc9c5a",
                    borderWidth: "1px",
                    color: "#fc9c5a",
                  }}
                >
                  AA
                </span>
                <span className="text-gray-700">
                  楽単！！
                  <span className="text-gray-500 text-xs ml-1">
                    （非常にとりやすい）
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: "rgba(248, 37, 1, 0.05)",
                    borderColor: "#f82501",
                    borderWidth: "1px",
                    color: "#f82501",
                  }}
                >
                  A
                </span>
                <span className="text-gray-700">
                  普通
                  <span className="text-gray-500 text-xs ml-1">
                    （順当に取れる）
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: "rgba(39, 172, 73, 0.05)",
                    borderColor: "#27ac49",
                    borderWidth: "1px",
                    color: "#27ac49",
                  }}
                >
                  B
                </span>
                <span className="text-gray-700">
                  興味があれば
                  <span className="text-gray-500 text-xs ml-1">
                    （課題が重め）
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: "rgba(34, 176, 236, 0.05)",
                    borderColor: "#22b0ec",
                    borderWidth: "1px",
                    color: "#22b0ec",
                  }}
                >
                  C
                </span>
                <span className="text-gray-700">
                  よほど興味があれば
                  <span className="text-gray-500 text-xs ml-1">
                    （難易度高め）
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 時間割表 */}
        <TimetableView
          slots={sampleSlots}
          onCourseClick={(courseId) =>
            router.push(`/course/${courseId}`)
          }
        />
      </main>

      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />
      <Footer />
    </div>
  );
}