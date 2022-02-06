import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";

const testFlow = async () => {
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["fDAI"],
  });
  await sf.initialize();
  const carol = sf.user({
    address: walletAddress[0],
    token: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
  });

  await carol.flow({
    recipient: "0xA8f3447922d786045CB582B0C825723B744a54df",
    flowRate: 385802469135802,
  });

  const details = await carol.details();
  console.log(details);
};

// testFlow();
