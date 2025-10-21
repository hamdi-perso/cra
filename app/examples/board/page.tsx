'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Sidebar, 
  ResizablePanel, 
  CenterPanel, 
  BottomBar 
} from '@/components/examples/layout';
import { BoardContent } from './components/board-content';

export default function BoardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <AppBar 
        title="Dashboard"
        onMenuClick={handleMenuClick}
        showSearch
      />

      {/* Main Content Area with Sidebar and Center Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar (overlay) */}
        <div className="lg:hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={handleSidebarClose}
          />
        </div>

        {/* Desktop Layout with Resizable Panels */}
        <ResizablePanel
          leftPanel={
            <Sidebar
              isOpen={true}
              onClose={handleSidebarClose}
            />
          }
          rightPanel={
            <CenterPanel
              title="Welcome to your Dashboard"
              subtitle="Manage your projects and track your activities in real-time"
            >
              <BoardContent />
            </CenterPanel>
          }
          defaultLeftWidth={256}
          minLeftWidth={200}
          maxLeftWidth={400}
        />
      </div>

      {/* Footer */}
      <BottomBar 
        appName="Modern Design System"
        version="v1.0"
        showSocial
      />
    </div>
  );
}
