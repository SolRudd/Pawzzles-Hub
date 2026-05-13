import React from 'react'
import { Icon } from '../icons/Icons.jsx'

export default function AnnouncementBar() {
  return (
    <div className="bg-orange text-white text-xs sm:text-sm font-bold">
      <div className="max-w-7xl mx-auto container-px py-2.5 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <span className="inline-flex items-center gap-2">
          <Icon name="truck" className="w-4 h-4" />
          Free standard delivery over £30
        </span>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/70" />
        <span>Next day available</span>
      </div>
    </div>
  )
}
