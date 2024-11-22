import $ from 'umbrellajs';
import Axios from '@scripts/utils/Axios';

export class AddItemForm {
    private readonly $elem;
    private readonly $form;
    private readonly caseId;
    private isOpen = true;

    constructor(elem) {
        this.$elem = $(elem);
        this.$form = this.$elem.find('form');
        this.caseId = parseInt(this.$elem.data('case-id'));

        this.$elem
            .find('.randomItem')
            .on('click', () => {

            });

        this.$elem
            .find('.presets button')
            .on('click', (e) => {
                const {min, max, rarity} = e.target.dataset;
                const rarities = rarity.split(',');

                this.$form.nodes[0].min.value = min;
                this.$form.nodes[0].max.value = max;

                for (let option of this.$form.nodes[0].rarity.options) {
                    option.selected = rarities.includes(option.value);
                }
            });

        this.$form.on('submit', (e) => {
            e.preventDefault();
            const data = {
                minPrice: this.$form.nodes[0].min.value,
                maxPrice: this.$form.nodes[0].max.value,
                rarity: [],
                caseId: this.caseId,
            }

            for (let option of this.$form.nodes[0].rarity.options) {
                if (option.selected) {
                    data.rarity.push(option.value);
                }
            }


            Axios.post('/admin/case/add-random-item', data).then(() => {
                document.location.reload();
            });
        })

        this.update();
    }

    update() {
        this.$elem.nodes[0].classList.toggle('hidden', !this.isOpen);
    }

    open() {
        this.isOpen = true;
        this.update();
    }
}
