import { ThemeIcon } from "@mantine/core";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import { type Website } from "omni-osint-crud-client";
import { ICON_OPTIONS } from "./icons";

interface Props {
  website: Website;
  size?: number | string;
  [key: string]: any;
}

/**
 * Renders an icon for a website based on its type.
 * @param website The website object, must contain 'type' and 'attributes'.
 * @param props Additional props to pass to the icon.
 * @returns A component displaying the website icon.
 */
export const WebsiteIcon: React.FC<Props> = ({
  website,
  size = "md",
  ...props
}) => {
  const iconColor = String((website.attributes || {}).icon_color || "#0089ff");

  const selectedType = ICON_OPTIONS.find(
    (option) => option.value === website.type,
  );
  const Icon =
    selectedType && selectedType.icon ? selectedType.icon : GlobeAltIcon;

  return (
    <ThemeIcon variant="filled" size={size} radius="xl" color={iconColor}>
      <Icon
        style={{ width: "70%", height: "70%", color: "white" }}
        {...props}
      />
    </ThemeIcon>
  );
};
