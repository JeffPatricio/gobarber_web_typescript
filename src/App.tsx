import React, { Fragment } from 'react';
import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <SignIn />
    </Fragment>
  )
}

export default App;
