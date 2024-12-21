import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Flex, Input, Stack } from '@chakra-ui/react';
import { API_BASE_URL } from '@/util';
import { Field } from './ui/field';
import { Button } from './ui/button';
import { NativeSelectField, NativeSelectRoot } from './ui/native-select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ type, task }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:
      type === 'update'
        ? {
            ...task,
            due: task.due ? new Date(task.due) : '',
          }
        : {},
  });

  const navigate = useNavigate();

  const doSubmit = async (values) => {
    if (type === 'create') {
      const res = await fetch(`${API_BASE_URL}/tasks/create`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      if (res.status === 200) {
        toast.success(`New Task Created: ${values.name}`);
        navigate(`/tasks/${response.insertedId}`);
      } else {
        toast.error(response.message);
      }
    }

    if (type === 'update') {
      delete values._id;
      const res = await fetch(`${API_BASE_URL}/tasks/${task._id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      if (res.status === 200) {
        toast.success(`Task Updated: ${values.name}`);
        navigate(`/tasks/${task._id}`);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
        <Flex direction="column" flex={1} gap={4}>
          <Field invalid={errors.name} errorText={errors.name?.message}>
            <Input
              id="name"
              type="text"
              placeholder="Task Name"
              {...register('name', { required: 'Task Name is required' })}
            />
          </Field>
          <Field
            invalid={errors.description}
            errorText={errors.description?.message}
          >
            <Input
              id="description"
              type="text"
              placeholder="Description"
              {...register('description', {
                required: 'Description is required',
              })}
            />
          </Field>
        </Flex>
        <Flex direction="column" flex={1} gap={4}>
          <Field invalid={errors.priority} errorText={errors.priority?.message}>
            <NativeSelectRoot>
              <NativeSelectField
                placeholder="Priority"
                {...register('priority', { required: 'Priority is required' })}
              >
                <option value="urgent">Urgent</option>
                <option value="not urgent">Not Urgent</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          <Field invalid={errors.status} errorText={errors.status?.message}>
            <NativeSelectRoot>
              <NativeSelectField
                placeholder="Status"
                {...register('status', { required: 'Status is required' })}
              >
                <option value="open">Open</option>
                <option value="done">Done</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
          <Field
            css={{
              '& .react-datepicker-wrapper': {
                width: '100%',
              },
            }}
          >
            <Controller
              control={control}
              name="due"
              render={({ field }) => (
                <Input id="due" {...field} asChild>
                  <DatePicker
                    selected={field.value}
                    showTimeSelect
                    dateFormat="MM/dd/yyy h:mm aa"
                    placeholderText="Due Date (Optional)"
                  />
                </Input>
              )}
            />
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorPalette="teal"
            textTransform="uppercase"
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
