import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import type {
  Person,
  Organization,
  Event,
  Source,
  Website,
  Relation,
  OsintView,
} from "omni-osint-crud-client";
import type { MonitoringSource } from "omni-monitoring-client";
import {
  AvatarDropdown,
  AvatarRowList,
  AvatarSpan,
  EmptyAvatar,
  EventAvatar,
  OrganizationAvatar,
  PersonAvatar,
  SourceAvatar,
  WebsiteAvatar,
} from "./avatars";
import {
  EventIcon,
  EventIconSelect,
  OrganizationIcon,
  OrganizationIconSelect,
  PersonIcon,
  PersonIconSelect,
  SourceIcon,
  SourceIconSelect,
  WebsiteIcon,
  WebsiteIconSelect,
} from "./icons";
import {
  EventCard,
  OrganizationCard,
  PersonCard,
  SourceCard,
  WebsiteCard,
  MonitoringSourceCard,
} from "./cards";
import {
  EventForm,
  InsightForm,
  MonitoringSourceForm,
  OrganizationForm,
  PersonForm,
  RelationForm,
  SourceForm,
  WebsiteForm,
} from "./forms";

function App() {
  const { i18n } = useTranslation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [isAdmin, setIsAdmin] = useState(true);
  const [person, setPerson] = useState<Person>({
    _id: "person/1",
    name: "John Doe",
    role: "professional",
    aliases: ["John", "Johnny"],
    tags: ["tag1", "tag2"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [organization, setOrganization] = useState<Organization>({
    _id: "org/1",
    name: "Acme Inc.",
    tags: ["company", "software"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [event, setEvent] = useState<Event>({
    _id: "event/1",
    title: "New Product Launch",
    description: "The launch of a new product",
    happened_at: new Date().getTime() / 1000,
    tags: ["new-product", "launch"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [source, setSource] = useState<Source>({
    _id: "source/1",
    name: "News Article",
    url: "https://example.com/article",
    description: "A news article about something.",
    tags: ["news", "article"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [source2, ] = useState<Source>({
    _id: "source/2",
    name: "Sample Artical 2",
    url: "https://example.com/article/2",
    description: "A news article about something 2",
    tags: ["news", "article", "2"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [website, setWebsite] = useState<Website>({
    _id: "website/1",
    url: "https://example.com",
    title: "Example Website",
    description: "An example website.",
    tags: ["website", "example"],
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [relation, setRelation] = useState<Relation>({
    _id: "relation/1",
    _from: "person/1",
    _to: "org/1",
    label: "相关人物/组织",
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });
  const [monitoringSource, setMonitoringSource] = useState<MonitoringSource>({
    name: "Test Monitoring Source",
    description:
      "This is a test description for the monitoring source card. It should truncate after a certain point to avoid overflowing the card.",
    reliability: 75,
    owner: "asj1834s",
  });
  const [insight, setInsight] = useState<OsintView>({
    _id: "insight/1",
    name: "My test analysis",
    description: "Analysis description",
    owner: "asj1834s",
    read: ["admin"],
    write: ["admin"],
  });

  const cardStyle = {
    height: 500,
    width: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSubmit = (data: any) => {
    console.log("Submit:", data);
  };

  const handleUpdate = (setter: Function) => (data: any) => {
    setter((prev: any) => ({ ...prev, ...data }));
  };

  const exitButton = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ArrowRightIcon style={{ width: 18, height: 18 }} />
    </ActionIcon>
  );

  return (
    <>
      <Group>
        <Button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
          }
        >
          Toggle Language
        </Button>
        <Button
          onClick={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          Toggle Theme
        </Button>
        <Button onClick={() => setIsAdmin((p) => !p)}>Toggle Admin</Button>
      </Group>
      <ScrollArea style={{ height: "100vh" }}>
        <Stack p="lg" gap="lg">
          <Text size="xl" fw={700}>
            Original Components
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <Card withBorder style={cardStyle}>
              <Text>Avatar List</Text>
              <AvatarRowList>
                <EventAvatar data={event} relation={relation} key={1} />
                <OrganizationAvatar
                  data={organization}
                  relation={relation}
                  key={2}
                />
                <PersonAvatar data={person} relation={relation} key={3} />
                <SourceAvatar data={source} relation={relation} key={4} />
                <WebsiteAvatar data={website} relation={relation} key={5} />
                <EmptyAvatar />
              </AvatarRowList>
            </Card>
            <Card withBorder style={cardStyle}>
              <Text>Avatar Dropdown</Text>
              <AvatarDropdown
                avatarOnOpen={<Text>+</Text>}
                avatarOnClose={<Text>-</Text>}
              >
                <SourceAvatar data={source} relation={relation} key={1} />
                <SourceAvatar data={source} relation={relation} key={2} />
                <SourceAvatar data={source} relation={relation} key={3} />
              </AvatarDropdown>
            </Card>
            <Card withBorder style={cardStyle}>
              <Text>Avatar Span</Text>
              <AvatarSpan>
                <EventAvatar data={event} relation={relation} key={1} />
                <OrganizationAvatar
                  data={organization}
                  relation={relation}
                  key={2}
                />
                <PersonAvatar data={person} relation={relation} key={3} />
                <SourceAvatar data={source} relation={relation} key={4} />
                <WebsiteAvatar data={website} relation={relation} key={5} />
                <EmptyAvatar />
              </AvatarSpan>
            </Card>

            <Card withBorder style={cardStyle}>
              <Text>Avatars: </Text>
              <EmptyAvatar />
              <EventAvatar data={event} />
              <OrganizationAvatar data={organization} />
              <PersonAvatar data={person} />
              <SourceAvatar data={source} />
              <WebsiteAvatar data={website} />
            </Card>

            <Card withBorder style={cardStyle}>
              <Text>Icons</Text>
              <EventIcon event={event} />
              <OrganizationIcon organization={organization} />
              <PersonIcon person={person} />
              <SourceIcon source={source} />
              <WebsiteIcon website={website} />
            </Card>

            <Card withBorder style={cardStyle}>
              <Text>Icon Select</Text>
              <Text>Person:</Text>
              <PersonIconSelect value={person} onChange={setPerson} />
              <Text>Organization:</Text>
              <OrganizationIconSelect
                value={organization}
                onChange={setOrganization}
              />
              <Text>Event:</Text>
              <EventIconSelect value={event} onChange={setEvent} />
              <Text>Source:</Text>
              <SourceIconSelect value={source} onChange={setSource} />
              <Text>Website:</Text>
              <WebsiteIconSelect value={website} onChange={setWebsite} />
            </Card>
          </SimpleGrid>

          <Divider />
          <Text size="xl" fw={700}>
            Entity Cards
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <EventCard
              event={event}
              action={
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ArrowRightIcon style={{ width: 18, height: 18 }} />
                </ActionIcon>
              }
            />
            <PersonCard person={person} />
            <OrganizationCard organization={organization} />
            <SourceCard source={source} />
            <WebsiteCard website={website} />
            <MonitoringSourceCard monitoringSource={monitoringSource} />

            <EventCard event={{}} />
            <PersonCard person={{}} />
            <OrganizationCard organization={{}} />
            <SourceCard source={{}} />
            <WebsiteCard website={{}} />
            <MonitoringSourceCard monitoringSource={{ owner: "" }} />
          </SimpleGrid>

          <Divider />

          <Text size="xl" fw={700}>
            Input Forms For Creation
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <EventForm event={{}} onSubmit={handleSubmit} isAdmin={isAdmin} />
            <InsightForm
              insight={{}}
              onSubmit={handleSubmit}
              isAdmin={isAdmin}
            />
            <MonitoringSourceForm
              source={{ owner: "" }}
              onSubmit={handleSubmit}
            />
            <OrganizationForm
              organization={{}}
              onSubmit={handleSubmit}
              isAdmin={isAdmin}
            />
            <PersonForm person={{}} onSubmit={handleSubmit} isAdmin={isAdmin} />
            <RelationForm
              relation={{ _from: "", _to: "" }}
              onSubmit={handleSubmit}
              isAdmin={isAdmin}
            />
            <SourceForm source={{}} onSubmit={handleSubmit} isAdmin={isAdmin} />
            <WebsiteForm
              website={{}}
              onSubmit={handleSubmit}
              isAdmin={isAdmin}
            />
          </SimpleGrid>

          <Divider />

          <Text size="xl" fw={700}>
            Forms Double Clickable To Update
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <EventForm
              event={event}
              onUpdate={handleUpdate(setEvent)}
              onUpdatePermissive={handleUpdate(setEvent)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <InsightForm
              insight={insight}
              onUpdate={handleUpdate(setInsight)}
              onUpdatePermissive={handleUpdate(setInsight)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <MonitoringSourceForm
              source={monitoringSource}
              onUpdate={handleUpdate(setMonitoringSource)}
              exitButton={exitButton}
            />
            <OrganizationForm
              organization={organization}
              onUpdate={handleUpdate(setOrganization)}
              onUpdatePermissive={handleUpdate(setOrganization)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <PersonForm
              person={person}
              onUpdate={handleUpdate(setPerson)}
              onUpdatePermissive={handleUpdate(setPerson)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <RelationForm
              relation={relation}
              onUpdate={handleUpdate(setRelation)}
              onUpdatePermissive={handleUpdate(setRelation)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <SourceForm
              source={source}
              onUpdate={handleUpdate(setSource)}
              onUpdatePermissive={handleUpdate(setSource)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <WebsiteForm
              website={website}
              onUpdate={handleUpdate(setWebsite)}
              onUpdatePermissive={handleUpdate(setWebsite)}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
          </SimpleGrid>

          <Divider />

          <Text size="xl" fw={700}>
            Read Only Forms
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <EventForm
              event={event}
              sources={[source, source2]}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <InsightForm
              insight={insight}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <MonitoringSourceForm
              source={monitoringSource}
              exitButton={exitButton}
            />
            <OrganizationForm
              organization={organization}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <PersonForm
              person={person}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <RelationForm
              relation={relation}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
            <SourceForm source={source} exitButton={exitButton} />
            <WebsiteForm
              website={website}
              exitButton={exitButton}
              isAdmin={isAdmin}
            />
          </SimpleGrid>

          <Divider />

          <Text size="xl" fw={700}>
            Borderless Read Only Forms
          </Text>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="lg"
          >
            <EventForm
              event={event}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
              isAdmin={isAdmin}
            />
            <OrganizationForm
              organization={organization}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
              isAdmin={isAdmin}
            />
            <PersonForm
              person={person}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
              isAdmin={isAdmin}
            />
            <RelationForm
              relation={relation}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
              isAdmin={isAdmin}
            />
            <SourceForm
              source={source}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
            />
            <WebsiteForm
              website={website}
              style={{ border: "none", boxShadow: "none", padding: 0 }}
              isAdmin={isAdmin}
            />
          </SimpleGrid>
        </Stack>
      </ScrollArea>
    </>
  );
}

export default App;
