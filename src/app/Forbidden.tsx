import {Button, Result} from "antd";

// 定义一个权限错误的访问页面，提供返回主页的跳转格式
const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subtitle={"对不起，您无权访问该页面!"}
      extra={
        <Button type={"primary"} href={"/"}>
          返回首页
        </Button>
      }
    />
  );
};

export default Forbidden;
