"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {  MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

export default function Header() {

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

                    <SideMenu/>
                </Sheet>
            </CardContent>

        </Card>
    );
}
