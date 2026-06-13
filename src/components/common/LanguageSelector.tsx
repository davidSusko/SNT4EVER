import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Get current language base (e.g. 'es-ES' -> 'es')
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'es';
  const baseLanguage = currentLanguage.split('-')[0].toLowerCase();

  return (
    <div className="flex items-center">
      <Globe className="w-4 h-4 text-white mr-2" />
      <Select value={baseLanguage} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[80px] h-8 bg-transparent border-none text-white focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Lang" />
        </SelectTrigger>
        <SelectContent className="bg-black border-yellow text-white">
          <SelectItem value="es" className="cursor-pointer hover:bg-yellow hover:text-black">ES</SelectItem>
          <SelectItem value="ca" className="cursor-pointer hover:bg-yellow hover:text-black">CA</SelectItem>
          <SelectItem value="en" className="cursor-pointer hover:bg-yellow hover:text-black">EN</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
