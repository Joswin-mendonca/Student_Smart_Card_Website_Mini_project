import React, { useState } from 'react';
import axios from 'axios';

const Add_money = () => {
  const [roll, setRoll] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change for roll number
  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  // Handle transaction type change (Debit or Credit)
  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Fetch student balance based on roll number
  const fetchBalance = async () => {
    if (!roll) {
      setError('Please enter a roll number');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/get-balance/${roll}`);
      setBalance(response.data.balance);
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Error fetching balance');
      setBalance(null); // Clear balance if error occurs
    }
  };

  // Handle transaction (Credit/Debit)
  const handleTransaction = async () => {
    if (!transactionType || !amount || !roll) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const transactionData = {
        roll,
        transactionType,
        amount: parseFloat(amount),
      };

      const response = await axios.post('http://localhost:5000/add-money', transactionData);
      setBalance(response.data.newBalance);
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Error processing transaction');
    }
  };

  return (
    <div>
      <h2>Add Money to Student Account</h2>
      
      {/* Roll number input */}
      <div>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={handleRollChange}
        />
        <button onClick={fetchBalance}>Fetch Balance</button>
      </div>

      {/* Display error or balance */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {balance !== null && !error && <p>Current Balance: {balance}</p>}

      {/* Transaction Type (Debit or Credit) */}
      <div>
        <label>
          <input
            type="radio"
            value="credit"
            checked={transactionType === 'credit'}
            onChange={handleTransactionTypeChange}
          />
          Credit
        </label>
        <label>
          <input
            type="radio"
            value="debit"
            checked={transactionType === 'debit'}
            onChange={handleTransactionTypeChange}
          />
          Debit
        </label>
      </div>

      {/* Amount Input */}
      <div>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      {/* Transaction Button */}
      <div>
        <button onClick={handleTransaction}>Submit Transaction</button>
      </div>
    </div>
  );
};

export default Add_money;
