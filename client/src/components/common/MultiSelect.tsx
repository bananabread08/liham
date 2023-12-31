import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, CheckIcon as Check, Cross2Icon as X, ChevronUpIcon } from '@radix-ui/react-icons'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export type OptionType = Record<'value' | 'label', string>

interface MultiSelectProps {
  options: Record<'value' | 'label', string>[]
  selected: Record<'value' | 'label', string>[]
  onChange: React.Dispatch<React.SetStateAction<Record<'value' | 'label', string>[]>>
  className?: string
  placeholder?: string
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, selected, onChange, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: Record<'value' | 'label', string>) => {
      onChange(selected.filter((i) => i.value !== item.value))
    }

    // on delete key press, remove last selected item
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && selected.length > 0) {
          onChange(selected.filter((_, index) => index !== selected.length - 1))
        }

        // close on escape
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [onChange, selected])

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={'group w-full justify-between h-full'}
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-wrap items-center gap-1">
              {selected.map((item) => (
                <Badge key={item.value} className="flex items-center gap-1" onClick={() => handleUnselect(item)}>
                  {item.label}
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleUnselect(item)
                    }}
                  >
                    <X width="15" height="15" className="w-auto h-auto text-muted-foreground hover:text-foreground" />
                  </Button>
                </Badge>
              ))}
              {selected.length === 0 && <span>{props.placeholder ?? 'Select ...'}</span>}
            </div>
            {open ? (
              <ChevronUpIcon className="h-4 w-4 shrink-0 opacity-50" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search ..." />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected.some((item) => item.value === option.value)
                        ? selected.filter((item) => item.value !== option.value)
                        : [...selected, option],
                    )
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.some((item) => item.value === option.value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)

MultiSelect.displayName = 'MultiSelect'

export { MultiSelect }
