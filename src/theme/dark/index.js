import color from "./color"
import mq from "../common/mq"

const dark = {
  summary: {
    color: color.accent
  },
  nav: {
    backgroundColor: color.background,
    color: color.accent
  },
  desk: {
    backgroundColor: color.background,
    color: color.text
  },
  toolbar: {
    // backgroundColor: color.background,
    color: color.text
  },
  modal: {
    backgroundColor: color.background,
    color: color.text
  },
  navAction: {
    color: color.accent
  },
  navActionCancel: {
    color: color.error,
  },
  swiper: {
    frame: {
      backgroundColor: color.background,
      color: color.text
    },
    inner: {
      backgroundColor: color.background,
      color: color.text
    }
  },
  text: {
    color: color.text
  },
  textLink: {
    color: color.accent,
    textDecorationColor: color.accentAlt
  },
  fabCollapsed: {
    backgroundColor: color.accent,
    ":after": {
      color: color.background
    }
  },
  fabExpanded: {
    backgroundColor: color.accent,
    ":after": {
      color: color.background
    }
  },
  ident: {
    backgroundColor: color.background,
    color: color.text
  },
  button: {
    backgroundColor: color.accent,
    backgroundImage: "linear-gradient(to right, " +
                     color.accent + " 0%, " +
                     color.primaryDesat[1] + " 100%)",
    color: color.background
  },
  input: {
    '[type="text"]': {
      borderBottomColor: color.text,
      backgroundColor: color.backgroundAlt,
      color: "white"
    }
  }
}

// ===================================================================
// Dupes.

dark.input['[type="button"]'] = dark.button
dark.input['[type="submit"]'] = dark.button
dark.input['[type="email"]'] = dark.input['[type="text"]']
dark.input['[type="password"]'] = dark.input['[type="text"]']
dark.input['[type="search"]'] = dark.input['[type="text"]']

dark.a = dark.textLink


// dark.nav[mq.md] = {
//   backgroundColor: color.background + " !important",
//   borderBottomColor: color.primaryDesat[color.primaryDesat.length - 1] + " !important",
// }
// 
// dark.navActionShare[mq.md] = {
//   backgroundColor: color.background + " !important",
//   color: color.accent + " !important",
// }
// 
// dark.navActionTheme[mq.md] = {
//   backgroundColor: color.background + " !important",
//   color: color.accent + " !important",
// }

export default dark
export { dark }
