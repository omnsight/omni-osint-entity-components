import {
  Group,
  Text,
  Stack,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  TextInput,
  TagsInput,
} from "@mantine/core";
import { CustomDatePicker } from "../../inputs/CustomDatePicker";
import { useTranslation } from "react-i18next";
import { type Organization } from "omni-osint-crud-client";
import { EditableAttributes } from "../EditableAttributes";
import { type CSSProperties, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm";
import { OrganizationIcon } from "@omnsight/osint-entity-components/icons";
import { OrganizationIconFormSection } from "./IconFormSection";

interface Props {
  organization: Organization;
  onSubmit?: (data: Organization) => void;
  onUpdate?: (data: Partial<Organization>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const EditingForm: React.FC<Props> = ({
  organization,
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
    <BaseForm<Organization>
      style={style}
      icon={<OrganizationIcon organization={organization} />}
      title={t("components.forms.OrganizationForm.title")}
      onClose={handlClose}
      defaultValues={organization}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onlyShowEditOnDirty={false}
    >
      {({ control, formState: { errors } }) => {
        return (
          <Stack pos="relative" gap="xs" style={{ cursor: "default" }}>
            <Group gap={4}>
              <Text size="sm" fw={500}>
                {t("placeholder.name")}
              </Text>
              <Controller
                name="name"
                control={control}
                rules={{ required: t("common.required") }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    value={field.value || ""}
                    placeholder={t("components.forms.OrganizationForm.name")}
                    error={errors.name?.message}
                  />
                )}
              />
            </Group>

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.type")}:
              </Text>
              <OrganizationIconFormSection data={organization} />
            </Group>

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.foundedDate")}:
              </Text>
              <Controller
                name="founded_at"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    value={field.value ? new Date(field.value * 1000) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.getTime() / 1000 : 0)
                    }
                    placeholder={t("placeholder.foundedDate")}
                  />
                )}
              />
            </Group>

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.discoveredDate")}:
              </Text>
              <Controller
                name="discovered_at"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    value={field.value ? new Date(field.value * 1000) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.getTime() / 1000 : 0)
                    }
                    placeholder={t("placeholder.discoveredDate")}
                  />
                )}
              />
            </Group>

            <Text size="sm" fw={500}>
              {t("placeholder.tags")}
            </Text>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsInput
                  {...field}
                  value={field.value || []}
                  placeholder={t("placeholder.tags")}
                />
              )}
            />

            {children}

            <Divider my="sm" />

            <UnstyledButton onClick={() => setAttributesOpen((o) => !o)}>
              <Group justify="space-between">
                <Title order={5}>{t("placeholder.attributes")}</Title>
                <ChevronDownIcon
                  style={{
                    width: 16,
                    transform: attributesOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                />
              </Group>
            </UnstyledButton>

            <Collapse in={attributesOpen}>
              <Controller
                name="attributes"
                control={control}
                render={({ field }) => (
                  <EditableAttributes
                    {...field}
                    value={field.value || {}}
                    isEditing={true}
                  />
                )}
              />
            </Collapse>
          </Stack>
        );
      }}
    </BaseForm>
  );
};
