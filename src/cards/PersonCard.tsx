import { Badge, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { type Person } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import React from "react";

interface Props {
  person: Person;
  withBorder?: boolean;
  action?: React.ReactNode;
  background?: string;
}

export const PersonCard: React.FC<Props> = ({
  person,
  withBorder = true,
  action,
  background,
}) => {
  const { t } = useTranslation();

  return (
    <Paper withBorder={withBorder} p="xs" bg={background}>
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={0}>
          <Title order={2}>{person.name || t("person.name")}</Title>
          {person.role && (
            <Text c="dimmed">{person.role || t("person.role")}</Text>
          )}
          {person.aliases && (
            <Text truncate="end">
              {t("person.aliases")}: {person.aliases.join(", ")}
            </Text>
          )}
          {person.tags && (
            <Group gap="xs" mt="xs">
              {person.tags.map((tag) => (
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
