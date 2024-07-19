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
  TITLE: "Projects",
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
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// NNB Workshop
export const NNB_WORKSHOP: Page = {
  TITLE: "NNB Workshop",
  DESCRIPTION: "Explore modded content.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Team",
    HREF: "/team",
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projects",
    HREF: "/projects", 
  },
  // {
  //   TEXT: "Portfolio",
  //   HREF: "/portfolio",
  //
  // }
]

// Socials
export const SOCIALS: Socials = [
  // {
  //   NAME: "Email",
  //   ICON: "email",
  //   TEXT: "",
  //   HREF: "mailto:",
  // },
  // {
  //   NAME: "Github",
  //   ICON: "github",
  //   TEXT: "",
  //   HREF: ""
  // },
  // {
  //   NAME: "LinkedIn",
  //   ICON: "linkedin",
  //   TEXT: "",
  //   HREF: "",
  // },
  // {
  //   NAME: "Twitter",
  //   ICON: "twitter-x",
  //   TEXT: "",
  //   HREF: "",
  // },
  {
    NAME: "Discord",
    ICON: "discord",
    TEXT: "nikodaproot",
    HREF: "https://dc.nikostuff.com",
  }
]

