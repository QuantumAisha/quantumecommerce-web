'use client'

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/nav/Products/SetQuantity";

interface ItemContentProps {
    item: CartProductType;
}


const  ItemContent: React.FC<ItemContentProps>= ({
    item
}) => {
    return (<div className="
    grid
    grid-cols-5
    text-xs
    md:text-sm
    gap-4
    border-[1.5]
    border-slate-200
    py-4
    items-center">
        <div className="
        col-span-2
        justify-self-start
        flex
        gap-2
        md:gap-4">
            <Link href={'/products/${item.id}'}>
                <div className="relative w-[70px]
                aspect-square">
                    <Image
                    src={item.selectImg.image}
                    alt={item.name}
                    fill
                    className="object-contain"/>
                </div>
            </Link>
            <div className="flex flex-col
            justify-between">
                <Link href={'/products/${item.id}'}> 
                {truncateText(item.name)}</Link>
                <div>{item.selectImg.color} </div>
                <div className="w-[70px]">
                    <button className="text-slate-500 underline" onClick={() =>{} }>Remove</button>
                </div>
            </div>

        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
            <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() =>{}}
            handleQtyDecrease={() =>{}}/>
        </div>
        <div className="justify-self-end font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div>

    </div>  );
}
 
export default ItemContent;