const lazyLoad = async (componentName) => {
  return await import(
    /* webpackPrefetch: true, webpackMode: "lazy-once" */
    `../components/${componentName}`
  );
}

// const lazyLoad = async (componentName, chunkName="") => {
//   // FIXME Get chunk names and prefetch working!!
//   switch (chunkName) {
//     case "":
//       return await import(
//         /* webpackChunkName: "${chunkName}", webpackPrefetch: true, webpackMode: "lazy-once" */
//         `../components/${componentName}`
//       );
//       break;
// 
//     default:
//       return await import(
//         /* webpackChunkName: "[request]", webpackPrefetch: true, webpackMode: "lazy-once" */
//         `../components/${componentName}`
//       );
//       break;
//   }
// }

export default lazyLoad
export { lazyLoad }
