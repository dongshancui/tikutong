"use client";
import "./index.css";
import { Avatar, Card, Divider, List, Tag, Typography } from "antd";
import Link from "next/link";
import TagList from "@/app/componenets/TagList";
import Title from "antd/es/skeleton/Title";
import MdViewer from "@/app/componenets/MdViewer";

interface Props {
  question: API.QuestionVO;
}

/**
 * 题目卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
    <div className="question-card">
      <Card title={question.title}>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <Title level={3}>题目内容</Title>
        <MdViewer value={question.content} />
      </Card>
      <div style={{ margionBottom: 16 }} />
      <Divider />
      <Card title={"推荐答案"}>
        <MdViewer value={question.answer}></MdViewer>
      </Card>
    </div>
  );
};

export default QuestionCard;
