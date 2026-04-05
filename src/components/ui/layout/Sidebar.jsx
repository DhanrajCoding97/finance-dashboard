import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp,
  Sun, Moon, Monitor, Menu, X
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useAppContext } from '@/context/AppContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight  },
  { to: '/insights',     label: 'Insights',     icon: Lightbulb       },
]

const themeOptions = [
  { value: 'light',  label: 'Light',  icon: Sun     },
  { value: 'dark',   label: 'Dark',   icon: Moon    },
  { value: 'system', label: 'System', icon: Monitor },
]

export default function Sidebar() {
  const { state, dispatch } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const ThemeIcon = themeOptions.find(t => t.value === state.theme)?.icon ?? Monitor

  const sidebarContent = (
    <aside className="w-56 h-full flex flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <TrendingUp size={14} className="text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm text-sidebar-foreground tracking-tight">
          Track Finance
        </span>
        <div className="ml-auto flex items-center gap-2">
          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <ThemeIcon size={16} className="text-sidebar-foreground hover:text-primary transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => dispatch({ type: 'SET_THEME', payload: value })}
                  className={cn(
                    'flex items-center gap-2 text-sm cursor-pointer',
                    state.theme === value && 'text-primary font-medium'
                  )}
                >
                  <Icon size={13} />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Close button — mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-sidebar-foreground hover:text-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Footer — Role */}
      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-sidebar-foreground px-1">Role</span>
          <Select
            value={state.role}
            onValueChange={(val) => dispatch({ type: 'SET_ROLE', payload: val })}
          >
            <SelectTrigger className="h-8 text-xs bg-background w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">
                <span className="text-xs font-semibold">Admin</span>
              </SelectItem>
              <SelectItem value="viewer">
                <span className="text-xs">Viewer</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">Logged in as</span>
          <Badge
            variant="outline"
            className={cn(
              'text-[10px] px-2 py-0 border',
              state.role === 'admin'
                ? 'text-primary border-primary/30 bg-primary/5'
                : 'text-muted-foreground border-border'
            )}
          >
            {state.role === 'admin' ? 'Admin' : 'Viewer'}
          </Badge>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop — always visible */}
      <div className="hidden md:flex h-screen shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile — burger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border shadow-sm text-foreground"
      >
        <Menu size={18} />
      </button>

      {/* Mobile — backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile — slide-in drawer */}
      <div
        className={cn(
          'md:hidden fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </div>
    </>
  )
}