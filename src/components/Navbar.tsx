import { Link } from 'react-router-dom'
import { Menu, Search, User } from 'lucide-react'
import { PulseMark } from './PulseMark'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-ink)]/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-[var(--color-text)]">
          <PulseMark className="w-9 h-5 text-[var(--color-brand)]" />
          <span className="text-lg font-semibold tracking-tight">طبيب.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-muted)]">
          <Link to="/search" className="hover:text-[var(--color-text)] transition-colors">الأطباء</Link>
          <Link to="/for-doctors" className="hover:text-[var(--color-text)] transition-colors">للأطباء والعيادات</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            className="hidden sm:flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-text)] transition-colors"
          >
            <Search className="w-4 h-4" />
            دور على دكتور أو تخصص
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-brand-dim)] transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">تسجيل الدخول</span>
          </Link>
          <button className="md:hidden p-2 text-[var(--color-muted)]">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
