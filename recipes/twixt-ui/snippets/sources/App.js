function getSourceCode(appName, { sourceDir }) {
return `import React, { useState } from 'react'

// Components.
import { Header, Sidebar, ContentPanel, Footer } from '@${appName}/${sourceDir.components}'

function HomePage() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const onHamburgerClick = () =>{
    setOpenDrawer(!openDrawer);
  }

  const onBlurEvent = () =>{
    setOpenDrawer(false);
  };

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick}/>
      <Sidebar openDrawer={openDrawer} onBlurEvent={onBlurEvent}/>
      <ContentPanel>
         ${appName} content goes here
      </ContentPanel>
      <Footer />
    </>
  );
}

export default HomePage;
`
}

module.exports = {
  getSourceCode,
};