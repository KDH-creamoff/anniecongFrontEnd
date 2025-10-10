import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNavigation } from "./components/TopNavigation";
import { Dashboard } from "./components/pages/dash/Dashboard";
import { BasicInfo } from "./components/pages/basic/BasicInfo";
import { Receiving } from "./components/pages/receiving/Receiving";
import { Manufacturing } from "./components/pages/manufacturing/Manufacturing";
import { Inventory } from "./components/pages/inventory/Inventory";
import { Shipping } from "./components/pages/shipping/Shipping";
import { Production } from "./components/pages/production/Production";
import { Electronic } from "./components/pages/electronic/Electronic";
import { Label } from "./components/pages/label/Label";
import { UserManagement } from "./components/pages/user-management/UserManagement";

export default function App() {
  const [currentPage, setCurrentPage] = useState("basicInfo-nav1");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    // currentPage: "parentKey-navKey" 형태
    const [parent, child] = currentPage.split("-");
    if (parent === "basicInfo") {
      return <div>기초정보 - {child}</div>;
    }
    if (parent === "receiving") {
      return <div>입고관리 - {child}</div>;
    }
    if (parent === "manufacturing") {
      return <div>제조관리 - {child}</div>;
    }
    // fallback
    return <div>대시보드</div>;
  };

  return (
    <div
      className="h-screen bg-[#FAF6F2]"
      style={{ fontFamily: "Noto Sans, Inter, sans-serif" }}
    >
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className="flex flex-col min-h-screen"
        style={{
          marginLeft: sidebarCollapsed ? 64 : 256,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Top Navigation */}
        <TopNavigation currentPage={currentPage} onNavigate={setCurrentPage} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6" style={{ paddingTop: 56 }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
