"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProTable,
} from "@ant-design/pro-components";
import TagList from "@/app/componenets/TagList";
import { useEffect, useRef, useState } from "react";
import { Form, TablePaginationConfig } from "antd";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  // 默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  console.log(defaultSearchParams.title);
  const actionRef = useRef<ActionType>();

  // 给题目列表设置默认值,用于展示服务端渲染的数据
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || []
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);

  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);
  // 定义搜索栏参数
  const formRef = useRef<ProFormInstance>();
  // 设置form值
  const changeTitle = (value: string) => {
    formRef?.current?.setFieldsValue({
      title: value,
    });
  };
  useEffect(() => {
    changeTitle(defaultSearchParams?.title || "");
  }, [defaultSearchParams]);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "题目",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        // TODo:测试
        // console.log("::" + JSON.stringify(record));
        // console.log("::" + JSON.stringify(record.tagList));
        // const tags = JSON.parse(record.tagList || "[]");
        const { tagList } = record;
        return <TagList tagList={tagList}></TagList>;
      },
    },
  ];

  return (
    <div className={"question-table"}>
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size={"large"}
        search={{
          labelWidth: "auto",
        }}
        formRef={formRef}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共${total}条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次加载
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "desc";

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = Number(data.total) || 0;
          setQuestionList(newData);
          setTotal(newTotal);

          // TODO:测试
          console.log(JSON.stringify(newData));

          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};

export default QuestionTable;
