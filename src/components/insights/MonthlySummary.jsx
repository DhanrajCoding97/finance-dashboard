import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { fmt } from '../../lib/helper';

export default function MonthlySummary({ data }) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
          Monthly Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='divide-y divide-border/40'>
          {data.map((m) => (
            <div
              key={m.label}
              className='flex items-center justify-between py-2.5'
            >
              <span className='text-sm text-muted-foreground'>{m.label}</span>
              <span
                className='text-sm font-medium'
                style={{ color: m.net >= 0 ? '#1D9E75' : '#E24B4A' }}
              >
                {m.net >= 0 ? '+' : ''}
                {fmt(m.net)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
