'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '../ui/calendar';
import { Field, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

function formatDate(date) {
  if (!date) return '';

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

export function DatePicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value || new Date());
  const [month, setMonth] = React.useState(date);
  const [inputValue, setInputValue] = React.useState(formatDate(date));

  return (
    <Field className='w-full'>
      <FieldLabel>Date</FieldLabel>

      <InputGroup>
        <InputGroupInput
          value={inputValue}
          placeholder='Select date'
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setInputValue(e.target.value);

            if (isValidDate(newDate)) {
              setDate(newDate);
              setMonth(newDate);
              onChange?.(newDate);
            }
          }}
        />

        <InputGroupAddon align='inline-end'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton variant='ghost' size='icon-xs'>
                  <CalendarIcon />
                </InputGroupButton>
              }
            />
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                mode='single'
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setInputValue(formatDate(selectedDate));
                  onChange?.(selectedDate);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
