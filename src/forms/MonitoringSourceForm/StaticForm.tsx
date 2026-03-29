import React, { useState, type PropsWithChildren } from 'react';
import {
  Stack,
  Group,
  Text,
  Divider,
  Title,
  Collapse,
  UnstyledButton,
} from '@mantine/core';
import { type MonitoringSource } from 'omni-monitoring-client';
import { useTranslation } from 'react-i18next';
import { EditableAttributes } from '../EditableAttributes';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { BaseForm } from '../BaseForm';

interface Props extends PropsWithChildren {
  source: MonitoringSource;
  onClose?: () => void;
  onDoubleClick: () => void;
  editModeEnabled: boolean;
  exitButton?: React.ReactNode;
}

export const StaticForm: React.FC<Props> = ({
  source,
  onClose,
  onDoubleClick,
  editModeEnabled,
  exitButton,
  children,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  return (
    <BaseForm<MonitoringSource>
      title={source.name || t('components.forms.MonitoringSourceForm.title')}
      onClose={handlClose}
      defaultValues={source}
      exitButton={exitButton}
      onlyShowEditOnDirty={true}
    >
      {() => (
        <Stack
          pos="relative"
          gap="xs"
          style={{ cursor: editModeEnabled ? 'pointer' : 'default' }}
          onDoubleClick={onDoubleClick}
        >
          <Text>{source.description || t('placeholder.description')}</Text>

          <Group>
            <Text>{t('placeholder.source.type')}:</Text>
            <Text>{source.type}</Text>
          </Group>
          <Group>
            <Text>{t('placeholder.url')}:</Text>
            <Text>{source.url}</Text>
          </Group>

          <Group>
            <Text>{t('placeholder.reliability')}:</Text>
            <Text>{source.reliability}</Text>
          </Group>
          <Group>
            <Text>{t('placeholder.lastReviewed')}:</Text>
            <Text>
              {source.last_reviewed
                ? new Date(source.last_reviewed * 1000).toLocaleDateString()
                : ''}
            </Text>
          </Group>

          {children}

          <Divider my="sm" />

          <UnstyledButton onClick={() => setAttributesOpen((o) => !o)}>
            <Group justify="space-between">
              <Title order={5}>{t('placeholder.attributes')}</Title>
              <ChevronDownIcon
                style={{
                  width: 16,
                  transform: attributesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                }}
              />
            </Group>
          </UnstyledButton>

          <Collapse in={attributesOpen}>
            <EditableAttributes
              value={source.attributes || {}}
              isEditing={false}
              onChange={() => {}}
            />
          </Collapse>
        </Stack>
      )}
    </BaseForm>
  );
};
