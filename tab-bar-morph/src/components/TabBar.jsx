import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs } from '@base-ui/react/tabs'

// Icons
const HomeIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6.5L8 2L14 6.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const MoveIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L2 8L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6L14 8L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const ActivityIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const MenuIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const SearchIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const TaxIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4H14V12H2V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const MortgageIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12V6L8 2L14 6V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12V8H10V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const TwitchIcon = ({ className = 'size-3.5' }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 1L1 4V12H4V14H6L8 12H11L14 9V1H2ZM12 8L10 10H7L5 12V10H3V3H12V8Z" fill="white"/>
    <path d="M10 5H11V8H10V5ZM7 5H8V8H7V5Z" fill="white"/>
  </svg>
)
const YouTubeIcon = ({ className = 'size-3.5' }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5C13.5 4.5 13.5 3 12.5 2.5C11.5 2 7 2 7 2C7 2 2.5 2 1.5 2.5C0.5 3 0.5 4.5 0.5 4.5C0.5 4.5 0.5 7 0.5 9.5C0.5 9.5 0.5 11 1.5 11.5C2.5 12 7 12 7 12C7 12 11.5 12 12.5 11.5C13.5 11 13.5 9.5 13.5 9.5V4.5Z" fill="white"/>
    <path d="M5.5 9L9 7L5.5 5V9Z" fill="#EE0000"/>
  </svg>
)
const SpotifyIcon = ({ className = 'size-3.5' }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1C3.7 1 1 3.7 1 7C1 10.3 3.7 13 7 13C10.3 13 13 10.3 13 7C13 3.7 10.3 1 7 1ZM9.8 9.8C9.6 10 9.3 10 9.1 9.8C7.5 8.8 5.5 8.6 3.5 9.1C3.2 9.2 3 9 2.9 8.7C2.8 8.4 3 8.2 3.3 8.1C5.5 7.6 7.8 7.8 9.6 9C9.9 9.2 9.9 9.5 9.8 9.8Z" fill="white"/>
  </svg>
)

const tabs = [
  { id: 'home', Icon: HomeIcon, label: 'Home' },
  { id: 'move', Icon: MoveIcon, label: 'Move' },
  { id: 'activity', Icon: ActivityIcon, label: 'Activity' },
  { id: 'menu', Icon: MenuIcon, label: 'Menu' },
]

const menuItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon, shortcut: 'H' },
  { id: 'move', label: 'Move', Icon: MoveIcon, shortcut: 'M' },
  { id: 'activity', label: 'Activity', Icon: ActivityIcon, shortcut: 'A' },
  { id: 'tax', label: 'Tax', Icon: TaxIcon, shortcut: 'T' },
  { id: 'mortgage', label: 'Mortgage', Icon: MortgageIcon, shortcut: 'G' },
]

const TAB_BAR_CLOSED_WIDTH = 200
const MENU_OPEN_WIDTH = 248

const TabButton = ({ Icon, label, isHovered = false }) => (
  <div
    className={`flex items-center justify-center p-[5.143px] rounded-[12px] size-[24px] transition-colors duration-200 ${isHovered ? 'bg-[#323232]' : ''}`}
  >
    <div className="relative shrink-0 size-[16px] text-[#e4e4e4]">
      <Icon className="size-full" />
    </div>
  </div>
)

const AppIcon = ({ Icon, bgColor, marginLeft = 0 }) => (
  <div
    className="flex items-center justify-center p-[5.143px] rounded-[12px] size-[24px] border border-solid border-[#232525] shrink-0"
    style={{ backgroundColor: bgColor, marginLeft: `${marginLeft}px` }}
  >
    <div className="relative shrink-0 size-[14px] text-white">
      <Icon className="size-full" />
    </div>
  </div>
)

