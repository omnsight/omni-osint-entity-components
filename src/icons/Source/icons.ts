import { IconBasilDocumentSolid } from '../../assets/icons/generated/basil-document-solid';
import { IconBoxiconsBook } from '../../assets/icons/generated/boxicons-book';
import { IconUitSocialMediaLogo } from '../../assets/icons/generated/uit-social-media-logo';
import { IconGgWebsite } from '../../assets/icons/generated/gg-website';
import { IconStreamlineCyberNewspaper2 } from '../../assets/icons/generated/streamline-cyber-newspaper-2';


interface IconOption {
  value: string;
  label: string;
  icon?: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

// Find icon items in https://icon-sets.iconify.design
export const ICON_OPTIONS: IconOption[] = [
  {
    value: 'news',
    label: 'news',
    icon: IconStreamlineCyberNewspaper2, // icon: streamline-cyber:newspaper-2
  },
  {
    value: 'website',
    label: 'website',
    icon: IconGgWebsite, // icon: gg:website
  },
  {
    value: 'social-media',
    label: 'social-media',
    icon: IconUitSocialMediaLogo, // icon: uit:social-media-logo
  },
  {
    value: 'book',
    label: 'book',
    icon: IconBoxiconsBook, // icon: boxicons:book
  },
  {
    value: 'paper',
    label: 'paper',
    icon: IconBasilDocumentSolid, // icon: basil:document-solid
  },
]
