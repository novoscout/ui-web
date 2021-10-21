import color from "./color"

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

export default dark
export { dark }
