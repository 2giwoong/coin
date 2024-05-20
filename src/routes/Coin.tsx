import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams, useMatch, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
  max-width: 480px;
  margin: auto;
`;
const Header = styled.div`
  position: relative;
  a {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
    svg {
      color: #dedede;
      font-weight: bold;
    }
  }
`;
const Title = styled.h1`
  font-size:48px;
  margin: auto;
  text-align:center;
  padding:20px 0;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  display:block;
  text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Home = styled.div`
  
`
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface RouteState {
  state: {
    name: string;
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}
function Coin() {
  const { coinId } = useParams<{coinId:string}>();//우리의 url 에서 변수의 정보를 가져다 주는 기능
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],//query 1번  고유 키
    () => fetchCoinTickers(coinId!),// 2번 fetcher 함수
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;
    /*const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (
      async() => {
        const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        console.log(infoData)
        const priceData = await (
          await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        ).json();
        console.log(priceData)
        setInfo(infoData);
        setPriceInfo(priceData);
        setLoading(false);//이 자리에 setLoading false를 해줘야 무한 로딩이 사라짐
      }
    )()
  }, [coinId])//원래는 component 시작하고 한번만 실행되도록 하기위해 [] 공백으로 두지만 , hooks를 원할하게 활용하기 위해서는 [] 안에 hook안에 있는 dependency를 추가해줘야함*/
  return <Container>
    <Helmet>
      <title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </title>
    </Helmet>
    <Header>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </Title>
      <Link to={`/`}>
        <svg data-slot="icon" fill="none" stroke-width="3" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"></path>
        </svg>
      </Link>
    </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          
          <Outlet context={{ coinId }} />
        </>
      )}
  </Container>;
}
export default Coin;