import { type Organization } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { OrganizationIcon } from "./Icon";

interface OrganizationIconSelectorProps {
  data: Organization;
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const OrganizationIconSelector: React.FC<
  OrganizationIconSelectorProps
> = ({ data, value, onChange, error }) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`organization.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<OrganizationIcon organization={data} />}
      defaultValue={translatedOptions[0].value}
      value={value ?? ""}
      onChange={onChange}
      data={translatedOptions}
      error={error}
    />
  );
};

interface OrganizationColorSelectorProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const OrganizationColorSelector: React.FC<
  OrganizationColorSelectorProps
> = ({ value, onChange, error }) => {
  const colors = [
    "#0089ff",
    "#ff0000",
    "#00ba21",
    "#c18c17",
    "#be4bdb",
    "#ababab",
    "#7950f2",
  ];

  return (
    <ColorInput
      defaultValue={colors[0]}
      value={value ?? ""}
      onChange={onChange}
      swatches={colors}
      error={error}
    />
  );
};

interface OrganizationIconSelectProps {
  value: Organization;
  onChange: (value: Organization) => void;
}

export const OrganizationIconSelect: React.FC<OrganizationIconSelectProps> = ({
  value,
  onChange,
}) => {
  const handleTypeChange = (type: string | null) => {
    onChange({ ...value, type: type || undefined });
  };

  const handleColorChange = (color: string | null) => {
    onChange({
      ...value,
      attributes: { ...(value.attributes || {}), icon_color: color },
    });
  };

  return (
    <Group>
      <OrganizationIconSelector
        data={value}
        value={value.type}
        onChange={handleTypeChange}
      />
      <OrganizationColorSelector
        value={String(value.attributes?.icon_color)}
        onChange={handleColorChange}
      />
    </Group>
  );
};
