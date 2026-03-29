import React, { useState, type CSSProperties } from 'react';
import {
  Stack,
  Group,
  Text,
  ActionIcon,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  TextInput,
  Textarea,
  TagsInput,
} from '@mantine/core';
import { CustomDatePicker } from '../../inputs/CustomDatePicker';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { type Website } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';
import { WebsiteIcon } from '@omnsight/osint-entity-components/icons';
import { WebsiteIconFormSection } from './IconFormSection';

interface Props {
  website: Website;
  onSubmit?: (data: Website) => void;
  onUpdate?: (data: Partial<Website>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const EditingForm: React.FC<Props> = ({
  website,
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
    <BaseForm<Website>
      style={style}
      icon={<WebsiteIcon website={website} />}
      title={t('components.forms.WebsiteForm.title')}
      onClose={handlClose}
      defaultValues={website}
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
          <Group gap="xs">
            <Text size="sm" fw={500}>
              {t('placeholder.title')}
            </Text>
            <Controller
              name="title"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.title')}
                  style={{ flex: 'initial' }}
                  error={errors.title?.message}
                />
              )}
            />
            {website.url && (
              <ActionIcon
                component="a"
                href={website.url}
                target="_blank"
                variant="subtle"
                size="sm"
              >
                <ArrowTopRightOnSquareIcon style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            )}
          </Group>

          <Group gap={4}>
            <Text>{t('placeholder.url')}:</Text>
            <Controller
              name="url"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t('placeholder.url')}
                  error={errors.url?.message}
                />
              )}
            />
          </Group>

          <Group gap={4}>
            <Text>{t('placeholder.description')}:</Text>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  value={field.value || ''}
                  placeholder={t('placeholder.description')}
                />
              )}
            />
          </Group>

          <Group gap={4}>
            <Text size="sm" c="dimmed">
              {t('placeholder.type')}:
            </Text>
            <WebsiteIconFormSection data={website} />
          </Group>

          <Group gap={4}>
            <Text size="sm" c="dimmed">
              {t('placeholder.foundedDate')}:
            </Text>
            <Controller
              name="founded_at"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  value={field.value ? new Date(field.value * 1000) : null}
                  onChange={(date) => field.onChange(date ? date.getTime() / 1000 : 0)}
                  placeholder={t('placeholder.foundedDate')}
                />
              )}
            />
          </Group>

          <Group gap={4}>
            <Text size="sm" c="dimmed">
              {t('placeholder.discoveredDate')}:
            </Text>
            <Controller
              name="discovered_at"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  value={field.value ? new Date(field.value * 1000) : null}
                  onChange={(date) => field.onChange(date ? date.getTime() / 1000 : 0)}
                  placeholder={t('placeholder.discoveredDate')}
                />
              )}
            />
          </Group>

          <Text size="sm" fw={500}>
            {t('placeholder.tags')}
          </Text>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagsInput
                {...field}
                value={field.value || []}
                placeholder={t('placeholder.tags')}
              />
            )}
          />

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
