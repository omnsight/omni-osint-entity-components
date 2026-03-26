import {
  ActionIcon,
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { type Source } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import React from "react";
import { LinkIcon } from "@heroicons/react/24/solid";

interface Props {
  source: Source;
  withBorder?: boolean;
  action?: React.ReactNode;
  background?: string;
}

export const SourceCard: React.FC<Props> = ({
  source,
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
            <Title>{source.name || t("source.name")}</Title>
            {source.url && (
              <ActionIcon
                variant="subtle"
                size="sm"
                component="a"
                href={source.url}
                target="_blank"
              >
                <LinkIcon />
              </ActionIcon>
            )}
          </Group>
          <Text truncate="end">
            {source.description || t("source.description")}
          </Text>
          {source.tags && (
            <Group gap="xs" mt="xs">
              {source.tags.map((tag) => (
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
