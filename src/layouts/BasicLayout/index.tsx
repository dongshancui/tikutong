"use client";
import React from "react";
import { Props } from "next/script";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ProLayout } from "@ant-design/pro-layout";
import { Dropdown, Input } from "antd";
import { GithubFilled, SearchOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import GlobalFooter from "@/app/componenets/GlobalFooter";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { menus } from "../../../config/menu";
import {
  userLogoutUsingPost,
  userRegisterUsingPost,
} from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
  children: React.ReactNode;
}

function LogoutOutl(props: { ined: boolean }) {
  return null;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // 获取当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 用户登出函数
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
      console.log("已退出登录！");
    } catch (e) {
      console.log("退出登录失败！" + e.message);
    }
  };
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout={"top"}
        title={"题库通"}
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试刷题网站 - cuidongshan"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "dongshan",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined ined />,
                      label: "用户中心",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutl ined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: (event: React.Key) => {
                    const { key } = event;
                    if (key === "logout") {
                      userLogout();
                    } else if (key === "userCenter") {
                      router.push("/user/center");
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          // if (props.isMobile) return [];
          return [
            <SearchInput key={"search"} />,
            <a
              key="github"
              href={"https://chat18.aichatos.xyz/#/chat/1718767851513"}
              target={"_blank"}
            />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // {/*定义有哪些菜单*/}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        <div>{children}</div>
      </ProLayout>
    </div>
  );
}
