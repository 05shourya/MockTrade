import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CurrencyTableProps {
    data: any[];
    setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    setCurrencyDetails: React.Dispatch<React.SetStateAction<any>>;
}

export default function CurrencyTable({
    data,
    setIsOpen,
    setCurrencyDetails,
}: CurrencyTableProps) {
    function openModal() {
        setIsOpen(true);
    }

    return (
        <Table>
            <TableCaption>MockTrade</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Logo</TableHead>
                    <TableHead className="text-center">Symbol</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Market Cap</TableHead>
                    <TableHead className="text-center">24h Change</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((currency, index) => (
                        <TableRow
                            key={index}
                            onClick={() => {
                                setCurrencyDetails(currency);
                                openModal();
                            }}
                        >
                            <TableCell className="font-medium text-center flex justify-center p-6 cursor-pointer">
                                <img
                                    src={currency.image}
                                    alt=""
                                    className="w-9 h-9 object-contain"
                                />
                            </TableCell>
                            <TableCell className="font-medium text-center p-6 cursor-pointer">
                                {currency.symbol}
                            </TableCell>
                            <TableCell className="text-center p-6 cursor-pointer">
                                {currency.name}
                            </TableCell>
                            <TableCell className="text-center p-6 cursor-pointer">
                                ${currency.current_price}
                            </TableCell>
                            <TableCell className="text-center p-6 cursor-pointer">
                                ${currency.market_cap}
                            </TableCell>
                            <TableCell
                                className={`text-center p-6 cursor-pointer ${
                                    currency.price_change_percentage_24h < 0
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                {currency.price_change_percentage_24h}%
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No results found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
