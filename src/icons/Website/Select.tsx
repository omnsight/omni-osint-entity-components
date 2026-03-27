import { type Website } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { WebsiteIcon } from "./Icon";

interface WebsiteIconSelectorProps {
  data: Website;
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const WebsiteIconSelector: React.FC<WebsiteIconSelectorProps> = ({
  data,
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`website.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<WebsiteIcon website={data} />}
      defaultValue={translatedOptions[0].value}
      value={value ?? ""}
      onChange={onChange}
      data={translatedOptions}
      error={error}
    />
  );
};

interface WebsiteColorSelectorProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const WebsiteColorSelector: React.FC<WebsiteColorSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
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

interface WebsiteIconSelectProps {
  value: Website;
  onChange: (value: Website) => void;
}

export const WebsiteIconSelect: React.FC<WebsiteIconSelectProps> = ({
  value,
  onChange,
}) => {
  const handleTypeChange = (type: string | null) => {
    onChange({ ...value, title: type || undefined });
  };

  const handleColorChange = (color: string | null) => {
    onChange({
      ...value,
      attributes: { ...(value.attributes || {}), icon_color: color },
    });
  };

  return (
    <Group>
      <WebsiteIconSelector
        data={value}
        value={value.title}
        onChange={handleTypeChange}
      />
      <WebsiteColorSelector
        value={String(value.attributes?.icon_color)}
        onChange={handleColorChange}
      />
    </Group>
  );
};
