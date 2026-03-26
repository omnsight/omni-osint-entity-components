import {
  ActionIcon,
  Button,
  Card,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import type {
  Person,
  Organization,
  Event,
  Source,
  Website,
  Relation,
} from "omni-osint-crud-client";
import {
  EventCard,
  OrganizationCard,
  PersonCard,
  SourceCard,
  WebsiteCard,
} from "./cards";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

function App() {
  const { i18n } = useTranslation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [person, setPerson] = useState<Person>({
    _id: "person-1",
    name: "John Doe",
    role: "professional",
    aliases: ["John", "Johnny"],
    tags: ["tag1", "tag2"],
  });
  const [organization, setOrganization] = useState<Organization>({
    _id: "org-1",
    name: "Acme Inc.",
    tags: ["company", "software"],
  });
  const [event, setEvent] = useState<Event>({
    _id: "event-1",
    title: "New Product Launch",
    description: "The launch of a new product",
    happened_at: new Date().getTime() / 1000,
    tags: ["new-product", "launch"],
  });
  const [source, setSource] = useState<Source>({
    _id: "source-1",
    name: "News Article",
    url: "https://example.com/article",
    description: "A news article about something.",
    tags: ["news", "article"],
  });
  const [website, setWebsite] = useState<Website>({
    _id: "website-1",
    url: "https://example.com",
    title: "Example Website",
    description: "An example website.",
    tags: ["website", "example"],
  });
  const [relation] = useState<Relation>({
    _id: "relation-1",
    _from: "person-1",
    _to: "org-1",
    label: "相关人物/组织",
  });

  const cardStyle = {
    height: 500,
    width: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

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
        <Button onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}>Toggle Theme</Button>
      </Group>
      <ScrollArea style={{ height: "100vh" }}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing="lg"
          p="lg"
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

          <Card withBorder style={cardStyle}>
            <Text>Cards</Text>
            <ScrollArea w={350} h={400}>
              <Stack>
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
              </Stack>
            </ScrollArea>
          </Card>

          <Card withBorder style={cardStyle}>
            <Text>Empty Cards</Text>
            <ScrollArea w={350} h={400}>
              <Stack>
                <EventCard event={{}} />
                <PersonCard person={{}} />
                <OrganizationCard organization={{}} />
                <SourceCard source={{}} />
                <WebsiteCard website={{}} />
              </Stack>
            </ScrollArea>
          </Card>
        </SimpleGrid>
      </ScrollArea>
    </>
  );
}

export default App;
