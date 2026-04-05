'use client';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

export function RoleSelector({ role, onRoleChange }) {
  const isAdmin = role === 'admin';

  return (
    <div className='px-4 py-4 flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-sm text-sidebar-foreground px-1'>Role</span>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>
            {isAdmin ? 'Admin' : 'Viewer'}
          </span>
          <Switch
            checked={isAdmin}
            onCheckedChange={(checked) =>
              onRoleChange(checked ? 'admin' : 'viewer')
            }
          />
        </div>
      </div>

      <div className='flex items-center justify-between px-1'>
        <span className='text-xs text-muted-foreground'>Logged in as</span>
        <Badge
          variant='outline'
          className={cn(
            'text-[10px] px-2 py-0 border',
            isAdmin
              ? 'text-primary border-primary/30 bg-primary/5'
              : 'text-muted-foreground border-border',
          )}
        >
          {isAdmin ? 'Admin' : 'Viewer'}
        </Badge>
      </div>
    </div>
  );
}
