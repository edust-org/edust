import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui"
import { useAuthStore } from "@/store"
import { School } from "lucide-react"
import { useRouter } from "next/navigation"

import React from "react"

interface AcademicsProps {
  academics: Array<{
    id: string
    name: string
  }>
}

export const Academics: React.FC<AcademicsProps> = ({ academics }) => {
  const router = useRouter()
  const { setActiveAcademy } = useAuthStore((state) => state)
  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <School className="mr-2 h-4 w-4" /> Academics
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {academics.map((aca) => (
              <DropdownMenuItem
                key={aca.id}
                onClick={() => {
                  setActiveAcademy(aca.id)
                  router.push("/academics")
                }}
                className={`capitalize`}
              >
                {aca.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}
