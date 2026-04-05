import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { DatePicker } from '../ui/date-picker';
import { CATEGORIES } from '@/data/mockData';
export function AddTransaction() {
  const [date, setDate] = useState(null);
  return (
    <Dialog className='h-25'>
      <form>
        <DialogTrigger
          render={<Button variant='outline'>Add Transaction</Button>}
        />
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>New transaction</DialogTitle>
          </DialogHeader>
          {/*  Date */}
          {/* <Field>
              <Label htmlFor='date'>Date</Label>
              <Input id='date' name='date' type='date' />
            </Field> */}
          <FieldGroup>
            <DatePicker value={date} onChange={setDate} />
            {/*  Description */}
            <Field>
              <Label htmlFor='description'>Description</Label>
              <Input
                id='description'
                name='description'
                placeholder='e.g. Zomato Order'
              />
            </Field>
            {/*  Amount */}
            <Field>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                name='amount'
                type='number'
                placeholder='₹ Enter amount'
              />
            </Field>
            {/* Category */}
            <Field>
              <Label>Category</Label>
              <Select name='category'>
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
            </Field>

            {/* Type  */}
            <Field>
              <Label>Type</Label>
              <Select name='type'>
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='income'>Income</SelectItem>
                  <SelectItem value='expense'>Expense</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>Cancel</Button>} />
            <Button type='submit' onClick={() => console.log('submitted')}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
