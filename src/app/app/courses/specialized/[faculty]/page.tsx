import SpecializedFacultyPageClient from './SpecializedFacultyPageClient'

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

export async function generateMetadata({ params }: { params: { faculty: string } | Promise<{ faculty: string }> }) {
  const resolvedParams = await params
  const faculty = resolvedParams.faculty
  
  return {
    title: `${facultyNames[faculty] || '専門科目'} - クロバス`,
  }
}

export default async function SpecializedFacultyPage({ params }: { params: { faculty: string } | Promise<{ faculty: string }> }) {
  const resolvedParams = await params
  const faculty = resolvedParams.faculty
  return <SpecializedFacultyPageClient faculty={faculty} />
}