import $ from 'umbrellajs';
import { Range } from '@scripts/pages/Range';
import Axios from '@scripts/utils/Axios';

export class Item {
    private readonly $elem;
    private readonly $input;
    private readonly range: Range;
    private readonly itemId;
    private readonly onChange;
    private readonly onRemove;
    public readonly price;
    public probability;

    constructor(elem, options) {
        const { onChange, onRemove } = options;

        this.onChange = onChange;
        this.onRemove = onRemove;
        this.$elem = $(elem);
        this.$input = this.$elem.find('input[type="number"]');
        this.probability = parseFloat(this.$elem.data('probability'));
        this.itemId = parseInt(this.$elem.data('item-id'));
        this.price = parseInt(this.$elem.data('price'));

        this.$input.on('change', () => {
            const newValue = Math.max(Math.min(parseFloat(this.$input.nodes[0].value), 100), 0);
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

        this.$elem.find('.removeItem').on('click', () => this.remove());

        this.$elem.find('.setOnPreview').on('click', () => this.setOnPreview())
    }

    saveProbability() {
        Axios.post('/admin/case/update-probability', {
            itemId: this.itemId,
            probability: this.probability,
        });
    }

    remove() {
        if (!confirm('Remove ' + this.$elem.find('.title').nodes[0].title)) {
            return;
        }

        Axios.post('/admin/case/remove-item', {
            itemId: this.itemId,
        }).then(() => {
            this.$elem.remove();
            this.onRemove();
        });
    }

    setOnPreview() {
        Axios.post('/admin/case/set-on-preview', {
            itemId: this.itemId,
        }).then(() => {
            document.location.reload();
        });
    }
}
