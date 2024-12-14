import MdViewer from "@/app/componenets/MdViewer";
import MdEditor from "@/app/componenets/MdEditor";

const User = () => {
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <MdEditor />,
      <MdViewer />
    </div>
  );
};

export default User;
