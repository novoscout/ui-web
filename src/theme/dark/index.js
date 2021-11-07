import color from "./color"
import mq from "../common/mq"

const dark = {
  desk: {
    backgroundColor: color.background
  },
  nav: {
    backgroundColor: color.background,
    color: color.accent,
//     ":after": {
//       color: color.background,
//     }
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
