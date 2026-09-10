export interface FooterLink {
  key: string;
  to: string;
}

export interface FooterSocialLink extends FooterLink {
  icon: string;
}

export interface FooterLinkGroup {
  key: string;
  kind: "links";
  links: FooterLink[];
}

export interface FooterSocialGroup {
  key: string;
  kind: "social";
  links: FooterSocialLink[];
}

export type FooterGroup = FooterLinkGroup | FooterSocialGroup;

export const footerGroups: FooterGroup[] = [
  {
    key: "customers",
    kind: "links",
    links: [
      { key: "payment", to: "/help/order-and-payment" },
      { key: "delivery", to: "/help/delivery" },
      { key: "returns", to: "/help/returns" },
      { key: "documents", to: "/help/documents" },
      { key: "legal", to: "/help/legal" },
      { key: "faq", to: "/help/faq" },
    ],
  },
  {
    key: "brand",
    kind: "links",
    links: [
      { key: "company", to: "/about" },
      { key: "history", to: "/about/history" },
      { key: "diamonds", to: "/about/diamonds" },
      { key: "news", to: "/news" },
      { key: "press", to: "/press" },
      { key: "portal", to: "/corporate" },
    ],
  },
  {
    key: "service",
    kind: "links",
    links: [
      { key: "clientCare", to: "/service/client-care" },
      { key: "registration", to: "/service/registration" },
    ],
  },
  {
    key: "social",
    kind: "social",
    links: [
      { key: "max", to: "/social/max", icon: "max" },
      { key: "pinterest", to: "/social/pinterest", icon: "pinterest" },
      {
        key: "yandexRhythm",
        to: "/social/yandex-rhythm",
        icon: "yandex-rhythm",
      },
      { key: "telegram", to: "/social/telegram", icon: "telegram" },
      { key: "vk", to: "/social/vk", icon: "vk" },
    ],
  },
  {
    key: "expertise",
    kind: "links",
    links: [
      { key: "academy", to: "/expertise/academy" },
      { key: "origin", to: "/expertise/diamond-origin" },
      { key: "articles", to: "/expertise/articles" },
    ],
  },
  {
    key: "contacts",
    kind: "links",
    links: [
      { key: "address", to: "/contacts" },
      { key: "phone", to: "tel:+74951411467" },
    ],
  },
];

export const legalLinks = {
  privacy: "/legal/privacy",
  terms: "/legal/terms",
};
