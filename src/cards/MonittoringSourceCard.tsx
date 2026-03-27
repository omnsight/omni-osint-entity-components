import { Group, Paper, RingProgress, Stack, Text, Title, ScrollArea } from "@mantine/core";
import { type MonitoringSource } from "omni-monitoring-client";
import { useTranslation } from "react-i18next";
import React from "react";

interface Props {
  monitoringSource: MonitoringSource;
  background?: string;
  withBorder?: boolean;
  action?: React.ReactNode;
}

export const MonitoringSourceCard: React.FC<Props> = ({
  monitoringSource,
  background,
  withBorder = true,
  action,
}) => {
  const { t } = useTranslation();

  const reliability = monitoringSource.reliability || 0;
  const color = reliability < 50 ? "red" : reliability < 80 ? "yellow" : "green";

  return (
    <Paper p="xs" bg={background} withBorder={withBorder}>
      <Group justify="space-between" wrap="nowrap" align="flex-start">
        <Stack gap={0}>
          <Group>
            <Title order={2}>
              {monitoringSource.name || t("monitoringSource.name")}
            </Title>
            {monitoringSource.reliability && (
              <RingProgress
                size={36}
                thickness={3}
                roundCaps
                sections={[{ value: reliability, color }]}
                label={
                  <Text c={color} fw={700} ta="center" size="xs" style={{ fontSize: 9 }}>
                    {`${reliability}%`}
                  </Text>
                }
              />
            )}
          </Group>
          {monitoringSource.type && (
            <Text c="dimmed">
              {monitoringSource.type || t("monitoringSource.type")}
            </Text>
          )}
          <ScrollArea h={50} type="auto" offsetScrollbars>
            <Text>
              {monitoringSource.description || t("monitoringSource.description")}
            </Text>
          </ScrollArea>
        </Stack>
        {action}
      </Group>
    </Paper>
  );
};
