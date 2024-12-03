import React, { createContext, useContext, useState } from 'react';

interface PreviewContextType {
  isPreviewOpen: boolean;
  togglePreview: () => void;
  setPreviewOpen: (open: boolean) => void;
  previewContent: React.ReactNode | null;
  setPreviewContent: (content: React.ReactNode | null) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(() => {
    const saved = localStorage.getItem('previewOpen');
    return saved ? JSON.parse(saved) : true;
  });
  const [previewContent, setPreviewContent] = useState<React.ReactNode | null>(null);

  const togglePreview = () => {
    setIsPreviewOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('previewOpen', JSON.stringify(newState));
      return newState;
    });
  };

  const setPreviewOpen = (open: boolean) => {
    setIsPreviewOpen(open);
    localStorage.setItem('previewOpen', JSON.stringify(open));
  };

  return (
    <PreviewContext.Provider
      value={{
        isPreviewOpen,
        togglePreview,
        setPreviewOpen,
        previewContent,
        setPreviewContent,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}