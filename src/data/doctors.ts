import type { DoctorSummary } from '../components/DoctorCard'

export const mockDoctors: DoctorSummary[] = [
  { id: '1', fullName: 'د. أحمد الجبوري', specialtyAr: 'قلبية', city: 'بغداد', clinicName: 'عيادة القلب التخصصية', fee: 25000, rating: 4.8, ratingCount: 142, tier: 'trusted' },
  { id: '2', fullName: 'د. زينب الكاظمي', specialtyAr: 'نسائية وتوليد', city: 'بغداد', clinicName: 'مركز الحياة الطبي', fee: 20000, rating: 4.9, ratingCount: 210, tier: 'trusted' },
  { id: '3', fullName: 'د. مصطفى العامري', specialtyAr: 'أسنان', city: 'البصرة', clinicName: 'عيادة الابتسامة', fee: 15000, rating: 4.5, ratingCount: 76, tier: 'basic' },
  { id: '4', fullName: 'د. نور الدين حسن', specialtyAr: 'جلدية', city: 'أربيل', clinicName: 'عيادة الجلدية الحديثة', fee: 18000, rating: 4.7, ratingCount: 98, tier: 'basic' },
  { id: '5', fullName: 'د. سارة العبيدي', specialtyAr: 'أطفال', city: 'بغداد', clinicName: 'عيادة براعم', fee: 15000, rating: 4.9, ratingCount: 305, tier: 'trusted' },
  { id: '6', fullName: 'د. علي الفياض', specialtyAr: 'عظام ومفاصل', city: 'النجف', clinicName: 'مركز العظام والمفاصل', fee: 22000, rating: 4.6, ratingCount: 88, tier: 'basic' },
]
