"use server";
import "./index.css";
import React from "react";
import Title from "antd/lib/typography/Title";
import { Divider, Flex } from "antd";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {
  listQuestionByPageUsingPost,
  listQuestionVoByPageUsingPost,
} from "@/api/questionController";
import QuestionBankList from "@/app/componenets/QuestionBankList";
import QuestionList from "@/app/componenets/QuestionList";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  // 获取题库列表
  let questionBankList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    console.log(e.message);
  }
  // 获取题目列表
  let questionList = [];
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
  } catch (e) {
    console.log(e.message);
  }

  return (
    <div id="homePage" className={"max-width-content"}>
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
      <Divider />
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questionList={questionList}></QuestionList>
    </div>
  );
}
