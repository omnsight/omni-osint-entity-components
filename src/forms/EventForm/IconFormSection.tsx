import { Group } from "@mantine/core";
import { type Event } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  EventIconSelector,
  EventColorSelector,
} from "@omnsight/osint-entity-components/icons";

export const IconFormSection = ({ data }: { data: Event }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Event>();
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
          <EventIconSelector
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
          <EventColorSelector
            {...field}
            value={String(field.value)}
            error={errors.attributes?.icon_color?.message}
          />
        )}
      />
    </Group>
  );
};
