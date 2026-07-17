import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, ShieldCheck, Clock, Phone } from 'lucide-react'
import { mockDoctors } from '../data/doctors'

const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
const slots = ['09:00', '10:00', '11:00', '17:00', '18:00', '19:00']

export function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctor = mockDoctors.find((d) => d.id === id) ?? mockDoctors[0]
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const isLoggedIn = false // TODO: يجي من auth context حقيقي

  function handleBook() {
    if (!selectedSlot) return
    if (!isLoggedIn) {
      navigate(`/login?redirect=/doctor/${doctor.id}&slot=${selectedSlot}`)
      return
    }
    // TODO: إرسال طلب الحجز فعلياً لـ Supabase
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col md:flex-row gap-6">
        <div className="w-24 h-24 rounded-2xl bg-[var(--color-surface-2)] flex items-center justify-center text-2xl font-semibold text-[var(--color-muted)] shrink-0">
          {doctor.fullName.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">{doctor.fullName}</h1>
            {doctor.tier === 'trusted' && (
              <span className="flex items-center gap-1 rounded-full bg-[var(--color-gold)]/10 px-2.5 py-1 text-xs text-[var(--color-gold)]">
                <ShieldCheck className="w-3.5 h-3.5" /> موثّق
              </span>
            )}
          </div>
          <p className="text-[var(--color-brand)] mt-1">{doctor.specialtyAr}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[var(--color-muted)]">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              {doctor.rating} ({doctor.ratingCount} تقييم)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {doctor.clinicName}، {doctor.city}
            </span>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-4 leading-relaxed">
            استشاري {doctor.specialtyAr} بخبرة أكثر من 10 سنوات، يستقبل الحالات من الأحد للخميس بعيادته بـ{doctor.city}.
          </p>
        </div>
        <div className="text-left shrink-0">
          <p className="text-xs text-[var(--color-muted)]">سعر الكشفية</p>
          <p className="text-xl font-semibold text-[var(--color-text)]">{doctor.fee.toLocaleString()} د.ع</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="font-medium text-[var(--color-text)] flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[var(--color-brand)]" />
          اختار وقت الموعد
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
          {days.map((day, i) => (
            <button
              key={day}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm border transition-colors ${
                i === 0
                  ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-white'
                  : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-xl px-3 py-2.5 text-sm border transition-colors font-mono ${
                selectedSlot === slot
                  ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-white'
                  : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-brand)]/50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleBook}
          disabled={!selectedSlot}
          className="w-full rounded-xl bg-[var(--color-brand)] py-3.5 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {selectedSlot ? `احجز موعد الساعة ${selectedSlot}` : 'اختار وقت أول'}
        </button>
        <p className="text-xs text-[var(--color-muted)] text-center mt-3 flex items-center justify-center gap-1">
          <Phone className="w-3.5 h-3.5" />
          طلبك يروح مباشرة لسكرتير العيادة للتأكيد
        </p>
      </div>
    </div>
  )
}
