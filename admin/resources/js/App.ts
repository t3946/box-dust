import $ from 'umbrellajs';
import { CaseItemsPage } from '@scripts/pages/CaseItemsPage';
import "toastify-js/src/toastify.css";
import { CsItemEdit } from '@scripts/pages/CsItemEdit';

function initIfExists<T>(e, constructor: any): T {
    if (!$(e).length) {
        return;
    }

    return new constructor(e);
}

type TModules = {
    pages: {
        caseItems: CaseItemsPage,
    }
}
class Main {
    public modules: TModules = {
        pages: {
            caseItems: null,
        },
    };

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
        });
    }
}

const App = (function() {
    let instance: Main;

    return {
        getInstance: function(): Main {
            if (instance == null) {
                instance = new Main();

                instance.modules.pages.caseItems = initIfExists('.caseItemsPage', CaseItemsPage);

                initIfExists('.csItemEditPage', CsItemEdit);

                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }

            return instance;
        },
    };
})();
export default App.getInstance();
