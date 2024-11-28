import $ from 'umbrellajs';
import { Item } from '@scripts/pages/Item';
import { AddItemForm } from '@scripts/pages/AddItemForm';

export class CaseItemsPage {
    private readonly $elem;
    private readonly $itemsTable;
    private readonly caseId;
    private readonly $controlSum;
    private items: Item[] = [];
    private controlSum;
    private addItemForm: AddItemForm;

    constructor(elem) {
        this.$elem = $(elem);
        this.caseId = parseInt(this.$elem.data('case-id'));
        this.$controlSum = this.$elem.find('.controlSum');
        this.$itemsTable = this.$elem.find('.itemsTable');
        this.$itemsTable
            .find('.item')
            .each((e) => {
                const item = new Item(e, {
                    onChange: () => {
                        this.update();
                    },
                    onRemove: () => {
                        this.removeItem(item);
                    },
                });
                this.items.push(item);
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

        this.controlSum = parseFloat(this.controlSum.toFixed(5));
        this.$controlSum.find('.number').text((this.controlSum * 100).toFixed(3).trimEnd('0'));
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
            margin: 0.15,
        })).toFixed(2);

        this.$elem.find('.optimalPrice .number').text(optimalPrice);

        this.addItemForm = new AddItemForm(this.$elem.find('.addItemForm'));

        this.$elem.find('.addItem').on('click', () => {
            this.addItemForm.open();
        });
    }

    public addItem(template) {
        const $item = $(template);

        this.$itemsTable.append($item);

        const item = new Item($item, {
            onChange: () => {
                this.update();
            },
            onRemove: () => {
                this.removeItem(item);
            },
        });

        this.items.push(item);
    }

    private removeItem(item) {
        const newItems = [];

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) continue;

            newItems.push(this.items[i])
        }

        this.items = newItems;
    }
}
