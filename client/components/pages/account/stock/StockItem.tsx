import Style from "@components/pages/account/stock/StockItem.module.scss";
import * as React from "react";
import cn from "classnames";
import Badge from "react-bootstrap/Badge";

export interface IProps {
  stockItem: Record<any, any>;
  className?: any;
  onClick: any;
}

export const StockItem: React.FC<IProps> = function (props) {
  const { stockItem, className, onClick } = props;
  const { item, total } = stockItem;
  const rareSlugItemThemeMap = {
    rare: Style.item_theme_gold,
    normal: Style.item_theme_silver,
  };
  const rareSlugNameThemeMap = {
    rare: Style.name_theme_gold,
    normal: Style.name_theme_silver,
  };

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "position-relative",
          Style.item,
          rareSlugItemThemeMap[item.rare.slug]
        )}
        onClick={onClick}
      >
        <Badge pill bg="light" text="dark" className={Style.item__badge}>
          {total}
        </Badge>

        <div
          className={cn(
            Style.imageContainer,
            "d-flex",
            "justify-content-center",
            "p-2"
          )}
        >
          <img
            className={Style.image}
            src={`/storage/${item.image.name}`}
            alt={item.name}
          />
        </div>

        <div
          className={cn(
            "p-2",
            Style.name,
            rareSlugNameThemeMap[item.rare.slug]
          )}
        >
          <span className={cn(Style.nameText)}>{item.name}</span>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
