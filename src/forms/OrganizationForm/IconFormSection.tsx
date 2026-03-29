import { Group, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { type Organization } from "omni-osint-crud-client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  OrganizationIconSelector,
  OrganizationColorSelector,
} from "@omnsight/osint-entity-components/icons";

export const OrganizationIconFormSection = ({
  data,
}: {
  data: Organization;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Organization>();
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
          <Stack gap={0}>
            <OrganizationIconSelector
              {...field}
              data={modifiedData}
              value={field.value}
              error={errors.type?.message}
            />
          </Stack>
        )}
      />
      <Controller
        name="attributes.icon_color"
        control={control}
        rules={{ required: t("common.required") }}
        render={({ field }) => (
          <OrganizationColorSelector
            {...field}
            value={field.value as string | undefined}
            error={errors.attributes?.icon_color?.message}
          />
        )}
      />
    </Group>
  );
};
