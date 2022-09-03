import * as React from "react";
import { PropsWithChildren } from "react";
import Style from "@components/common/form/feedback/Feedback.module.scss";
import { Form } from "react-bootstrap";
import cn from "classnames";
import { FeedbackType } from "react-bootstrap/Feedback";

export interface IProps extends PropsWithChildren<any> {
  type?: FeedbackType;
  className?: any;
  message?: string;
}

export const Feedback: React.FC<IProps> = function (props) {
  const { message, type = "valid", className } = props;

  if (!message) {
    return null;
  }

  return (
    <Form.Control.Feedback
      type={type}
      className={cn(className, Style["feedback_type" + type], "d-block")}
    >
      {message}
    </Form.Control.Feedback>
  );
};

export default Feedback;
