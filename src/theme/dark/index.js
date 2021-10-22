import color from "./color"
import mq from "../common/mq"

const dark = {
  desk: {
    backgroundColor: color.background
  },
  nav: {
    backgroundColor: color.accent,
    border: "2px solid " + color.background,
    boxShadow: null,
    ":after": {
      color: color.background,
    }
  },
  navActionShare: {
    background: color.accent,
    color: color.background,
  },
  navActionTheme: {
    background: color.accent,
    color: color.background,
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
  }
}

dark.nav[mq.md] = {
  backgroundColor: color.background + " !important",
  borderBottomColor: color.primaryDesat[color.primaryDesat.length - 1] + " !important",
}

dark.navActionShare[mq.md] = {
  backgroundColor: color.background + " !important",
  color: color.accent + " !important",
}

dark.navActionTheme[mq.md] = {
  backgroundColor: color.background + " !important",
  color: color.accent + " !important",
}

export default dark
export { dark }
