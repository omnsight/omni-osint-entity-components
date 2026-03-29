import {
  Stack,
  Text,
  Group,
  Divider,
  UnstyledButton,
  Collapse,
  Title,
  rem,
  Tooltip,
  Box,
  Select,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { type Person, type Permissive } from 'omni-osint-crud-client';
import { EditableAttributes } from '../EditableAttributes';
import { type CSSProperties, useState, type PropsWithChildren } from 'react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
import {
  getAccessLevel,
  getRoles,
  useReadOptions,
  useWriteOptions,
} from '../accessLevel';
import { Controller } from 'react-hook-form';
import { BaseForm } from '../BaseForm';
import { PersonIcon } from '@omnsight/osint-entity-components/icons';

interface Props extends PropsWithChildren {
  person: Person;
  isAdmin?: boolean;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
  editModeEnabled: boolean;
}

export const StaticForm: React.FC<Props> = ({
  person,
  isAdmin = false,
  onUpdate,
  onClose,
  onDoubleClick,
  exitButton,
  children,
  style,
  editModeEnabled,
}) => {
  const { t } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);

  const handlClose = () => {
    onClose?.();
  };

  const readOptions = useReadOptions(isAdmin);
  const writeOptions = useWriteOptions();

  return (
    <BaseForm<Person>
      style={style}
      icon={<PersonIcon person={person} />}
      title={person.name || t('components.forms.PersonForm.title')}
      onClose={handlClose}
      defaultValues={person}
      onUpdate={onUpdate}
      exitButton={exitButton}
      onlyShowEditOnDirty={true}
    >
      {({ control, formState: { errors } }) => {
        return (
          <Stack
            pos="relative"
            gap="xs"
            style={{ cursor: editModeEnabled ? 'pointer' : 'default' }}
            onDoubleClick={onDoubleClick}
          >
            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t('placeholder.type')}:
              </Text>
              <Text size="sm">{person.type}</Text>
            </Group>

            <Group gap={4}>
              <Text>{t('placeholder.role')}:</Text>
              <Text>{person.role}</Text>
            </Group>

            <Group gap={4}>
              <Text>{t('placeholder.nationality')}:</Text>
              <Text>{person.nationality}</Text>
            </Group>

            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t('placeholder.birthDate')}:
              </Text>
              <Text size="sm">
                {person.birth_date
                  ? new Date(person.birth_date * 1000).toLocaleDateString()
                  : t('placeholder.birthDate')}
              </Text>
            </Group>

            <Text size="sm">{(person.tags || []).join(', ')}</Text>

            {children}

            {onUpdate && (
              <Group gap="xs" w="100%">
                <Box
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip label={person.owner?.toUpperCase()[0] || ""}>
                    <UserIcon style={{ width: rem(18), height: rem(18) }} />
                  </Tooltip>
                </Box>
                <Box
                  style={{
                    flex: 3,
                    display: "flex",
                  }}
                >
                  {t("placeholder.accessLabel")}:
                </Box>
                <Controller
                  name="read"
                  control={control}
                  rules={{ required: t("common.required") }}
                  render={({ field }) => {
                    return (
                      <Box style={{ flex: 4 }}>
                        <Select
                          value={getAccessLevel(field.value ?? [])}
                          onChange={(value) => field.onChange(getRoles(value))}
                          placeholder={t("placeholder.readAccess")}
                          data={readOptions}
                          clearable
                          error={errors.read?.message}
                        />
                      </Box>
                    );
                  }}
                />
                <Controller
                  name="write"
                  control={control}
                  rules={{ required: t("common.required") }}
                  render={({ field }) => {
                    return (
                      <Box style={{ flex: 4 }}>
                        <Select
                          value={getAccessLevel(field.value ?? [])}
                          onChange={(value) => field.onChange(getRoles(value))}
                          placeholder={t("placeholder.writeAccess")}
                          data={writeOptions}
                          clearable
                          error={errors.write?.message}
                        />
                      </Box>
                    );
                  }}
                />
              </Group>
            )}

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
                value={person.attributes || {}}
                isEditing={false}
                onChange={() => {}}
              />
            </Collapse>
          </Stack>
        );
      }}
    </BaseForm>
  );
};
