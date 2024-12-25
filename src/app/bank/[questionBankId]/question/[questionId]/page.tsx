"use server";
import "./index.css";
import React from "react";
import Title from "antd/lib/typography/Title";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Menu,
  Slider,
  Typography,
} from "antd";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import {
  getQuestionBankVoByIdUsingGet,
  listQuestionBankVoByPageUsingPost,
} from "@/api/questionBankController";
import {
  getQuestionVoByIdUsingGet,
  listQuestionByPageUsingPost,
  listQuestionVoByPageUsingPost,
} from "@/api/questionController";
import QuestionBankList from "@/app/componenets/QuestionBankList";
import QuestionList from "@/app/componenets/QuestionList";
import Paragraph from "antd/es/typography/Paragraph";
import Meta from "antd/lib/card/Meta";
import questionBankList from "@/app/componenets/QuestionBankList";
import getBoundingClientRect from "@popperjs/core/lib/dom-utils/getBoundingClientRect";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

/**
 * 题库题目详情页
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  // 获取题库详情
  const { questionBankId, questionId } = params;
  let bank = undefined;
  let question = undefined;

  try {
    // 根据题库id获取题库信息
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    console.log(e.message);
  }
  // 判断题库是否为空
  if (!bank) {
    return <div>获取题库信息异常，请刷新重试</div>;
  }

  let firstQuestionId = undefined;
  if (bank?.questionPage?.records && bank?.questionPage?.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  // 根据题库id获取题库信息
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    console.log(e.message);
  }
  // 判断题库是否为空
  if (!question) {
    return <div>获取题目信息异常，请刷新重试</div>;
  }

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme={"light"} style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu />
        </Sider>
        <Content>题目详情</Content>
      </Flex>
    </div>
  );
}
