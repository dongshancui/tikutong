import React from "react";
import "./index.css";

/**
 * 全局底部栏组件，版权信息+标签信息
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={"global-footer"}>
      <div>© {currentYear} 题库通刷题平台</div>
      <div>by cuidongshan</div>
    </div>
  );
}
