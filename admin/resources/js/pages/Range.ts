import $ from 'umbrellajs';

export class Range {
    private readonly $elem;
    private readonly $input;
    private value;
    private readonly onChange = null;

    constructor(elem, options: any = {}) {
        const { onChange } = options;

        this.onChange = onChange;
        this.$elem = $(elem);
        this.$input = this.$elem.find('input[type="range"]');
        this.value = parseInt(this.$input.nodes[0].value);

        this.$input.on('input', () => {
            this.value = parseInt(this.$input.nodes[0].value);
            this.onChange(this.value, false);
        });

        this.$input.on('change', () => {
            this.value = parseInt(this.$input.nodes[0].value);
            this.onChange(this.value);
        });

        this.$elem.find('.inc').on('click', () => this.inc());
        this.$elem.find('.dec').on('click', () => this.dec());
    }

    setValue(newValue) {
        this.value = Math.max(Math.min(newValue, 100), 1);
        this.update();
    }

    update() {
        this.$input.nodes[0].value = this.value;
    }

    inc() {
        this.setValue(this.value + 1);
        this.onChange(this.value);
    }

    dec() {
        this.setValue(this.value - 1);
        this.onChange(this.value);
    }
}
