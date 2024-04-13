import { createContext } from "react";
import { SetStateFunction } from "../types";

interface TokensContextInterface {
  accessToken: string,
  refreshToken: string,
  setAccessToken: SetStateFunction,
  setRefreshToken: SetStateFunction
}

const TokenContext = createContext<TokensContextInterface>({
  accessToken: "",
  refreshToken: "",
  setAccessToken: () => {},
  setRefreshToken: () => {}
});
export default TokenContext