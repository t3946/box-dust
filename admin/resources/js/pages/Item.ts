import $ from 'umbrellajs';
import { Range } from '@scripts/pages/Range';
import Axios from '@scripts/utils/Axios';
import copy from 'copy-to-clipboard';
import Toastify from 'toastify-js';

export class Item {
    private readonly $elem;
    private readonly $input;
    private readonly range: Range;
    private readonly itemId;
    private readonly onChange;
    public readonly price;
    public probability;

    constructor(elem, options) {
        const { onChange } = options;

        this.onChange = onChange;
        this.$elem = $(elem);
        this.$input = this.$elem.find('input[type="number"]');
        this.probability = parseFloat(this.$elem.data('probability'));
        this.itemId = parseInt(this.$elem.data('item-id'));
        this.price = parseInt(this.$elem.data('price'));

        this.$input.on('change', () => {
            const newValue = Math.max(Math.min(parseInt(this.$input.nodes[0].value), 100), 0);
            this.$input.nodes[0].value = newValue;
            this.probability = newValue / 100;
            this.range.setValue(newValue);
            this.onChange();
            this.saveProbability();
        });

        this.$elem
            .find('.title')
            .on('click', (e) => {
                const title = this.$elem.find('.title').nodes[0].title;

                copy(title);

                Toastify({
                    text: "Copied",
                    duration: 2000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
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
