"use server";
import "./index.css";
import React from "react";
import Title from "antd/lib/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/app/componenets/QuestionBankList";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {
  // 获取题库列表
  let questionBankList = [];
  // 为了做分页查询，直接一次拉去全量数据，拉200条
  const pageSize = 200;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    console.log(e.message);
  }

  return (
    <div id="homePage" className={"max-width-content"}>
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
    </div>
  );
}
