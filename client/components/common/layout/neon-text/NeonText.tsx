import * as React from "react";
import Styles from "@components/common/layout/neon-text/NeonText.module.scss";
import cn from "classnames";

export enum ETheme {
  pink = "pink",
  yellow = "yellow",
}

interface IProps {
  text: string;
  theme?: ETheme;
}

export const NeonText: React.FC<IProps> = function (props) {
  const { text, theme = ETheme.pink } = props;

  return (
    <span className={cn([Styles.neonText, Styles[`neonText_theme_${theme}`]])}>
      <span className={cn(Styles.before, Styles[`before_theme_${theme}`])} />

      <span>{text}</span>

      <span className={cn(Styles.after, Styles[`after_theme_${theme}`])}>
        {text}
      </span>
    </span>
  );
};

export default NeonText;
