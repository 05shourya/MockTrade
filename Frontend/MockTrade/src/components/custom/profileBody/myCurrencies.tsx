import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MyCurrency } from "@/types";

interface MyCurrenciesProps {
    currencies: MyCurrency[];
    setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    data: any[];
    setCurrencyDetails: React.Dispatch<React.SetStateAction<any>>;
}

export default function MyCurrencies({
    currencies,
    data,
    setIsOpen,
    setCurrencyDetails,
}: MyCurrenciesProps) {
    const openModal = () => {
        setIsOpen(true);
    };
    const getPriceClassName = (filteredData: any, averageBuyPrice: any) => {
        if (!filteredData) return ""; // Return an empty string if filteredData is not available

        const currentPrice = Number(filteredData.current_price);
        if (currentPrice < Number(averageBuyPrice)) {
            return "text-red-400";
        } else if (currentPrice > Number(averageBuyPrice)) {
            return "text-green-500";
        }
        return "";
    };

    if (currencies.length == 0) {
        return (
            <>
                <div className="flex justify-center items-center  dark:text-gray-300 text-slate-800 ">
                    No Currencies Owned
                </div>
            </>
        );
    }
    return (
        <>
            <Table className="mt-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Logo</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">
                            Average Buy Price
                        </TableHead>
                        <TableHead className="text-center">
                            Current Price
                        </TableHead>
                        <TableHead className="text-center">
                            Invested Amount
                        </TableHead>
                        <TableHead className="text-center">
                            Current Value
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currencies
                        .filter((currency) =>
                            data.some(
                                (c: any) =>
                                    c.name.toLowerCase() ===
                                    currency.name.toLowerCase()
                            )
                        )
                        .map((currency) => {
                            const filteredData = data.find(
                                (c: any) =>
                                    c.name.toLowerCase() ===
                                    currency.name.toLowerCase()
                            );

                            const priceClassName = getPriceClassName(
                                filteredData,
                                currency.averageBuyPrice
                            );

                            return (
                                <TableRow
                                    key={currency.name}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setCurrencyDetails(filteredData);
                                        console.log(filteredData);
                                        openModal();
                                    }}
                                >
                                    <TableCell className="font-medium text-center flex justify-center p-6 cursor-pointer">
                                        <img
                                            src={filteredData.image}
                                            alt=""
                                            className="w-9 h-9 object-contain"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center p-6 cursor-pointer">
                                        {currency.name}
                                    </TableCell>
                                    <TableCell className="text-center p-6 cursor-pointer">
                                        {currency.quantity}
                                    </TableCell>
                                    <TableCell
                                        className={`text-center font-medium p-6 cursor-pointer ${priceClassName}`}
                                    >
                                        $ {currency.averageBuyPrice}
                                    </TableCell>
                                    <TableCell className="text-center font-medium p-6 cursor-pointer">
                                        $ {filteredData.current_price}
                                    </TableCell>
                                    <TableCell className="text-center p-6 cursor-pointer">
                                        {currency.investedAmount}
                                    </TableCell>
                                    <TableCell
                                        className={`text-center font-medium p-6 cursor-pointer ${priceClassName}`}
                                    >
                                        {currency.quantity *
                                            filteredData.current_price}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </>
    );
}
