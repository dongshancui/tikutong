"use server";
import "./index.css";
import React from "react";
import Title from "antd/lib/typography/Title";
import { Avatar, Button, Card, Divider, Flex, Typography } from "antd";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import {
  getQuestionBankVoByIdUsingGet,
  listQuestionBankVoByPageUsingPost,
} from "@/api/questionBankController";
import {
  listQuestionByPageUsingPost,
  listQuestionVoByPageUsingPost,
} from "@/api/questionController";
import QuestionBankList from "@/app/componenets/QuestionBankList";
import QuestionList from "@/app/componenets/QuestionList";
import Paragraph from "antd/es/typography/Paragraph";
import Meta from "antd/lib/card/Meta";
import questionBankList from "@/app/componenets/QuestionBankList";
import getBoundingClientRect from "@popperjs/core/lib/dom-utils/getBoundingClientRect";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  // 获取题库详情
  const { questionBankId } = params;
  let bank = undefined;

  try {
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

  return (
    <div id="bankPage" className={"bankPage"}>
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={<Title level={3}>{bank.title}</Title>}
          description={
            <>
              <Paragraph type={"secondary"} ellipsis={{ rows: 1 }}>
                {bank?.description ?? ""}
              </Paragraph>
              <Button
                type={"primary"}
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <Divider />

      <QuestionList
        questionBankId={questionBankId}
        questionList={bank?.questionPage?.records ?? []}
        cardTitle={`题目列表（${bank?.questionPage?.total || 0}）`}
      ></QuestionList>
    </div>
  );
}
