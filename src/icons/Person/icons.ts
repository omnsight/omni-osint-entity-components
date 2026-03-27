import { IconMdiAccountSchool } from '../../assets/icons/generated/mdi-account-school';
import { IconMdiAccountTieHat } from '../../assets/icons/generated/mdi-account-tie-hat';
import { IconMdiAccountTie } from '../../assets/icons/generated/mdi-account-tie';


interface IconOption {
  value: string;
  label: string;
  icon?: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

// Find icon items in https://icon-sets.iconify.design
export const ICON_OPTIONS: IconOption[] = [
  {
    value: 'professional',
    label: 'professional',
    icon: IconMdiAccountTie, // icon: mdi:account-tie
  },
  {
    value: 'gov-official',
    label: 'gov-official',
    icon: IconMdiAccountTieHat, // icon: mdi:account-tie-hat
  },
  {
    value: 'school-personel',
    label: 'school-personel',
    icon: IconMdiAccountSchool, // icon: mdi:account-school
  },
]
