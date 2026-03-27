import { Badge, Group, Paper, Stack, Title } from "@mantine/core";
import { type Organization } from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import React from "react";

interface Props {
  organization: Organization;
  withBorder?: boolean;
  action?: React.ReactNode;
  background?: string;
}

export const OrganizationCard: React.FC<Props> = ({
  organization,
  withBorder = true,
  action,
  background,
}) => {
  const { t } = useTranslation();

  return (
    <Paper withBorder={withBorder} p="xs" bg={background}>
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={0}>
          <Title order={2}>{organization.name || t("organization.name")}</Title>
          {organization.tags && (
            <Group gap="xs" mt="xs">
              {organization.tags.map((tag) => (
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
