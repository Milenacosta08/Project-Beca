import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { cn } from '@/lib/utils';

interface CarouselProps {
  className?: string;
  images: {
    key: string;
    path: string;
  }[];
}

export default function Carousel({
  className,
  images,
}: CarouselProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay:2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className={cn("mySwiper h-full w-full", className)}
      spaceBetween={30}
      centeredSlides={true}
    >
      {images.map((image) => (
        <SwiperSlide key={image.key}>
          <div className='flex justify-center items-center w-full h-full'>
            <Image 
              src={image.path}
              width={200}
              height={80}
              alt="Imagem carrossel"
              className="w-full h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}