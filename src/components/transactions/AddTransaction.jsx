import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

const schema = z.object({
  description: z.string().min(2, 'Description must be at least 2 characters'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a positive number',
    }),
  date: z.string().min(1, 'Date is required'),
  category: z.string().min(1, 'Please select a category'),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Please select a type' }),
  }),
});

export function AddTransaction({ open, onOpenChange, editTransaction = null }) {
  const { dispatch } = useAppContext();
  const isEditing = !!editTransaction;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      amount: '',
      date: '',
      category: '',
      type: '',
    },
  });
  // Reset form values when editTransaction changes
  useEffect(() => {
    reset({
      description: editTransaction?.description ?? '',
      amount: editTransaction?.amount?.toString() ?? '',
      date: editTransaction?.date ?? '',
      category: editTransaction?.category ?? '',
      type: editTransaction?.type ?? '',
    });
  }, [editTransaction, reset]);

  const onSubmit = (data) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      description: data.description,
      amount: Number(data.amount),
      date: data.date,
      category: data.category,
      type: data.type,
    };
    if (isEditing) {
      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: {
          ...data,
          amount: Number(data.amount),
          id: editTransaction.id,
        },
      });
    } else {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: {
          ...data,
          amount: Number(data.amount),
          id: crypto.randomUUID(),
        },
      });
    }
    // dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit transaction' : 'New transaction'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 py-2'
        >
          {/* Date */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='date'>Date</Label>
            <Input id='date' type='date' {...register('date')} />
            {errors.date && (
              <p className='text-xs text-red-500'>{errors.date.message}</p>
            )}
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              placeholder='e.g. Zomato Order'
              {...register('description')}
            />
            {errors.description && (
              <p className='text-xs text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              type='number'
              placeholder='₹ Enter amount'
              {...register('amount')}
            />
            {errors.amount && (
              <p className='text-xs text-red-500'>{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div className='flex flex-col gap-1.5'>
            <Label>Category</Label>
            <Controller
              name='category'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className='text-xs text-red-500'>{errors.category.message}</p>
            )}
          </div>

          {/* Type */}
          <div className='flex flex-col gap-1.5'>
            <Label>Type</Label>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='income'>Income</SelectItem>
                    <SelectItem value='expense'>Expense</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className='text-xs text-red-500'>{errors.type.message}</p>
            )}
          </div>

          <DialogFooter className='pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type='submit'>
              {isEditing ? 'Save changes' : 'Save transaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
