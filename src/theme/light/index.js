import color from "./color"
import mq from "../common/mq"

var light = {
  desk: {
    backgroundColor: color.background
  },
  modal: {
    backgroundColor: color.background
  },
  nav: {
    backgroundColor: color.background,
    color: color.accent
  },
  navAction: {
    color: color.accent
  },
  swiper: {
    frame: {
      backgroundColor: color.background
    },
    inner: {
      backgroundColor: color.background
    }
  },
  text: {
    color: color.text
  },
  textLink: {
    color: color.accent
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
    backgroundColor: color.background
  },
  passphrase: {
    borderColor: "silver"
  }
}

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
