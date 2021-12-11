import React from "react"

const SidebarContext = React.createContext({
    isSidebarExpanded: false,
    toggleSidebar: () => {
    }
  }
)

export default SidebarContext