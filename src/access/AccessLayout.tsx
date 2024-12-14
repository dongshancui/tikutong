import React from "react";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {findAllMenuItemByPath} from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/Forbidden";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  // 获取当前路径
  const pathname = usePathname();
  // 在所有路径中获取当前路径需要权限
  const menuItemByPath = findAllMenuItemByPath(pathname);
  const needAccess = menuItemByPath?.access ?? ACCESS_ENUM.NOT_LOGIN;
  // 获取当前用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 校验用户权限
  const canAccess = checkAccess(loginUser,needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return children;
}

export default AccessLayout;
