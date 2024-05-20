import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import Apexchart from "react-apexcharts";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const PriceItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap:10px;
`
const PriceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100px;
    background-color: rgba(0,0,0,.5);
    border-radius: 20px;
  }
`
function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery(
    ["price", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <>
      <div>
        {isLoading ? (
          "Loading Price..."
        ) : (
          <PriceItems>
            <PriceItem>
              <div>${data!.quotes.USD.price.toFixed(3)}</div>
              <div>Rank: {data?.rank}</div>
            </PriceItem>

            <PriceItem>
              <div>30분전: {data?.quotes.USD.percent_change_30m}%</div>
              <div>1시간전: {data?.quotes.USD.percent_change_1h}%</div>
            </PriceItem>
            <PriceItem>
              <div>하루 전: {data?.quotes.USD.percent_change_24h}%</div>
              <div>한달 전: {data?.quotes.USD.percent_change_30d}%</div>
            </PriceItem>
          </PriceItems>
        )}
      </div>
    </>
  );
}

export default Price;