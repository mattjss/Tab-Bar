import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from '@base-ui/react/tabs';

// Figma icon assets
const icons = {
  home: "http://localhost:3845/assets/d9badfdbf6657ff33e4601d0318f1254e8e54960.svg",
  move: "http://localhost:3845/assets/b3cf686c21253dc7bf542320a1274cd14071bc59.svg",
  activity: "http://localhost:3845/assets/f5767cbadedabf4dc5d49c5b8811096395781d49.svg",
  menu: "http://localhost:3845/assets/310ef49d7f55285275ee8a7cca975a52b0ea5b88.svg",
  search: "http://localhost:3845/assets/08eb0e9e9a8f2389d6b8634041207ee5bee6b2e3.svg",
  appPurple: "http://localhost:3845/assets/4ab9e84f28ab0bc6674da7bcdc02bb2fbbade177.svg",
  appRed: "http://localhost:3845/assets/2c42177bb82506a0279088c8942beb275a73f3f8.svg",
  appGreen: "http://localhost:3845/assets/0dde42d52eae2836f2b0aef6f242056e24eec0c2.svg",
  // Menu item icons
  menuHome: "http://localhost:3845/assets/f83aff5bc1bcd1c4b3ebd783de6e29429cbb3119.svg",
  menuMove: "http://localhost:3845/assets/46c10889637ee6925d3b4f5a0e47197a8ab04278.svg",
  menuActivity: "http://localhost:3845/assets/5542a17e5903f25c041f1f4acc4da25c9c54a538.svg",
  menuPortfolio: "http://localhost:3845/assets/dcadea65c503acbd76b86e7811860bd3d13924b0.svg",
  menuDocuments: "http://localhost:3845/assets/11c0ee17d50c5c62e18c9658602b5d2f05748485.svg",
};

// Tab configuration
const tabs = [
  { id: 'home', icon: icons.home, label: 'Home' },
  { id: 'move', icon: icons.move, label: 'Move' },
  { id: 'activity', icon: icons.activity, label: 'Activity' },
  { id: 'menu', icon: icons.menu, label: 'Menu' },
];

// Menu items for flyout
const menuItems = [
  { id: 'home', label: 'Home', icon: icons.menuHome, shortcut: 'H' },
  { id: 'move', label: 'Move', icon: icons.menuMove, shortcut: 'M' },
  { id: 'activity', label: 'Activity', icon: icons.menuActivity, shortcut: 'A' },
  { id: 'portfolio', label: 'Portfolio', icon: icons.menuPortfolio },
  { id: 'documents', label: 'Documents', icon: icons.menuDocuments },
];

// Tab Button Component
const TabButton = ({ icon, label, isHovered = false }) => {
  return (
    <div 
      className={`
        flex items-center justify-center p-[5.143px] rounded-[12px] size-[24px]
        transition-colors duration-200
        ${isHovered ? 'bg-[#323232]' : ''}
      `}
    >
      <div className="relative shrink-0 size-[16px]">
        <img alt={label} className="block max-w-none size-full" src={icon} />
      </div>
    </div>
  );
};

// App Icon Component
const AppIcon = ({ icon, bgColor, marginLeft = 0 }) => {
  return (
    <div 
      className="content-stretch flex items-center justify-center p-[5.143px] relative rounded-[12px] size-[24px] border-[1px] border-solid border-[#232525] col-start-1 row-start-1 mt-0"
      style={{ 
        backgroundColor: bgColor,
        marginLeft: `${marginLeft}px`,
      }}
    >
      <div className="relative shrink-0 size-[12px]">
        <img alt="" className="block max-w-none size-full" src={icon} />
      </div>
    </div>
  );
};

