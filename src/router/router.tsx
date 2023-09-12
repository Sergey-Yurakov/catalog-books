import { createBrowserRouter } from 'react-router-dom';
import App from '../app/App';

export const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
]);
