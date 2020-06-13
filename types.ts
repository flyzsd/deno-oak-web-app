export interface Product {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly outOfStock: boolean;
}