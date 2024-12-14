"use client";
import React from "react";
import { Props } from "next/script";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ProLayout } from "@ant-design/pro-layout";
import { Dropdown, Input } from "antd";
import { GithubFilled, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import GlobalFooter from "@/app/componenets/GlobalFooter";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { menus } from "../../../config/menu";

function SearchInput() {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}

function LogoutOutl(props: { ined: boolean }) {
  return null;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  // 获取当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);

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
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutl ined />,
                      label: "退出登录",
                    },
                  ],
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
            <SearchInput key={"search"}></SearchInput>,
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
