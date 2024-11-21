import $ from 'umbrellajs';
import { Item } from '@scripts/pages/Item';

export class CaseItemsPage {
    private readonly $elem;
    private readonly caseId;
    private readonly items: Item[] = [];
    private readonly $controlSum;
    private controlSum;

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

    update() {
        this.controlSum = 0;

        for (const item of this.items) {
            this.controlSum += parseFloat(item.probability);
        }

        this.controlSum = parseFloat(this.controlSum.toFixed(2));

        this.$controlSum.find('.number').text((this.controlSum * 100).toFixed(2));
        this.$controlSum.nodes[0].classList.toggle('controlSum_error', this.controlSum !== 1);
    }
}
