import * as React from "react";
import Style from "@components/pages/main/faq/Item.module.scss";
import cn from "classnames";

export interface IProps {
  question: Record<any, any>;
}

export const Item: React.FC<IProps> = function (props) {
  const { question } = props;

  return (
    <div className={Style.item}>
      <div className={cn(Style.title, "mb-2")}>{question.title}</div>
      <div className={cn(Style.content)}>{question.content}</div>
    </div>
  );
};

export default Item;
