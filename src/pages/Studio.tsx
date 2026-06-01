import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity/sanity.config';

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  );
}
