import React from 'react';
import { Stack, Text, Textarea, TextInput } from '@mantine/core';
import type { OsintView } from 'omni-osint-crud-client';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';

interface Props {
  insight: OsintView;
  onSubmit?: (data: OsintView) => void;
  onUpdate?: (data: Partial<OsintView>) => void;
  onClose?: () => void;
}

export const EditingForm: React.FC<Props> = ({
  insight,
  onSubmit,
  onUpdate,
  onClose,
}) => {
  const { t } = useTranslation();

  const handlClose = () => {
    onClose?.();
  };

  return (
    <BaseForm<OsintView>
      title={t('components.forms.InsightForm.title')}
      onClose={handlClose}
      onlyShowEditOnDirty={false}
      defaultValues={insight}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
    >
      {({ control, formState: { errors } }) => (
        <Stack
          pos="relative"
          gap="xs"
          style={{ cursor: 'default' }}
        >
          <Text size="sm" fw={500}>
            {t('placeholder.title')}
          </Text>
          <Controller
            name="name"
            control={control}
            rules={{ required: t('common.required') }}
            render={({ field }) => (
              <TextInput
                {...field}
                autoFocus
                value={field.value || ''}
                placeholder={`${t('placeholder.enter')}${t('placeholder.title')}...`}
                error={errors.name?.message}
              />
            )}
          />

          <Text size="sm">{t('placeholder.description')}</Text>
          <Controller
            name="description"
            control={control}
            rules={{ required: t('common.required') }}
            render={({ field }) => (
              <Textarea
                {...field}
                autosize
                value={field.value || ''}
                placeholder={`${t('placeholder.enter')}${t('placeholder.description')}...`}
                error={errors.description?.message}
              />
            )}
          />
        </Stack>
      )}
    </BaseForm>
  );
};
