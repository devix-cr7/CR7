import { Link } from 'react-router-dom'
import { Star, MapPin, ShieldCheck } from 'lucide-react'

export interface DoctorSummary {
  id: string
  fullName: string
  specialtyAr: string
  city: string
  clinicName: string
  fee: number
  rating: number
  ratingCount: number
  tier: 'basic' | 'trusted'
  photoUrl?: string
}

export function DoctorCard({ doctor }: { doctor: DoctorSummary }) {
  return (
    <Link
      to={`/doctor/${doctor.id}`}
      className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-brand)]/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-[var(--color-surface-2)] shrink-0 flex items-center justify-center text-[var(--color-muted)] text-xl font-semibold overflow-hidden">
          {doctor.photoUrl ? (
            <img src={doctor.photoUrl} alt={doctor.fullName} className="w-full h-full object-cover" />
          ) : (
            doctor.fullName.charAt(0)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-[var(--color-text)] truncate">{doctor.fullName}</h3>
            {doctor.tier === 'trusted' && (
              <ShieldCheck className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
            )}
          </div>
          <p className="text-sm text-[var(--color-brand)]">{doctor.specialtyAr}</p>
          <p className="flex items-center gap-1 text-xs text-[var(--color-muted)] mt-1">
            <MapPin className="w-3 h-3" /> {doctor.clinicName} · {doctor.city}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
          <span className="font-medium">{doctor.rating.toFixed(1)}</span>
          <span className="text-[var(--color-muted)]">({doctor.ratingCount})</span>
        </div>
        <span className="text-sm font-medium text-[var(--color-text)]">
          {doctor.fee.toLocaleString()} د.ع
        </span>
      </div>
    </Link>
  )
}
