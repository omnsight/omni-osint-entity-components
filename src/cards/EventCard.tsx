import { Badge, Group, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { type Event } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import React from "react";

interface Props {
  event: Event;
  background?: string;
  withBorder?: boolean;
  action?: React.ReactNode;
}

export const EventCard: React.FC<Props> = ({
  event,
  background,
  withBorder = true,
  action,
}) => {
  const { t } = useTranslation();

  return (
    <Paper p="xs" bg={background} withBorder={withBorder}>
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={0}>
          <Title order={2}>{event.title || t("event.title")}</Title>
          {event.happened_at && (
            <Text c="dimmed">
              {new Date(event.happened_at * 1000).toLocaleString()}
            </Text>
          )}
          <ScrollArea h={50} type="auto" offsetScrollbars>
            <Text>
              {event.description || t("event.description")}
            </Text>
          </ScrollArea>
          {event.tags && (
            <Group gap="xs" mt="xs">
              {event.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </Group>
          )}
        </Stack>
        {action}
      </Group>
    </Paper>
  );
};
