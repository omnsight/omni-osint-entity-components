# Omni OSINT Entity Components

This [package](https://www.npmjs.com/package/@omnsight/osint-entity-components) contains a collection of React components for rendering OSINT entities, such as People, Organizations, Events, and more. It is designed to be used within the Omni OSINT ecosystem.

## Installation

To install the package, run the following command:

```bash
npm install @omnsight/osint-entity-components
```

### Peer Dependencies

This library has peer dependencies that need to be installed in your project. Please ensure you have the following packages installed:

- `react`
- `react-dom`
- `@mantine/core`
- `react-i18next`
- `i18next`

## Usage

Below is an example of how to import and use a component from this library. This example demonstrates how to use the `PersonCard` component and set up internationalization with the provided locale files.

```jsx
import { MantineProvider } from '@mantine/core';
import { PersonCard } from '@omnsight/osint-entity-components/cards';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import en from '@omnsight/osint-entity-components/locales/en';

// Initialize i18n
i18n.init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
});

function MyApp() {
  const person = {
    _id: "person-1",
    name: "John Doe",
    role: "professional",
  };

  return (
    <MantineProvider>
      <I18nextProvider i18n={i18n}>
        <PersonCard person={person} />
      </I18nextProvider>
    </MantineProvider>
  );
}
```

### Submodule Exports

You can import components from the following submodules:

- `@omnsight/osint-entity-components/avatars`
- `@omnsight/osint-entity-components/cards`
- `@omnsight/osint-entity-components/icons`

## Development

To publish a new version to npm, follow these steps:

```bash
npm login
npm publish
```
