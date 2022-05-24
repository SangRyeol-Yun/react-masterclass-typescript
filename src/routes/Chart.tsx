import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import Moment from "moment";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart({coinId}: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );
    // console.log(data?.map((price) => price.close));

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "종가",
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {mode: "dark"},
                        chart: {
                            background: "transparent",
                        },

                        stroke: {
                            curve: "straight",
                            width: 3,
                        },
                        xaxis: {
                            categories: data?.map((price) => {
                                return Moment(price.time_close).format(
                                    "YY/MM/DD"
                                );
                            }),
                        },
                        yaxis: {
                            title: {
                                text: "USD",
                                rotate: 0,
                                offsetY: -170,
                                offsetX: 30,
                            },
                            labels: {
                                formatter: (value) =>
                                    `${value.toLocaleString(undefined, {
                                        maximumFractionDigits: 6,
                                    })}`,
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) =>
                                    `$ ${value.toLocaleString(undefined, {
                                        maximumFractionDigits: 6,
                                    })}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
