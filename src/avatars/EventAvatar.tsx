import "@/avatars/layouts/EntityStyles.css";
import { Avatar, Tooltip } from "@mantine/core";
import type { Event, Relation } from "omni-osint-crud-client";
import { RelationTooltip } from "@/avatars/layouts/RelationTooltip";
import { EventIcon } from "@/icons";
import { EventCard } from "@/cards";

interface Props {
  data: Event;
  relation?: Relation;
  renderTooltip?: (data: Event, relation?: Relation) => React.ReactNode;
}

const defaultRenderEventTooltip = (data: Event, relation?: Relation) => {
  return (
    <RelationTooltip relation={relation}>
      <EventCard event={data} withBorder={false} background="transparent" />
    </RelationTooltip>
  );
};

export const EventAvatar: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderEventTooltip,
}) => {
  return (
    <Tooltip
      key={data._id}
      label={renderTooltip(data, relation)}
      withArrow
      withinPortal
      multiline
    >
      <Avatar className="entity-avatar" size="md" radius="xl">
        <EventIcon event={data} />
      </Avatar>
    </Tooltip>
  );
};