const MenuListContent = ({ hoveredItem, setHoveredItem, onSelectItem }) => (
  <div className="flex flex-col gap-[4px] w-full min-w-0">
    {menuItems.map((item, index) => (
      <motion.div
        key={item.id}
        role="button"
        tabIndex={0}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.08 + index * 0.04, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.12 } }}
        className={`flex items-center justify-between rounded-[6px] cursor-pointer transition-colors duration-150 px-[12px] py-[8px] ${hoveredItem === item.id ? 'bg-[#2f2f2f]' : ''}`}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => onSelectItem?.(item.id)}
        onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(item.id)}
      >
        <div className="flex items-center gap-[4px] min-w-0">
          <div className="relative shrink-0 size-[16px] text-[#e4e4e4]">
            <item.Icon className="size-full" />
          </div>
          <p className="text-white text-[12px] leading-normal font-['IBM_Plex_Mono',sans-serif] truncate">{item.label}</p>
        </div>
        {item.shortcut && (
          <div className="bg-[#515151] flex h-[16px] items-center justify-center px-[4px] rounded-[4px] shrink-0 min-w-[8px]">
            <span className="font-['IBM_Plex_Mono',sans-serif] text-[12px] text-white">{item.shortcut}</span>
          </div>
        )}
      </motion.div>
    ))}
  </div>
)

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('home')
  const [hoveredTab, setHoveredTab] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef(null)

  const handleTabClick = (tabId) => {
    if (tabId === 'menu') {
      setIsMenuOpen((prev) => !prev)
    } else {
      setActiveTab(tabId)
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="flex items-end gap-[16px] font-['IBM_Plex_Mono',sans-serif]">
      {/* Apps */}
      <div className="bg-[#252727] border border-solid border-[#323232] flex flex-col items-start p-[10px] rounded-[32px] shrink-0">
        <div className="flex gap-[8px] items-center shrink-0">
          <div className="flex items-center leading-0 shrink-0">
            <AppIcon Icon={TwitchIcon} bgColor="#7829df" marginLeft={0} />
            <AppIcon Icon={YouTubeIcon} bgColor="#e00" marginLeft={13.71} />
            <AppIcon Icon={SpotifyIcon} bgColor="#10982b" marginLeft={27.43} />
          </div>
          <p className="text-[#e4e4e4] text-[12px] leading-normal shrink-0">3+ Apps</p>
        </div>
      </div>

      {/* Middle: SAME frame — tab row on top, menu opens BELOW (per Figma). No MENU header. */}
      <motion.div
        ref={containerRef}
        className="overflow-hidden rounded-[32px] border border-solid border-[#323232] bg-[#252727] p-[10px] shrink-0 flex flex-col"
        animate={{ width: isMenuOpen ? MENU_OPEN_WIDTH : TAB_BAR_CLOSED_WIDTH }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Tab row: always at top of frame */}
        <div className="flex items-center gap-[10px] shrink-0">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col items-start">
            <Tabs.List className="flex items-start gap-[10px]" aria-label="Navigation">
              {tabs.map((tab) => (
                <Tabs.Tab
                  key={tab.id}
                  value={tab.id}
                  className="cursor-pointer outline-none border-none bg-transparent p-0"
                  aria-label={tab.label}
                  aria-expanded={tab.id === 'menu' ? isMenuOpen : undefined}
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
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.id} value={tab.id} className="sr-only">
                {tab.label} panel
              </Tabs.Panel>
            ))}
          </Tabs.Root>
        </div>

        {/* Menu list: opens BELOW tab row (never above). No MENU header. */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              key="menu"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: 320, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden flex flex-col pt-[4px]"
            >
              <MenuListContent
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                onSelectItem={(id) => {
                  if (tabs.some((t) => t.id === id)) setActiveTab(id)
                  setIsMenuOpen(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search */}
      <div className="bg-[#252727] border border-solid border-[#323232] flex flex-col items-start p-[10px] rounded-[32px]">
        <button type="button" className="cursor-pointer border-none bg-transparent p-0" aria-label="Search">
          <TabButton Icon={SearchIcon} label="Search" />
        </button>
      </div>
    </div>
  )
}
