import {
  getQuestionVoByIdUsingGet,
  updateQuestionUsingPost,
} from "@/api/questionController";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  getQuestionBankQuestionVoByIdUsingGet,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import questionBankList from "../../../componenets/QuestionBankList";

interface Props {
  questionId: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading("正在更新");
  try {
    await updateQuestionUsingPost(fields);
    hide();
    message.success("更新成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("更新失败，" + error.message);
    return false;
  }
};

/**
 * 更新题目所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState([]);

  const getCurrentQuestionBankIdList = async () => {
    // 根据题库id获取题库信息
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId: questionId,
        pageSize: 20,
      });
      const idList = (res?.data?.records ?? []).map((item) => {
        return item.questionBankId;
      });
      console.log(idList);
      form.setFieldValue("questionBankIdList" as any, idList);
    } catch (e) {
      console.log("获取题目所属题库列表失败" + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]);

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
      title={"更新"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} title={"更新所属题库"}>
        <Form.Item label={"所属题库"} name={"questionBankIdList"}>
          <Select
            mode={"multiple"}
            style={{ width: "100%" }}
            // defaultValue={questionBankIdList}
            onSelect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("绑定成功");
              } catch (e: any) {
                hide();
                message.error("绑定题库失败" + e.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在更新");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId,
                  questionBankId: value,
                });
                hide();
                message.success("取消绑定题库成功");
              } catch (e: any) {
                hide();
                message.error("取消绑定题库失败" + e.message);
              }
            }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
