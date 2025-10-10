import React from "react";
import { Button } from "./ui/button";
import {
  Settings,
  Factory,
  BarChart3,
  Tags,
  ShoppingCart,
  Truck,
  Bell,
  User,
} from "lucide-react";

export function TopNavigation({ currentPage, onNavigate }) {
  const tabs = [
    {
      key: "basicInfo",
      label: "기초정보",
      icon: <Settings className="w-4 h-4" />,
      sidebarKey: "basicInfo",
      sidebarChildKey: "basic_nav1",
    },
    {
      key: "manufacturing",
      label: "제조",
      icon: <Factory className="w-4 h-4" />,
      sidebarKey: "manufacturing",
      sidebarChildKey: "manufacturing_nav1",
    },
    {
      key: "inventory",
      label: "품질",
      icon: <BarChart3 className="w-4 h-4" />,
      sidebarKey: "inventory",
      sidebarChildKey: "inventory_nav1",
    },
    {
      key: "label",
      label: "라벨",
      icon: <Tags className="w-4 h-4" />,
      sidebarKey: "basicInfo",
      sidebarChildKey: "nav3",
    },
    {
      key: "order",
      label: "주문",
      icon: <ShoppingCart className="w-4 h-4" />,
      sidebarKey: "receiving",
      sidebarChildKey: "receiving_nav1",
    },
    {
      key: "shipping",
      label: "출고",
      icon: <Truck className="w-4 h-4" />,
      sidebarKey: "shipping",
      sidebarChildKey: "shipping_nav1",
    },
  ];

  return (
    <div className="bg-white border-b border-[#F5E9D5] px-6 py-2 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        {/* Tab Navigation */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant="ghost"
              className={`px-4 py-2 h-auto rounded-lg transition-all ${
                `${tab.sidebarKey}-${tab.sidebarChildKey}` === currentPage
                  ? "bg-[#724323] text-[#FAF6F2] hover:bg-[#724323] hover:text-[#FAF6F2]"
                  : "text-[#333333] hover:bg-[#F5E9D5]"
              }`}
              onClick={() =>
                onNavigate(`${tab.sidebarKey}-${tab.sidebarChildKey}`)
              }
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 h-auto hover:bg-[#F5E9D5]"
          >
            <Bell className="w-4 h-4 text-[#333333]" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#F5E9D5] rounded-lg">
            <User className="w-4 h-4 text-[#724323]" />
            <span className="text-sm text-[#724323] font-medium">관리자</span>
            <div className="w-2 h-2 bg-[#A3C478] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
