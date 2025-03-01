export type Language = {
    dk: string;
    en: string;
}

export type Variant = {
    stock: number;
    color: string;
    size: string[];
    images: string[]
}

export type Image = {
    aspectRatio: string;
    imageUrl: string;
    maxWidth: string;
    alt: string;
    focalPoint: { x: number, y: number }
}

export type PromotionalSpots = {
    link: string;
    position: number;
    type: string;
    image: Image;
    imageAltText: string;
    _alias: string
}

export type Product = {
    id: number;
    brand: string;
    price: number;
    stock: number;
    color: string;
    size: string[];
    name: Language;
    images: string[];
    categories: string[];
    variant: Variant[]
}

export type Category = {
    id: string;
    parent_category_id: string;
    level: number;
    name: Language;
    categories: Category[]
}

export function isProduct(item: any): item is Product {
    return item?.item_type === "product";
}

export function isPromotionalSpot(item: any): item is PromotionalSpots {
    return item?.item_type === "promo";
}