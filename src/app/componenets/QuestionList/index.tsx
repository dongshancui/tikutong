"use client";
import "./index.css";
import { Avatar, Card, List, Tag, Typography } from "antd";
import Link from "next/link";
import TagList from "@/app/componenets/TagList";

interface Props {
  questionBankId: number;
  questionList?: API.QuestionVO[];
  cardTitle: string;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionBankId, questionList = [], cardTitle = "" } = props;

  return (
    <Card className="question-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item: API.QuestionVO) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta
              key={item.id}
              title={
                <Link
                  href={
                    questionBankId
                      ? `/bank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
              description={
                <Typography.Paragraph type={"secondary"} ellipsis={{ rows: 1 }}>
                  {item.content}
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default QuestionList;
