import "@/avatars/layouts/EntityStyles.css";
import { Avatar, Tooltip } from "@mantine/core";
import type { Person, Relation } from "omni-osint-crud-client";
import { RelationTooltip } from "@/avatars/layouts/RelationTooltip";
import { PersonIcon } from "@/icons";
import { PersonCard } from "@/cards";

interface Props {
  data: Person;
  relation?: Relation;
  renderTooltip?: (data: Person, relation?: Relation) => React.ReactNode;
}

const defaultRenderPersonTooltip = (data: Person, relation?: Relation) => {
  return (
    <RelationTooltip relation={relation}>
      <PersonCard person={data} withBorder={false} background="transparent" />
    </RelationTooltip>
  );
};

export const PersonAvatar: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderPersonTooltip,
}) => {
  return (
    <Tooltip
      key={data._id}
      label={renderTooltip(data, relation)}
      position="top"
      withArrow
      withinPortal
      multiline
    >
      <Avatar alt={data.name || ""} className="entity-avatar" radius="xl" size="md">
        <PersonIcon person={data} />
      </Avatar>
    </Tooltip>
  );
};
