

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

export function parseDate(date: Date): string {
    // Get month, day, and year parts of the date
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    // Return the formatted date string
    return `${month}/${day}/${year}`;
}