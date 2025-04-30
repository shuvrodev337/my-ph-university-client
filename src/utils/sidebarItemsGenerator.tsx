import { NavLink } from "react-router-dom";
import { TSideBarItem, TuserPath } from "../types";

export const sidebarItemsGenerator = (items: TuserPath[], userRole: string) => {
  const sidebarItems = items.reduce((acc: TSideBarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${userRole}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: (
            <NavLink to={`/${userRole}/${child.path}`}>{child.name}</NavLink>
          ),
        })),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
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
