import { useState, createContext, useContext } from 'react'

export const SidebarContext = createContext()

export default function SidebarContextComp({ children }) {
    const [open, setOpen] = useState(false);

    //useEffect(() => {
    //}, [])

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}
export const useSidebar = () => useContext(SidebarContext)