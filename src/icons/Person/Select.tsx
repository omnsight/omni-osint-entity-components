import { type Person } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { PersonIcon } from "./Icon";

interface PersonIconSelectorProps {
  data: Person;
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: string;
}

export const PersonIconSelector: React.FC<PersonIconSelectorProps> = ({
  data,
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`person.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<PersonIcon person={data} />}
      value={value}
      placeholder={t("input.icon")}
      onChange={onChange}
      data={translatedOptions}
      error={error}
    />
  );
};

interface PersonColorSelectorProps {
  value?: string;
  onChange: (value: string | null) => void;
  error?: string;
}

export const PersonColorSelector: React.FC<PersonColorSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation();
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
      value={value}
      placeholder={t("input.color")}
      onChange={onChange}
      swatches={colors}
      error={error}
    />
  );
};

interface PersonIconSelectProps {
  value: Person;
  onChange: (value: Person) => void;
}

export const PersonIconSelect: React.FC<PersonIconSelectProps> = ({
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
      <PersonIconSelector
        data={value}
        value={value.type}
        onChange={handleTypeChange}
      />
      <PersonColorSelector
        value={value.attributes?.icon_color as string | undefined}
        onChange={handleColorChange}
      />
    </Group>
  );
};
