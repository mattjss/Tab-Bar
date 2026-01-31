import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const W_CLOSED = 146;
const W_OPEN = 236;
const H_CLOSED = 44;
const H_OPEN = 196;
const RADIUS = 16;
const PAD = 10;
const ITEM_GAP = 4;
const ITEM_W = 216;
const ITEM_H = 32;

const HomeIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5L8 2L14 6.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5Z" />
    <path d="M6 14V9h4v5" />
  </svg>
);
const MoveIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10L2 8l2-2" /><path d="M12 6l2 2-2 2" /><path d="M2 8h5" /><path d="M9 8h5" />
  </svg>
);
const ActivityIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M8 4v4l2.5 2.5" />
  </svg>
);
const MenuIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12" /><path d="M2 8h12" /><path d="M2 12h12" />
  </svg>
);
const SearchIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3.5 3.5" />
  </svg>
);
const DocIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M4 2h5l3 3v9H4V2Z" /><path d="M9 2v3h3" />
  </svg>
);
const ChartIcon = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 12v-5M7 12V4M10 12V6M13 12V2" /><path d="M3 13h10" />
  </svg>
);

const TABS = [
  { id: 'home', Icon: HomeIcon, label: 'Home' },
  { id: 'move', Icon: MoveIcon, label: 'Move' },
  { id: 'activity', Icon: ActivityIcon, label: 'Activity' },
  { id: 'menu', Icon: MenuIcon, label: 'Menu' },
];

const MENU_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon, shortcut: 'H' },
  { id: 'move', label: 'Move', Icon: MoveIcon, shortcut: 'M' },
  { id: 'activity', label: 'Activity', Icon: ActivityIcon, shortcut: 'A' },
  { id: 'portfolio', label: 'Portfolio', Icon: ChartIcon },
  { id: 'documents', label: 'Documents', Icon: DocIcon },
];

export default function TabBar() {
  const [open, setOpen] = useState(false);
  const [hoverTab, setHoverTab] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);

  return (
    <div className="flex items-end gap-4 font-['IBM_Plex_Mono',sans-serif]">
      {/* Left: 3+ Apps */}
      <div className="rounded-[32px] border border-[#323232] bg-[#252727] px-[10px] py-[10px] flex items-center gap-2 shrink-0">
        <span className="text-[#e4e4e4] text-[12px]">3+ Apps</span>
      </div>

      {/* Middle: one frame — closed 146×44, open 236×196 */}
      <div ref={ref} className="shrink-0">
        <motion.div
          className="overflow-hidden rounded-[16px] border border-[#323232] bg-[#252727] flex flex-col"
          style={{ padding: PAD }}
          initial={{ width: W_CLOSED, height: H_CLOSED }}
          animate={{ width: open ? W_OPEN : W_CLOSED, height: open ? H_OPEN : H_CLOSED }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col-reverse flex-1 min-h-0">
            {/* Tab row (bottom) */}
            <div className="flex items-center gap-[10px] shrink-0">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={t.label}
                  className={`flex items-center justify-center rounded-[12px] w-6 h-6 shrink-0 transition-colors ${hoverTab === t.id || (t.id === 'menu' && open) ? 'bg-[#323232]' : ''}`}
                  onMouseEnter={() => setHoverTab(t.id)}
                  onMouseLeave={() => setHoverTab(null)}
                  onClick={() => (t.id === 'menu' ? setOpen((o) => !o) : setOpen(false))}
                >
                  <t.Icon className="size-4 text-[#e4e4e4]" />
                </button>
              ))}
            </div>
            {/* Menu list (above tab row when open) */}
            {open && (
              <div className="flex flex-col flex-1 min-h-0 overflow-auto pb-[4px]" style={{ gap: ITEM_GAP }}>
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center justify-between rounded-[6px] px-3 cursor-pointer transition-colors text-left shrink-0"
                    style={{ width: ITEM_W, height: ITEM_H, background: hoverItem === item.id ? '#2f2f2f' : 'transparent' }}
                    onMouseEnter={() => setHoverItem(item.id)}
                    onMouseLeave={() => setHoverItem(null)}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center gap-1 min-w-0">
                      <item.Icon className="size-4 shrink-0 text-[#e4e4e4]" />
                      <span className="text-white text-[12px] truncate">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <span className="bg-[#515151] text-white text-[12px] px-1 rounded min-w-[8px] h-4 flex items-center justify-center shrink-0">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Right: Search */}
      <div className="rounded-[32px] border border-[#323232] bg-[#252727] px-[10px] py-[10px] flex items-center justify-center shrink-0">
        <button type="button" aria-label="Search" className="flex items-center justify-center rounded-[12px] w-6 h-6 hover:bg-[#323232] transition-colors">
          <SearchIcon className="size-4 text-[#e4e4e4]" />
        </button>
      </div>
    </div>
  );
}
