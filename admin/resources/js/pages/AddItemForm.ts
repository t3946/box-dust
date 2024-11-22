import $ from 'umbrellajs';
import Axios from '@scripts/utils/Axios';

export class AddItemForm {
    private readonly $elem;
    private readonly caseId;
    private isOpen = false;

    constructor(elem) {
        this.$elem = $(elem);
        this.caseId = parseInt(this.$elem.data('case-id'));

        this.$elem
            .find('.randomItem')
            .on('click', () => {
                Axios.post('/admin/case/add-random-item', {
                    rarity: 'consumer-grade',
                    minPrice: 5,
                    maxPrice: 10,
                    caseId: this.caseId
                }).then(() => {
                    document.location.reload();
                })
            });

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
