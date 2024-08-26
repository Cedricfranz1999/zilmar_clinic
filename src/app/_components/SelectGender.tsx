import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export function SelectGender() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Male</SelectItem>
          <SelectItem value="banana">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
