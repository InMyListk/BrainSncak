"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

interface MultiSelectProps {
    options: { value: string; label: string; icon?: string }[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
    allowCustom?: boolean
    customTags?: { id: string; label: string }[]
    onCustomTagsChange?: (customTags: { id: string; label: string }[]) => void
    maxTagLength?: number
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items...",
    className,
    allowCustom = false,
    customTags = [],
    onCustomTagsChange,
    maxTagLength = 25,
}: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const handleUnselect = React.useCallback(
        (item: string) => {
            onChange(selected.filter((s) => s !== item))
            // Also remove from custom tags if it's a custom tag
            if (item.startsWith("custom_") && onCustomTagsChange) {
                onCustomTagsChange(customTags.filter((tag) => tag.id !== item))
            }
        },
        [onChange, selected, customTags, onCustomTagsChange],
    )

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newSelected = [...selected]
                        const removedItem = newSelected.pop()
                        if (removedItem) {
                            onChange(newSelected)
                            // Remove from custom tags if it was a custom tag
                            if (removedItem.startsWith("custom_") && onCustomTagsChange) {
                                onCustomTagsChange(customTags.filter((tag) => tag.id !== removedItem))
                            }
                        }
                    }
                }
                if (e.key === "Enter" && allowCustom && inputValue.trim()) {
                    e.preventDefault()
                    const trimmedValue = inputValue.trim()

                    // Check length limit
                    if (trimmedValue.length > maxTagLength) {
                        return
                    }

                    const customTagId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

                    // Check if it's not already selected and not in predefined options
                    if (
                        !selected.includes(customTagId) &&
                        !options.some((opt) => opt.label.toLowerCase() === trimmedValue.toLowerCase())
                    ) {
                        onChange([...selected, customTagId])
                        if (onCustomTagsChange) {
                            onCustomTagsChange([...customTags, { id: customTagId, label: trimmedValue }])
                        }
                        setInputValue("")
                        setOpen(false)
                    }
                }
                if (e.key === "Escape") {
                    input.blur()
                }
            }
        },
        [onChange, selected, inputValue, allowCustom, customTags, onCustomTagsChange, options, maxTagLength],
    )

    const selectables = options.filter((option) => !selected.includes(option.value))

    const getDisplayLabel = (item: string) => {
        const option = options.find((opt) => opt.value === item)
        if (option) return option.label

        // Check if it's a custom tag
        const customTag = customTags.find((tag) => tag.id === item)
        if (customTag) return customTag.label

        return item
    }

    const getDisplayIcon = (item: string) => {
        const option = options.find((opt) => opt.value === item)
        return option?.icon
    }

    const isCustomTag = (item: string) => item.startsWith("custom_")

    const handleInputChange = (value: string) => {
        // Limit input length
        if (value.length <= maxTagLength) {
            setInputValue(value)
        }
    }

    return (
        <Command onKeyDown={handleKeyDown} className={`overflow-visible bg-transparent ${className}`}>
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                    {selected.map((item) => {
                        const displayLabel = getDisplayLabel(item)
                        const displayIcon = getDisplayIcon(item)
                        const isCustom = isCustomTag(item)

                        return (
                            <Badge
                                key={item}
                                variant="secondary"
                                className={
                                    isCustom ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-purple-100 text-purple-700"
                                }
                            >
                                {isCustom ? (
                                    <Plus className="mr-1 h-3 w-3" />
                                ) : (
                                    displayIcon && <span className="mr-1">{displayIcon}</span>
                                )}
                                {displayLabel}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item)
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        )
                    })}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={handleInputChange}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={selected.length === 0 ? placeholder : ""}
                        className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && (selectables.length > 0 || (allowCustom && inputValue.trim())) ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandList>
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onSelect={(value) => {
                                                setInputValue("")
                                                onChange([...selected, option.value])
                                            }}
                                            className={"cursor-pointer"}
                                        >
                                            {option.icon && <span className="mr-2">{option.icon}</span>}
                                            {option.label}
                                        </CommandItem>
                                    )
                                })}
                                {allowCustom &&
                                    inputValue.trim() &&
                                    inputValue.trim().length <= maxTagLength &&
                                    !options.some((opt) => opt.label.toLowerCase() === inputValue.toLowerCase()) &&
                                    !customTags.some((tag) => tag.label.toLowerCase() === inputValue.toLowerCase()) && (
                                        <CommandItem
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onSelect={() => {
                                                const trimmedValue = inputValue.trim()
                                                const customTagId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                                                onChange([...selected, customTagId])
                                                if (onCustomTagsChange) {
                                                    onCustomTagsChange([...customTags, { id: customTagId, label: trimmedValue }])
                                                }
                                                setInputValue("")
                                                setOpen(false)
                                            }}
                                            className="cursor-pointer text-orange-600"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create "{inputValue.trim()}" ({inputValue.length}/{maxTagLength})
                                        </CommandItem>
                                    )}
                                {allowCustom && inputValue.trim().length > maxTagLength && (
                                    <CommandItem disabled className="text-red-500 cursor-not-allowed">
                                        Tag too long! Maximum {maxTagLength} characters allowed.
                                    </CommandItem>
                                )}
                            </CommandGroup>
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </Command>
    )
}
