import FirstYearDetailClient from './FirstYearDetailClient';

export const metadata = {
  title: '授業詳細 | クロバス',
  description: '初年次教育科目の授業詳細ページ',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FirstYearDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return <FirstYearDetailClient courseId={id} />;
}
