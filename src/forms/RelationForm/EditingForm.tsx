import React, { useState, type CSSProperties } from 'react';
import {
  Stack,
  Group,
  Text,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  TextInput,
  NumberInput,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { type Relation } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';

interface Props {
  relation: Relation;
  onSubmit?: (data: Relation) => void;
  onUpdate?: (data: Partial<Relation>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const EditingForm: React.FC<Props> = ({
  relation,
  onSubmit,
  onUpdate,
  onClose,
  children,
  style,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  return (
    <BaseForm<Relation>
      style={style}
      title={t('components.forms.RelationForm.title')}
      onClose={handlClose}
      defaultValues={relation}
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
          <Group gap={4}>
            <Text size="sm" fw={500}>
              {t('placeholder.label')}:
            </Text>
            <Controller
              name="label"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.label')}
                  error={errors.label?.message}
                />
              )}
            />
          </Group>

          <Group gap={4}>
            <Text size="sm">{t('placeholder.name')}:</Text>
            <Controller
              name="name"
              control={control}
              rules={{
                required: t('common.required'),
                pattern: {
                  value: /^[a-zA-Z_-]+$/,
                  message: t('components.forms.RelationForm.namePattern'),
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.name')}
                  error={errors.name?.message}
                />
              )}
            />
          </Group>

          <Group gap={4}>
            <Text size="sm">{t('placeholder.confidence')}:</Text>
            <Controller
              name="confidence"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  value={field.value ?? 0}
                  placeholder={t('placeholder.confidence')}
                />
              )}
            />
          </Group>

          {children}

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
