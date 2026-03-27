import "../avatars/layouts/EntityStyles.css";
import { ActionIcon, Avatar, Group, Tooltip, Text } from "@mantine/core";
import type { Source, Relation } from "omni-osint-crud-client";
import { RelationTooltip } from "./layouts/RelationTooltip";
import { SourceIcon } from "../icons";
import { SourceCard } from "../cards";

interface Props {
  data: Source;
  relation?: Relation;
  renderTooltip?: (data: Source, relation?: Relation) => React.ReactNode;
}

const defaultRenderSourceTooltip = (data: Source, relation?: Relation) => {
  return (
    <RelationTooltip relation={relation}>
      <SourceCard source={data} withBorder={false} background="transparent" />
    </RelationTooltip>
  );
};

export const SourceAvatar: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderSourceTooltip,
}) => {
  return (
    <Tooltip
      key={data._id}
      label={renderTooltip(data, relation)}
      position="left"
      withArrow
      withinPortal
      multiline
    >
      <Avatar className="entity-avatar" size="md" radius="xl">
        <SourceIcon source={data} />
      </Avatar>
    </Tooltip>
  );
};

export const SourceAvatarRow: React.FC<Props> = ({
  data,
  relation,
  renderTooltip = defaultRenderSourceTooltip,
}) => {
  return (
    <Group wrap="nowrap" gap={0}>
      <Tooltip
        label={renderTooltip(data, relation)}
        openDelay={500}
        withArrow
        multiline
      >
        <Text size="sm" fw={500} truncate="end">
          {data.name || data.url}
        </Text>
      </Tooltip>
      {data.url && (
        <ActionIcon variant="subtle" size="sm">
          <SourceIcon source={data} />
        </ActionIcon>
      )}
    </Group>
  );
};
