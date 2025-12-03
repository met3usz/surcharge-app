"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColorItem, ModelItem } from "@/lib/data"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  colors: ColorItem[]
  models: ModelItem[]
}

export function SearchForm({ colors, models }: SearchFormProps) {
  const [prefix, setPrefix] = React.useState<string>("NCS")
  const [openModel, setOpenModel] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<ModelItem | null>(null)
  
  const [openColor, setOpenColor] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState<ColorItem | null>(null)

  // Filter colors based on prefix
  const availableColors = React.useMemo(() => {
    return colors.filter((color) => {
      if (prefix === "RAL") {
        return color.POLSKONE_GRUPA_KOLORU === "RAL"
      }
      return color.POLSKONE_GRUPA_KOLORU.startsWith("NCS")
    })
  }, [colors, prefix])

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-xl border border-white/20">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            System Kolorów
          </label>
          <Select value={prefix} onValueChange={(val) => {
            setPrefix(val)
            setSelectedColor(null)
          }}>
            <SelectTrigger className="w-full bg-[#f5f5f7]">
              <SelectValue placeholder="Wybierz system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NCS">NCS</SelectItem>
              <SelectItem value="RAL">RAL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Model Drzwi
          </label>
          <Popover open={openModel} onOpenChange={setOpenModel}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openModel}
                className="w-full justify-between font-normal bg-[#f5f5f7] hover:bg-[#e8e8ea]"
              >
                {selectedModel
                  ? selectedModel.WARTOSC
                  : "Wybierz model..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
              <Command>
                <CommandInput placeholder="Szukaj modelu..." />
                <CommandList>
                  <CommandEmpty>Nie znaleziono modelu.</CommandEmpty>
                  <CommandGroup>
                    {models.map((model) => (
                      <CommandItem
                        key={model.PRZEKODOWANIE + model.WARTOSC}
                        value={model.WARTOSC}
                        onSelect={() => {
                          setSelectedModel(model)
                          setOpenModel(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedModel?.WARTOSC === model.WARTOSC
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {model.WARTOSC}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Kolor ({prefix})
          </label>
          <Popover open={openColor} onOpenChange={setOpenColor}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openColor}
                className="w-full justify-between font-normal bg-[#f5f5f7] hover:bg-[#e8e8ea]"
              >
                {selectedColor
                  ? selectedColor.WARTOSC
                  : `Wybierz kolor ${prefix}...`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
              <Command>
                <CommandInput placeholder={`Szukaj koloru ${prefix}...`} />
                <CommandList>
                  <CommandEmpty>Nie znaleziono koloru.</CommandEmpty>
                  <CommandGroup>
                    {availableColors.slice(0, 50).map((color) => (
                      <CommandItem
                        key={color.WARTOSC}
                        value={color.WARTOSC}
                        onSelect={() => {
                          setSelectedColor(color)
                          setOpenColor(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedColor?.WARTOSC === color.WARTOSC
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {color.WARTOSC}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedModel && selectedColor && (
        <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10 text-center animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Wynik</h3>
          <p className="text-muted-foreground mb-4">
            Model: <span className="font-medium text-foreground">{selectedModel.WARTOSC}</span>
            <br />
            Kolor: <span className="font-medium text-foreground">{selectedColor.WARTOSC}</span>
          </p>
          <div className="text-3xl font-bold text-primary">
            Dopłata: ??? zł
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            (Cena do ustalenia - brak danych w systemie)
          </p>
        </div>
      )}
    </div>
  )
}
