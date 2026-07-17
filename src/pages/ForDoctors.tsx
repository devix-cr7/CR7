import { useState } from 'react'
import { CheckCircle2, ShieldCheck, TrendingUp, Users } from 'lucide-react'

const steps = ['بيانات الحساب', 'البيانات المهنية', 'بيانات العيادة', 'السكرتير', 'الباقة', 'المراجعة']

export function ForDoctors() {
  const [step, setStep] = useState(0)

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-[var(--color-text)]">سجل عيادتك بالمنصة</h1>
        <p className="text-[var(--color-muted)] mt-3">14 يوم تجربة مجانية - بدون بطاقة دفع</p>

        <div className="flex justify-center gap-8 mt-8 text-sm text-[var(--color-muted)]">
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--color-brand)]" /> مرضى جدد كل شهر</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[var(--color-gold)]" /> Badge موثّق</span>
          <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[var(--color-success)]" /> إدارة كاملة للمواعيد</span>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border ${
              i < step ? 'bg-[var(--color-success)] border-[var(--color-success)] text-white'
              : i === step ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-white'
              : 'border-[var(--color-border)] text-[var(--color-muted)]'
            }`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-2 text-center hidden md:block">{s}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <h2 className="font-medium text-[var(--color-text)] mb-6">{steps[step]}</h2>

        {step === 0 && (
          <div className="space-y-4">
            <Field label="الاسم الكامل" />
            <Field label="البريد الإلكتروني" type="email" />
            <Field label="كلمة المرور" type="password" />
            <Field label="رقم الهاتف" type="tel" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <Field label="التخصص الرئيسي" />
            <Field label="رقم النقابة الطبية" />
            <Field label="رفع صورة الترخيص" type="file" />
            <Field label="سنوات الخبرة" type="number" />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Field label="اسم العيادة" />
            <Field label="العنوان" />
            <Field label="سعر الكشفية" type="number" />
            <Field label="صور العيادة" type="file" />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <Field label="اسم السكرتير" />
            <Field label="رقم هاتف السكرتير" type="tel" />
            <div className="rounded-xl border border-dashed border-[var(--color-border)] p-4 text-center text-sm text-[var(--color-muted)]">
              راح ترسللها رابط تفعيل تيليكرام بعد إكمال التسجيل
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="grid grid-cols-2 gap-4">
            <PlanCard title="عادي" price="15,000 د.ع" features={['ظهور بالبحث', 'إدارة مواعيد أساسية']} />
            <PlanCard title="موثّق" price="35,000 د.ع" gold features={['Badge موثّق', 'أولوية بالظهور', 'إحصائيات متقدمة']} />
          </div>
        )}
        {step === 5 && (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-[var(--color-success)] mx-auto mb-4" />
            <p className="text-[var(--color-text)]">طلبك جاهز للإرسال</p>
            <p className="text-sm text-[var(--color-muted)] mt-2">راح تستلم رد خلال 24-48 ساعة بعد المراجعة</p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm text-[var(--color-muted)] disabled:opacity-30"
          >
            رجوع
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="rounded-xl bg-[var(--color-brand)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors"
          >
            {step === steps.length - 1 ? 'إرسال للمراجعة' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type = 'text' }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-[var(--color-muted)]">{label}</label>
      <input type={type} className="w-full mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" />
    </div>
  )
}

function PlanCard({ title, price, features, gold }: { title: string; price: string; features: string[]; gold?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${gold ? 'border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5' : 'border-[var(--color-border)]'}`}>
      <h3 className={`font-medium ${gold ? 'text-[var(--color-gold)]' : 'text-[var(--color-text)]'}`}>{title}</h3>
      <p className="text-lg font-semibold text-[var(--color-text)] mt-1">{price}<span className="text-xs text-[var(--color-muted)]"> /شهر</span></p>
      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" /> {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
