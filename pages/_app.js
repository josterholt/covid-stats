import React from 'react';
import App from 'next/app';
import { createOvermind, createOvermindSSR, rehydrate } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from '../overmind';

class MyApp extends App {
    constructor(props) {
        super(props);

        const mutations = props.pageProps.mutations || [];
        
        if(typeof window !== 'undefined') {
            this.overmind = createOvermind(config, { devtools: 'localhost:3031' });
            //this.overmind.actions.changePage(this.overmind.state, mutations);
        } else {
            this.overmind = createOvermindSSR(config, { devtools: 'localhost:3031' });
            rehydrate(this.overmind.state, mutations);
        }
    }

    componentDidUpdate() {
        //this.overmind.actions.changePage(this.props.pageProps.mutations || []);
    }

    render() {
        const { Component } = this.props;
        return (
            <Provider value={this.overmind}>
                <Component />
            </Provider>
        )
    }
}

export default MyApp;