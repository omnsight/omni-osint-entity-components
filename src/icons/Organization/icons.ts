import { IconStreamlineFlexDeepfakeTechnology1Solid } from '../../assets/icons/generated/streamline-flex-deepfake-technology-1-solid';
import { IconPixelTechnology } from '../../assets/icons/generated/pixel-technology';
import { IconRiSeedlingLine } from '../../assets/icons/generated/ri-seedling-line';
import { IconMdiFactory } from '../../assets/icons/generated/mdi-factory';
import { IconCodiconOrganization } from '../../assets/icons/generated/codicon-organization';
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
    value: 'military',
    label: 'military',
    icon: IconCodiconOrganization, // icon: codicon:organization
  },
  {
    value: 'manufacturing',
    label: 'manufacturing',
    icon: IconMdiFactory, // icon: mdi:factory
  },
  {
    value: 'agriculture',
    label: 'agriculture',
    icon: IconRiSeedlingLine, // icon: ri:seedling-line
  },
  {
    value: 'semi-conductor',
    label: 'semi-conductor',
    icon: IconPixelTechnology, // icon: pixel:technology
  },
  {
    value: 'technology',
    label: 'technology',
    icon: IconStreamlineFlexDeepfakeTechnology1Solid, // icon: streamline-flex:deepfake-technology-1-solid
  },
]
