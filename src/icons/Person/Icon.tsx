import { ThemeIcon } from "@mantine/core";
import { UserIcon } from "@heroicons/react/24/solid";
import { type Person } from "omni-osint-crud-client";
import { ICON_OPTIONS } from "./icons";

interface Props {
  person: Person;
  size?: number | string;
  [key: string]: any;
}

/**
 * Renders an icon for a person based on its type.
 * @param person The person object, must contain 'type' and 'attributes'.
 * @param props Additional props to pass to the icon.
 * @returns A component displaying the person icon.
 */
export const PersonIcon: React.FC<Props> = ({ person, size = "md", ...props }) => {
  const iconColor = String((person.attributes || {}).icon_color || "#0089ff");

  const selectedType = ICON_OPTIONS.find(
    (option) => option.value === person.type,
  );
  const Icon = selectedType && selectedType.icon ? selectedType.icon : UserIcon;

  return (
    <ThemeIcon variant="filled" size={size} radius="xl" color={iconColor}>
      <Icon
        style={{ width: "70%", height: "70%", color: "white" }}
        {...props}
      />
    </ThemeIcon>
  );
};
