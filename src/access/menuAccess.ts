import {menus} from "../../config/menu";
import checkAccess from "@/access/checkAccess";

/**
 * 获取可以访问的菜单
 * @param loginUser
 * @param menusItems
 */
const getAccessibleMenus = (loginUser: API.LoginUserVO, menusItems = menus) => {
  console.log("1", loginUser.userRole);
  return menusItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) return false;
    console.log("1", loginUser.userRole);
    if (item.children) {
      item.children = getAccessibleMenus(loginUser, item.children);
    }
    return true;
  });
};

export default getAccessibleMenus;
