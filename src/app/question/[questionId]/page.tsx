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
import QuestionCard from "@/app/componenets/questionCard";

/**
 * 题库题目详情页
 * @constructor
 */
export default async function QuestionPage({ params }) {
  // 获取题目详情
  const { questionId } = params;
  let bank = undefined;
  let question = undefined;

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
    <div id="questionPage">
      <QuestionCard question={question} />
    </div>
  );
}
