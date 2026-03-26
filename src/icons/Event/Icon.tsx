import { ThemeIcon } from "@mantine/core";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { type Event } from "omni-osint-crud-client";
import { ICON_OPTIONS } from "./icons";

interface Props {
  event: Event;
  size?: number | string;
  [key: string]: any;
}

/**
 * Renders an icon for an event based on its type.
 * @param event The event object, must contain 'type' and 'attributes'.
 * @param props Additional props to pass to the icon.
 * @returns A component displaying the event icon.
 */
export const EventIcon: React.FC<Props> = ({ event, size = "md", ...props }) => {
  const iconColor = String((event.attributes || {}).icon_color || "#0089ff");

  const selectedType = ICON_OPTIONS.find(
    (option) => option.value === event.type,
  );
  const Icon =
    selectedType && selectedType.icon ? selectedType.icon : CalendarDaysIcon;

  return (
    <ThemeIcon size={size} radius="xl" color={iconColor}>
      <Icon style={{ width: "70%", height: "70%", color: "white" }} {...props} />
    </ThemeIcon>
  );
};
