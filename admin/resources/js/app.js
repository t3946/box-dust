require( './bootstrap' );

import { createApp, h } from 'vue';
import { App as InertiaApp, plugin as InertiaPlugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock, faTimes, faEnvelope, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faVk, faGoogle } from '@fortawesome/free-brands-svg-icons';

const el = document.getElementById( 'app' );

library.add( [
    faUser,
    faEnvelope,
    faLock,
    faTimes,
    faVk,
    faGoogle,
    faArrowLeft,
    faArrowRight,
] );

//InertiaApp has not component method
import classnames from 'classnames';

const app = createApp( {
    render: () =>
        h( InertiaApp, {
            initialPage: JSON.parse( el.dataset.page ),
            resolveComponent: ( name ) => require( `./Pages/${ name }` ).default,
        } ),
} )
    .mixin( { methods: { route, classnames } } )
    .use( InertiaPlugin )
    .mount( el );

InertiaProgress.init( { color: '#4B5563' } );
