import { Button } from '@/app/_components/ui/button';
import { db } from '@/app/_lib/prisma';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface BarbershopDetailsProps {
    params: {
        id?: string;
    }
}
export default async function BarbershopDetails({ params }: BarbershopDetailsProps) {
    const session = await getServerSession(authOptions)
    
    if (!params.id) {
        //TODO: redirecionar para home page
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true,
        }
    })

    if (!barbershop) {
        return null
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className='px-5 py-6 flex flex-col gap-4'>
                {barbershop?.services.map((service) => (
                    <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} />
                ))}
            </div>
        </div>
    )
}
