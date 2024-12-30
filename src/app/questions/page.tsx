"use server";
import {
  listQuestionVoByPageUsingPost,
  searchQuestionVoByPageUsingPost,
} from "@/api/questionController";
import Title from "antd/lib/typography/Title";
import QuestionTable from "@/app/componenets/QuestionTable";

/**
 * 题目列表页面
 *
 * @constructor
 */
/**
 * 题库列表页面
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取url中的查询参数
  const { q: searchText } = searchParams;
  // 获取题库列表
  let questionList = [];
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    console.log("获取题目列表失败" + e.message);
  }

  return (
    <div id="questionsPage" className={"max-width-content"}>
      <Title level={3}>题目列表</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      ></QuestionTable>
    </div>
  );
}
