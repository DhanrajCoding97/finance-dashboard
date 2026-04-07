import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CategoryBars({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
          Top Expense Categories
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {data.slice(0, 6).map((cat) => {
          const pct = total > 0 ? Math.round((cat.value / total) * 100) : 0;
          return (
            <div key={cat.name} className='flex items-center gap-3'>
              <span className='text-xs text-muted-foreground w-20 truncate'>
                {cat.name}
              </span>
              <div className='flex-1 h-1.5 rounded-full bg-muted overflow-hidden'>
                <div
                  className='h-full rounded-full'
                  style={{ width: `${pct}%`, background: cat.fill }}
                />
              </div>
              <span className='text-xs text-muted-foreground w-8 text-right'>
                {pct}%
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
