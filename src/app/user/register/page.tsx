"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import {
  userLoginUsingPost,
  userRegisterUsingPost,
} from "@/api/userController";
import { ProForm } from "@ant-design/pro-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserRegisterPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  /**
   * 提交用户注册信息表单
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        console.log("注册成功,请登录");
        form.resetFields();
        router.replace("/user/login");
      }
    } catch (e) {
      console.log("注册失败" + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo="https://github.githubassets.com/favicons/favicon.png"
        title="题库通-用户注册"
        subTitle="程序员必备的面试刷题网站"
        submitter={{
          // 配置按钮文本
          searchConfig: {
            submitText: "注册",
          },
        }}
        onFinish={doSubmit}
      >
        {
          <>
            <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder={"请输入用户名"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"请输入密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"请确认输入密码"}
              rules={[
                {
                  required: true,
                  message: "请再次输入密码！",
                },
              ]}
            />
          </>
        }
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          <Link prefetch={false} href={"/user/login"}>
            去登录
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
