import React, { useState, type CSSProperties, type PropsWithChildren } from 'react';
import {
  Stack,
  Group,
  Text,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  MultiSelect,
  rem,
  Tooltip,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { type Relation, type Permissive } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';

interface Props extends PropsWithChildren {
  relation: Relation;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const StaticForm: React.FC<Props> = ({
  relation,
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
    <BaseForm<Relation>
      style={style}
      title={relation.label || t('components.forms.RelationForm.title')}
      onClose={handlClose}
      defaultValues={relation}
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
          <Group gap={4}>
            <Text size="sm">{t('placeholder.name')}:</Text>
            <Text size="sm">{relation.name}</Text>
          </Group>

          <Group gap={4}>
            <Text size="sm">{t('placeholder.confidence')}:</Text>
            <Text size="sm">{relation.confidence}</Text>
          </Group>

          {children}

          {onUpdate && (
            <Group gap="xs">
              {relation.owner && (
                <Tooltip label={relation.owner?.toUpperCase()[0] || ""}>
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
              value={relation.attributes || {}}
              isEditing={false}
              onChange={() => {}}
            />
          </Collapse>
        </Stack>
      )}
    </BaseForm>
  );
};
