"use client";
import React from "react";
import FileSearchSetup from "./file-search-setup";
import WebSearchConfig from "./websearch-config";
import FunctionsView from "./functions-view";
import McpConfig from "./mcp-config";
import PanelConfig from "./panel-config";
import useToolsStore from "@/stores/useToolsStore";
import GoogleIntegrationPanel from "@/components/google-integration";

export default function ContextPanel() {
  const {
    fileSearchEnabled,
    setFileSearchEnabled,
    webSearchEnabled,
    setWebSearchEnabled,
    functionsEnabled,
    setFunctionsEnabled,
    googleIntegrationEnabled,
    setGoogleIntegrationEnabled,
    mcpEnabled,
    setMcpEnabled,
    codeInterpreterEnabled,
    setCodeInterpreterEnabled,
  } = useToolsStore();
  const [oauthConfigured, setOauthConfigured] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch("/api/google/status")
      .then((r) => r.json())
      .then((d) => setOauthConfigured(Boolean(d.oauthConfigured)))
      .catch(() => setOauthConfigured(false));
  }, []);
  return (
    <div className="h-full p-8 w-full bg-[#f9f9f9] rounded-t-xl md:rounded-none border-l-1 border-stone-100">
      <div className="flex flex-col overflow-y-scroll h-full">
        <PanelConfig
          title="ファイル検索"
          tooltip="ナレッジベース（ベクターストア）を検索できます"
          enabled={fileSearchEnabled}
          setEnabled={setFileSearchEnabled}
        >
          <FileSearchSetup />
        </PanelConfig>
        <PanelConfig
          title="Web検索"
          tooltip="Webを検索できます"
          enabled={webSearchEnabled}
          setEnabled={setWebSearchEnabled}
        >
          <WebSearchConfig />
        </PanelConfig>
        <PanelConfig
          title="コードインタープリター"
          tooltip="アシスタントがPythonコードを実行できます"
          enabled={codeInterpreterEnabled}
          setEnabled={setCodeInterpreterEnabled}
        />
        <PanelConfig
          title="関数"
          tooltip="ローカルで定義された関数を使用できます"
          enabled={functionsEnabled}
          setEnabled={setFunctionsEnabled}
        >
          <FunctionsView />
        </PanelConfig>
        <PanelConfig
          title="MCP"
          tooltip="リモートMCPサーバー経由でツールを呼び出せます"
          enabled={mcpEnabled}
          setEnabled={setMcpEnabled}
        >
          <McpConfig />
        </PanelConfig>
        <PanelConfig
          title="Google統合"
          tooltip="Googleアカウントを接続してGmailとカレンダー機能を有効にします。"
          enabled={oauthConfigured && googleIntegrationEnabled}
          setEnabled={setGoogleIntegrationEnabled}
          disabled={!oauthConfigured}
        >
          <GoogleIntegrationPanel />
        </PanelConfig>
      </div>
    </div>
  );
}
