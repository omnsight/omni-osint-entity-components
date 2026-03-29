import { type Source } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { SourceIcon } from "./Icon";

interface SourceIconSelectorProps {
  data: Source;
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const SourceIconSelector: React.FC<SourceIconSelectorProps> = ({
  data,
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`source.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<SourceIcon source={data} />}
      value={value}
      placeholder={t("input.icon")}
      onChange={onChange}
      data={translatedOptions}
      error={error}
    />
  );
};

interface SourceColorSelectorProps {
  value?: string;
  onChange: (value: string | null) => void;
  error?: string;
}

export const SourceColorSelector: React.FC<SourceColorSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();
  const colors = [
    "#ababab",
    "#0089ff",
    "#ff0000",
    "#00ba21",
    "#c18c17",
    "#be4bdb",
    "#7950f2",
  ];

  return (
    <ColorInput
      value={value}
      placeholder={t("input.color")}
      onChange={onChange}
      swatches={colors}
      error={error}
    />
  );
};

interface SourceIconSelectProps {
  value: Source;
  onChange: (value: Source) => void;
}

export const SourceIconSelect: React.FC<SourceIconSelectProps> = ({
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
      <SourceIconSelector
        data={value}
        value={value.type}
        onChange={handleTypeChange}
      />
      <SourceColorSelector
        value={value.attributes?.icon_color as string | undefined}
        onChange={handleColorChange}
      />
    </Group>
  );
};
