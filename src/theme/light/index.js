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
    marginBottom: "8px",
    boxShadow: color.backgroundShadow + " 0px 0px 3px 3px",
    color: color.accent,
  },
//   navActionShare: {
//     background: color.accent,
//     color: color.background,
//   },
//   navActionTheme: {
//     background: color.accent,
//     color: color.background,
//   },
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
