"use client";
import React, { useState } from "react";
import { Props } from "next/script";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ProLayout } from "@ant-design/pro-layout";
import { Dropdown, Input } from "antd";
import { GithubFilled, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import MdEditor from "@/app/componenets/MdEditor";
import MdViewer from "@/app/componenets/MdViewer";

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
  const [text, setText] = useState<string>("");
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
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "dongshan",
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
          const defaultDom = (
            <a>
              {logo}
              {title}
            </a>
          );
          // if (typeof window === 'undefined') return defaultDom;
          // if (document.body.clientWidth < 1400) {
          //     return defaultDom;
          // }
          // if (_.isMobile) return defaultDom;
          return <>{defaultDom}</>;
        }}
        // {/*定义有哪些菜单*/}
        menuDataRender={() => {
          return [
            {
              path: "/questions",
              name: "题目",
            },
            {
              path: "/banks",
              name: "题库",
            },
          ];
        }}
        footRender={() => {
          return <GlobalFooter />;
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: "center",
                paddingBlockStart: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        <div>
          <MdEditor value={text} onChange={setText} />,
          <MdViewer value={text} />
          {children}
        </div>
      </ProLayout>
    </div>
  );
}
