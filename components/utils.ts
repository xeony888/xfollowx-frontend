

export function shortenAddress(address: string): string {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`;
}
export function toDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}
export type SubscriptionType = "CHAIN" | "STRIPE" | "UNDEFINED";