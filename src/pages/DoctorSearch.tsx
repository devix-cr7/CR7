import { useState } from 'react'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import { specialties } from '../data/specialties'
import { mockDoctors } from '../data/doctors'
import { DoctorCard } from '../components/DoctorCard'

export function DoctorSearch() {
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="flex-1 flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <Search className="w-4 h-4 text-[var(--color-muted)]" />
          <input
            type="text"
            placeholder="اسم الدكتور، التخصص، أو الأعراض..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--color-muted)]"
          />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
          <MapPin className="w-4 h-4 text-[var(--color-muted)]" />
          <select className="bg-transparent outline-none text-sm text-[var(--color-muted)]">
            <option>كل المدن</option>
            <option>بغداد</option>
            <option>البصرة</option>
            <option>أربيل</option>
            <option>النجف</option>
          </select>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
          <SlidersHorizontal className="w-4 h-4" />
          فلترة
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
        <button
          onClick={() => setActiveSpecialty(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm border transition-colors ${
            activeSpecialty === null
              ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-white'
              : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          الكل
        </button>
        {specialties.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSpecialty(s.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm border transition-colors ${
              activeSpecialty === s.id
                ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-white'
                : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {s.nameAr}
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--color-muted)] mb-4">{mockDoctors.length} دكتور متوفر</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockDoctors.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>
    </div>
  )
}
