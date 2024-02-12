import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>tokenmaster</h1>
        <input
          className="nav__search"
          type="text"
          placeholder="Find millions of"
        />

        <ul className="nav__links">
          <li>
            <a href="/">Concerts</a>
          </li>
          <li>
            <a href="/">Sports</a>
          </li>
          <li>
            <a href="/">Theater</a>
          </li>
          <li>
            <a href="/">More</a>
          </li>
        </ul>
      </div>
      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navigation;
