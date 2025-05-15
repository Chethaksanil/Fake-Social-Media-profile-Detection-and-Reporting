import React, { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    num_followers: "",
    num_following: "",
    num_posts: "",
    engagement_rate: "",
    account_age_days: "",
    profile_picture: "",
    bio_complete: "",
  });

  const [prediction, setPrediction] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0].toLowerCase());
      } catch (err) {
        console.error("Wallet connection failed", err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      const predictionResult = response.data.prediction;
      setPrediction(predictionResult);

      if (window.ethereum && walletAddress) {
        const web3 = new Web3(window.ethereum);
        const message = `Prediction result: ${predictionResult}`;
        const hexMessage = web3.utils.utf8ToHex(message);

        await window.ethereum.request({
          method: "personal_sign",
          params: [hexMessage, walletAddress, ''],
        });

        console.log("✅ Prediction signed on blockchain.");
      }
    } catch (error) {
      console.error("Prediction Error:", error);
      setPrediction("Error during prediction");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="glow-heading"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        👻 Ghost Block - Fake Account Detector
      </motion.h1>

      <motion.button
        onClick={connectWallet}
        className="wallet-btn glow-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {walletAddress ? `Connected: ${walletAddress}` : "Connect MetaMask"}
      </motion.button>

      <div className="container">
        <motion.div
          className="box box-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>📌 How It Works</h2>
          <p>
            Ghost Block uses a trained machine learning model to detect whether an Instagram
            account is real or fake. It evaluates user data like followers, posts,
            engagement rate, bio completeness, and more.
          </p>
          <h2>📊 About the Project</h2>
          <p>
            Our tool helps users and businesses spot suspicious or bot accounts
            by analyzing social media behavior using intelligent algorithms and
            real-time predictions.
          </p>
        </motion.div>

        <motion.div
          className="box box-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit}>
            <input type="number" name="num_followers" placeholder="Number of Followers" value={formData.num_followers} onChange={handleChange} required />
            <input type="number" name="num_following" placeholder="Number of Following" value={formData.num_following} onChange={handleChange} required />
            <input type="number" name="num_posts" placeholder="Number of Posts" value={formData.num_posts} onChange={handleChange} required />
            <input type="number" name="engagement_rate" placeholder="Engagement Rate" value={formData.engagement_rate} onChange={handleChange} required />
            <input type="number" name="account_age_days" placeholder="Account Age (in days)" value={formData.account_age_days} onChange={handleChange} required />
            <select name="profile_picture" value={formData.profile_picture} onChange={handleChange} required>
              <option value="">Has Profile Picture?</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <select name="bio_complete" value={formData.bio_complete} onChange={handleChange} required>
              <option value="">Has Complete Bio?</option>.
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>

            <motion.button
              type="submit"
              className="glow-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Predict
            </motion.button>
          </form>

          {prediction && (
            <motion.div
              className="result glow-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Result: {prediction}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="teammates"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3>👥 Team Ghost Block</h3>
        <p>Sai Rakshith L | Chethak Sanil | Aishwarya R</p>
        <p>Follow us on Instagram! (link will be added soon)</p>
      </motion.div>
    </motion.div>
  );
}

export default App;
