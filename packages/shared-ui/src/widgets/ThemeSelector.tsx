'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'emerald' | 'amethyst';

interface ThemeOption {
  id: ThemeMode;
  name: string;
  palette: string[]; // 3 preview colors: [bg, accent, text]
}

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    name: '1. Light Enterprise',
    palette: ['#ffffff', '#2563eb', '#0f172a'],
  },
  {
    id: 'dark',
    name: '2. Dark Obsidian',
    palette: ['#111827', '#3b82f6', '#f8fafc'],
  },
  {
    id: 'emerald',
    name: '3. Midnight Emerald',
    palette: ['#071f1a', '#10b981', '#f0fdf4'],
  },
  {
    id: 'amethyst',
    name: '4. Royal Amethyst',
    palette: ['#141026', '#8b5cf6', '#faf5ff'],
  },
];

export const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('erp-theme') as ThemeMode) || 'dark';
    setCurrentTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const changeTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    localStorage.setItem('erp-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setIsOpen(false);
  };

  const activeOption = themeOptions.find((t) => t.id === currentTheme) || themeOptions[1];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all shadow-sm cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-subtle)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-main)',
        }}
        title="Switch System Theme"
      >
        <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
        <span className="hidden sm:inline">{activeOption.name}</span>
        <div className="flex items-center -space-x-1 ml-1">
          {activeOption.palette.map((color, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-black/20"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 mt-2 w-56 rounded-xl border p-1.5 z-50 shadow-xl backdrop-blur-md animate-fade-in-up"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider mb-1 border-b"
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border-color)',
              }}
            >
              Select System Theme
            </div>

            <div className="space-y-1">
              {themeOptions.map((opt) => {
                const isSelected = currentTheme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => changeTheme(opt.id)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? 'var(--bg-subtle)' : 'transparent',
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-main)',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center -space-x-1">
                        {opt.palette.map((color, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/20 shadow-xs"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span>{opt.name}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
