import * as React from "react";
import Style from "@components/pages/account/partnership/about/OfferCard.module.scss";
import cn from "classnames";

export enum ETheme {
  PURPLE1 = "purple1",
  PURPLE2 = "purple2",
  PURPLE3 = "purple3",
  PURPLE4 = "purple4",
}

export interface IProps {
  name: string;
  percent: number;
  theme: ETheme;
  requirements?: string[];
  className?: any;
  description: string;
  cost?: number;
  afterCost?: string;
}

export const OfferCard: React.FC<IProps> = function (props) {
  const {
    name,
    percent,
    theme,
    className,
    requirements = [],
    description,
    cost,
    afterCost,
  } = props;
  const requirementsItems = [];

  for (const requirement of requirements) {
    requirementsItems.push(<li>{requirement}</li>);
  }

  function costTemplate() {
    if (typeof cost === "number") {
      return <span className={"rouble"}>{cost.toLocaleString()}</span>;
    }
    return <span>{cost}</span>;
  }

  return (
    <div
      className={cn(
        "d-flex",
        "flex-column",
        Style.offerCard,
        Style[`bg_theme_${theme}`],
        className
      )}
    >
      <div className={Style.hat}>
        <span className={Style.header}>{name}</span>
      </div>

      <div className={cn("flex-grow-1", "d-flex", "flex-column")}>
        <div className={cn("flex-grow-1", "d-flex", "flex-column")}>
          {!!requirementsItems.length && (
            <div
              className={cn(
                "flex-grow-1",
                Style.requirements,
                "my-2",
                Style[`bg_theme_${theme}`]
              )}
            >
              <ul className={Style.requirementsList}>{requirementsItems}</ul>
            </div>
          )}
        </div>

        <p className={cn(Style.description, "mb-0")}>{description}</p>
      </div>

      <div className={cn("d-flex", "flex-column")}>
        <span className={Style.percent}>{percent}%</span>
        <i className={Style.cost}>Цена покупки: {costTemplate()}</i>
      </div>
    </div>
  );
};

export default OfferCard;
