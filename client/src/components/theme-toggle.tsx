import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Handle system theme
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setChecked(isDark);
    } else {
      setChecked(theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setChecked(newTheme === "dark");
  };

  const handleToggleChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    setChecked(checked);
  };

  if (mobile) {
    return (
      <label htmlFor="darkModeToggleMobile" className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            type="checkbox" 
            id="darkModeToggleMobile" 
            className="sr-only"
            checked={checked}
            onChange={() => toggleTheme()}
          />
          <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${checked ? 'translate-x-4' : ''}`}></div>
        </div>
        {checked ? (
          <Moon className="ml-2 text-gray-500 dark:text-gray-400 h-4 w-4" />
        ) : (
          <Sun className="ml-2 text-gray-500 dark:text-gray-400 h-4 w-4" />
        )}
      </label>
    );
  }

  return (
    <div className="flex items-center justify-between space-x-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {checked ? "Dark" : "Light"} Mode
      </span>
      <Switch 
        id="darkModeToggle" 
        checked={checked}
        onCheckedChange={handleToggleChange}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}
