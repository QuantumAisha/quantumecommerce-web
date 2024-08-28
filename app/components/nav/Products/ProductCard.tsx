"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter()
    const productRating =
     data.reviews.reduce((acc: number, item: { rating: number }) => acc + item.rating, 0) / data.reviews.length || 0;

    return (

        <div
        onClick={() => router.push("/product/${data.id}")}
         className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image
                        fill
                        src={data.images[0].image}
                        alt={data.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div className="mt-4">{truncateText(data.name)}</div>
                <div>{data.reviews?.length || 0} reviews</div>
                <div className="font-semibold">{formatPrice(data.price)}</div>
            </div>
        </div>
    );
};

export default ProductCard;
