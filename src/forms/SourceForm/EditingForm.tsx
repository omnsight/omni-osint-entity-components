import {
  Group,
  Text,
  Stack,
  ActionIcon,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  TextInput,
  NumberInput,
  TagsInput,
  Textarea,
} from '@mantine/core';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { type Source } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { type CSSProperties, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';
import { SourceIcon } from '@omnsight/osint-entity-components/icons';
import { SourceIconFormSection } from './IconFormSection';

interface Props {
  source: Source;
  onSubmit?: (data: Source) => void;
  onUpdate?: (data: Partial<Source>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const EditingForm: React.FC<Props> = ({
  source,
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
    <BaseForm<Source>
      style={style}
      icon={<SourceIcon source={source} />}
      title={t('components.forms.SourceForm.title')}
      onClose={handlClose}
      defaultValues={source}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onlyShowEditOnDirty={false}
    >
      {({ control, formState: { errors } }) => {
        return (
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
                name="name"
                control={control}
                rules={{ required: t('common.required') }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    value={field.value || source.url || ''}
                    placeholder={t('placeholder.title')}
                    style={{ flex: 'initial' }}
                    error={errors.name?.message}
                  />
                )}
              />
              {source.url && (
                <ActionIcon
                  component="a"
                  href={source.url}
                  target="_blank"
                  variant="subtle"
                  size="sm"
                >
                  <ArrowTopRightOnSquareIcon style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
              )}
            </Group>

            <Group gap={4} wrap="nowrap">
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

            <Text size="sm" fw={500}>
              {t('placeholder.description')}
            </Text>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  value={field.value || ''}
                  placeholder={t('components.forms.SourceForm.sourceDescription')}
                />
              )}
            />

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t('placeholder.type')}:
              </Text>
              <SourceIconFormSection data={source} />
            </Group>

            <Group gap={4}>
              <Text>{t('placeholder.reliability')}:</Text>
              <Controller
                name="reliability"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    value={field.value || 0}
                    placeholder={t('placeholder.reliability')}
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
        );
      }}
    </BaseForm>
  );
};
