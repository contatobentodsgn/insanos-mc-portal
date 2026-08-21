"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export function VisualEditor() {
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const modifiedMapRef = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const hasEditorParam = urlParams.get("editor") === "true";
    const hasAdminSession = sessionStorage.getItem("insanos_admin_editor") === "true";

    if (hasEditorParam) {
      sessionStorage.setItem("insanos_admin_editor", "true");
      setIsAdminActive(true);
      setIsEditing(true);
    } else if (hasAdminSession) {
      setIsAdminActive(true);
    }
  }, []);

  // Generate a stable selector key for any DOM element
  const getElementKey = (el: HTMLElement): string => {
    if (el.dataset.editableKey) return el.dataset.editableKey;
    
    // Build path
    const path: string[] = [];
    let current: HTMLElement | null = el;
    while (current && current !== document.body) {
      let index = 0;
      let sibling = current.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === current.tagName) {
          index++;
        }
        sibling = sibling.previousElementSibling;
      }
      path.unshift(`${current.tagName.toLowerCase()}${index > 0 ? `[${index}]` : ""}`);
      current = current.parentElement;
    }
    return `${window.location.pathname}:${path.join(">")}`;
  };

  // Load and apply saved custom texts from server & localStorage
  const applyStoredTexts = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const localData = localStorage.getItem("insanos_custom_texts");
      const stored = localData ? JSON.parse(localData) : {};
      modifiedMapRef.current = stored;

      const pathPrefix = `${window.location.pathname}:`;
      const keys = Object.keys(stored);

      if (keys.length > 0) {
        setChangeCount(keys.length);
        setHasChanges(true);

        // Apply to current page elements
        const candidateElements = document.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, blockquote, [data-editable]"
        );

        candidateElements.forEach((node) => {
          const el = node as HTMLElement;
          if (el.closest("#insanos-visual-editor-toolbar")) return;
          const key = getElementKey(el);
          if (stored[key] !== undefined) {
            el.innerHTML = stored[key];
          }
        });
      }
    } catch (e) {
      console.warn("[VisualEditor] Failed to apply stored texts:", e);
    }
  }, []);

  // Fetch initial content from server on mount
  useEffect(() => {
    fetch("/api/save-content")
      .then((res) => res.json())
      .then((serverData) => {
        if (serverData && Object.keys(serverData).length > 0) {
          const localData = localStorage.getItem("insanos_custom_texts");
          const localParsed = localData ? JSON.parse(localData) : {};
          const merged = { ...serverData, ...localParsed };
          localStorage.setItem("insanos_custom_texts", JSON.stringify(merged));
        }
        applyStoredTexts();
      })
      .catch(() => {
        applyStoredTexts();
      });
  }, [applyStoredTexts]);

  // Keyboard shortcut Ctrl+E or Cmd+E to toggle edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "e" || e.key === "E")) {
        e.preventDefault();
        setIsEditing((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Enable / disable contentEditable on page elements
  useEffect(() => {
    const candidateElements = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, blockquote, [data-editable]"
    );

    const handleInput = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const key = getElementKey(el);
      const htmlContent = el.innerHTML;
      modifiedMapRef.current[key] = htmlContent;
      localStorage.setItem("insanos_custom_texts", JSON.stringify(modifiedMapRef.current));
      setHasChanges(true);
      setChangeCount(Object.keys(modifiedMapRef.current).length);
    };

    candidateElements.forEach((node) => {
      const el = node as HTMLElement;
      if (el.closest("#insanos-visual-editor-toolbar") || el.closest("nav") || el.closest("button")) {
        return;
      }

      if (isEditing) {
        el.setAttribute("contenteditable", "true");
        el.classList.add("insanos-editable-element");
        el.addEventListener("input", handleInput);
      } else {
        el.removeAttribute("contenteditable");
        el.classList.remove("insanos-editable-element");
        el.removeEventListener("input", handleInput);
      }
    });

    return () => {
      candidateElements.forEach((node) => {
        const el = node as HTMLElement;
        el.removeAttribute("contenteditable");
        el.classList.remove("insanos-editable-element");
        el.removeEventListener("input", handleInput);
      });
    };
  }, [isEditing]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save changes to localStorage and attempt server sync
  const handleSaveToProject = async () => {
    setIsSaving(true);
    // Guarantee localStorage is up to date
    localStorage.setItem("insanos_custom_texts", JSON.stringify(modifiedMapRef.current));
    
    try {
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedMapRef.current),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✓ Textos salvos com sucesso no navegador e projeto!");
      } else {
        showToast("✓ Textos salvos no navegador! Use '📋 Copiar' para gravar no código.");
      }
    } catch (err) {
      showToast("✓ Textos salvos no navegador! Use '📋 Copiar' para gravar no código.");
    } finally {
      setIsSaving(false);
    }
  };

  // Download JSON file directly to user's computer
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(modifiedMapRef.current, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "textos-insanos-personalizados.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("📥 Arquivo JSON baixado com sucesso!");
  };

  // Copy changes as JSON to clipboard
  const handleCopyJSON = () => {
    const textData = JSON.stringify(modifiedMapRef.current, null, 2);
    navigator.clipboard.writeText(textData);
    showToast("📋 22 textos copiados! Basta colar no chat para eu fixar no código.");
  };

  // Reset to original defaults
  const handleReset = () => {
    if (window.confirm("Deseja realmente restaurar todos os textos para o padrão original?")) {
      localStorage.removeItem("insanos_custom_texts");
      modifiedMapRef.current = {};
      setHasChanges(false);
      setChangeCount(0);
      window.location.reload();
    }
  };

  const handleExitAdmin = () => {
    sessionStorage.removeItem("insanos_admin_editor");
    setIsAdminActive(false);
    window.location.href = window.location.pathname;
  };

  if (!isAdminActive) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .insanos-editable-element {
          outline: 1px dashed rgba(242, 194, 27, 0.35);
          transition: outline 0.15s ease, background 0.15s ease;
          border-radius: 4px;
          padding: 1px 2px;
          cursor: text !important;
        }
        .insanos-editable-element:hover {
          outline: 1px dashed #F2C21B;
          background: rgba(242, 194, 27, 0.08);
        }
        .insanos-editable-element:focus {
          outline: 2px solid #F2C21B !important;
          background: rgba(242, 194, 27, 0.12) !important;
        }
      `}</style>

      {/* Floating Toolbar */}
      <div
        id="insanos-visual-editor-toolbar"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-[#121316] border border-[#F2C21B] text-[#F2C21B] px-4 py-2.5 rounded-xl shadow-2xl font-mono text-xs font-bold animate-bounce flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Edit Mode Active Control Bar */}
        {isEditing ? (
          <div className="bg-[#121316]/95 backdrop-blur-xl border border-[#F2C21B] shadow-2xl rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-xl text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] animate-pulse" />
              <div>
                <p className="font-['Anton'] uppercase text-sm tracking-wide text-white">
                  Modo Edição Visual Ativo
                </p>
                <p className="text-[10px] text-[#AAA8A1] font-mono">
                  Clique em qualquer texto na tela para editar
                </p>
              </div>
            </div>

            {changeCount > 0 && (
              <span className="px-2.5 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-[10px] font-bold">
                {changeCount} alteração{changeCount > 1 ? "ões" : ""}
              </span>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleSaveToProject}
                disabled={isSaving}
                className="px-3.5 py-2 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs rounded transition-colors flex items-center gap-1.5 shadow-md font-bold"
                title="Salvar alterações no projeto"
              >
                <span>{isSaving ? "Salvando..." : "💾 Salvar"}</span>
              </button>

              <button
                onClick={handleCopyJSON}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded transition-colors"
                title="Copiar JSON das alterações para colar no chat"
              >
                📋 Copiar
              </button>

              <button
                onClick={handleDownloadJSON}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded transition-colors"
                title="Baixar arquivo JSON com os textos"
              >
                📥 Baixar
              </button>

              {hasChanges && (
                <button
                  onClick={handleReset}
                  className="px-2.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-mono text-xs rounded transition-colors"
                  title="Restaurar padrão original"
                >
                  🔄
                </button>
              )}

              <a
                href="/admin"
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded transition-colors"
                title="Ir para o Painel Admin"
              >
                🏠 Painel
              </a>

              <button
                onClick={handleExitAdmin}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-mono text-xs rounded transition-colors"
                title="Sair do Modo Admin e voltar ao modo público"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        ) : (
          /* Floating Toggle Button */
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="group px-4 py-3 bg-[#121316]/90 hover:bg-[#1A1C22] border border-[#F2C21B]/40 hover:border-[#F2C21B] text-white rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all duration-200 hover:scale-105"
              title="Clique para editar qualquer texto diretamente na tela (Atalho: Ctrl+E / Cmd+E)"
            >
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] group-hover:animate-ping" />
              <span className="font-['Anton'] uppercase text-xs tracking-wider text-white">
                ✏️ Editar Textos
              </span>
            </button>
            <button
              onClick={handleExitAdmin}
              className="p-3 bg-[#121316]/90 hover:bg-red-950/40 border border-white/15 hover:border-red-500/40 text-[#AAA8A1] hover:text-red-300 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200"
              title="Desativar Modo Admin"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
}
