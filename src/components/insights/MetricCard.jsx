import { Card, CardContent } from '../ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
function MetricCard({ label, value, sub, subPositive, icon: Icon, iconColor }) {
  return (
    <Card>
      <CardContent className='pt-5'>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
            {label}
          </span>
          <div
            className='w-8 h-8 rounded-lg flex items-center justify-center'
            style={{ background: iconColor + '20' }}
          >
            <Icon size={16} style={{ color: iconColor }} />
          </div>
        </div>
        <p className='text-2xl font-semibold tracking-tight'>{value}</p>
        {sub && (
          <p
            className='text-xs mt-1 flex items-center gap-1'
            style={{ color: subPositive ? '#1D9E75' : '#E24B4A' }}
          >
            {subPositive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default MetricCard;
