import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Niko's Stuff",
  DESCRIPTION: "Randomness since 2018.",
  AUTHOR: "Niko's Stuff",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projekty",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Team Page
export const TEAM: Page = {
  TITLE: "Team",
  DESCRIPTION: "See our team.",
}

// Other Page
export const OTHERPROJECTS: Page = {
  TITLE: "Other Stuff",
  DESCRIPTION: "Random unfinished projects.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Wyszukaj",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// NNB Workshop
export const NNB_WORKSHOP: Page = {
  TITLE: "NNB Workshop",
  DESCRIPTION: "Explore modded content.",
}

export const DYNAMIC_PRICING: Page = {
  TITLE: "Kosztorys",
  DESCRIPTION: "Szybki kosztorys usług.", 
}

export const HOSTING: Page = {
  TITLE: "Hosting",
  DESCRIPTION: "Profesjonalny hosting serwerów gier i nie tylko.", 
}

export const LEGAL: Page = {
  TITLE: "Informacje prawne",
  DESCRIPTION: "Polityka prywatności, regulamin i inne informacje prawne.", 
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Główna", 
    HREF: "/", 
  },
  // { 
  //   TEXT: "Team",
  //   HREF: "/team",
  // },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projekty",
    HREF: "/projects", 
  },
  // { 
  //   TEXT: "Mapy MC",
  //   HREF: "/downloads", 
  // },
  {
    TEXT: "Hosting",
    HREF: "https://hosting.nikostuff.com",

  },
  {
    TEXT: "Cennik",
    HREF: "/pricing",

  },
  {
    TEXT: "Kosztorys",
    HREF: "/kosztorys",
  },
  {
    TEXT: "Status",
    HREF: "https://status.nikostuff.com",

  },
  { 
    TEXT : "Subskrypcje", 
    HREF: "https://billing.stripe.com/p/login/6oUaEWa7abrm9GSdzBdAk00",
  }
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "team@nikostuff.com",
    HREF: "mailto:team@nikostuff.com",
  },
  // {
  //   NAME: "Github",
  //   ICON: "github",
  //   TEXT: "",
  //   HREF: ""
  // },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "Maciej F.",
    HREF: "https://www.linkedin.com/in/maciej-fr%C4%85czek-087578345",
  },
  // {
  //   NAME: "Twitter",
  //   ICON: "twitter-x",
  //   TEXT: "",
  //   HREF: "",
  // },
  {
    NAME: "Discord",
    ICON: "discord",
    TEXT: "niko_fluffer",
    HREF: "https://dc.nikostuff.com",
  },
  {
    NAME: "Facebook",
    ICON: "facebook",
    TEXT: "Niko's Stuff",
    HREF: "https://www.facebook.com/share/1C5M2EZ4p6/",
  }
]

