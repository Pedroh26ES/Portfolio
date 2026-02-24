import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import Portfolio from './Portfolio';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && <Portfolio />}
    </>
  );
}

export default App;