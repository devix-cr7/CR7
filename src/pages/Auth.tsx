import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PulseMark } from '../components/PulseMark'

export function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="text-center mb-8">
        <PulseMark className="w-12 h-6 text-[var(--color-brand)] mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-[var(--color-text)]">
          {redirect ? 'سجل دخولك لإتمام الحجز' : mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h1>
        {redirect && (
          <p className="text-sm text-[var(--color-muted)] mt-2">راح ترجعلك نفس الصفحة بعد التسجيل</p>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex rounded-xl border border-[var(--color-border)] p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 rounded-lg py-2 text-sm transition-colors ${mode === 'login' ? 'bg-[var(--color-brand)] text-white' : 'text-[var(--color-muted)]'}`}
          >
            دخول
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 rounded-lg py-2 text-sm transition-colors ${mode === 'register' ? 'bg-[var(--color-brand)] text-white' : 'text-[var(--color-muted)]'}`}
          >
            حساب جديد
          </button>
        </div>

        <form className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-[var(--color-muted)]">الاسم الكامل</label>
              <input type="text" className="w-full mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" />
            </div>
          )}
          <div>
            <label className="text-xs text-[var(--color-muted)]">رقم الهاتف</label>
            <input type="tel" className="w-full mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" placeholder="07xxxxxxxxx" />
          </div>
          <div>
            <label className="text-xs text-[var(--color-muted)]">كلمة المرور</label>
            <input type="password" className="w-full mt-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-brand)]" />
          </div>

          <button type="submit" className="w-full rounded-xl bg-[var(--color-brand)] py-3 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors">
            {mode === 'login' ? 'دخول' : 'إنشاء الحساب'}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-[var(--color-muted)] mt-6">
        دكتور أو تدير عيادة؟{' '}
        <a href="/for-doctors" className="text-[var(--color-brand)] hover:underline">سجل عيادتك من هنا</a>
      </p>
    </div>
  )
}
