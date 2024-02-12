import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";

// ABIs
import TokenMaster from "./abis/contracts/TokenMaster.sol/TokenMaster.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");

  const [tokenMaster, setTokenMaster] = useState(null);

  const loadWeb3 = async function loadWeb3() {
    // Initialize Web3Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set provider
    setProvider(provider);

    // Fetch the contract
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      TokenMaster.abi,
      provider // Pass provider here
    );

    contract.connect(provider.getSigner());

    const tokenMaster = new ethers.Contract(
      contract,
      TokenMaster.abi,
      provider
    );
    setTokenMaster(tokenMaster);

    //const contractWithSigner = contract.connect(provider.getSigner());
    const totalOccasions = await tokenMaster.totalOccasions();

    console.log({ totalOccasions });

    // Fetch the account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // Refresh the account
    window.ethereum.on("accountsChanged", (accounts) => {
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div>
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className="header__title">
          <strong>Event </strong>ticket
        </h2>
      </header>
    </div>
  );
}

export default App;
