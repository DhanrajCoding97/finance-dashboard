import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp,Sun, Moon, Monitor } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useAppContext } from '@/context/AppContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/transactions',  label: 'Transactions',   icon: ArrowLeftRight  },
  { to: '/insights',      label: 'Insights',       icon: Lightbulb       },
]

const themeOptions = [
  { value: 'light',  label: 'Light',  icon: Sun     },
  { value: 'dark',   label: 'Dark',   icon: Moon    },
  { value: 'system', label: 'System', icon: Monitor },
]

export default function Sidebar() {
  const { state, dispatch } = useAppContext()
  const ThemeIcon = themeOptions.find(t => t.value === state.theme)?.icon ?? Monitor


  return (
    <aside className="w-56 shrink-0 h-screen flex flex-col border-r border-border bg-sidebar">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <TrendingUp size={14} className="text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm text-sidebar-foreground tracking-tight">
          FinTrack
        </span>
        {/* Theme toggle */}
        <div className='ml-auto'>
        <DropdownMenu >
          <DropdownMenuTrigger name="theme toggle">
              <ThemeIcon size={18} className='dark:text-white'/>
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
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
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

      {/* Footer — Role + Theme */}
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Role switcher */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground dark:text-white px-1">Role</span>
          <Select
            value={state.role}
            onValueChange={(val) => dispatch({ type: 'SET_ROLE', payload: val })}
          >
            <SelectTrigger className="h-8 text-xs bg-background text-black dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">
                <div className="flex items-center gap-2">
                  <span className='text-xs font-semibold'>Admin</span>
                </div>
              </SelectItem>
              <SelectItem value="viewer">
                <div className="flex items-center gap-2">
                  <span>Viewer</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current role indicator */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-white">Logged in as</span>
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
}