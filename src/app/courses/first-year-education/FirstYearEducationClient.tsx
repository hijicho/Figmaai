'use client';

import { useRouter } from 'next/navigation';
import { FirstYearSeminarTimetablePage } from '@/pages/FirstYearSeminarTimetablePage';

export default function FirstYearEducationClient() {
  const router = useRouter();

  const handleCourseClick = (courseId: string) => {
    router.push(`/course/first-year/${courseId}`);
  };

  return (
    <FirstYearSeminarTimetablePage
      isAuthenticated={false}
      onCourseClick={handleCourseClick}
    />
  );
}