import $ from 'umbrellajs';
import Axios from '@scripts/utils/Axios';

export class CsItemEdit {
    private readonly $elem;

    constructor(elem) {
        this.$elem = $(elem);

        const $saveImageForm = this.$elem.find('.saveImageForm');

        $saveImageForm.on('submit', (e) => {
            e.preventDefault();
            console.log('submit');

            const image = $saveImageForm.nodes[0].image.files[0];

            if (!image) {
                return;
            }

            const fd = new FormData();

            fd.append('image', image);
            fd.append('csItemId', $saveImageForm.nodes[0].csItemId.value);

            Axios
                .post('admin/cs-item/save-image', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(({ data }) => {
                    this.$elem.find('.csItemImage').nodes[0].src = data.newImageUrl;
                });
        });
    }
}
