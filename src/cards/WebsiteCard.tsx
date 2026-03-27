import {
  ActionIcon,
  Badge,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { type Website } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import React from "react";
import { LinkIcon } from "@heroicons/react/24/solid";

interface Props {
  website: Website;
  withBorder?: boolean;
  action?: React.ReactNode;
  background?: string;
}

export const WebsiteCard: React.FC<Props> = ({
  website,
  withBorder = true,
  action,
  background,
}) => {
  const { t } = useTranslation();

  return (
    <Paper withBorder={withBorder} p="xs" bg={background}>
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={0}>
          <Group>
            <Title order={2}>{website.title || t("website.title")}</Title>
            {website.url && (
              <ActionIcon
                variant="subtle"
                size="sm"
                component="a"
                href={website.url}
                target="_blank"
              >
                <LinkIcon />
              </ActionIcon>
            )}
          </Group>
          <ScrollArea h={50} type="auto" offsetScrollbars>
            <Text>
              {website.description || t("website.description")}
            </Text>
          </ScrollArea>
          {website.tags && (
            <Group gap="xs" mt="xs">
              {website.tags.map((tag) => (
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
