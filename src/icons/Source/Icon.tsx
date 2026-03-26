import { ThemeIcon } from "@mantine/core";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { type Source } from "omni-osint-crud-client";
import { ICON_OPTIONS } from "./icons";

interface Props {
  source: Source;
  size?: number | string;
  [key: string]: any;
}

/**
 * Renders an icon for a source based on its type.
 * @param source The source object, must contain 'type' and 'attributes'.
 * @param props Additional props to pass to the icon.
 * @returns A component displaying the source icon.
 */
export const SourceIcon: React.FC<Props> = ({ source, size = "md", ...props }) => {
  const iconColor = String((source.attributes || {}).icon_color || "#ababab");

  const selectedType = ICON_OPTIONS.find(
    (option) => option.value === source.type,
  );
  const Icon =
    selectedType && selectedType.icon ? selectedType.icon : DocumentIcon;

  return (
    <ThemeIcon variant="filled" size={size} radius="xl" color={iconColor}>
      <Icon
        style={{ width: "70%", height: "70%", color: "white" }}
        {...props}
      />
    </ThemeIcon>
  );
};
