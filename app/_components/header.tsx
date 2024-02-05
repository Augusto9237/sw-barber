"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Header() {
    const { data, status } = useSession()

    return (
        <Card className="rounded-none">
            <CardContent className="p-5 py-8 justify-between flex flex-row items-center">
                <Image src='/Logo.png' alt="SW Barber" height={22} width={120} />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon'>
                            <MenuIcon size={16} />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        {status === "authenticated" && (
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={data.user?.image ?? ''} />
                                </Avatar>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </CardContent>

        </Card>
    );
}
