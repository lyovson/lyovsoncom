import { Card, CardContent, CardFooter } from '@/components/shadcn/ui/card';
import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

type ImageCardProps = {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  priority?: boolean; // To control image loading priority
};

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt = '',
  caption,
  className = '',
  priority = false, // By default, not high priority
}) => {
  return (
    <Card
      className={clsx(
        'overflow-hidden rounded-lg shadow-md  hover:shadow-lg',
        className,
      )}
    >
      <CardContent className="relative aspect-w-16 aspect-h-9">
        <Image
          className="object-cover w-full h-auto "
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          priority={priority}
          placeholder="blur"
          blurDataURL="/placeholder-image.jpg" // Replace with a real placeholder for a blur effect
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes for optimization
        />
      </CardContent>
      {caption && (
        <CardFooter className="px-4 text-sm italic ">{caption}</CardFooter>
      )}
    </Card>
  );
};
