"use client";
import React, { useEffect, useState } from "react";
import { addUserSignInUsingPost } from "@/api/userController";

/**
 * 执行用户签到的钩子函数
 * @constructor
 */
const useAddUserSignInRecord = () => {
  // 签到状态
  const [loading, setLoading] = useState<boolean>(true);

  // 调用接口获取数据
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost({});
    } catch (e) {
      console.log("签到异常" + e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
