"use client";
import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import { Menu, X, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useConversationStore from "@/stores/useConversationStore";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(true);
  const router = useRouter();
  const { resetConversation } = useConversationStore();

  // After OAuth redirect, reinitialize the conversation so the next turn
  // uses the connector-enabled server configuration immediately
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isConnected = new URLSearchParams(window.location.search).get("connected");
    if (isConnected === "1") {
      resetConversation();
      router.replace("/", { scroll: false });
    }
  }, [router, resetConversation]);

  return (
    <div className="flex justify-center h-screen">
      <div className={`transition-all duration-300 ${isDesktopPanelOpen ? 'w-full md:w-[70%]' : 'w-full'}`}>
        <Assistant />
      </div>
      {/* Desktop panel toggle button */}
      <div className="hidden md:flex items-center">
        <button 
          onClick={() => setIsDesktopPanelOpen(!isDesktopPanelOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={isDesktopPanelOpen ? "パネルを閉じる" : "パネルを開く"}
        >
          {isDesktopPanelOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
        </button>
      </div>
      {/* Desktop ToolsPanel */}
      {isDesktopPanelOpen && (
        <div className="hidden md:block w-[30%] transition-all duration-300">
          <ToolsPanel />
        </div>
      )}
      {/* Hamburger menu for small screens */}
      <div className="absolute top-4 right-4 md:hidden">
        <button onClick={() => setIsToolsPanelOpen(true)}>
          <Menu size={24} />
        </button>
      </div>
      {/* Overlay panel for ToolsPanel on small screens */}
      {isToolsPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="w-full bg-white h-full p-4">
            <button className="mb-4" onClick={() => setIsToolsPanelOpen(false)}>
              <X size={24} />
            </button>
            <ToolsPanel />
          </div>
        </div>
      )}
    </div>
  );
}
