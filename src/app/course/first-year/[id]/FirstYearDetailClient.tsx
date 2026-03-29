'use client';

import { useRouter } from 'next/navigation';
import { FirstYearSeminarDetailPage } from '@/pages/FirstYearSeminarDetailPage';

interface FirstYearDetailClientProps {
  courseId: string;
}

export default function FirstYearDetailClient({ courseId }: FirstYearDetailClientProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/courses/first-year-education');
  };

  return (
    <FirstYearSeminarDetailPage
      courseId={courseId}
      isAuthenticated={false}
      onBack={handleBack}
    />
  );
}