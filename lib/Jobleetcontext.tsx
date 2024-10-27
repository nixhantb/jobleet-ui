'use client'

import React, { createContext, ReactNode, useContext, useState } from "react"

interface JobLeetContextType {
    theme: string 
    setTheme: (theme: string) => void
}

const JobLeetContext  = createContext<JobLeetContextType | undefined>(undefined)

export const JobLeetProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [theme, setTheme] = useState<string>('light')

    return (
        <JobLeetContext.Provider value={{theme, setTheme}}>
            {children}
        </JobLeetContext.Provider>
    )
}
export const useJobLeet = () => {
    const context = useContext(JobLeetContext)
    if(context === undefined){
        throw new Error('useJobLeet must be used within a JobLeetProvider')
    }
    return context;
}