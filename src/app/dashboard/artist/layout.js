import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const ArtistLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar/>
            <main className="flex-1 w-full overflow-y-auto p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
};

export default ArtistLayout;