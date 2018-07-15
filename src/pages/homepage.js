import React from 'react';
import MemoryWord from '../components/memory-word/Memorywold';
class Page extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <MemoryWord />
      </div>
    );
  }
};

export default Page;
