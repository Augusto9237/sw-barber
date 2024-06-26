import { SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

export default function SideMenu() {
    const { data, status } = useSession();

    function handleLoginClick() {
        signIn('google')
    }

    function handleLogoutClick() {
        signOut()
    }

    return (
        <>
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
        </>
    )
}
