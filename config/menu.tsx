import { MenuDataItem } from "@umijs/route-utils";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "https://kimi.moonshot.cn/",
    name: "kimi",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理员",
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
    icon: <CrownOutlined />,
  },
] as MenuDataItem;

// 根据全部路径查找菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单（递归）
export const findMenuItemByPath = (
  menus: MenuDataItem[],
  path: string
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedItem = findMenuItemByPath(menu.children, path);
      if (matchedItem) {
        return matchedItem;
      }
    }
  }
  return null;
};
