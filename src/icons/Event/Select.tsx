import { type Event } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import { Group, Select, ColorInput } from "@mantine/core";
import { ICON_OPTIONS } from "./icons";
import { EventIcon } from "./Icon";

interface EventIconSelectProps {
  value: Event;
  onChange: (value: Event) => void;
}

export const EventIconSelect: React.FC<EventIconSelectProps> = ({
  value,
  onChange,
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

  const handleTypeChange = (type: string | null) => {
    onChange({ ...value, type: type || undefined });
  };

  const handleColorChange = (color: string) => {
    onChange({
      ...value,
      attributes: { ...(value.attributes || {}), icon_color: color },
    });
  };

  const translatedOptions = ICON_OPTIONS.map((option) => ({
    ...option,
    label: t(`event.type.${option.label}`),
  }));

  return (
    <Group>
      <Select
        leftSection={<EventIcon event={value} />}
        defaultValue={translatedOptions[0].value}
        value={value.type}
        onChange={handleTypeChange}
        data={translatedOptions}
        style={{ flex: 1 }}
      />
      <ColorInput
        value={String((value.attributes || {}).icon_color || colors[0])}
        onChange={handleColorChange}
        swatches={colors}
        style={{ flex: 1 }}
      />
    </Group>
  );
};
