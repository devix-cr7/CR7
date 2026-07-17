export interface Specialty {
  id: string
  nameAr: string
  nameEn: string
  children?: Specialty[]
}

export const specialties: Specialty[] = [
  { id: 'internal', nameAr: 'الباطنية', nameEn: 'Internal Medicine', children: [
    { id: 'cardio', nameAr: 'قلبية', nameEn: 'Cardiology' },
    { id: 'endo', nameAr: 'غدد صماء وسكري', nameEn: 'Endocrinology' },
    { id: 'gastro', nameAr: 'جهاز هضمي وكبد', nameEn: 'Gastroenterology' },
    { id: 'nephro', nameAr: 'كلية', nameEn: 'Nephrology' },
  ]},
  { id: 'surgery', nameAr: 'الجراحة', nameEn: 'Surgery', children: [
    { id: 'ortho', nameAr: 'عظام ومفاصل', nameEn: 'Orthopedics' },
    { id: 'urology', nameAr: 'مسالك بولية', nameEn: 'Urology' },
    { id: 'plastic', nameAr: 'تجميلية وحروق', nameEn: 'Plastic Surgery' },
  ]},
  { id: 'obgyn', nameAr: 'النسائية والتوليد', nameEn: 'OB-GYN' },
  { id: 'pediatrics', nameAr: 'الأطفال', nameEn: 'Pediatrics' },
  { id: 'dental', nameAr: 'الأسنان', nameEn: 'Dentistry' },
  { id: 'ophthalmology', nameAr: 'العيون', nameEn: 'Ophthalmology' },
  { id: 'ent', nameAr: 'أنف وأذن وحنجرة', nameEn: 'ENT' },
  { id: 'derma', nameAr: 'الجلدية', nameEn: 'Dermatology' },
  { id: 'psych', nameAr: 'النفسية والعصبية', nameEn: 'Psychiatry & Neurology' },
]

export interface SymptomEntry {
  symptomAr: string
  specialtyId: string
}

export const symptomsMap: SymptomEntry[] = [
  { symptomAr: 'ألم أسنان', specialtyId: 'dental' },
  { symptomAr: 'ألم بطن', specialtyId: 'internal' },
  { symptomAr: 'طفح جلدي', specialtyId: 'derma' },
  { symptomAr: 'صداع مستمر', specialtyId: 'psych' },
  { symptomAr: 'ألم مفاصل', specialtyId: 'ortho' },
  { symptomAr: 'ألم صدر', specialtyId: 'cardio' },
  { symptomAr: 'حرقة معدة', specialtyId: 'gastro' },
]
