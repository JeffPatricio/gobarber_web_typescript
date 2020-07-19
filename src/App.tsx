import React, { Fragment } from 'react';
import GlobalStyle from './styles/global';

import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <SignUp />
    </Fragment>
  )
}

export default App;
