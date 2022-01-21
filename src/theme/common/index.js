// No colo(u)rs are defined in the common theme. The are *only* defined in the
// light/dark themes.

import mq from "./mq"

const invisible = {
  display: "none",
  visibility: "hidden"
}

const common = {
  summary: {
    cursor: "pointer"
  },
  textLink: {
    textDecoration: "underline",
    cursor: "pointer"
  },
  button: {
    borderRadius: "1.6rem",
    cursor: "pointer",
    minWidth: "12rem",
    padding: "0.5rem 0.5rem 0.7rem 0.5rem",
  },
  modal: {
    position: "absolute",
    width: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyItems: "stretch",
    flexDirection: "column-reverse",
    alignContent: "space-evenly",
    paddingBottom: "2rem",
  },
  container: {
    display: "block",
  },
  desk: {
    position: "relative",
    display: "block",
    width: "100%",
    margin: "0",
    padding: "0",
    flex: "100%",
  },
  nav: {
    // ems not rems in nav.
    boxSizing: "content-box",
    display: "block",
    margin: "0 auto",
    padding: 0,
    border: 0,
    height: "2em",
    minHeight: "2em",
    maxHeight: "2em",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  navTitle: {
    textAlign: "center",
    margin: "auto 0",
    width: "100%",
    padding: 0,
    display: "inline-block",
    position: "relative",
    lineHeight: "1.5em",
    fontSize: "1.5em",
    // width: "100%",
    zIndex: 99, // Above modal.
  },
  navMenu: {
    ...invisible
  },
  navMenuModal: {
    display: "inline-block",
    visibility: "visible",
    " ul": {
      display: "flex",
      flexDirection: "column-reverse",
      position: "relative",
      margin: 0,
      padding: 0,
      height: "100%",
      justifyContent: "space-evenly",
      listStyle: "none",
    },
    " ul > li": {
      display: "inline-block",
      lineHeight: "1rem",
      margin: "1rem auto",
      padding: 0,
      listStyle: "none",
    }
    // ...invisible
  },
  navAction: {
    display: "",
    cursor: "pointer",
    // height: "2rem",
    // margin: "2rem auto 0 auto",
    padding: 0,
    border: 0,
    textAlign: "center",
    textDecoration: "none",
    " span": {
      textDecoration: "none",
    },
    " a": {
      textDecoration: "none",
    }
  },
  navActionIcon: {
    margin: 0, // "auto 0 auto 2rem !important"
  },

  // These are visible on smallest screens (in modal) and on
  // larger screens, but hidden on medium, leaving only icons.
  navActionText: {
    display: "inline",
    visibility: "visible",
  },

  // navActionTheme: {
  //   cursor: "pointer",
  //   position: "absolute",
  //   height: "4rem",
  //   width: "12rem",
  //   bottom: "10rem",
  //   right: 0,
  //   margin: 0,
  //   padding: 0,
  //   border: 0,
  //   borderRadius: "1rem",
  //   textAlign: "center",
  //   lineHeight: "4rem",
  //   textDecoration: "none",
  // },
  // navTitle: { display: "none" },
  // swiper: {
  //   frame: {
  //     display: "block",
  //     height: "100vh",
  //     margin: 0,
  //     padding: 0,
  //     position: "absolute",
  //     touchAction: "pan-x pan-y pinch-zoom",
  //     width: "100%",
  //   },
  //   inner: {
  //     display: "block",
  //     height: "100%",
  //     margin: "auto",
  //     maxHeight: "100%",
  //     overflowY: "scroll",
  //     padding: "1rem",
  //     position: "relative",
  //     top: 0,
  //     ":last-child": {
  //       paddingBottom: "6rem"
  //     }
  //   }
  // }
  swiper: {
    frame: {
      borderRadius: "6px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "transparent",
      display: "block",
      overflowY: "scroll",
      padding: "1rem",
      width: "100%",
      position: "absolute",
      height: "100%",

      // This allows content to scroll up into the bottom of
      // the screen in Safari and Firefox on iOS. FIXME!
      paddingBottom: "4rem",

    }
  },
  toolbar: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    textAlign: "center",
    flex: "unset",
    display: "block",
    height: "3rem",
  },
  fabCollapsed: {
    cursor: "pointer",
    fontSize: "1.35rem",
    borderRadius: "50%",
    height: "2rem",
    width: "2rem",
    margin: "0 auto auto auto",
    position: "relative", // So z-index works, see expanded state.
    ":after": {
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100%",
      textAlign: "center",
      margin: 0,
      // top: "-3px",
      content: '"+"'
    }
  },
  fabExpanded: {
    cursor: "pointer",
    fontSize: "1.35rem",
    borderRadius: "50%",
    height: "2rem",
    width: "2rem",
    margin: "0 auto auto auto",
    position: "relative", // So z-index works.
    zIndex: 10,
    ":after": {
      display: "block",
      position: "absolute",
      height: "100%",
      width: "100%",
      textAlign: "center",
      margin: 0,
      // top: "-2px",
      content: '"-"'
    }
  },
  ident: {
    width: "100%",
    height: "100%",
    overflowY: "scroll !important",
    padding: "1rem 1rem 0 1rem",
    " button": {
      marginBottom: "1em"
    },
    " + #toolbar": {
      display: "none"
    }
  },
  input: {
    '[type="text"]': {
      // borderStyle: "none none solid none",
      // borderWidth: "0 0 2px 0",
      // borderRadius: "4px 4px 0 0"
    }
  }
}

// ===================================================================
// Dupes.

common.input['[type="button"]'] = common.button
common.input['[type="submit"]'] = common.button
// common.input['[type="email"]'] = common.input['[type="text"]']
// common.input['[type="password"]'] = common.input['[type="text"]']
// common.input['[type="search"]'] = common.input['[type="text"]']


// ===================================================================
// Media queries:

// -------------------------------------------------------------------
// Small screens.

// Toolbar and FAB (its only content) disappear.
common.toolbar[mq.sm] = { ...invisible }
common.fabCollapsed[mq.sm] = { ...invisible }
common.fabExpanded[mq.sm] = { ...invisible }

// // Realign title in nav.
common.navTitle[mq.sm] = {
  margin: "auto auto auto 1rem",
  textAlign: "left"
}

// Show the menu in the nav.
common.navMenu[mq.sm] = {
  display: "inline-block",
  visibility: "visible",
  " ul": {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    margin: 0,
    padding: "0 1em 0 0",
    height: "100%",
    justifyContent: "space-evenly",
    // lineHeight: "1em",
    listStyle: "none",
  },
  " ul > li": {
    display: "inline-block",
    height: "100%",
    margin: "auto 0 auto 1rem",
    // position: "relative"
    listStyle: "none",
  }
}

common.navAction[mq.sm] = {
  margin: "auto"
}


// -------------------------------------------------------------------
// Medium screens.

common.container[mq.md] = {
  maxWidth: mq.breakpoint.lg + " !important",
  margin: "0 auto",
}

common.navAction[mq.md] = {
  height: "100%",
  // height: "2rem",
  margin: "2rem auto 0 auto",
  padding: 0
}

// All nav action buttons share the same CSS.
common.navActionCancel = common.navAction;
common.navActionIdent = common.navAction;
common.navActionShare = common.navAction;
common.navActionTheme = common.navAction;

common.navActionText[mq.sm] = { ...invisible }
common.navActionText[mq.md] = {
  display: "inline",
  visibility: "visible",
}

common.navActionIcon[mq.md] = {
  navActionIcon: {
    margin: 0
  }
}

export default common
export { common }
