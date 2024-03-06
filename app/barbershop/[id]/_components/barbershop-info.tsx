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

interface BarbershopProps {
    barbershop: Barbershop
}

export default function BarbershopInfo({ barbershop }: BarbershopProps) {
    const { data, status } = useSession();

    function handleLoginClick() {
        signIn('google')
    }

    function handleLogoutClick() {
        signOut()
    }
    
    const router = useRouter()

    function handleBackClick() {
        router.back()
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
                    
                    <SheetContent className="p-0">
                        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        {data?.user && status === "authenticated" && (
                            <div className="flex justify-between items-center px-5 py-6">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={data.user?.image ?? ''} />
                                    </Avatar>

                                    <h2 className="font-bold">{data.user?.name}</h2>
                                </div>
                                <Button onClick={handleLogoutClick} variant="secondary" size="icon">
                                    <LogOutIcon />
                                </Button>
                            </div>
                        )}

                        {status === "unauthenticated" && (
                            <div className="px-5 py-6 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={32} />
                                    <h2 className="font-bold">Olá, faça seu login!</h2>
                                </div>
                                <Button onClick={handleLoginClick} variant="secondary" className="w-full flex gap-2 justify-start">
                                    <LogInIcon size={18} />
                                    Fazer Login
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 px-5">

                            <Button variant="outline" className="justify-start gap-2" asChild>
                                <Link href="/">
                                    <HomeIcon size={18} />
                                    Inicio
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant="outline" className="justify-start gap-2" asChild>
                                    <Link href="/bookings">
                                        <CalendarIcon size={18} />
                                        Agendamentos
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
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
