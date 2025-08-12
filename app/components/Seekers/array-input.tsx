"use client"

import { useState } from "react"
import { Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from 'lucide-react'

type ArrayInputProps = {
  control: any
  name: string
  label?: string
  placeholder?: string
  addText?: string
}

export function ArrayInput({ control, name, label, placeholder = "Type and press Add", addText = "Add" }: ArrayInputProps) {
  const [draft, setDraft] = useState("")

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const values: string[] = Array.isArray(field.value) ? field.value : []
        function addItem() {
          const v = draft.trim()
          if (!v) return
          const next = [...values, v]
          field.onChange(next)
          setDraft("")
        }
        function removeAt(idx: number) {
          const next = values.filter((_, i) => i !== idx)
          field.onChange(next)
        }

        return (
          <div className="space-y-2">
            {label ? <label className="text-sm font-medium">{label}</label> : null}
            <div className="flex gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addItem()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                {addText}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {values.map((v, i) => (
                <Badge key={i} variant="secondary" className="px-2 py-1">
                  <span className="mr-1">{v}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${v}`}
                    onClick={() => removeAt(i)}
                    className="inline-flex items-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {values.length === 0 && <span className="text-sm text-muted-foreground">{'No items yet'}</span>}
            </div>
          </div>
        )
      }}
    />
  )
}
