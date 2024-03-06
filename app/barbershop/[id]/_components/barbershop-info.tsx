'use client'
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon, LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react"
import { Barbershop } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import Link from "next/link"
import SideMenu from "@/app/_components/side-menu"

interface BarbershopProps {
    barbershop: Barbershop
}

export default function BarbershopInfo({ barbershop }: BarbershopProps) {
    const router = useRouter()

    function handleBackClick() {
        router.replace("/")
    }
    return (

        <div>
            <div className='h-[250px] w-full relative'>
                <Button onClick={handleBackClick} size="icon" variant="outline" className='absolute z-50 top-4 left-4'>
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger>
                        <Button size="icon" variant="outline" className='absolute z-50 top-4 right-4'>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    
                    <SideMenu/>
                </Sheet>

                <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div>
                <div className='px-5 pt-3 pb-6 border-b border-solid border-secondary'>
                    <h1 className='text-xl font-bold'> {barbershop.name}</h1>

                    <div className="flex items-center gap-1 mt-2">
                        <MapPinIcon className='text-primary' size={18} />
                        <p className='text-sm'>{barbershop.address}</p>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                        <StarIcon className='text-primary' size={18} />
                        <p className='text-sm'>5,0 (800 avaliações)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
