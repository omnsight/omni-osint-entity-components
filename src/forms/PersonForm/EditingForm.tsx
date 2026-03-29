import {
  Stack,
  Text,
  Group,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  TextInput,
  TagsInput,
} from "@mantine/core";
import { CustomDatePicker } from "../../inputs/CustomDatePicker";
import { useTranslation } from "react-i18next";
import { type Person } from "omni-osint-crud-client";
import { EditableAttributes } from "../EditableAttributes";
import { type CSSProperties, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Controller } from "react-hook-form";
import { BaseForm } from "../BaseForm";
import { PersonIcon } from "@omnsight/osint-entity-components/icons";
import { PersonIconFormSection } from "./IconFormSection";

interface Props {
  person: Person;
  onSubmit?: (data: Person) => void;
  onUpdate?: (data: Partial<Person>) => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export const EditingForm: React.FC<Props> = ({
  person,
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
    <BaseForm<Person>
      style={style}
      icon={<PersonIcon person={person} />}
      title={t("components.forms.PersonForm.title")}
      onClose={handlClose}
      defaultValues={person}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onlyShowEditOnDirty={false}
    >
      {({ control, formState: { errors } }) => {
        return (
          <Stack pos="relative" gap="xs" style={{ cursor: "default" }}>
            <Text size="sm" fw={500}>
              {t("components.forms.PersonForm.name")}
            </Text>
            <Controller
              name="name"
              control={control}
              rules={{ required: t("common.required") }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  value={field.value || ""}
                  placeholder={t("components.forms.PersonForm.name")}
                  error={errors.name?.message}
                />
              )}
            />

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.type")}:
              </Text>
              <PersonIconFormSection data={person} />
            </Group>

            <Group gap={4}>
              <Text>{t("placeholder.role")}:</Text>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    value={field.value || ""}
                    placeholder={t("placeholder.role")}
                    error={errors.role?.message}
                  />
                )}
              />
            </Group>

            <Group gap={4}>
              <Text>{t("placeholder.nationality")}:</Text>
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    value={field.value || ""}
                    placeholder={t("placeholder.nationality")}
                  />
                )}
              />
            </Group>

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.birthDate")}:
              </Text>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    value={field.value ? new Date(field.value * 1000) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.getTime() / 1000 : 0)
                    }
                    placeholder={t("placeholder.birthDate")}
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
