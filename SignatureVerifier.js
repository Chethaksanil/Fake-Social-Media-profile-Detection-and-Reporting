import React, { useState } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./App.css";

const SignatureVerifier = () => {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const verifySignature = async () => {
    setResult(""); // reset result

    if (!message || !signature || !address) {
      setResult("⚠️ Please fill all fields before verifying.");
      return;
    }

    if (!window.ethereum) {
      setResult("⚠️ MetaMask not detected. Please install it to verify signatures.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const recoveredAddress = await web3.eth.personal.ecRecover(message, signature);

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        setResult("✅ Signature is valid and matches the address.");
      } else {
        setResult("❌ Signature is NOT valid or does not match the address.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setResult("❌ Error verifying signature. Make sure the inputs are correct.");
    }
  };

  return (
    <motion.div
      className="verifier-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="glow-heading"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🔐 Signature Verifier
      </motion.h2>

      <motion.div
        className="form-box box-right"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <textarea
          rows="3"
          placeholder="📩 Enter original message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <textarea
          rows="3"
          placeholder="✍️ Paste the signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
        <input
          type="text"
          placeholder="🔗 Wallet address to verify against"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <motion.button
          onClick={verifySignature}
          className="glow-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✅ Verify Signature
        </motion.button>

        {result && (
          <motion.div
            className="result glow-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: "15px", whiteSpace: "pre-line" }}
          >
            {result}
          </motion.div>
        )}

        <motion.button
          onClick={() => navigate("/")}
          className="wallet-btn"
          style={{ marginTop: "25px" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔙 Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SignatureVerifier;
