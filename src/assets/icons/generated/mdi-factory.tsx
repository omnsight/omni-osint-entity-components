// From: https://icon-sets.iconify.design/mdi/factory
import type { SVGProps } from 'react';
export const IconMdiFactory = ({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & {
  size?: number | string;
}) => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={size} height={size} {...props}><path d="M4 18v2h4v-2zm0-4v2h10v-2zm6 4v2h4v-2zm6-4v2h4v-2zm0 4v2h4v-2zM2 22V8l5 4V8l5 4V8l5 4 1-10h3l1 10v10z" /></svg>;