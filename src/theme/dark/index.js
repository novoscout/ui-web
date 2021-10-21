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
  swiper: {
    frame: {
      backgroundColor: color.background // "#cdcccc"
    },
    inner: {
      backgroundColor: color.background // "#decccc"
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

export default dark
export { dark }
