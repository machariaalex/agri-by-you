import {
  Apple,
  Bean,
  Bird,
  Carrot,
  Cherry,
  Egg,
  Fish,
  Flower2,
  Layers,
  Leaf,
  Milk,
  Sprout,
  Tractor,
  Truck,
  Wheat,
  type LucideIcon,
} from "lucide-react";

/** Icons an admin can pick for a service card. Keys are stored in services.icon. */
export const serviceIcons: Record<string, LucideIcon> = {
  Sprout,
  Carrot,
  Apple,
  Cherry,
  Layers,
  Bird,
  Egg,
  Milk,
  Fish,
  Wheat,
  Bean,
  Leaf,
  Flower2,
  Tractor,
  Truck,
};

export const serviceIconNames = Object.keys(serviceIcons);
