import { IconTypcnFlash } from '../../assets/icons/generated/typcn-flash';
import { IconMaterialSymbolsSatelliteAlt } from '../../assets/icons/generated/material-symbols-satellite-alt';
import { IconMaterialSymbolsLightDrone } from '../../assets/icons/generated/material-symbols-light-drone';
import { IconBxPlusMedical } from '../../assets/icons/generated/bx-plus-medical';
import { IconIconParkGreatWall } from '../../assets/icons/generated/icon-park-great-wall';
import { IconFaSolidFistRaised } from '../../assets/icons/generated/fa-solid-fist-raised';
import { IconBxRun } from '../../assets/icons/generated/bx-run';
import { IconPhMaskHappyFill } from '../../assets/icons/generated/ph-mask-happy-fill';
import { IconIconoirCommodity } from '../../assets/icons/generated/iconoir-commodity';
import { IconGlyphsHandshakeBold } from '../../assets/icons/generated/glyphs-handshake-bold';
import { IconIconParkCurrency } from '../../assets/icons/generated/icon-park-currency';
import { IconFluentEmojiHighContrastBallotBoxWithBallot } from '../../assets/icons/generated/fluent-emoji-high-contrast-ballot-box-with-ballot';
import { IconTablerBarrierBlock } from '../../assets/icons/generated/tabler-barrier-block';
import { IconLsiconWorkOrderAbnormalOutline } from '../../assets/icons/generated/lsicon-work-order-abnormal-outline';
import { IconBoxiconsFileReport } from '../../assets/icons/generated/boxicons-file-report';
import { IconMdiAnchor } from '../../assets/icons/generated/mdi-anchor';
import { IconStreamlineUltimateMeetingRemoteBold } from '../../assets/icons/generated/streamline-ultimate-meeting-remote-bold';
import { IconRiSpyFill } from '../../assets/icons/generated/ri-spy-fill';
import { IconFluentEmojiHighContrastMilitaryHelmet } from '../../assets/icons/generated/fluent-emoji-high-contrast-military-helmet';
import { IconMdiTank } from '../../assets/icons/generated/mdi-tank';
import { IconFaSolidShip } from '../../assets/icons/generated/fa-solid-ship';
import { IconMdiAirplane } from '../../assets/icons/generated/mdi-airplane';
import { IconGameIconsMissileLauncher } from '../../assets/icons/generated/game-icons-missile-launcher';
import { IconGameIconsBombingRun } from '../../assets/icons/generated/game-icons-bombing-run';
import { IconGameIconsPistolGun } from '../../assets/icons/generated/game-icons-pistol-gun';
import { IconMdiHandcuffs } from '../../assets/icons/generated/mdi-handcuffs';
import { IconIonTrainSharp } from '../../assets/icons/generated/ion-train-sharp';
import { IconFlowbiteTruckSolid } from '../../assets/icons/generated/flowbite-truck-solid';
import { IconEmojioneMonotoneShip } from '../../assets/icons/generated/emojione-monotone-ship';
import { IconFluentEmojiHighContrastBrokenChain } from '../../assets/icons/generated/fluent-emoji-high-contrast-broken-chain';
import { IconHugeiconsTradeUp } from '../../assets/icons/generated/hugeicons-trade-up';
import { IconIcSharpOilBarrel } from '../../assets/icons/generated/ic-sharp-oil-barrel';
import { IconRiExchangeBoxFill } from '../../assets/icons/generated/ri-exchange-box-fill';
import { IconMingcutePhoneCallFill } from '../../assets/icons/generated/mingcute-phone-call-fill';
import { IconBoxiconsAnnouncement } from '../../assets/icons/generated/boxicons-announcement';
import { IconMdiFactory } from '../../assets/icons/generated/mdi-factory';

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
    value: 'conference',
    label: 'conference',
    icon: IconStreamlineUltimateMeetingRemoteBold, // icon: streamline-ultimate:meeting-remote-bold
  },
  {
    value: 'conversation',
    label: 'conversation',
    icon: IconMingcutePhoneCallFill, // icon: mingcute:phone-call-fill
  },
  {
    value: 'policy',
    label: 'policy',
    icon: IconLsiconWorkOrderAbnormalOutline, // icon: lsicon:work-order-abnormal-outline
  },
  {
    value: 'border',
    label: 'border',
    icon: IconTablerBarrierBlock, // icon: tabler:barrier-block
  },
  {
    value: 'report',
    label: 'report',
    icon: IconBoxiconsFileReport, // icon: boxicons:file-report
  },
  {
    value: 'election',
    label: 'election',
    icon: IconFluentEmojiHighContrastBallotBoxWithBallot, // icon: fluent-emoji-high-contrast:ballot-box-with-ballot
  },
  {
    value: 'trade',
    label: 'trade',
    icon: IconRiExchangeBoxFill, // icon: ri:exchange-box-fill
  },
  {
    value: 'currency',
    label: 'currency',
    icon: IconIconParkCurrency, // icon: icon-park:currency
  },
  {
    value: 'exchange',
    label: 'exchange',
    icon: IconHugeiconsTradeUp, // icon: hugeicons:trade-up
  },
  {
    value: 'acquisition',
    label: 'acquisition',
    icon: IconGlyphsHandshakeBold, // icon: glyphs:handshake-bold
  },
  {
    value: 'oil',
    label: 'oil',
    icon: IconIcSharpOilBarrel, // icon: ic:sharp-oil-barrel
  },
  {
    value: 'commodity',
    label: 'commodity',
    icon: IconIconoirCommodity, // icon: iconoir:commodity
  },
  {
    value: 'manufacturing',
    label: 'manufacturing',
    icon: IconMdiFactory, // icon: mdi:factory
  },
  {
    value: 'supplychain-risk',
    label: 'supplychain-risk',
    icon: IconFluentEmojiHighContrastBrokenChain, // icon: fluent-emoji-high-contrast:broken-chain fa/flash
  },
  {
    value: 'electricity',
    label: 'electricity',
    icon: IconTypcnFlash, // icon: typcn:flash
  },
  {
    value: 'harbor',
    label: 'harbor',
    icon: IconMdiAnchor, // icon: mdi:anchor
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
    value: 'cyber',
    label: 'cyber',
    icon: IconPhMaskHappyFill, // icon: ph:mask-happy-fill
  },
  {
    value: 'shot',
    label: 'shot',
    icon: IconGameIconsPistolGun, // icon: game-icons:pistol-gun
  },
  {
    value: 'evacuation',
    label: 'evacuation',
    icon: IconBxRun, // icon: bx:run
  },
  {
    value: 'civil-unrest',
    label: 'civil-unrest',
    icon: IconFaSolidFistRaised, // icon: fa-solid:fist-raised
  },
  {
    value: 'defense',
    label: 'defense',
    icon: IconIconParkGreatWall, // icon: icon-park:great-wall
  },
  {
    value: 'medical',
    label: 'medical',
    icon: IconBxPlusMedical, // icon: bx:plus-medical
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
    value: 'drone',
    label: 'drone',
    icon: IconMaterialSymbolsLightDrone, // icon: material-symbols-light:drone
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
  {
    value: 'satellite',
    label: 'satellite',
    icon: IconMaterialSymbolsSatelliteAlt, // icon: material-symbols:satellite-alt
  },
]