// Menu Flyout Component
const MenuFlyout = ({ hoveredItem, setHoveredItem }) => {
  return (
    <motion.div
      className="absolute bottom-full left-1/2 mb-3 bg-[#252727] border border-solid border-[#323232] p-[12px] rounded-[16px]"
      style={{ x: '-50%' }}
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.95,
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1,
      }}
      exit={{ 
        opacity: 0, 
        y: 10,
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8,
      }}
    >
      <motion.div 
        className="flex flex-col gap-[4px]"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.035,
              delayChildren: 0.05,
            }
          },
          hidden: {
            transition: {
              staggerChildren: 0.02,
              staggerDirection: -1,
            }
          }
        }}
      >
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, x: -12, scale: 0.95 },
              visible: { 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }
              }
            }}
            className={`flex items-center justify-between rounded-[6px] w-[216px] cursor-pointer transition-colors duration-150 ${
              hoveredItem === item.id 
                ? 'bg-[#2f2f2f] px-[12px] py-[8px]' 
                : 'px-[12px] py-[8px]'
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ 
              x: 4,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-[4px]">
              <div className="relative shrink-0 size-[16px]">
                <img alt="" className="block max-w-none size-full" src={item.icon} />
              </div>
              <p className="text-white text-[12px] leading-normal font-['IBM_Plex_Mono',sans-serif]">
                {item.label}
              </p>
            </div>
            {item.shortcut && (
              <div className="bg-[#515151] content-stretch flex flex-col h-[16px] items-center justify-center p-[4px] relative rounded-[4px] shrink-0">
                <div className="flex flex-col font-['Overpass_Mono',sans-serif] font-normal h-[10px] items-center justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white w-[8px]">
                  <p className="leading-[8px]">{item.shortcut}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const handleTabClick = (tabId) => {
    if (tabId === 'menu') {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setActiveTab(tabId);
      setIsMenuOpen(false);
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          containerRef.current && 
          !containerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="flex items-center gap-[16px] font-['IBM_Plex_Mono',sans-serif]">
      {/* Apps Section */}
      <div className="bg-[#252727] border border-solid border-[#323232] content-stretch flex flex-col items-start p-[10px] relative rounded-[32px]">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] items-start justify-items-start leading-[0] relative shrink-0">
            <AppIcon icon={icons.appPurple} bgColor="#7829df" marginLeft={0} />
            <AppIcon icon={icons.appRed} bgColor="#e00" marginLeft={13.71} />
            <AppIcon icon={icons.appGreen} bgColor="#10982b" marginLeft={27.43} />
          </div>
          <p className="text-[#e4e4e4] text-[12px] leading-normal shrink-0">
            3+ Apps
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs - Fixed in place */}
      <div className="relative" ref={containerRef}>
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="bg-[#252727] border border-solid border-[#323232] flex flex-col items-start p-[10px] rounded-[32px]"
        >
          <Tabs.List className="flex items-start gap-[10px]" aria-label="Navigation">
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.id}
                value={tab.id}
                className="cursor-pointer outline-none border-none bg-transparent p-0"
                aria-label={tab.label}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => handleTabClick(tab.id)}
              >
                <TabButton 
                  icon={tab.icon} 
                  label={tab.label}
                  isHovered={hoveredTab === tab.id || (tab.id === 'menu' && isMenuOpen)}
                />
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* Hidden panels for accessibility */}
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.id} value={tab.id} className="sr-only">
              {tab.label} panel
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        {/* Menu Flyout - Appears ABOVE the tab bar */}
        <AnimatePresence>
          {isMenuOpen && (
            <MenuFlyout 
              hoveredItem={hoveredItem} 
              setHoveredItem={setHoveredItem} 
            />
          )}
        </AnimatePresence>
      </div>

      {/* Search Section */}
      <div className="bg-[#252727] border border-solid border-[#323232] flex flex-col items-start p-[10px] rounded-[32px]">
        <button
          className="cursor-pointer border-none bg-transparent p-0"
          aria-label="Search"
        >
          <TabButton icon={icons.search} label="Search" />
        </button>
      </div>
    </div>
  );
};

export default TabBar;
