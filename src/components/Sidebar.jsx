import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Package,
  Truck,
  Factory,
  ArrowRightLeft,
  Settings,
  Users,
  Tags,
  BarChart3,
  Home,
  Send,
  FileText,
  CheckCircle,
  Calendar,
  FolderOpen,
} from "lucide-react";
import { Button } from "./ui/button";

export function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) {
  const [expandedItems, setExpandedItems] = useState([
    "basic",
    "manufacturing",
    "inventory",
    "production",
    "approval",
  ]);

  // TopNavigation tab-to-sidebar mapping
  const topNavToSidebarMap = {
    기초정보: { page: "basicInfo", parent: "basic" },
    제조: { page: "plant1Processing", parent: "manufacturing" },
    품질: { page: "inventoryHistory", parent: "inventory" },
    라벨: {
      page: "labelManagement",
      parent: "basic",
      child: "barcodeTemplate",
    },
    주문: { page: "receiving", parent: "receiving" },
    출고: { page: "shipping", parent: "shipping" },
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: <Home className="w-4 h-4" />,
      page: "dashboard",
    },
    {
      id: "basic",
      label: "기초정보",
      icon: <Settings className="w-4 h-4" />,
      children: [
        {
          id: "basic_nav1",
          label: "nav1",
          icon: <Package className="w-3 h-3" />,
          page: "basic_nav1",
        },
        {
          id: "basic_nav2",
          label: "nav2",
          icon: <Factory className="w-3 h-3" />,
          page: "basic_nav2",
        },
        {
          id: "basic_nav3",
          label: "nav3",
          icon: <Tags className="w-3 h-3" />,
          page: "basic_nav3",
        },
      ],
    },
    {
      id: "receiving",
      label: "입고관리",
      icon: <Truck className="w-4 h-4" />,
      children: [
        {
          id: "receiving_nav1",
          label: "nav1",
          icon: <Package className="w-3 h-3" />,
          page: "receiving_nav1",
        },
        {
          id: "nav2",
          label: "receiving_nav2",
          icon: <BarChart3 className="w-3 h-3" />,
          page: "receiving_nav2",
        },
      ],
    },
    {
      id: "manufacturing",
      label: "제조관리",
      icon: <Factory className="w-4 h-4" />,
      children: [
        {
          id: "manufacturing_nav1",
          label: "nav1",
          icon: <Factory className="w-3 h-3" />,
          page: "manufacturing_nav1",
        },
        {
          id: "manufacturing_nav2",
          label: "nav2",
          icon: <ArrowRightLeft className="w-3 h-3" />,
          page: "manufacturing_nav2",
        },
        {
          id: "manufacturing_nav3",
          label: "nav3",
          icon: <Factory className="w-3 h-3" />,
          page: "manufacturing_nav3",
        },
      ],
    },
    {
      id: "inventory",
      label: "재고관리",
      icon: <Package className="w-4 h-4" />,
      children: [
        {
          id: "inventory_nav1",
          label: "nav1",
          icon: <BarChart3 className="w-3 h-3" />,
          page: "inventory_nav1",
        },
        {
          id: "inventory_nav2",
          label: "nav2",
          icon: <ArrowRightLeft className="w-3 h-3" />,
          page: "inventory_nav2",
        },
      ],
    },
    {
      id: "shipping",
      label: "출고관리",
      icon: <Truck className="w-4 h-4" />,
      children: [
        {
          id: "shipping_nav1",
          label: "nav1",
          icon: <Truck className="w-3 h-3" />,
          page: "shipping_nav1",
        },
        {
          id: "shipping_nav2",
          label: "nav2",
          icon: <Package className="w-3 h-3" />,
          page: "shipping_nav2",
        },
        {
          id: "shipping_nav3",
          label: "nav3",
          icon: <Send className="w-3 h-3" />,
          page: "shipping_nav3",
        },
      ],
    },
    {
      id: "production",
      label: "생산관리",
      icon: <Factory className="w-4 h-4" />,
      children: [
        {
          id: "production_nav1",
          label: "nav1",
          icon: <FileText className="w-3 h-3" />,
          page: "production_nav1",
        },
        {
          id: "production_nav2",
          label: "nav2",
          icon: <Calendar className="w-3 h-3" />,
          page: "production_nav2",
        },
      ],
    },
    {
      id: "approval",
      label: "전자결재",
      icon: <CheckCircle className="w-4 h-4" />,
      children: [
        {
          id: "approval_nav1",
          label: "nav1",
          icon: <CheckCircle className="w-3 h-3" />,
          page: "approval_nav1",
        },
        {
          id: "approval_nav2",
          label: "nav2",
          icon: <FolderOpen className="w-3 h-3" />,
          page: "approval_nav2",
        },
      ],
    },
    {
      id: "labelMgmt",
      label: "라벨관리",
      icon: <Tags className="w-4 h-4" />,
      page: "labelManagement",
    },
    {
      id: "userMgmt",
      label: "사용자관리",
      icon: <Users className="w-4 h-4" />,
      page: "userManagement",
    },
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.page === currentPage;

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={`w-full justify-start px-2 py-1.5 h-auto ${
            level > 0 ? "ml-4" : ""
          } ${
            isActive
              ? "bg-[#724323] text-[#FAF6F2] hover:bg-[#724323] hover:text-[#FAF6F2]"
              : "text-[#333333] hover:bg-[#F5E9D5]"
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.page) {
              onNavigate(item.page);
            }
          }}
        >
          <div className="flex items-center gap-2 flex-1">
            {item.icon}
            {!collapsed && (
              <>
                <span className="text-sm">{item.label}</span>
                {hasChildren && (
                  <div className="ml-auto">
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </Button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-2">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`bg-white border-r border-[#F5E9D5] flex flex-col fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#F5E9D5] flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src=""
                alt="애니콩 로고"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-medium text-[#724323]">애니콩</h2>
              <p className="text-xs text-[#333333]">펫 베이커리</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="p-1 h-auto hover:bg-[#F5E9D5]"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <div
        className="flex-1 overflow-y-auto p-2"
        style={{ height: "calc(100vh - 88px)" }}
      >
        <div className="space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[#F5E9D5]">
        {!collapsed && (
          <div className="text-xs text-[#333333] text-center">
            <p className="text-[#A3C478]">● 연결됨</p>
          </div>
        )}
      </div>
    </div>
  );
}
