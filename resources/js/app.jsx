// import './bootstrap';
// import '../css/app.css';
import '../css/style.css';

import '/public/dashboard-assets/css/bootstrap.min.css';
// import '/public/dashboard-assets/plugins/fontawesome/css/fontawesome.min.css';
// import '/public/dashboard-assets/plugins/fontawesome/css/all.min.css';
import '/public/dashboard-assets/css/feathericon.min.css';
import '/public/dashboard-assets/plugins/morris/morris.css';
import '/public/dashboard-assets/css/custom.css';
import '/public/dashboard-assets/plugins/datatables/datatables.min.css';



import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
