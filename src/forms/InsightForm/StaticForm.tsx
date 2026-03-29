import React, { type PropsWithChildren } from "react";
import { Group, rem, Stack, Text, Tooltip, Box, Select } from "@mantine/core";
import { UserIcon } from "@heroicons/react/24/outline";
import type { OsintView, Permissive } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import {
  getAccessLevel,
  getRoles,
  useReadOptions,
  useWriteOptions,
} from "../accessLevel";
import { BaseForm } from "../BaseForm";

interface Props extends PropsWithChildren {
  insight: OsintView;
  isAdmin?: boolean;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  editModeEnabled: boolean;
  exitButton?: React.ReactNode;
}

export const StaticForm: React.FC<Props> = ({
  insight,
  isAdmin = false,
  onUpdate,
  onClose,
  onDoubleClick,
  editModeEnabled,
  exitButton,
  children,
}) => {
  const { t } = useTranslation();

  const handlClose = () => {
    onClose?.();
  };

  const readOptions = useReadOptions(isAdmin);
  const writeOptions = useWriteOptions();

  return (
    <BaseForm<OsintView>
      title={insight.name || t("placeholder.title")}
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
          style={{ cursor: editModeEnabled ? "pointer" : "default" }}
          onDoubleClick={onDoubleClick}
        >
          <Text
            size="sm"
            style={{
              color: insight.description
                ? "var(--mantine-color-text)"
                : "var(--mantine-color-dimmed)",
              fontStyle: insight.description ? "normal" : "italic",
            }}
          >
            {insight.description || t("placeholder.description")}
          </Text>
          {children}

          {onUpdate && (
            <Group gap="xs" w="100%">
              <Box
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip label={insight.owner?.toUpperCase()[0] || ""}>
                  <UserIcon style={{ width: rem(18), height: rem(18) }} />
                </Tooltip>
              </Box>
              <Box
                style={{
                  flex: 3,
                  display: "flex",
                }}
              >
                {t("placeholder.accessLabel")}:
              </Box>
              <Controller
                name="read"
                control={control}
                rules={{ required: t("common.required") }}
                render={({ field }) => {
                  return (
                    <Box style={{ flex: 4 }}>
                      <Select
                        value={getAccessLevel(field.value ?? [])}
                        onChange={(value) => field.onChange(getRoles(value))}
                        placeholder={t("placeholder.readAccess")}
                        data={readOptions}
                        clearable
                        error={errors.read?.message}
                      />
                    </Box>
                  );
                }}
              />
              <Controller
                name="write"
                control={control}
                rules={{ required: t("common.required") }}
                render={({ field }) => {
                  return (
                    <Box style={{ flex: 4 }}>
                      <Select
                        value={getAccessLevel(field.value ?? [])}
                        onChange={(value) => field.onChange(getRoles(value))}
                        placeholder={t("placeholder.writeAccess")}
                        data={writeOptions}
                        clearable
                        error={errors.write?.message}
                      />
                    </Box>
                  );
                }}
              />
            </Group>
          )}
        </Stack>
      )}
    </BaseForm>
  );
};
