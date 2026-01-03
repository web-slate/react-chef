function getSourceCode(appName, { sourceDir }) {
return `import React, { useState } from 'react';

// Components
import { Header, Sidebar, ContentPanel, Footer } from '@/components';

interface HomePageProps {
  appName?: string; // optional prop if you want to pass the app name
}

const HomePage = ({ appName = 'MyApp' }: HomePageProps): JSX.Element => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onHamburgerClick = (): void => {
    setOpenDrawer(!openDrawer);
  };

  const onBlurEvent = (): void => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Sidebar openDrawer={openDrawer} onBlurEvent={onBlurEvent} />
      <ContentPanel>
        ${appName} content goes here}
      </ContentPanel>
      <Footer />
    </>
  );
};

export default HomePage;
`
}

module.exports = {
  getSourceCode,
};