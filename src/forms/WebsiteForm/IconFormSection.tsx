import { Group, Stack, Text } from "@mantine/core";
import {
  WebsiteColorSelector,
  WebsiteIconSelector,
} from "@omnsight/osint-entity-components/icons";
import type { Website } from "omni-osint-crud-client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const WebsiteIconFormSection = ({ data }: { data: Website }) => {
  const { control } = useFormContext<Website>();
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
            <WebsiteIconSelector
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
            <WebsiteColorSelector {...field} value={String(field.value)} />
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
