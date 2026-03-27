import { IconMdiForum } from '../../assets/icons/generated/mdi-forum';
import { IconStreamlineCyberNewspaper2 } from '../../assets/icons/generated/streamline-cyber-newspaper-2';
import { IconMingcuteGovernmentLine } from '../../assets/icons/generated/mingcute-government-line';


import { BuildingOfficeIcon } from '@heroicons/react/24/solid';

interface IconOption {
  value: string;
  label: string;
  icon?: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

// Find icon items in https://icon-sets.iconify.design
export const ICON_OPTIONS: IconOption[] = [
  {
    value: 'company',
    label: 'company',
    icon: BuildingOfficeIcon,
  },
  {
    value: 'government',
    label: 'government',
    icon: IconMingcuteGovernmentLine, // icon: mingcute:government-line
  },
  {
    value: 'news',
    label: 'news',
    icon: IconStreamlineCyberNewspaper2, // icon: streamline-cyber:newspaper-2
  },
  {
    value: 'forum',
    label: 'forum',
    icon: IconMdiForum, // icon: mdi:forum
  },
]
