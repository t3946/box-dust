import * as React from "react";
import cn from "classnames";
import Styles from "@components/pages/main/reviews/Item.module.scss";

interface IProps {
  review: Record<any, any>;
  className: any;
}

export const Item: React.FC<IProps> = function (props) {
  const { review, className } = props;

  return (
    <div className={cn([Styles.container, className])}>
      <div className={cn(["mb-2"])}>
        <span className={Styles.author}>{review.user.name}</span>
      </div>
      <p className={cn([Styles.message, "m-0"])}>{review.text}</p>

      <div className={cn(["mt-2", "text-end"])}>
        <span className={Styles.date}>01.01.2022</span>
      </div>
    </div>
  );
};

export default Item;
