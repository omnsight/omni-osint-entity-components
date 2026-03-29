import React, { useState } from 'react';
import {
  Stack,
  Group,
  Text,
  Divider,
  Title,
  Collapse,
  UnstyledButton,
  TextInput,
  Textarea,
  Select,
  Slider,
} from '@mantine/core';
import { CustomDatePicker } from '../../inputs/CustomDatePicker';
import { type MonitoringSource } from 'omni-monitoring-client';
import { useTranslation } from 'react-i18next';
import { EditableAttributes } from '../EditableAttributes';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';

interface Props {
  source: MonitoringSource;
  onSubmit?: (data: MonitoringSource) => void;
  onUpdate?: (data: Partial<MonitoringSource>) => void;
  onClose?: () => void;
}

export const EditingForm: React.FC<Props> = ({
  source,
  onSubmit,
  onUpdate,
  onClose,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  return (
    <BaseForm<MonitoringSource>
      title={t('components.forms.MonitoringSourceForm.title')}
      onClose={handlClose}
      defaultValues={source}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onlyShowEditOnDirty={false}
    >
      {({ control, formState: { errors } }) => (
        <Stack
          pos="relative"
          gap="xs"
          style={{ cursor: 'default' }}
        >
            <Text size="sm" fw={500}>
              {t('components.forms.MonitoringSourceForm.name')}
            </Text>
            <Controller
              name="name"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ''}
                  placeholder={t('components.forms.MonitoringSourceForm.name')}
                  error={errors.name?.message}
                />
              )}
            />

            <Text size="sm" fw={500}>
              {t('placeholder.description')}
            </Text>
            <Controller
              name="description"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.description')}
                  error={errors.description?.message}
                />
              )}
            />

          <Group>
            <Text>{t('placeholder.source.type')}:</Text>
            <Controller
              name="type"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || ''}
                  data={['website', 'twitter', 'telegram'].map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  placeholder={t('placeholder.source.type')}
                  error={errors.type?.message}
                />
              )}
            />
          </Group>
          <Group>
            <Text>{t('placeholder.url')}:</Text>
            <Controller
              name="url"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.url')}
                  error={errors.url?.message}
                />
              )}
            />
          </Group>

          <Group>
            <Text>{t('placeholder.reliability')}:</Text>
            <Controller
              name="reliability"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <Slider
                  {...field}
                  value={field.value || 0}
                  min={0}
                  max={100}
                  style={{ flex: 1 }}
                  label={(value) => `${value}%`}
                />
              )}
            />
          </Group>
          <Group>
            <Text>{t('placeholder.lastReviewed')}:</Text>
            <Controller
              name="last_reviewed"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <CustomDatePicker
                  value={field.value ? new Date(field.value * 1000) : null}
                  onChange={(date) => field.onChange(date ? date.getTime() / 1000 : 0)}
                  placeholder={t('placeholder.lastReviewed')}
                  error={errors.last_reviewed?.message}
                />
              )}
            />
          </Group>

          <Divider my="sm" />

          <UnstyledButton onClick={() => setAttributesOpen((o) => !o)}>
            <Group justify="space-between">
              <Title order={5}>{t('placeholder.attributes')}</Title>
              <ChevronDownIcon
                style={{
                  width: 16,
                  transform: attributesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                }}
              />
            </Group>
          </UnstyledButton>

          <Collapse in={attributesOpen}>
            <Controller
              name="attributes"
              control={control}
              render={({ field }) => (
                <EditableAttributes {...field} value={field.value || {}} isEditing={true} />
              )}
            />
          </Collapse>
        </Stack>
      )}
    </BaseForm>
  );
};
