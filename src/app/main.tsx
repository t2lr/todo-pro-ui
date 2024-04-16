import '../shared/styles/index.less';
import '../shared/configs/mock';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from '../stores';

import { queryClient } from '@/shared/api/query-client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App client={queryClient} />
  </Provider>
);
