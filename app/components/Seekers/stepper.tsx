"use client"

import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

type Step = { id: string; title: string }
type StepperProps = {
  steps: Step[]
  current: number
  onStepClick?: (index: number) => void
}

export function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <ol className="flex overflow-x-auto rounded-md border bg-background p-2">
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li
            key={s.id}
            className={cn(
              "group flex min-w-[160px] items-center gap-3 rounded-md px-3 py-2 transition-colors",
              active ? "bg-muted" : "hover:bg-muted/60"
            )}
          >
            <button
              type="button"
              onClick={() => onStepClick?.(i)}
              className="flex items-center gap-3"
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                  done ? "border-green-600 text-green-700" : active ? "border-foreground" : "border-muted-foreground/40 text-muted-foreground"
                )}
                aria-hidden="true"
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-sm",
                  active ? "font-medium" : "text-muted-foreground"
                )}
              >
                {s.title}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
