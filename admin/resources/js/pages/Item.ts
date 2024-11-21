import $ from 'umbrellajs';
import { Range } from '@scripts/pages/Range';
import Axios from '@scripts/utils/Axios';

export class Item {
    private readonly $elem;
    private readonly $input;
    private readonly range: Range;
    private readonly itemId;
    private readonly onChange;
    public probability;

    constructor(elem, options) {
        const { onChange } = options;

        this.onChange = onChange;
        this.$elem = $(elem);
        this.$input = this.$elem.find('input[type="number"]');
        this.probability = this.$elem.data('probability');
        this.itemId = parseInt(this.$elem.data('item-id'));

        this.$input.on('change', () => {
            const newValue = Math.max(Math.min(parseInt(this.$input.nodes[0].value), 100), 1);
            this.$input.nodes[0].value = newValue;
            this.probability = newValue / 100;
            this.range.setValue(newValue);
            this.onChange();
            this.saveProbability();
        });

        this.range = new Range(this.$elem.find('.range'), {
            onChange: (newValue, sendRequest = true) => {
                this.$input.nodes[0].value = newValue;
                this.probability = newValue / 100;
                this.onChange();
                sendRequest && this.saveProbability();
            },
        });
    }

    saveProbability() {
        const data = {
            itemId: this.itemId,
            probability: this.probability,
        };

        Axios.post('/admin/test', data);
    }
}
