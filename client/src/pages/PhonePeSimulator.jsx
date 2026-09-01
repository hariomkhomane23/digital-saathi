import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PhonePeSimulator() {
    const navigate = useNavigate();

    // ================= STATE =================

    const [screen, setScreen] = useState("home");
    const [balance, setBalance] = useState(10000);
    const [selectedContact, setSelectedContact] = useState(null);
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [message, setMessage] = useState("");
    const [lastTxnId, setLastTxnId] = useState(null);

    const [transactions, setTransactions] = useState([
        { id: 1, name: "Rahul", amount: 500, date: "Yesterday" },
        { id: 2, name: "Priya", amount: 250, date: "2 days ago" }
    ]);

    // ================= CONTACTS =================

    const contacts = [
        { id: 1, name: "Rahul", phone: "9876543210" },
        { id: 2, name: "Priya", phone: "9123456789" },
        { id: 3, name: "Amit", phone: "9988776655" }
    ];

    // ================= HELPER HANDLERS =================

    const resetFlowState = () => {
        setSelectedContact(null);
        setAmount("");
        setPin("");
        setMessage("");
    };

    const goHome = () => {
        resetFlowState();
        setScreen("home");
    };

    // ================= PIN HANDLERS =================

    const handlePinNumber = (number) => {
        if (pin.length < 4) {
            setPin((prevPin) => prevPin + number);
            setMessage("");
        }
    };

    const handlePinBackspace = () => {
        setPin((prevPin) => prevPin.slice(0, -1));
        setMessage("");
    };

    // ================= CONTACT =================

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        setAmount("");
        setMessage("");
        setScreen("amount");
    };

    // ================= AMOUNT =================

    const handleAmountContinue = () => {
        const numAmount = Number(amount);
        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            setMessage("Please enter a valid amount.");
            return;
        }

        if (numAmount > balance) {
            setMessage("Insufficient practice balance.");
            return;
        }

        setMessage("");
        setScreen("review");
    };

    // ================= REVIEW =================

    const handleReviewPayment = () => {
        setPin("");
        setMessage("");
        setScreen("pin");
    };

    // ================= PIN SUBMIT =================

    const handlePinSubmit = () => {
        if (pin.length !== 4) {
            setMessage("Please enter the 4-digit practice PIN.");
            return;
        }

        const payAmount = Number(amount);
        const txnId = `DS${Date.now()}`;

        // Deduct balance and update transaction history
        setBalance((prev) => prev - payAmount);
        setTransactions((prev) => [
            {
                id: Date.now(),
                name: selectedContact.name,
                amount: payAmount,
                date: "Just now"
            },
            ...prev
        ]);

        setLastTxnId(txnId);
        setMessage("");
        setScreen("success");
    };

    // ================= RENDER =================

    return (
        <div className="simulator-page">

            {/* HEADER */}
            <div className="simulator-header">
                <button
                    onClick={() => navigate("/learning/phonepe")}
                    className="simulator-back"
                >
                    ← Back
                </button>
                <div>
                    <h1>📱 PhonePe Practice</h1>
                    <p>Digital Saathi Simulator</p>
                </div>
            </div>

            {/* PHONE */}
            <div className="phone-wrapper">
                <div className="phone">

                    {/* STATUS BAR */}
                    <div className="phone-status">
                        <span>9:41</span>
                        <span>📶 🔋</span>
                    </div>

                    {/* HOME SCREEN */}
                    {screen === "home" && (
                        <div className="phone-screen">
                            <div className="app-header">
                                <div>
                                    <strong>PhonePe</strong>
                                    <p>Practice Mode</p>
                                </div>
                                <span>🔔</span>
                            </div>

                            <div className="balance-card">
                                <p>Practice Balance</p>
                                <h2>₹{balance.toLocaleString("en-IN")}</h2>
                                <small>This is virtual money</small>
                            </div>

                            <h3>Money Transfer</h3>
                            <div className="action-grid">
                                <button onClick={() => { setMessage(""); setScreen("contacts"); }}>
                                    <span>👤</span> Send Money
                                </button>
                                <button onClick={() => { setMessage(""); setScreen("qr"); }}>
                                    <span>▣</span> Scan & Pay
                                </button>
                            </div>

                            <h3>Other Services</h3>
                            <div className="action-grid">
                                <button onClick={() => { setMessage(""); setScreen("recharge"); }}>
                                    <span>📱</span> Recharge
                                </button>
                                <button onClick={() => { setMessage(""); setScreen("history"); }}>
                                    <span>📜</span> History
                                </button>
                            </div>

                            <div className="practice-warning">
                                ⚠️ Practice Mode<br />No real money is involved.
                            </div>
                        </div>
                    )}

                    {/* CONTACTS SCREEN */}
                    {screen === "contacts" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={goHome}>←</button>
                                <h2>Send Money</h2>
                            </div>
                            <p className="instruction">Select a person to continue.</p>

                            <div className="contact-list">
                                {contacts.map((contact) => (
                                    <button
                                        key={contact.id}
                                        className="contact"
                                        onClick={() => handleContactSelect(contact)}
                                    >
                                        <div className="avatar">{contact.name.charAt(0)}</div>
                                        <div>
                                            <strong>{contact.name}</strong>
                                            <small>{contact.phone}</small>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="safety-tip">
                                🛡️ Always verify the recipient's name and phone number before sending money.
                            </div>
                        </div>
                    )}

                    {/* AMOUNT SCREEN */}
                    {screen === "amount" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={() => { setMessage(""); setScreen("contacts"); }}>←</button>
                                <h2>Enter Amount</h2>
                            </div>

                            <div className="selected-person">
                                <div className="avatar">{selectedContact?.name.charAt(0)}</div>
                                <strong>{selectedContact?.name}</strong>
                                <small>{selectedContact?.phone}</small>
                            </div>

                            <div className="amount-box">
                                <span>₹</span>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="0"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        setMessage("");
                                    }}
                                />
                            </div>

                            {message && <p className="error-message">{message}</p>}

                            <button className="primary-button" onClick={handleAmountContinue}>
                                Continue
                            </button>

                            <div className="safety-tip">
                                🛡️ Check the amount carefully before continuing.
                            </div>
                        </div>
                    )}

                    {/* REVIEW SCREEN */}
                    {screen === "review" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={() => { setMessage(""); setScreen("amount"); }}>←</button>
                                <h2>Review Payment</h2>
                            </div>

                            <div className="payment-review">
                                <div className="avatar">{selectedContact?.name.charAt(0)}</div>
                                <h3>{selectedContact?.name}</h3>
                                <p>{selectedContact?.phone}</p>
                                <div className="review-amount">₹{amount}</div>
                            </div>

                            <div className="review-row">
                                <span>To</span>
                                <strong>{selectedContact?.name}</strong>
                            </div>

                            <div className="review-row">
                                <span>Amount</span>
                                <strong>₹{amount}</strong>
                            </div>

                            <div className="safety-warning">
                                ⚠️ Before paying
                                <ul>
                                    <li>Verify the recipient.</li>
                                    <li>Verify the amount.</li>
                                    <li>Never share your UPI PIN.</li>
                                </ul>
                            </div>

                            <button className="primary-button" onClick={handleReviewPayment}>
                                Confirm & Pay
                            </button>
                        </div>
                    )}

                    {/* PIN SCREEN */}
                    {screen === "pin" && (
                        <div className="phone-screen pin-screen">
                            <div className="screen-title">
                                <button onClick={() => { setPin(""); setMessage(""); setScreen("review"); }}>←</button>
                                <h2>Enter UPI PIN</h2>
                            </div>

                            <div className="pin-icon">🔐</div>
                            <h3>Authorize Payment</h3>
                            <p>Enter your 4-digit practice PIN</p>

                            <div className="pin-dots">
                                {[0, 1, 2, 3].map((index) => (
                                    <span
                                        key={index}
                                        className={index < pin.length ? "pin-dot filled" : "pin-dot"}
                                    >
                                        {index < pin.length ? "●" : "○"}
                                    </span>
                                ))}
                            </div>

                            {message && <p className="error-message">{message}</p>}

                            <div className="pin-keypad">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => handlePinNumber(String(number))}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button className="empty-key" disabled aria-hidden="true" />
                                <button onClick={() => handlePinNumber("0")}>0</button>
                                <button onClick={handlePinBackspace} aria-label="Delete PIN digit">⌫</button>
                            </div>

                            <div className="critical-warning">
                                <strong>🚨 Important Safety Tip</strong>
                                <p>Never share your UPI PIN with anyone.</p>
                                <p>Digital Saathi will never ask for your real UPI PIN.</p>
                            </div>

                            <button
                                className="primary-button"
                                onClick={handlePinSubmit}
                                disabled={pin.length !== 4}
                            >
                                Pay ₹{amount}
                            </button>
                        </div>
                    )}

                    {/* SUCCESS SCREEN */}
                    {screen === "success" && (
                        <div className="phone-screen success-screen">
                            <div className="success-icon">✓</div>
                            <h2>Payment Successful</h2>
                            <p>Your practice payment was completed.</p>
                            <div className="success-amount">₹{amount}</div>

                            <div className="transaction-card">
                                <p>Paid to</p>
                                <strong>{selectedContact?.name}</strong>
                                <small>{selectedContact?.phone}</small>
                                <hr />
                                <p>Transaction ID</p>
                                <strong>{lastTxnId}</strong>
                            </div>

                            <div className="success-tip">
                                🎉 Great job!
                                <p>You successfully completed a digital payment.</p>
                            </div>

                            <button className="primary-button" onClick={goHome}>
                                Back to Home
                            </button>
                        </div>
                    )}

                    {/* QR SCREEN */}
                    {screen === "qr" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={goHome}>←</button>
                                <h2>Scan & Pay</h2>
                            </div>
                            <div className="qr-simulator">
                                <div className="fake-qr">▦</div>
                                <h3>QR Scanner</h3>
                                <p>This is a simulated QR scanner for practice.</p>
                            </div>
                            <div className="safety-warning">
                                ⚠️ Safety Reminder
                                <p>Do not scan an unknown QR code just because someone asks you to.</p>
                            </div>
                        </div>
                    )}

                    {/* RECHARGE SCREEN */}
                    {screen === "recharge" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={goHome}>←</button>
                                <h2>Mobile Recharge</h2>
                            </div>
                            <div className="coming-soon">
                                📱
                                <h3>Recharge Practice</h3>
                                <p>This section will be added next.</p>
                            </div>
                        </div>
                    )}

                    {/* HISTORY SCREEN */}
                    {screen === "history" && (
                        <div className="phone-screen">
                            <div className="screen-title">
                                <button onClick={goHome}>←</button>
                                <h2>History</h2>
                            </div>
                            {transactions.map((txn) => (
                                <div className="history-item" key={txn.id}>
                                    <div>
                                        <strong>{txn.name}</strong>
                                        <small>{txn.date}</small>
                                    </div>
                                    <strong>- ₹{txn.amount}</strong>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* SIMULATOR INFO */}
            <div className="simulator-info">
                <h2>📚 Practice Mode</h2>
                <p>This simulator teaches you how a digital payment works without using real money.</p>
                <div className="info-points">
                    <span>✓ Safe practice environment</span>
                    <span>✓ No real transactions</span>
                    <span>✓ Learn UPI payment steps</span>
                    <span>✓ Learn important safety rules</span>
                </div>
            </div>
        </div>
    );
}

export default PhonePeSimulator;