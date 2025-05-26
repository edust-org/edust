import { useAuthStore } from "@/store"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@edust/ui"
import { School } from "lucide-react"
import { useRouter } from "next/navigation"

import React from "react"

interface OrganizationsProps {
  organizations: Array<{
    id: string
    name: string
  }>
}

export const Organizations: React.FC<OrganizationsProps> = ({
  organizations,
}) => {
  const router = useRouter()
  const setActiveOrg = useAuthStore((state) => state.setActiveOrg)
  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <School className="mr-2 h-4 w-4" /> Organizations
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => {
                  setActiveOrg(org.id)
                  router.push("/orgs")
                }}
                className={`capitalize`}
              >
                {org.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}
