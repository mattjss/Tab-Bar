import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from '@base-ui/react/tabs';

// Inline SVG Icons based on Figma designs
const HomeIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6.5L8 2L14 6.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoveIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L2 8L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6L14 8L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ActivityIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PortfolioIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const DocumentsIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2H9L12 5V14H4V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 2V5H12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

// App brand icons
const TwitchIcon = ({ className = "size-3.5" }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 1L1 4V12H4V14H6L8 12H11L14 9V1H2ZM12 8L10 10H7L5 12V10H3V3H12V8Z" fill="white"/>
    <path d="M10 5H11V8H10V5ZM7 5H8V8H7V5Z" fill="white"/>
  </svg>
);

const YouTubeIcon = ({ className = "size-3.5" }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5C13.5 4.5 13.5 3 12.5 2.5C11.5 2 7 2 7 2C7 2 2.5 2 1.5 2.5C0.5 3 0.5 4.5 0.5 4.5C0.5 4.5 0.5 7 0.5 9.5C0.5 9.5 0.5 11 1.5 11.5C2.5 12 7 12 7 12C7 12 11.5 12 12.5 11.5C13.5 11 13.5 9.5 13.5 9.5V4.5Z" fill="white"/>
    <path d="M5.5 9L9 7L5.5 5V9Z" fill="#EE0000"/>
  </svg>
);

const SpotifyIcon = ({ className = "size-3.5" }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1C3.7 1 1 3.7 1 7C1 10.3 3.7 13 7 13C10.3 13 13 10.3 13 7C13 3.7 10.3 1 7 1ZM9.8 9.8C9.6 10 9.3 10 9.1 9.8C7.5 8.8 5.5 8.6 3.5 9.1C3.2 9.2 3 9 2.9 8.7C2.8 8.4 3 8.2 3.3 8.1C5.5 7.6 7.8 7.8 9.6 9C9.9 9.2 9.9 9.5 9.8 9.8ZM10.5 8.2C10.3 8.5 10 8.5 9.7 8.3C7.9 7.2 5.2 6.9 3.3 7.5C3 7.6 2.6 7.4 2.5 7.1C2.4 6.8 2.6 6.4 2.9 6.3C5.1 5.6 8.1 6 10.2 7.3C10.5 7.4 10.6 7.9 10.5 8.2ZM10.6 6.5C8.5 5.3 5.1 5.1 3 5.8C2.6 5.9 2.2 5.7 2.1 5.3C2 4.9 2.2 4.5 2.6 4.4C5.1 3.6 8.8 3.8 11.3 5.2C11.7 5.4 11.8 5.9 11.6 6.2C11.4 6.5 10.9 6.6 10.6 6.5Z" fill="white"/>
  </svg>
);

// Tab configuration with icon components
const tabs = [
  { id: 'home', Icon: HomeIcon, label: 'Home' },
  { id: 'move', Icon: MoveIcon, label: 'Move' },
  { id: 'activity', Icon: ActivityIcon, label: 'Activity' },
  { id: 'menu', Icon: MenuIcon, label: 'Menu' },
];

// Menu items for flyout
const menuItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon, shortcut: 'H' },
  { id: 'move', label: 'Move', Icon: MoveIcon, shortcut: 'M' },
  { id: 'activity', label: 'Activity', Icon: ActivityIcon, shortcut: 'A' },
  { id: 'portfolio', label: 'Portfolio', Icon: PortfolioIcon },
  { id: 'documents', label: 'Documents', Icon: DocumentsIcon },
];

// Tab Button Component - uses Icon component instead of img
const TabButton = ({ Icon, label, isHovered = false }) => {
  return (
    <div 
      className={`
        flex items-center justify-center p-[5.143px] rounded-[12px] size-[24px]
        transition-colors duration-200
        ${isHovered ? 'bg-[#323232]' : ''}
      `}
    >
      <div className="relative shrink-0 size-[16px] text-[#e4e4e4]">
        <Icon className="size-full" />
      </div>
    </div>
  );
};

// App Icon Component - 14x14 icon inside 24x24 container per Figma
const AppIcon = ({ Icon, bgColor, marginLeft = 0 }) => {
  return (
    <div 
      className="content-stretch flex items-center justify-center p-[5.143px] relative rounded-[12px] size-[24px] border-[0.857px] border-solid border-[#232525] col-start-1 row-start-1 mt-0"
      style={{ 
        backgroundColor: bgColor,
        marginLeft: `${marginLeft}px`,
      }}
    >
      <div className="relative shrink-0 size-[14px] text-white">
        <Icon className="size-full" />
      </div>
    </div>
  );
};

// Menu Flyout Component - positioned above tab bar, no scale to prevent jumping
const MenuFlyout = ({ hoveredItem, setHoveredItem }) => {
  return (
    <motion.div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[16px] bg-[#252727] border border-solid border-[#323232] p-[12px] rounded-[16px]"
      initial={{ 
        opacity: 0, 
        y: 8,
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      exit={{ 
        opacity: 0, 
        y: 8,
      }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex flex-col gap-[4px]">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.15,
                delay: index * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.1 }
            }}
            className={`flex items-center justify-between rounded-[6px] w-[216px] cursor-pointer transition-colors duration-150 px-[12px] py-[8px] ${
              hoveredItem === item.id ? 'bg-[#2f2f2f]' : ''
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center gap-[4px]">
              <div className="relative shrink-0 size-[16px] text-[#e4e4e4]">
                <item.Icon className="size-full" />
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
      </div>
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
            <AppIcon Icon={TwitchIcon} bgColor="#7829df" marginLeft={0} />
            <AppIcon Icon={YouTubeIcon} bgColor="#e00" marginLeft={13.71} />
            <AppIcon Icon={SpotifyIcon} bgColor="#10982b" marginLeft={27.43} />
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
                  Icon={tab.Icon} 
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
          <TabButton Icon={SearchIcon} label="Search" />
        </button>
      </div>
    </div>
  );
};

export default TabBar;
