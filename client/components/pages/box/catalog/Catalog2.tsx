import * as React from 'react';
import Styles from '@components/pages/box/catalog/Catalog2.module.scss';
import Card2 from '@components/pages/box/catalog/Card2';

export interface IProps {
  items: Record<any, any>[];
}

export const Catalog: React.FC<IProps> = function(props) {
  const { items } = props;
  const cards = [];
  const sortRarity = [
    'contraband',
    'covert',
    'classified',
    'restricted',
    'mil-spec-grade',
    'industrial-grade',
    'consumer-grade',
  ]

  items.sort((a: any, b: any) => {
    a = sortRarity.indexOf(a.item.rarity);
    b = sortRarity.indexOf(b.item.rarity);

    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  })

  for (let i = 0; i < items.length; i++) {
    cards.push(
      <Card2
        prize={items[i].item}
        key={`catalog-item-${i}`}
      />,
    );
  }

  return (
    <div className={Styles.catalog}>
      <div className={Styles.cardsWrapper}>
        <div className={Styles.cardsContainer}>{cards}</div>
      </div>
    </div>
  );
};

export default Catalog;
