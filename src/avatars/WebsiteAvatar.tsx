import "../avatars/layouts/EntityStyles.css";
import { Avatar, Tooltip } from "@mantine/core";
import type { Website, Relation } from "omni-osint-crud-client";
import { RelationTooltip } from "./layouts/RelationTooltip";
import { WebsiteIcon } from "../icons";
import { WebsiteCard } from "../cards";

interface Props {
  data: Website;
  relation?: Relation;
  renderTooltip?: (data: Website, relation?: Relation) => React.ReactNode;
}

const defaultRenderWebsiteTooltip = (data: Website, relation?: Relation) => {
  return (
    <RelationTooltip relation={relation}>
      <WebsiteCard website={data} withBorder={false} background="transparent" />
    </RelationTooltip>
  );
};

export const WebsiteAvatar: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderWebsiteTooltip,
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
        <WebsiteIcon website={data} />
      </Avatar>
    </Tooltip>
  );
};
