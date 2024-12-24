"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { ProForm } from "@ant-design/pro-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserLoginPage: React.FC = (props) => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  /**
   * 提交用户登录信息表单
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        console.log("登录成功");
        // 保存用户登录状态
        dispatch(setLoginUser(res.data));
        form.resetFields();
        router.replace("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div id="userLoginPage">
      <LoginForm
        form={form}
        logo="https://github.githubassets.com/favicons/favicon.png"
        title="题库通-用户登录"
        subTitle="程序员必备的面试刷题网站"
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
          </>
        }
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link prefetch={false} href={"/user/register"}>
            去注册
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
