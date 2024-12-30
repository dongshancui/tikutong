"use client";
import Title from "antd/lib/typography/Title";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useState } from "react";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/skeleton/Paragraph";
import CalenderChart from "@/app/user/center/components/page";

/**
 * 题目列表页面
 *
 * @constructor
 */
/**
 * 用户刷题记录页面
 * @constructor
 */
export default function UserCenterPage() {
  // 获取当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const user = loginUser;
  const [activeTabKey, setActiveTabKey] = useState<string>("record");

  const tabList = [
    { key: "record", tab: "刷题记录" },
    { key: "other", tab: "其他" },
  ];

  return (
    <div id="userCenterPage" className={"max-width-content"}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72} />
            <div style={{ marginBottom: 16 }} />
            <Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName}
                </Title>
              }
              description={
                <>
                  <Paragraph type={"secondary"}>{user.userProfile}</Paragraph>
                </>
              }
            ></Meta>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            style={{ width: "100%" }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(value: string) => {
              setActiveTabKey(value);
            }}
          >
            {activeTabKey === "record" && <CalenderChart />}
            {activeTabKey === "other" && <> bbb </>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
