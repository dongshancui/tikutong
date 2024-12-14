import AccessEnum from "@/access/accessEnum";

/**
 * 检查用户是否存在要求的权限
 * @param loginUser 当前登录用户
 * @param needAccess    需要具有的权限
 * @return boolean 有无权限
 */

const checkAccess = (
    loginUser: API.LoginUserVO,
    needAccess = AccessEnum.NOT_LOGIN
) => {
  // 获取当前登录用户的具有的权限（如果没有登录，则默认没有权限）
  const loginUserAccess = loginUser?.userRole || AccessEnum.NOT_LOGIN;
  // 如果页面不需要权限，直接返回
  if (needAccess === AccessEnum.NOT_LOGIN) {
    return true;
  }
  // 如果需要用户权限为user，判断是否满足
  if (needAccess === AccessEnum.USER) {
    // 如果用户未登录，表示无权限
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要用户权限为admin，判断是否满足
  if (needAccess === AccessEnum.ADMIN) {
    console.log("2", loginUserAccess);
    // 必须要有管理员权限，如果没有，表示无权限
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }

  }
  return true;
};

export default checkAccess;
