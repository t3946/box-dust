import $ from 'umbrellajs';
import { CaseItemsPage } from '@scripts/pages/CaseItemsPage';
import "toastify-js/src/toastify.css"

function initIfExists<T>(e, constructor: any): T {
    if (!$(e).length) {
        return;
    }

    return new constructor(e);
}

class Main {
    public modules = {};

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

                initIfExists('.caseItemsPage', CaseItemsPage);

                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }

            return instance;
        },
    };
})();
export default App.getInstance();
