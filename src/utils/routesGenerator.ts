import { TRoute, TuserPath } from "../types";

export const routesGenerator = (items: TuserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};

/**
 * Here we are converting adminPaths to adminRoutes and adminSidebarItems
 * so that we can serve both purpose with the One array.
 * 1.in routes(adminRoutes)
 * 2.in the sidebar(adminSidebarItems)
 *
 * adminPaths is the 1 array , we are converting it to make it work in both places.
 * we are using array REDUCE method to make it structured like 2 hard coded versions given in admin.routes.ts.
 *  two versions are for two places.
 *
 */
