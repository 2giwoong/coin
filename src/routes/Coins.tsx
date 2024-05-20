import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';


const Container = styled.div`
  padding: 20px;
  max-width: 480px;
  margin: auto;
`;
const Header = styled.h1`
  position: relative;
`;
const CoinsList = styled.ul`

`;
const Coin = styled.li`
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 5px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: all 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
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
const Img = styled.img`
  width:30px;
  height: 30px;
  margin-right: 10px;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
`
const Button = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
`
const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
]
interface Icoin {
  id: "string",
  name: "string",
  symbol: "string",
  rank: "number",
  is_new: boolean,
  is_active: boolean,
  type: "string",
}
function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleTheme = () => {
    setDarkAtom((prev) => !prev);
  };
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins)
  // const [coins, setCoins] = useState<Icoin[]>([]);
  // const [Loading, setLoading] = useState(true);
  // useEffect(()=> {
  //   (async ()=> {
  //     const respose = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await respose.json();
  //     setCoins(json.slice(0, 100))
  //     setLoading(false);
  //   })()
  // }, [])
  return <Container>
    <Helmet>
      <title>
        코인
      </title>
    </Helmet>
    <Header>
      <Title>코인</Title>
      <ButtonWrapper>
        <Button onClick={toggleTheme}>
          {isDark ? (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
              />
            </svg>
          ) : (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
            </svg>
          )}
        </Button>
      </ButtonWrapper>
    </Header>
    {
      isLoading ? 
      <Loader>Loading...</Loader> :
      <CoinsList>
        {data?.slice(0, 100).map(coin => 
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={coin}>
              <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} alt="" />{coin.name} &rarr;
            </Link>
          </Coin>
        )}
      </CoinsList> 
    }

  </Container>;
}
export default Coins;