import NavBar from "@/components/custom/navbar/navbar";
import "./pageStyling.css";
import HomeBody from "@/components/custom/homeBody/homeBody";
import { useEffect, useState } from "react";
import FetchCurrencies from "@/components/custom/homeBody/fetchCurrencies";

export default function Home() {
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchCurrencies();
                setData(result);
                // console.log(result);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchData();
    }, []);

    const filteredData = searchQuery
        ? data.filter(
              (currency) =>
                  currency.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  currency.symbol
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
          )
        : data;

    return (
        <>
            <div className="home flex flex-col w-full justify-start items-center">
                <NavBar setSearchQuery={setSearchQuery} />
                <HomeBody data={filteredData} />
            </div>
        </>
    );
}
