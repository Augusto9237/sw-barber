import { Button } from '@/app/_components/ui/button';
import { db } from '@/app/_lib/prisma';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface BarbershopDetailsProps {
    params: {
        id?: string;
    }
}
export default async function BarbershopDetails({ params }: BarbershopDetailsProps) {
    if (!params.id) {
        //TODO: redirecionar para home page
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        }
    })

    if (!barbershop) {
        return null
    }

    return (
        <div>
            <div className='h-[250px] w-full relative'>
                <Button size="icon" variant="outline" className='absolute z-50 top-4 left-4'>
                    <ChevronLeftIcon />
                </Button>

                <Button size="icon" variant="outline" className='absolute z-50 top-4 right-4'>
                    <MenuIcon />
                </Button>

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