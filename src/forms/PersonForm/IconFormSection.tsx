import { Stack, Text, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { type Person } from "omni-osint-crud-client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  PersonIconSelector,
  PersonColorSelector,
} from "@omnsight/osint-entity-components/icons";

export const PersonIconFormSection = ({ data }: { data: Person }) => {
  const { control } = useFormContext<Person>();
  const { t } = useTranslation();
  const type = useWatch({ control, name: "type" });
  const iconColor = useWatch({ control, name: "attributes.icon_color" });

  const modifiedData = {
    ...data,
    type: type,
    attributes: { ...data.attributes, icon_color: iconColor },
  };

  return (
    <Group grow>
      <Controller
        name="type"
        control={control}
        rules={{ required: t("common.required") }}
        render={({ field, fieldState: { error } }) => (
          <Stack gap={0}>
            <PersonIconSelector
              {...field}
              data={modifiedData}
              value={field.value}
            />
            {error?.message && (
              <Text c="red" size="xs">
                {error.message}
              </Text>
            )}
          </Stack>
        )}
      />
      <Controller
        name="attributes.icon_color"
        control={control}
        rules={{ required: t("common.required") }}
        render={({ field, fieldState: { error } }) => (
          <Stack gap={0}>
            <PersonColorSelector {...field} value={String(field.value)} />
            {error?.message && (
              <Text c="red" size="xs">
                {error.message}
              </Text>
            )}
          </Stack>
        )}
      />
    </Group>
  );
};
