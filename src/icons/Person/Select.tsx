import { type Person } from 'omni-osint-crud-client';
import { useTranslation } from 'react-i18next';
import { Group, Select, ColorInput } from '@mantine/core';
import { ICON_OPTIONS } from './icons';
import { PersonIcon } from './Icon';

interface PersonIconSelectorProps {
  data: Person;
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const PersonIconSelector: React.FC<PersonIconSelectorProps> = ({
  data,
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`person.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<PersonIcon person={data} />}
      defaultValue={translatedOptions[0].value}
      value={value}
      onChange={onChange}
      data={translatedOptions}
      style={{ flex: 1 }}
    />
  );
};

interface PersonColorSelectorProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const PersonColorSelector: React.FC<PersonColorSelectorProps> = ({
  value,
  onChange,
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
      value={value || colors[0]}
      onChange={onChange}
      swatches={colors}
      style={{ flex: 1 }}
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
        value={String(value.attributes?.icon_color)}
        onChange={handleColorChange}
      />
    </Group>
  );
};
