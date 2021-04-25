import axios from 'axios';
import { memoize } from 'lodash';

export const { get, all, post, put, spread } = axios;

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/salazarguille/yearn-vaults-v2-subgraph-mainnet';

const VAULTS_QUERY = `
{
	vaults {
    id
    tags
    token { symbol }
    shareToken { symbol }
    strategies {
      id
      name
      vault {
        token { symbol }
        shareToken { symbol }
      }
      address
      debtLimit
      rateLimit
      performanceFeeBps
      reports(first: 5, orderBy: timestamp, orderDirection: desc) {
        id
        timestamp
        blockNumber
        gain
        loss
        totalGain
        totalLoss
        totalDebt
        debtLimit
        debtAdded
      }
    }
  }
}
`;

interface ServerResponse {
    data: ServerData;
}

interface ServerError {
  
}

interface ServerData {
    data: object;
    status: number;
    statusText: string;
    errors: ServerError[];
}
/*
config: {url: "https://api.thegraph.com/subgraphs/name/salazarguille/yearn-vaults-v2-subgraph-mainnet", method: "post", data: "{"query":"\n{\n\tvaults {\n    id\n    tags\n    t…it\n        debtAdded\n      }\n    }\n  }\n}\n"}", headers: {…}, transformRequest: Array(1), …}
data: {data: {…}}
headers: {content-type: "application/json"}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: ""
*/
const queryData = async (query: string) => {
    let payload: any = [];
    try {
        const response = await axios.post(`${SUBGRAPH_URL}`, { query });
        return response.data.data.vaults;
    } catch (error) {
        console.log('error');
    }
    console.log('payload--', payload.data);
    return payload.data;
};

const getVaultsData = async () => queryData(VAULTS_QUERY);

export const BuildQueryVaultsData = memoize(getVaultsData);
