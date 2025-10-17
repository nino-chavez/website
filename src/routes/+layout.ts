import type { LayoutLoad } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch }) => {
  // You can add any layout-specific data fetching or logic here
  return {};
};