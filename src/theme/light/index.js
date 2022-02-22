import color from "./color"
import mq from "../common/mq"

const light = {
  rangeSlider: {
    boxShadow: "inset 0 4px 6px rgba(128,64,64,0.7)",
    background: color.primaryDesat[2],
    // "::-webkit-slider-thumb": {
    //   boxShadow: "0 2px 8px 0 " + color.backgroundShadow,
    //   background: color.background,
    //   borderColor: color.backgroundShadow,
    // },
    // "::-moz-range-thumb": {
    //   boxShadow: "0 2px 8px 0 " + color.backgroundShadow,
    //   background: color.background,
    //   borderColor: color.backgroundShadow,
    // },
    " ~ label": {
      color: color.text
    }
  },
  nav: {
    backgroundColor: color.accent,
    color: color.textBright
  },
  desk: {
    backgroundColor: color.background,
    color: color.text
  },
  toolbar: {
    color: color.text
  },
  modal: {
    // backgroundColor: color.background,
    // color: color.accent
  },
  navAction: {
    color: color.accent
  },
  navMenu: {},
  navMenuModal: {
    " ul": {
      borderColor: "silver",
      boxShadow: "rgba(0, 0, 0, 0.6) 0px 0px 18px 0px",
      background: color.background
    }
  },
  navActionCancel: {
    color: color.error,
  },
  swiper: {
    frame: {
      backgroundColor: color.background,
      color: color.text,
      " > h2": {
        background: color.accent,
        color: color.textBright,
        margin: "0 -1rem",
        padding: "0.5rem 1rem 1rem 1rem"
      },
      " details": {
        background: "#fcf",
        " > summary": {
          background: "rgba(128,0,0,0.2)",
        },
        " > summary > span": {
          color: "red",
          textDecorationColor: "red"
        },
        " a": {
          color: "red",
          textDecorationColor: "red"
        }
      }
    },
    inner: {
      backgroundColor: color.background,
      color: color.text,
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

// ===================================================================

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
