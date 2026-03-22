"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { ACCENT, BORDER, SIDEBAR_ITEMS } from "@/lib/constants";

interface SidebarProps {
  userName: string;
  userPlan: string;
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export default function Sidebar({ userName, userPlan, activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ width: collapsed ? 60 : 220, background: "rgba(255,255,255,.02)", borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", transition: "width .3s", flexShrink: 0, overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "16px 12px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setCollapsed(v => !v)}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, boxShadow: "0 0 14px #00d4ff50", flexShrink: 0 }}>⬡</div>
        {!collapsed && <span style={{ fontSize: 16, fontWeight: 800, whiteSpace: "nowrap" }}>AKASHA<span style={{ color: ACCENT }}>AI</span></span>}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {SIDEBAR_ITEMS.map(item => (
          <div key={item.id} onClick={() => onSectionChange(item.id)} title={collapsed ? item.label : ""} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 10, cursor: "pointer", marginBottom: 2, transition: "all .2s", background: activeSection === item.id ? "rgba(0,212,255,.12)" : "transparent", borderLeft: activeSection === item.id ? `2px solid ${ACCENT}` : "2px solid transparent" }} onMouseEnter={e => { if (activeSection !== item.id) e.currentTarget.style.background = "rgba(255,255,255,.04)"; }} onMouseLeave={e => { if (activeSection !== item.id) e.currentTarget.style.background = "transparent"; }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span style={{ fontSize: 13, fontWeight: activeSection === item.id ? 700 : 500, color: activeSection === item.id ? "#fff" : "rgba(255,255,255,.55)", whiteSpace: "nowrap" }}>{item.label}</span>}
          </div>
        ))}
      </div>

      {/* User */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 8px", borderRadius: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00d4ff,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{userName?.[0]?.toUpperCase() || "U"}</div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName || "Utilisateur"}</div>
              <div style={{ fontSize: 10, color: "#ffd700", fontWeight: 700 }}>{userPlan || "SPARK"}</div>
            </div>
          )}
        </div>
        {!collapsed && <button onClick={handleLogout} style={{ width: "100%", padding: "7px", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 8, color: "rgba(255,255,255,.4)", fontSize: 11, cursor: "pointer", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff3366"; e.currentTarget.style.color = "#ff3366"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "rgba(255,255,255,.4)"; }}>Déconnexion</button>}
      </div>
    </div>
  );
}
