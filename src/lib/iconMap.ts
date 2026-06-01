import {
  Star,
  Wind,
  Map,
  ShieldCheck,
  Users,
  Mountain,
  Anchor,
  Fish,
  Heart,
  Trophy,
  Building2,
  Music,
  ShoppingBag,
  Leaf,
  Briefcase,
  Car,
  Plane,
  Wifi,
  Utensils,
  Bed,
  Tv,
  Flame,
  Coffee,
  Key,
  LogOut,
  Compass,
  type LucideIcon,
} from 'lucide-react';

// Map of icon name strings → Lucide icon components
// Used to dynamically render icons from CMS data
const iconMap: Record<string, LucideIcon> = {
  Star,
  Wind,
  Map,
  ShieldCheck,
  Users,
  Mountain,
  Anchor,
  Fish,
  Heart,
  Trophy,
  Building2,
  Music,
  ShoppingBag,
  Leaf,
  Briefcase,
  Car,
  Plane,
  Wifi,
  Utensils,
  Bed,
  Tv,
  Flame,
  Coffee,
  Key,
  LogOut,
  Compass,
};

/**
 * Get a Lucide icon component by name string.
 * Returns the fallback icon if name is not found.
 */
export function getIcon(name: string | undefined, fallback: LucideIcon = Star): LucideIcon {
  if (!name) return fallback;
  return iconMap[name] || fallback;
}

export default iconMap;
