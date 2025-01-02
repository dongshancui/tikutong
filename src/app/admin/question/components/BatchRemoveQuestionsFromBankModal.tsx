import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { batchRemoveQuestionFromBankUsingPost } from "@/api/questionBankQuestionController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量从题库移除题目弹窗
 * @param props
 * @constructor
 */
const BatchRemoveQuestionsFromBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState([]);

  // 全量获取题库信息
  const doSubmit = async (
    values: API.QuestionBankQuestionBatchRemoveRequest
  ) => {
    const hide = message.loading("正在移除");
    const questionBankId = values.questionBankId;
    if (!questionBankId) {
      return;
    }
    // 根据题库id获取题库信息
    try {
      const res = await batchRemoveQuestionFromBankUsingPost({
        questionIdList: questionIdList,
        questionBankId: questionBankId,
      });
      hide();
      console.log("移除成功!");
      onSubmit?.();
    } catch (e) {
      console.log("移除失败！" + e.message);
    }
  };

  // 全量获取题库信息
  const getQuestionBankList = async () => {
    // 根据题库id获取题库信息
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        sortOrder: "descend",
        sortField: "createTime",
        pageSize: 200,
      });
      console.log(JSON.stringify(questionBankList));
      setQuestionBankList(res?.data?.records ?? []);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
    <Modal
      destroyOnClose
      title={"批量从题库移除题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} onFinish={doSubmit}>
        <Form.Item label={"选择题库"} name={"questionBankId"}>
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            移除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchRemoveQuestionsFromBankModal;
