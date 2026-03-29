import { Group, Stack, Text } from "@mantine/core";
import {
  SourceColorSelector,
  SourceIconSelector,
} from "@omnsight/osint-entity-components/icons";
import type { Source } from "omni-osint-crud-client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const SourceIconFormSection = ({ data }: { data: Source }) => {
  const { control } = useFormContext<Source>();
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
            <SourceIconSelector
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
            <SourceColorSelector {...field} value={String(field.value)} />
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
