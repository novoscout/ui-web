import color from "./color"
import mq from "../common/mq"

const light = {
  nav: {
    backgroundColor: color.background,
    color: color.accent
  },
  desk: {
    backgroundColor: color.background,
    color: color.text
  },
  toolbar: {
    // backgroundColor: color.background
    color: color.text
  },
  modal: {
    backgroundColor: color.background,
    color: color.accent
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
    boxShadow: "rgba(0, 0, 0, 0.6) 0px 4px 6px 0px",
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
    boxShadow: "rgba(0, 0, 0, 0.6) 0px 12px 18px -8px",
    backgroundColor: color.accent,
    backgroundImage: "linear-gradient(to right, " +
                     color.accent + " 0%, " +
                     color.accentAlt + " 100%)",
    color: color.background
  },
  input: {
    '[type="text"]': {
      borderBottomColor: color.text,
      backgroundColor: color.backgroundAlt
    }
  }
}

// ===================================================================
// Dupes.

light.input['[type="button"]'] = light.button
light.input['[type="submit"]'] = light.button
light.input['[type="email"]'] = light.input['[type="text"]']
light.input['[type="password"]'] = light.input['[type="text"]']
light.input['[type="search"]'] = light.input['[type="text"]']

light.a = light.textLink


// light.nav[mq.md] = {
//   backgroundColor: color.background + " !important",
//   borderBottomColor: color.primaryDesat[color.primaryDesat.length - 1] + " !important",
// }
// 
// light.navActionShare[mq.md] = {
//   backgroundColor: color.background + " !important",
//   color: color.accent + " !important",
// }
// 
// light.navActionTheme[mq.md] = {
//   backgroundColor: color.background + " !important",
//   color: color.accent + " !important",
// }

export default light
export { light }
