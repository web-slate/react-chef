import React, { useState } from 'react'

// Components.
import { Header, Sidebar, ContentPanel, Footer } from '@test/components'

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
         test content goes here
      </ContentPanel>
      <Footer />
    </>
  );
}

export default HomePage;
