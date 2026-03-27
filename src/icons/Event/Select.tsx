import { type Event } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { EventIcon } from "./Icon";

interface EventIconSelectorProps {
  data: Event;
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const EventIconSelector: React.FC<EventIconSelectorProps> = ({
  data,
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`event.type.${option.label}`),
  }));

  return (
    <Select
      leftSection={<EventIcon event={data} />}
      defaultValue={translatedOptions[0].value}
      value={value}
      onChange={onChange}
      data={translatedOptions}
      style={{ flex: 1 }}
    />
  );
};

interface EventColorSelectorProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const EventColorSelector: React.FC<EventColorSelectorProps> = ({
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

interface EventIconSelectProps {
  value: Event;
  onChange: (value: Event) => void;
}

export const EventIconSelect: React.FC<EventIconSelectProps> = ({
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
      <EventIconSelector
        data={value}
        value={value.type}
        onChange={handleTypeChange}
      />
      <EventColorSelector 
        value={String(value.attributes?.icon_color)}
        onChange={handleColorChange}
      />
    </Group>
  );
};
