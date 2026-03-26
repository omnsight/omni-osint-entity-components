import { IconMdiHandcuffs } from '@/assets/icons/generated/mdi-handcuffs';
import { IconHugeiconsTradeUp } from '@/assets/icons/generated/hugeicons-trade-up';
import { IconGameIconsPistolGun } from '@/assets/icons/generated/game-icons-pistol-gun';
import { IconIcSharpOilBarrel } from '@/assets/icons/generated/ic-sharp-oil-barrel';
import { IconRiSpyFill } from '@/assets/icons/generated/ri-spy-fill';
import { IconFluentEmojiHighContrastMilitaryHelmet } from '@/assets/icons/generated/fluent-emoji-high-contrast-military-helmet';
import { IconMdiTank } from '@/assets/icons/generated/mdi-tank';
import { IconFaSolidShip } from '@/assets/icons/generated/fa-solid-ship';
import { IconMdiAirplane } from '@/assets/icons/generated/mdi-airplane';
import { IconGameIconsMissileLauncher } from '@/assets/icons/generated/game-icons-missile-launcher';
import { IconGameIconsBombingRun } from '@/assets/icons/generated/game-icons-bombing-run';
import { IconIonTrainSharp } from '@/assets/icons/generated/ion-train-sharp';
import { IconFlowbiteTruckSolid } from '@/assets/icons/generated/flowbite-truck-solid';
import { IconEmojioneMonotoneShip } from '@/assets/icons/generated/emojione-monotone-ship';
import { IconFluentEmojiHighContrastBrokenChain } from '@/assets/icons/generated/fluent-emoji-high-contrast-broken-chain';
import { IconRiExchangeBoxFill } from '@/assets/icons/generated/ri-exchange-box-fill';
import { IconMingcutePhoneCallFill } from '@/assets/icons/generated/mingcute-phone-call-fill';
import { IconBoxiconsAnnouncement } from '@/assets/icons/generated/boxicons-announcement';

interface IconOption {
  value: string;
  label: string;
  icon?: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

// Find icon items in https://icon-sets.iconify.design
export const ICON_OPTIONS: IconOption[] = [
  {
    value: 'announcement',
    label: 'announcement',
    icon: IconBoxiconsAnnouncement, // icon: boxicons:announcement
  },
  {
    value: 'conversation',
    label: 'conversation',
    icon: IconMingcutePhoneCallFill, // icon: mingcute:phone-call-fill
  },
  {
    value: 'trade',
    label: 'trade',
    icon: IconRiExchangeBoxFill, // icon: ri:exchange-box-fill
  },
  {
    value: 'oil',
    label: 'oil',
    icon: IconIcSharpOilBarrel, // icon: ic:sharp-oil-barrel
  },
  {
    value: 'exchange',
    label: 'exchange',
    icon: IconHugeiconsTradeUp, // icon: hugeicons:trade-up
  },
  {
    value: 'supplychain-risk',
    label: 'supplychain-risk',
    icon: IconFluentEmojiHighContrastBrokenChain, // icon: fluent-emoji-high-contrast:broken-chain
  },
  {
    value: 'ship',
    label: 'ship',
    icon: IconEmojioneMonotoneShip, // icon: emojione-monotone:ship
  },
  {
    value: 'truck',
    label: 'truck',
    icon: IconFlowbiteTruckSolid, // icon: flowbite:truck-solid
  },
  {
    value: 'train',
    label: 'train',
    icon: IconIonTrainSharp, // icon: ion:train-sharp
  },
  {
    value: 'crime',
    label: 'crime',
    icon: IconMdiHandcuffs, // icon: mdi:handcuffs
  },
  {
    value: 'shot',
    label: 'shot',
    icon: IconGameIconsPistolGun, // icon: game-icons:pistol-gun
  },
  {
    value: 'bomb',
    label: 'bomb',
    icon: IconGameIconsBombingRun, // icon: game-icons:bombing-run
  },
  {
    value: 'missile',
    label: 'missile',
    icon: IconGameIconsMissileLauncher, // icon: game-icons:missile-launcher
  },
  {
    value: 'plane',
    label: 'plane',
    icon: IconMdiAirplane, // icon: mdi:airplane
  },
  {
    value: 'naval',
    label: 'naval',
    icon: IconFaSolidShip, // icon: fa-solid:ship
  },
  {
    value: 'tank',
    label: 'tank',
    icon: IconMdiTank, // icon: mdi:tank
  },
  {
    value: 'infantry',
    label: 'infantry',
    icon: IconFluentEmojiHighContrastMilitaryHelmet, // icon: fluent-emoji-high-contrast:military-helmet
  },
  {
    value: 'intelligence',
    label: 'intelligence',
    icon: IconRiSpyFill, // icon: ri:spy-fill
  },
]
