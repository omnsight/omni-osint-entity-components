import React, {
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import {
  Stack,
  Group,
  Text,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  rem,
  Tooltip,
  Box,
  Select,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { type Relation, type Permissive } from "omni-osint-crud-client";
import { EditableAttributes } from "../EditableAttributes";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  getAccessLevel,
  getRoles,
  useReadOptions,
  useWriteOptions,
} from "../accessLevel";
import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm";

interface Props extends PropsWithChildren {
  relation: Relation;
  isAdmin?: boolean;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
  editModeEnabled: boolean;
}

export const StaticForm: React.FC<Props> = ({
  relation,
  isAdmin = false,
  onUpdate,
  onClose,
  onDoubleClick,
  exitButton,
  children,
  style,
  editModeEnabled,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  const readOptions = useReadOptions(isAdmin);
  const writeOptions = useWriteOptions();

  return (
    <BaseForm<Relation>
      style={style}
      title={relation.label || t("components.forms.RelationForm.title")}
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
          style={{ cursor: editModeEnabled ? "pointer" : "default" }}
          onDoubleClick={onDoubleClick}
        >
          <Group gap={4}>
            <Text size="sm">{t("placeholder.name")}:</Text>
            <Text size="sm">{relation.name}</Text>
          </Group>

          <Group gap={4}>
            <Text size="sm">{t("placeholder.confidence")}:</Text>
            <Text size="sm">{relation.confidence}</Text>
          </Group>

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
                <Tooltip label={relation.owner?.toUpperCase()[0] || ""}>
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

          <Divider my="sm" />

          <UnstyledButton onClick={() => setAttributesOpen((o) => !o)}>
            <Group justify="space-between">
              <Title order={5}>{t("placeholder.attributes")}</Title>
              <ChevronDownIcon
                style={{
                  width: 16,
                  transform: attributesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
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
