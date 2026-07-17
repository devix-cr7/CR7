import { Link } from 'react-router-dom'
import { Search, ShieldCheck, Bell, Users } from 'lucide-react'
import { specialties } from '../data/specialties'
import { mockDoctors } from '../data/doctors'
import { DoctorCard } from '../components/DoctorCard'
import { PulseMark } from '../components/PulseMark'

export function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, var(--color-brand), transparent 45%)'
        }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs text-[var(--color-muted)] mb-8">
            <PulseMark className="w-6 h-3.5 text-[var(--color-brand)]" />
            أكثر من 25 تخصص طبي بمكان وحد
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[var(--color-text)] max-w-3xl mx-auto leading-tight">
            احجز موعدك الطبي
            <br />
            <span className="text-[var(--color-brand)]">بدون انتظار على التلفون</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--color-muted)] max-w-xl mx-auto">
            دور على دكتورك المناسب حسب التخصص أو حتى الأعراض، واحجز موعدك مباشرة - تأكيد فوري وتذكير قبل الموعد.
          </p>

          <form className="mt-10 mx-auto max-w-xl flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            <Search className="w-5 h-5 text-[var(--color-muted)] mr-2" />
            <input
              type="text"
              placeholder="دور بالتخصص، اسم الدكتور، أو شنو تعاني منه..."
              className="flex-1 bg-transparent outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] py-2"
            />
            <Link to="/search" className="rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors shrink-0">
              بحث
            </Link>
          </form>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--color-gold)] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text)]">أطباء موثّقون</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">نتحقق من رقم النقابة الطبية لكل دكتور قبل ما يظهر بالمنصة</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-[var(--color-brand)] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text)]">تذكير تلقائي</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">إشعار قبل موعدك بيوم وبساعتين، ما راح تنسى</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-[var(--color-success)] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text)]">سكرتير لكل عيادة</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">موعدك يتراجع من شخص حقيقي، ما هو تأكيد آلي أعمى</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">دور حسب التخصص</h2>
          <Link to="/search" className="text-sm text-[var(--color-brand)] hover:underline">شوف الكل</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {specialties.map((s) => (
            <Link
              key={s.id}
              to={`/search?specialty=${s.id}`}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-center hover:border-[var(--color-brand)]/50 transition-colors"
            >
              <span className="text-sm text-[var(--color-text)]">{s.nameAr}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured doctors */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--color-border)]">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">أطباء موثّقون هالأسبوع</h2>
          <Link to="/search" className="text-sm text-[var(--color-brand)] hover:underline">شوف الكل</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDoctors.slice(0, 6).map((d) => (
            <DoctorCard key={d.id} doctor={d} />
          ))}
        </div>
      </section>

      {/* For doctors CTA */}
      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">إنت دكتور أو تدير عيادة؟</h2>
            <p className="text-sm text-[var(--color-muted)] mt-2">سجل عيادتك واستقبل حجوزات جديدة - 14 يوم تجربة مجانية.</p>
          </div>
          <Link to="/for-doctors" className="rounded-xl bg-[var(--color-brand)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors shrink-0">
            سجل عيادتك
          </Link>
        </div>
      </section>
    </div>
  )
}
