import express from "express";
import { config } from "dotenv";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";
import { Groq } from "groq-sdk";
import cors from "cors";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const groqcall = async (message) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Here are the possible actions:
        1: Send transaction
        2: Check balance
        3: Get transaction history
        4: Get account details
      
        Based on the user's message, return the details in this format action,address,amount (separated by commas) and that's it and no spaces between commas or anything. Do not include any other text. The message is: "${message}". and action should be a number from above and not text.`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  return chatCompletion.choices[0].message.content.trim();
};

const sendTransaction = async (amount, address, walletAddress) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  console.log("walletAddress", walletAddress);

  const sender = new PublicKey(walletAddress);
  console.log(`Sender: ${sender}`);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey(address),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await connection.sendTransaction(transaction, [sender]);
  await connection.confirmTransaction(signature);

  console.log(`Transaction confirmed with signature: ${signature}`);
};

const checkBalance = async (address) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const balance = await connection.getBalance(new PublicKey(address));
  console.log(`Balance for ${address}: ${balance / LAMPORTS_PER_SOL} SOL`);
  return balance / LAMPORTS_PER_SOL;
};

app.post("/api/groq", async (req, res) => {
  try {
    const { message, walletAddress } = req.body;
    console.log("User Message:", message);

    const details = await groqcall(message);
    console.log("Action Details:", details);

    const [actionNumber, address, amount] = details.split(",");

    switch (parseInt(actionNumber)) {
      case 1:
        await sendTransaction(parseFloat(amount), address, walletAddress);
        return res.status(200).json({ message: "Transaction sent" });
      case 2:
        const balance = await checkBalance(address);
        return res
          .status(200)
          .json({ message: `Balance checked: ${balance} SOL` });
      // Add more cases for other actions
      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
