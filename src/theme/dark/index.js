import color from "./color"
import mq from "../common/mq"

const dark = {
  desk: {
    backgroundColor: color.background
  },
  modal: {
    backgroundColor: color.background
  },
  nav: {
    backgroundColor: color.background,
    color: color.accent,
  },
  swiper: {
    frame: {
      backgroundColor: color.background,
    },
    inner: {
      backgroundColor: color.background,
    }
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
  }
}

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
