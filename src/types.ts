export enum AppRoute {
  HOME = "/",
  CABINS = "/cabins",
  COMFORT = "/comfort",
  GATHER = "/gather",
  BEYOND = "/beyond",
  FAMILY = "/family",
}

export interface NavItem {
  label: string;
  path: AppRoute;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home Page", path: AppRoute.HOME },
  { label: "Cabins", path: AppRoute.CABINS },
  { label: "Amenities", path: AppRoute.COMFORT },
  { label: "Community", path: AppRoute.GATHER },
  { label: "Explore", path: AppRoute.BEYOND },
  { label: "Membership", path: AppRoute.FAMILY },
];
