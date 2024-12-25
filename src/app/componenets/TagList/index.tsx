import "./index.css";
import { Tag } from "antd";

interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag: any, index: any) => {
        return <Tag key={index}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;