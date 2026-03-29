import { Group } from "@mantine/core";
import {
  SourceColorSelector,
  SourceIconSelector,
} from "@omnsight/osint-entity-components/icons";
import type { Source } from "omni-osint-crud-client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const SourceIconFormSection = ({ data }: { data: Source }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Source>();
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
        render={({ field }) => (
          <SourceIconSelector
            {...field}
            data={modifiedData}
            value={field.value}
            error={errors.type?.message}
          />
        )}
      />
      <Controller
        name="attributes.icon_color"
        control={control}
        rules={{ required: t("common.required") }}
        render={({ field }) => (
          <SourceColorSelector
            {...field}
            value={field.value as string | undefined}
            error={errors.attributes?.icon_color?.message}
          />
        )}
      />
    </Group>
  );
};
