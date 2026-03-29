import { useState, type PropsWithChildren, type CSSProperties } from "react";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Collapse,
  Divider,
  Group,
  Stack,
  Title,
  UnstyledButton,
  rem,
  Text,
  Badge,
  Select,
  Tooltip,
} from "@mantine/core";
import {
  type Event,
  type Source,
  type Permissive,
} from "omni-osint-crud-client";
import { useTranslation } from "react-i18next";
import countries from "i18n-iso-countries";
import { Controller } from "react-hook-form";
import { EditableAttributes } from "../EditableAttributes";
import { BaseForm } from "../BaseForm";
import { EventIcon } from "@omnsight/osint-entity-components/icons";
import {
  SourceLink,
  AvatarSpan,
} from "@omnsight/osint-entity-components/avatars";
import {
  getAccessLevel,
  getRoles,
  useReadOptions,
  useWriteOptions,
} from "../accessLevel";

interface Props extends PropsWithChildren {
  event: Event;
  sources?: Source[];
  isAdmin?: boolean;
  onUpdate?: (data: Permissive) => void;
  onClose?: () => void;
  onDoubleClick: () => void;
  editModeEnabled: boolean;
  exitButton?: React.ReactNode;
  style?: CSSProperties;
}

export const StaticForm: React.FC<Props> = ({
  event,
  sources = [],
  isAdmin = false,
  onUpdate,
  onClose,
  onDoubleClick,
  editModeEnabled,
  exitButton,
  children,
  style,
}) => {
  const { t, i18n } = useTranslation();
  const [attributesOpen, setAttributesOpen] = useState(false);
  const readOptions = useReadOptions(isAdmin);
  const writeOptions = useWriteOptions();

  return (
    <BaseForm<Event>
      style={style}
      icon={<EventIcon event={event} />}
      title={event.title || t("placeholder.title")}
      titleRight={
        sources && (
          <AvatarSpan showEmptyAvatar={false}>
            {sources.map((source) => (
              <SourceLink key={source._id || source._key} data={source} />
            ))}
          </AvatarSpan>
        )
      }
      onlyShowEditOnDirty={true}
      onClose={() => onClose?.()}
      defaultValues={{
        ...event,
        location: {
          ...event.location,
          sub_locality: event?.location?.sub_locality || "",
          sub_administrative_area:
            event?.location?.sub_administrative_area || "",
        },
      }}
      onUpdate={onUpdate}
      exitButton={exitButton}
    >
      {({ control, formState: { errors } }) => {
        return (
          <Stack
            pos="relative"
            gap="xs"
            style={{
              cursor: editModeEnabled ? "pointer" : "default",
            }}
            onDoubleClick={onDoubleClick}
          >
            <Group gap={4}>
              <Text size="sm" c="dimmed">
                {t("placeholder.type")}:
              </Text>
              <Text size="sm">{event.type}</Text>
            </Group>

            <Group gap="xs" c="dimmed">
              <CalendarDaysIcon style={{ width: rem(18), height: rem(18) }} />
              <Text size="sm">
                {event.happened_at
                  ? new Date(event.happened_at * 1000).toLocaleDateString()
                  : t("placeholder.date")}
              </Text>
            </Group>

            <Group gap="xs" c="dimmed" align="flex-start" wrap="nowrap">
              <MapPinIcon
                style={{
                  width: rem(18),
                  height: rem(18),
                  flexShrink: 0,
                  marginTop: rem(2),
                }}
              />
              <Stack gap={0} style={{ flex: 1 }}>
                <Text size="sm">
                  {[
                    event.location?.address,
                    event.location?.sub_locality,
                    event.location?.locality,
                    event.location?.sub_administrative_area,
                    event.location?.administrative_area,
                    event.location?.country_code
                      ? countries.getName(
                          event.location.country_code,
                          i18n.language.startsWith("zh") ? "zh" : "en",
                          { select: "official" },
                        )
                      : undefined,
                    event.location?.postal_code,
                  ]
                    .filter(Boolean)
                    .join(", ") || t("placeholder.address")}
                </Text>
                <Group>
                  <Text size="sm">
                    Lat: {event.location?.latitude ?? "N/A"}
                  </Text>
                  <Text size="sm">
                    Lon: {event.location?.longitude ?? "N/A"}
                  </Text>
                </Group>
              </Stack>
            </Group>

            <Text size="sm">
              {event.description ||
                t("components.forms.EventForm.eventDescription")}
            </Text>

            <Group gap="xs">
              {(event.tags || []).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </Group>

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
                  <Tooltip label={event.owner?.toUpperCase()[0] || ""}>
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

            {children}

            <Divider my="sm" />

            <UnstyledButton onClick={() => setAttributesOpen((o) => !o)}>
              <Group justify="space-between">
                <Title order={5}>{t("placeholder.attributes")}</Title>
                <ChevronDownIcon
                  style={{
                    width: 16,
                    transform: attributesOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                />
              </Group>
            </UnstyledButton>

            <Collapse in={attributesOpen}>
              <EditableAttributes
                value={event.attributes || {}}
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
