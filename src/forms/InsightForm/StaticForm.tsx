import React, { type PropsWithChildren } from 'react';
import { Group, MultiSelect, rem, Stack, Text, Tooltip } from '@mantine/core';
import { UserIcon } from '@heroicons/react/24/outline';
import type { OsintView, Permissive } from 'omni-osint-crud-client';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';

interface Props extends PropsWithChildren {
  insight: OsintView;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
}

export const StaticForm: React.FC<Props> = ({
  insight,
  onUpdate,
  onClose,
  onDoubleClick,
  exitButton,
  children,
}) => {
  const { t } = useTranslation();

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
    <BaseForm<OsintView>
      title={insight.name || t('placeholder.title')}
      onClose={handlClose}
      defaultValues={insight}
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
          <Text
            size="sm"
            style={{
              color: insight.description
                ? 'var(--mantine-color-text)'
                : 'var(--mantine-color-dimmed)',
              fontStyle: insight.description ? 'normal' : 'italic',
            }}
          >
            {insight.description || t('placeholder.description')}
          </Text>
          {children}

          {onUpdate && (
            <Group gap="xs">
              {insight.owner && (
                <Tooltip label={insight.owner?.toUpperCase()[0] || ""}>
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
        </Stack>
      )}
    </BaseForm>
  );
};
