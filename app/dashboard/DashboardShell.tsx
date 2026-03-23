"use client";
import { useState } from "react";
import { BG } from "@/lib/constants";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import ChatSection from "@/components/dashboard/ChatSection";
import ToolsSection from "@/components/dashboard/ToolsSection";
import AgentsSection from "@/components/dashboard/AgentsSection";
import AutomationSection from "@/components/dashboard/AutomationSection";
import StudioSection from "@/components/dashboard/StudioSection";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import SettingsSection from "@/components/dashboard/SettingsSection";

interface DashboardShellProps {
  userName: string;
  userPlan: string;
  userEmail: string;
  children: React.ReactNode;
}

export default function DashboardShell({ userName, userPlan, userEmail }: DashboardShellProps) {
  const [section, setSection] = useState("chat");

  return (
    <div style={{ display: "flex", height: "100vh", background: BG, color: "#fff", overflow: "hidden" }}>
      <Sidebar userName={userName} userPlan={userPlan} activeSection={section} onSectionChange={setSection} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar userName={userName} userPlan={userPlan} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          {section === "chat" && <ChatSection userName={userName} userPlan={userPlan} />}
          {section === "tools" && <ToolsSection />}
          {section === "agents" && <AgentsSection />}
          {section === "automation" && <AutomationSection />}
          {section === "studio" && <StudioSection />}
          {section === "analytics" && <AnalyticsSection userPlan={userPlan} />}
          {section === "settings" && <SettingsSection userName={userName} userEmail={userEmail} userPlan={userPlan} />}
        </div>
      </div>
    </div>
  );
}
