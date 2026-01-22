import { useState } from 'react';
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
};

// Tab configuration
const tabs = [
  { id: 'home', icon: icons.home, label: 'Home' },
  { id: 'move', icon: icons.move, label: 'Move' },
  { id: 'activity', icon: icons.activity, label: 'Activity' },
  { id: 'menu', icon: icons.menu, label: 'Menu' },
];

// Tab Button Component - matches Figma "Tabs" component
const TabButton = ({ icon, label, isHovered = false }) => {
  return (
    <div 
      className={`
        flex items-center justify-center p-[5.143px] rounded-[12px] size-[24px]
        ${isHovered ? 'bg-[#323232]' : ''}
      `}
    >
      <div className="relative shrink-0 size-[16px]">
        <img alt={label} className="block max-w-none size-full" src={icon} />
      </div>
    </div>
  );
};

// App Icon Component - for the stacked app icons (Twitch, YouTube, Spotify)
const AppIcon = ({ icon, bgColor, marginLeft = 0 }) => {
  return (
    <div 
      className="content-stretch flex items-center justify-center p-[5.143px] relative rounded-[12px] size-[24px] border-[1px] border-solid border-[#232525] col-start-1 row-start-1 mt-0"
      style={{ 
        backgroundColor: bgColor,
        marginLeft: `${marginLeft}px`,
      }}
    >
      <div className="relative shrink-0 size-[16px]">
        <img alt="" className="block max-w-none size-full" src={icon} />
      </div>
    </div>
  );
};

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="flex items-center gap-[16px] font-['IBM_Plex_Mono',sans-serif]">
      {/* Apps Section */}
      <div className="bg-[#252727] border border-solid border-[#323232] content-stretch flex flex-col items-start p-[10px] relative rounded-[32px]">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          {/* Overlapping app icons - CSS Grid with same cell positioning */}
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

      {/* Main Navigation Tabs */}
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
            >
              <TabButton 
                icon={tab.icon} 
                label={tab.label}
                isHovered={hoveredTab === tab.id}
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
