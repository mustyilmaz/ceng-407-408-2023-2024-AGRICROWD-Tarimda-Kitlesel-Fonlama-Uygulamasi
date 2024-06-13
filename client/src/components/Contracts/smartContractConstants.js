export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ethUsdPriceFeedAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "investee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "projectName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fundingGoalUSD",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fundingGoalETH",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardPercentage",
        "type": "uint256"
      }
    ],
    "name": "ProjectCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "invesotr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ProjectDonated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "investor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ProjectFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "funder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "reward",
        "type": "uint256"
      }
    ],
    "name": "RewardSent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "PLATFORM_COMMISSION_PERCENT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_projectName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_fundingGoalETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_rewardPercentage",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "investeeAddress",
        "type": "address"
      }
    ],
    "name": "createProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "donateAfterFunded",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "donateProject",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ethUsdPriceDecimal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "fundProject",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "getDonatorsAndDonations",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "getFundersAndFunds",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "investee",
        "type": "address"
      }
    ],
    "name": "getInvesteeProjects",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "investor",
        "type": "address"
      }
    ],
    "name": "getInvestmentsByAddress",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlatformOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPriceFeed",
    "outputs": [
      {
        "internalType": "contract AggregatorV3Interface",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "getProjectDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "investee",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoalUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoalETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountDonatedUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountDonatedETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedToDisplayETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedToDisplayUSD",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "funders",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "donors",
        "type": "address[]"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "getProjectStatus",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalCommissionAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "investor",
        "type": "address"
      }
    ],
    "name": "getTotalRewardsByAddress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "investeeProjects",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numProjects",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "objectIdToProjectId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projects",
    "outputs": [
      {
        "internalType": "address",
        "name": "investee",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "projectName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoalUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoalETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountDonatedUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountDonatedETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedToDisplayETH",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountFundedToDisplayUSD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardPercentage",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "sendReward",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCommission",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "totalRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawCommissionFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "mongoDbObjectId",
        "type": "string"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];