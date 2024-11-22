import $ from 'umbrellajs';
import { Item } from '@scripts/pages/Item';
import { AddItemForm } from '@scripts/pages/AddItemForm';

export class CaseItemsPage {
    private readonly $elem;
    private readonly caseId;
    private readonly items: Item[] = [];
    private readonly $controlSum;
    private controlSum;
    private addItemForm: AddItemForm;

    constructor(elem) {
        this.$elem = $(elem);
        this.caseId = parseInt(this.$elem.data('case-id'));
        this.$controlSum = this.$elem.find('.controlSum');

        this.$elem
            .find('.itemsTable .item')
            .each((e) => {
                this.items.push(new Item(e, {
                    onChange: () => {
                        this.update();
                    },
                }));
            });

        this.update();
    }

    private getOptimalBoxPrice(box) {
        const { items, margin } = box;
        let sum = 0;

        for (const item of items) {
            sum += item.price * item.chance;
        }

        return sum + sum * Math.max(margin, 0);
    }

    update() {
        this.controlSum = 0;

        for (const item of this.items) {
            this.controlSum += parseFloat(item.probability);
        }

        this.controlSum = parseFloat(this.controlSum.toFixed(2));

        this.$controlSum.find('.number').text((Math.round(this.controlSum * 100)));
        this.$controlSum.nodes[0].classList.toggle('controlSum_error', this.controlSum !== 1);

        const items = [];

        for (const item of this.items) {
            items.push({
                price: item.price,
                chance: item.probability,
            });
        }

        const optimalPrice = (this.getOptimalBoxPrice({
            items,
            margin: 0.10,
        })).toFixed(2);

        this.$elem.find('.optimalPrice .number').text(optimalPrice);

        this.addItemForm = new AddItemForm(this.$elem.find('.addItemForm'));

        this.$elem.find('.addItem').on('click', () => {
            this.addItemForm.open();
        });
    }
}
