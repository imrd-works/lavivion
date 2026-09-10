export interface NavigationLink {
  key: string;
  to: string;
}

export interface NavigationAction extends NavigationLink {
  icon: string;
}

export const primaryLinks: NavigationLink[] = [
  { key: "jewellery", to: "/jewellery" },
  { key: "engagement", to: "/engagement-and-wedding" },
  { key: "gifts", to: "/gifts" },
  { key: "exclusive", to: "/exclusive-jewellery" },
  { key: "house", to: "/house" },
];

export const actionLinks: NavigationAction[] = [
  { key: "search", to: "/search", icon: "search" },
  { key: "account", to: "/account", icon: "user" },
  { key: "favorites", to: "/favorites", icon: "heart" },
  { key: "cart", to: "/cart", icon: "cart" },
];

export const contactsLink = "/contacts";
