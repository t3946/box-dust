import $ from 'umbrellajs';
import Axios from '@scripts/utils/Axios';
import Toastify from 'toastify-js';
import App from '@scripts/App';

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
                const { min, max, rarity } = e.target.dataset;
                const rarities = rarity.split(',');

                this.$form.nodes[0].min.value = min;
                this.$form.nodes[0].max.value = max;

                for (let option of this.$form.nodes[0].rarity.options) {
                    option.selected = rarities.includes(option.value);
                }

                this.loadVariants();
            });

        this.$form.find('input, select').on('change input', () => {
            this.loadVariants();
        });

        this.$form.on('submit', (e) => {
            e.preventDefault();
            const data = this.getFormData();

            Axios.post('/admin/case/add-random-item', data).then(({ data }) => {
                if (data.error) {
                    Toastify({
                        text: data.error,
                        duration: 2000,
                        newWindow: true,
                        gravity: 'top', // `top` or `bottom`
                        position: 'right', // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: 'black',
                        },
                        onClick: function() {
                        }, // Callback after click
                    }).showToast();

                    return;
                }
                document.location.reload();
            });
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

    getFormData() {
        const data = {
            minPrice: parseFloat(this.$form.nodes[0].min.value),
            maxPrice: parseFloat(this.$form.nodes[0].max.value),
            text:  this.$form.nodes[0].text.value.trim(),
            quality:  this.$form.nodes[0].quality.value.trim(),
            rarity: [],
            caseId: this.caseId,
        };

        for (let option of this.$form.nodes[0].rarity.options) {
            if (option.selected) {
                data.rarity.push(option.value);
            }
        }

        return data;
    }

    loadVariants() {
        const data = this.getFormData();

        Axios
            .post('/admin/case/search-items', data)
            .then(({ data }) => {
                const $foundVariants = $('.foundVariants');
                const $itemExample = $foundVariants.find('.example .item');
                const $items = $foundVariants.find('.items');

                $items.html('');

                for (const item of data.items) {
                    const $item: any = $itemExample.clone();

                    $item.find('.name').text(item.name);
                    $item.find('.type').text(item.type);
                    $item.find('.price .number').text(item.price_usd);
                    $item.find('img').attr('src', 'https://boxdust.storage.yandexcloud.net/' + item.image);
                    $item.addClass('item_rarity_' + item.rarity);
                    $items.append($item);

                    $item.find('.addItemButton').on('click', () => {
                        Axios.post('/admin/case/add-item', {
                            caseId: this.caseId,
                            csItemId: item.id,
                        }).then(({ data }) => {
                            App.modules.pages.caseItems.addItem(data.template);
                        });
                    })
                }
            });
    }
}
