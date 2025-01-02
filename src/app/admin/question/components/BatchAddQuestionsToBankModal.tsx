import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { batchAddQuestionToBankUsingPost } from "@/api/questionBankQuestionController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * 批量添加题目到题库弹窗
 * @param props
 * @constructor
 */
const BatchAddQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState([]);

  // 全量获取题库信息
  const doSubmit = async (values: API.QuestionBankQuestionBatchAddRequest) => {
    const hide = message.loading("正在添加");
    const questionBankId = values.questionBankId;
    if (!questionBankId) {
      return;
    }
    // 批量添加题目到题库
    try {
      const res = await batchAddQuestionToBankUsingPost({
        questionIdList: questionIdList,
        questionBankId: questionBankId,
      });
      hide();
      console.log("操作成功!");
      onSubmit?.();
    } catch (e) {
      hide();
      console.log("操作失败！" + e.message);
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
      title={"批量添加题目到题库"}
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
            添加
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchAddQuestionsToBankModal;
