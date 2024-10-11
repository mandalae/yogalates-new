import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import './style/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const container = document.getElementById('root')
const root = createRoot(container);
root.render(<React.StrictMode>
              <Router>
                <Authenticator.Provider>
                  <View>
                    <App tab="home" />
                  </View>
                </Authenticator.Provider>
              </Router>
            </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
