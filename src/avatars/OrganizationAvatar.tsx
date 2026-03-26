import "@/avatars/layouts/EntityStyles.css";
import { Avatar, Tooltip } from "@mantine/core";
import type { Organization, Relation } from "omni-osint-crud-client";
import { RelationTooltip } from "@/avatars/layouts/RelationTooltip";
import { OrganizationIcon } from "@/icons";
import { OrganizationCard } from "@/cards";

interface Props {
  data: Organization;
  relation?: Relation;
  renderTooltip?: (data: Organization, relation?: Relation) => React.ReactNode;
}

const defaultRenderOrganizationTooltip = (
  data: Organization,
  relation?: Relation
) => {
  return (
    <RelationTooltip relation={relation}>
      <OrganizationCard organization={data} withBorder={false} background="transparent" />
    </RelationTooltip>
  );
};

export const OrganizationAvatar: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderOrganizationTooltip,
}) => {
  return (
    <Tooltip
      key={data._id}
      label={renderTooltip(data, relation)}
      withArrow
      withinPortal
      multiline
    >
      <Avatar alt={data.name || ""} className="entity-avatar" size="md" radius="xl">
        <OrganizationIcon organization={data} />
      </Avatar>
    </Tooltip>
  );
};
