import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "../../../../Contracts/ethers-5.7.esm.min.js";
import {
  abi,
  contractAddress,
} from "../../../../Contracts/smartContractConstants.js";
import styles from "./DashboardforActiveProject.module.css";

function DashboardforActiveProject() {
  const [project, setProject] = useState(null);
  const [funders, setFunders] = useState([]);
  const [funds, setFunds] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);
  const { projectNameandID } = useParams();
  const [encodedProjectName, projectId] = projectNameandID.split("-pid-");
  const [errorMessage, setErrorMessage] = useState("");
  const [amountFundedETH, setAmountFundedETH] = useState(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isSendingReward, setIsSendingReward] = useState(false);

  const navigate = useNavigate();
  const handleInvalidUrl = useCallback(() => {
    const projectNameInUrl = project.basicInfo.projectName
      .replace(/\s+/g, "-")
      .toLowerCase();
    const correctedUrl = `/user/my-projects/${projectNameInUrl}-pid-${project._id}/dashboard`;
    navigate(correctedUrl);
  }, [project, navigate]);

  useEffect(() => {
    if (project && project.basicInfo.projectName !== encodedProjectName) {
      handleInvalidUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    const fetchProject = async () => {
      try {
        const projectResponse = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/api/projects/fetch-single-project`,
          { projectId },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (projectResponse.data.success) {
          setProject(projectResponse.data.project);
        } else {
          setErrorMessage(projectResponse.data.message);
        }
      } catch (error) {
        if (error.response.status === 403) {
          alert("You do not have permission to access this project");
          navigate("/user/my-projects");
        } else {
          console.error("Error while loading project:", error);
          setErrorMessage("Error while loading project");
        }
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  useEffect(() => {
    const fetchAmountFunded = async () => {
      if (!project) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const projectDetails = await contract.getProjectDetails(projectId);
        setAmountFundedETH(ethers.utils.formatEther(projectDetails[7]));
      } catch (error) {
        console.error("Error fetching amount funded:", error);
      }
    };

    fetchAmountFunded();
  }, [project, projectId]);

  useEffect(() => {
    const fetchFundersAndFunds = async () => {
      if (!project) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const projectDetails = await contract.getFundersAndFunds(projectId);

        const fundersArray = projectDetails[0];
        const fundsArray = projectDetails[1].map((fund) =>
          ethers.utils.formatEther(fund)
        );

        setFunders(fundersArray);
        setFunds(fundsArray);
      } catch (error) {
        console.error("Error fetching funders and funds:", error);
      }
    };

    fetchFundersAndFunds();
  }, [project, projectId]);

  useEffect(() => {
    const fetchDonorsAndDonations = async () => {
      if (!project) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const projectDetails = await contract.getDonatorsAndDonations(
          projectId
        );

        const donorsArray = projectDetails[0];
        const donationsArray = projectDetails[1].map((donation) =>
          ethers.utils.formatEther(donation)
        );

        setDonors(donorsArray);
        setDonations(donationsArray);
      } catch (error) {
        console.error("Error fetching donors and donations:", error);
      }
    };

    fetchDonorsAndDonations();
  }, [project, projectId]);

  const handleWithdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      setIsWithdrawing(true);
      const transactionResponse = await contract.withdrawFunds(projectId);
      await listenForTransactionMine(transactionResponse, provider);
      alert("Successfully withdrew funds!");
      setIsWithdrawing(false);
    } catch (error) {
      console.error("Error withdrawing funds:", error);
      alert("An error occurred while withdrawing funds.");
      setIsWithdrawing(false);
    }
  };

  const handleSendReward = async () => {
    try {
      setIsSendingReward(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Calculate the total reward amount
      const rewardPercentage = project.basicInfo.rewardPercentage;
      const totalRewardAmount = funds.reduce((total, fund) => {
        const fundAmount = ethers.utils.parseEther(fund);
        const rewardAmount = fundAmount.mul(rewardPercentage).div(100);
        return total.add(fundAmount).add(rewardAmount);
      }, ethers.BigNumber.from(0));

      await contract.sendReward(projectId, {
        value: totalRewardAmount,
      });
      setIsSendingReward(false);
      alert("Reward sent successfully!");
    } catch (error) {
      console.error("Error sending reward:", error);
      setIsSendingReward(false);
      alert("An error occurred while sending the reward.");
    }
  };

  const listenForTransactionMine = async (transactionResponse, provider) => {
    try {
      const receipt = await transactionResponse.wait();

      if (receipt.status === 1) {
        console.log("Transaction successful!");
      } else {
        console.error("Transaction failed!");
      }
    } catch (error) {
      console.error("Error during transaction mining:", error);
    }
  };

  const isTargetReached = () => {
    return (
      parseFloat(amountFundedETH) >= parseFloat(project.basicInfo.targetAmount)
    );
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{project.basicInfo.projectName} Dashboard</h1>

      <div>
        <p className={styles.amountTitle} style={{ marginBottom: "0.5rem" }}>
          Target Amount: {project.basicInfo.targetAmount} ETH
        </p>
        <p className={styles.amountTitle}>
          Amount Funded: {amountFundedETH} ETH
        </p>
      </div>

      <div>
        <h2>Funders and Funds</h2>
        <ul>
          {funders.map((funder, index) => (
            <li key={index}>
              Address: {funder}, Amount Funded: {funds[index]} ETH
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Donors and Donations</h2>
        <ul>
          {donors.map((donor, index) => (
            <li key={index}>
              Address: {donor}, Amount Donated: {donations[index]} ETH
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.btnsContainer}>
        <button
          onClick={handleWithdraw}
          className={styles.button}
          disabled={!isTargetReached() || isWithdrawing}
        >
          {isWithdrawing ? "Withdrawing..." : "Withdraw Funds"}
        </button>

        <button
          onClick={handleSendReward}
          className={styles.button}
          disabled={isSendingReward}
        >
          {isSendingReward ? "Sending Reward..." : "Send Reward"}
        </button>
      </div>
    </div>
  );
}

export default DashboardforActiveProject;
