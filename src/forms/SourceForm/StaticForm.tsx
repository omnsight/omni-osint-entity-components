import {
  Group,
  Text,
  Stack,
  ActionIcon,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  MultiSelect,
  rem,
  Tooltip,
} from '@mantine/core';
import { ArrowTopRightOnSquareIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { type Source, type Permissive } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { type CSSProperties, useState, type PropsWithChildren } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';
import { SourceIcon } from '@omnsight/osint-entity-components/icons';

interface Props extends PropsWithChildren {
  source: Source;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const StaticForm: React.FC<Props> = ({
  source,
  onUpdate,
  onClose,
  onDoubleClick,
  exitButton,
  children,
  style,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  const readOptions = [
    { value: "guest", label: t("access.guest") },
    { value: "user", label: t("access.user") },
    { value: "pro", label: t("access.pro") },
    { value: "admin", label: t("access.admin") },
  ];

  const writeOptions = [
    { value: "pro", label: t("access.pro") },
    { value: "admin", label: t("access.admin") },
  ];

  return (
    <BaseForm<Source>
      style={style}
      icon={<SourceIcon source={source} />}
      title={source.name || source.url || t('components.forms.SourceForm.title')}
      onClose={handlClose}
      defaultValues={source}
      onUpdate={onUpdate}
      exitButton={exitButton}
      onlyShowEditOnDirty={true}
    >
      {({ control, formState: { errors } }) => (
        <Stack
          pos="relative"
          gap="xs"
          style={{ cursor: 'pointer' }}
          onDoubleClick={onDoubleClick}
        >
          <Group gap="xs">
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
            <Text>{source.url}</Text>
          </Group>

          <Text size="sm">
            {source.description || t('components.forms.SourceForm.sourceDescription')}
          </Text>

          <Group gap={4}>
            <Text size="sm" c="dimmed">
              {t('placeholder.type')}:
            </Text>
            <Text size="sm">{source.type}</Text>
          </Group>

          <Group gap={4}>
            <Text>{t('placeholder.reliability')}:</Text>
            <Text>{source.reliability}</Text>
          </Group>

          <Text>{(source.tags || []).join(', ')}</Text>

          {children}

          {onUpdate && (
            <Group gap="xs">
              {source.owner && (
                <Tooltip label={source.owner?.toUpperCase()[0] || ""}>
                  <UserIcon style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              )}
              <Controller
                name="read"
                control={control}
                rules={{ required: t("common.required") }}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    value={field.value ?? []}
                    placeholder={t("placeholder.country")}
                    data={readOptions}
                    searchable
                    clearable
                    error={errors.read?.message}
                  />
                )}
              />
              <Controller
                name="write"
                control={control}
                rules={{
                  required: t("common.required"),
                  validate: (value) =>
                    (value ?? []).includes("admin") ||
                    t("validation.mustIncludeAdmin"),
                }}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    value={field.value ?? []}
                    placeholder={t("placeholder.country")}
                    data={writeOptions}
                    searchable
                    clearable
                    error={errors.write?.message}
                  />
                )}
              />
            </Group>
          )}

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
            <EditableAttributes
              value={source.attributes || {}}
              isEditing={false}
              onChange={() => {}}
            />
          </Collapse>
        </Stack>
      )}
    </BaseForm>
  );
};
