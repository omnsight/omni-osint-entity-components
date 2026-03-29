import React, {
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import {
  Stack,
  Group,
  Text,
  ActionIcon,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  rem,
  Tooltip,
  Box,
  Select,
} from "@mantine/core";
import {
  ArrowTopRightOnSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { type Website, type Permissive } from "omni-osint-crud-client";
import { EditableAttributes } from "../EditableAttributes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  getAccessLevel,
  getRoles,
  useReadOptions,
  useWriteOptions,
} from "../accessLevel";
import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm";
import { WebsiteIcon } from "@omnsight/osint-entity-components/icons";

interface Props extends PropsWithChildren {
  website: Website;
  isAdmin?: boolean;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
  editModeEnabled: boolean;
}

export const StaticForm: React.FC<Props> = ({
  website,
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
    <BaseForm<Website>
      style={style}
      icon={<WebsiteIcon website={website} />}
      title={website.title || t("components.forms.WebsiteForm.title")}
      onClose={handlClose}
      defaultValues={website}
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
          <Group gap="xs">
            {website.url && (
              <ActionIcon
                component="a"
                href={website.url}
                target="_blank"
                variant="subtle"
                size="sm"
              >
                <ArrowTopRightOnSquareIcon
                  style={{ width: "70%", height: "70%" }}
                />
              </ActionIcon>
            )}
          </Group>

          <Group gap={4}>
            <Text>{website.url}</Text>
          </Group>

          <Group gap={4}>
            <Text>{website.description || t("placeholder.description")}</Text>
          </Group>

          <Group gap={4}>
            <Text size="sm">{website.type}</Text>
          </Group>

          <Group gap={4}>
            <Text size="sm">
              {website.founded_at
                ? new Date(website.founded_at * 1000).toLocaleDateString()
                : t("placeholder.foundedDate")}
            </Text>
          </Group>

          <Group gap={4}>
            <Text size="sm">
              {website.discovered_at
                ? new Date(website.discovered_at * 1000).toLocaleDateString()
                : t("placeholder.discoveredDate")}
            </Text>
          </Group>

          <Text size="sm">{(website.tags || []).join(", ")}</Text>

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
                <Tooltip label={website.owner?.toUpperCase()[0] || ""}>
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
              value={website.attributes || {}}
              isEditing={false}
              onChange={() => {}}
            />
          </Collapse>
        </Stack>
      )}
    </BaseForm>
  );
};
