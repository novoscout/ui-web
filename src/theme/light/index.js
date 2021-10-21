import color from "./color"

const light = {
  desk: {
    backgroundColor: color.background,
  },
  nav: {
    backgroundColor: color.accent,
    border: "2px solid " + color.background,
    boxShadow: "2px 2px 8px 4px " + color.backgroundShadow,
    ":after": {
      color: color.background,
    }
  },
  swiper: {
    frame: {
      backgroundColor: color.background,
    },
    inner: {
      backgroundColor: color.background
    }
  },
  textLink: {
    color: color.accent
  }
}

export default light
export { light }
