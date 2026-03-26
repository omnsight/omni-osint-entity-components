import { ThemeIcon } from "@mantine/core";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import { type Organization } from "omni-osint-crud-client";
import { ICON_OPTIONS } from "./icons";

interface Props {
  organization: Organization;
  size?: number | string;
  [key: string]: any;
}

/**
 * Renders an icon for an organization based on its type.
 * @param organization The organization object, must contain 'type' and 'attributes'.
 * @param props Additional props to pass to the icon.
 * @returns A component displaying the organization icon.
 */
export const OrganizationIcon: React.FC<Props> = ({
  organization,
  size = "md",
  ...props
}) => {
  const iconColor = String(
    (organization.attributes || {}).icon_color || "#0089ff",
  );

  const selectedType = ICON_OPTIONS.find(
    (option) => option.value === organization.type,
  );
  const Icon =
    selectedType && selectedType.icon ? selectedType.icon : BuildingOfficeIcon;

  return (
    <ThemeIcon variant="filled" size={size} radius="xl" color={iconColor}>
      <Icon
        style={{ width: "70%", height: "70%", color: "white" }}
        {...props}
      />
    </ThemeIcon>
  );
};
