import React from 'react';
import { createOvermindSSR } from 'overmind';
import { config, useOvermind} from '../overmind';
import Dashboard from '../components/Dashboard';

/*
export async function getStaticProps() {
  const overmind = createOvermindSSR(config, { devtools: 'localhost:3031' });

  overmind.state.page = 'Index';

  return {
    props: { mutations: overmind.hydrate() },
  }
}
*/

export default function IndexPage() {
  const { state } = useOvermind();

  return (
    <div>
      <Dashboard />
    </div>
  )
}
