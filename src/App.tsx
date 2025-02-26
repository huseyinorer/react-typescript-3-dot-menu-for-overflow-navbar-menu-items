import React, { useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import menuItems, { IMenuItemModel } from './Menu/menuItems';

// MUI'den kaldırılan ikonların yerine basit bileşenler
const AdbIcon = () => (
  <div className="icon adb-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M5 16c0 3.87 3.13 7 7 7s7-3.13 7-7v-4H5v4zM16.12 4.37l2.1-2.1-.82-.83-2.3 2.31C14.16 3.28 13.12 3 12 3s-2.16.28-3.09.75L6.6 1.44l-.82.83 2.1 2.1C6.14 5.64 5 7.68 5 10v1h14v-1c0-2.32-1.14-4.36-2.88-5.63zM9 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor" />
    </svg>
  </div>
);

const MoreVertIcon = () => (
  <div className="icon more-vert-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
    </svg>
  </div>
);

const _menuItems : IMenuItemModel[] = menuItems.CurrentMenuItems();

const App = () => {
  const sizeRef = useRef<HTMLDivElement | null>(null);

  function getOverflowItemsList() {
    const [overflowItemsList, setOverflowItemsList] = useState<IMenuItemModel[] | undefined | null>();
    
    useLayoutEffect(() => {
      function updateSize() {
        var sizeRefC = sizeRef?.current!;
        setOverflowItemsList(getOverflowItems(sizeRefC));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, [sizeRef]);
    
    return overflowItemsList;
  }
  
  const getOverflowItems = (navbar: HTMLDivElement) => {
    if (navbar == null || navbar.children.length == 0) return null;
    let overflowItems: IMenuItemModel[] = [];
    const navbarWidth = navbar.offsetWidth;
    const menuItemsWidth = Array.from(navbar.children).reduce((acc, child) => acc + child.clientWidth, 0);

    if (menuItemsWidth > navbarWidth) {
      let totalWidth = 0;
      let index = 0;
      while (index < navbar.children.length) {
        totalWidth += navbar.children[index].clientWidth;
        if (totalWidth > navbarWidth) {
          overflowItems = _menuItems.slice(index);
          break;
        }
        index++;
      }
    }

    return overflowItems;
  };
  
  function NavbarMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const handleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const handleClose = () => {
      setMenuOpen(false);
    };
    
    // Dışarı tıklandığında menüyü kapatma
    useLayoutEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [menuRef]);
    
    var overflowItems = getOverflowItemsList();
    
    return (
      <div className="app-bar" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="toolbar">
          <div className="logo-container">
            <AdbIcon />
          </div>
          <div
            ref={sizeRef}
            className="button-container"
          >
            {_menuItems.map((page) => (
              <button key={page.id} className="nav-button">
                {page.name}
              </button>
            ))}
          </div>
          {overflowItems != undefined && overflowItems.length > 0 && (
            <div className="overflow-menu-container" ref={menuRef}>
              <button
                className="icon-button"
                aria-label="overflow menu"
                onClick={handleMenu}
              >
                <MoreVertIcon />
              </button>
              {menuOpen && (
                <div className="menu">
                  {overflowItems?.map((page) => (
                    <div key={page.id} className="menu-item" onClick={handleClose}>
                      {page.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="tabs">
      <NavbarMenu />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '600px', marginBottom: '20px', textAlign: 'left', position: 'absolute', top:'50px' }}>
        <h2>Explanation of the Code</h2>
        <p>This code defines a simple React application that creates a navigation bar with menu items. The application is designed to handle overflow items when the window is resized, ensuring that all menu items are accessible even if they don't fit within the visible area of the navigation bar.</p>
        <h3>Key Components:</h3>
        <ol>
          <li>
            <strong>App Component:</strong>
            <p>The main component of the application, which renders the NavbarMenu component inside a centered container.</p>
          </li>
          <li>
            <strong>NavbarMenu Component:</strong>
            <p>This component is responsible for rendering the navigation bar. It uses a div styled to look like a navigation bar with a background color and padding. The navigation bar contains:</p>
            <ul>
              <li>A placeholder for an icon (represented by a simple div with the text "Icon").</li>
              <li>A list of menu items, each rendered as a button. These buttons are styled to have no background or border, with white text.</li>
              <li>An overflow menu button labeled "More" that appears when there are more menu items than can fit in the visible area.</li>
              <li>When the "More" button is clicked, a dropdown menu appears, showing the overflow items.</li>
            </ul>
          </li>
          <li>
            <strong>Overflow Handling:</strong>
            <p>The getOverflowItemsList function calculates which menu items do not fit in the visible area of the navigation bar. It uses the useLayoutEffect hook to update the list of overflow items whenever the window is resized.</p>
          </li>
          <li>
            <strong>Styling:</strong>
            <p>Inline styles are used to style the navigation bar and its elements. This includes flexbox for layout, colors, and spacing. The overflow menu is styled to appear as a dropdown with a shadow effect.</p>
          </li>
        </ol>
        <p>This code provides a basic structure for a responsive navigation bar without relying on external UI libraries like Material-UI. It demonstrates how to manage dynamic content and handle window resizing in a React application.</p>
      </div>
    </div>
    </>
  );
};

export default App;