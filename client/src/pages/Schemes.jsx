import { useState } from "react";
import "./Schemes.css";

// Scheme Data Repository
const SCHEMES_DATA = [
    {
        id: "pmkvy",
        title: "Pradhan Mantri Kaushal Vikas Yojana",
        category: "Skill Development",
        icon: "💼",
        minAge: 15,
        maxAge: 45,
        occupations: ["Student", "Unemployed", "Other"],
        maxIncome: "above10", // Open to all income levels
        description: "Free industry-relevant skill training to help secure better livelihood opportunities.",
        suitableFor: "Students and Job Seekers",
        documents: ["Aadhaar Card", "Bank Account Details", "Education Certificate"],
        benefits: "Free training, government certification, and placement assistance.",
        howToApply: "Register on the official Skill India Portal or visit the nearest PMKVY training center."
    },
    {
        id: "pmkisan",
        title: "PM-KISAN Samman Nidhi",
        category: "Agriculture",
        icon: "🌾",
        minAge: 18,
        maxAge: 100,
        occupations: ["Farmer"],
        maxIncome: "5to10",
        description: "Direct income support of ₹6,000 per year for landholding farmer families across the country.",
        suitableFor: "Landholding Farmers",
        documents: ["Aadhaar Card", "Landholding Ownership Papers", "Bank Passbook"],
        benefits: "₹6,000 annually paid in three equal installments directly to bank accounts.",
        howToApply: "Apply online at pmkisan.gov.in or visit a local Common Service Centre (CSC)."
    },
    {
        id: "nsp",
        title: "National Scholarship Portal Schemes",
        category: "Education",
        icon: "🎓",
        minAge: 5,
        maxAge: 30,
        occupations: ["Student"],
        maxIncome: "3to5",
        description: "Financial assistance and scholarships for pre-matric and post-matric students.",
        suitableFor: "Students enrolled in recognized schools/colleges",
        documents: ["Aadhaar Card", "Income Certificate", "Mark Sheet", "Bank Passbook"],
        benefits: "Direct tuition fee waiver and monthly stipend sent to the student's bank account.",
        howToApply: "Create an account on scholarship.gov.in and submit academic verification documents."
    },
    {
        id: "pmyuay",
        title: "PM Mudra Yojana",
        category: "Business & Entrepreneurship",
        icon: "🏢",
        minAge: 18,
        maxAge: 65,
        occupations: ["Business", "Farmer", "Employee", "Unemployed", "Other"],
        maxIncome: "above10",
        description: "Collateral-free loans up to ₹10 Lakhs for setting up or expanding small businesses.",
        suitableFor: "Small business owners and aspiring entrepreneurs",
        documents: ["Aadhaar Card", "PAN Card", "Business Plan / Proposal", "Bank Statements"],
        benefits: "Easy loan approvals without security collateral at competitive interest rates.",
        howToApply: "Visit any commercial bank, regional rural bank, or apply through the Udyami Mitra portal."
    },
    {
        id: "vayo-shreshtha",
        title: "Indira Gandhi National Old Age Pension",
        category: "Senior Citizen Support",
        icon: "👵",
        minAge: 60,
        maxAge: 120,
        occupations: ["Senior Citizen", "Homemaker", "Unemployed", "Other"],
        maxIncome: "1to3",
        description: "Monthly pension support for senior citizens belonging to low-income households.",
        suitableFor: "Senior Citizens (Age 60+)",
        documents: ["Aadhaar Card", "Age Proof Certificate", "BPL Ration Card / Income Certificate"],
        benefits: "Monthly financial pension assistance credited directly to bank accounts.",
        howToApply: "Submit an application form to the local Block Development Office (BDO) or District Social Welfare Office."
    }
];

// Income ordering map for filtering eligibility
const INCOME_RANKS = {
    below1: 1,
    "1to3": 2,
    "3to5": 3,
    "5to10": 4,
    above10: 5
};

function Schemes() {
    const [formData, setFormData] = useState({
        age: "",
        state: "",
        occupation: "",
        income: "",
        education: ""
    });

    const [filteredSchemes, setFilteredSchemes] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAge = parseInt(formData.age, 10);
        const userIncomeRank = INCOME_RANKS[formData.income] || 5;

        // Dynamic filtering based on user input
        const matchingSchemes = SCHEMES_DATA.filter((scheme) => {
            const ageMatches = userAge >= scheme.minAge && userAge <= scheme.maxAge;
            const occupationMatches = scheme.occupations.includes(formData.occupation) || scheme.occupations.includes("Other");
            const incomeMatches = userIncomeRank <= (INCOME_RANKS[scheme.maxIncome] || 5);

            return ageMatches && occupationMatches && incomeMatches;
        });

        setFilteredSchemes(matchingSchemes);
        setShowResults(true);
    };

    const handleReset = () => {
        setFormData({
            age: "",
            state: "",
            occupation: "",
            income: "",
            education: ""
        });
        setFilteredSchemes([]);
        setShowResults(false);
    };

    return (
        <div className="schemes-page">
            <div className="schemes-header">
                <h1>🏛️ Government Schemes Finder</h1>
                <p>Find tailored government schemes based on your profile.</p>
            </div>

            <div className="scheme-finder-card">
                <h2>Tell us about yourself</h2>
                <p className="subtitle">
                    We will suggest relevant schemes based on your information.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                min="1"
                                max="110"
                                placeholder="Enter your age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>State</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Occupation</label>
                            <select
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Occupation</option>
                                <option value="Student">Student</option>
                                <option value="Farmer">Farmer</option>
                                <option value="Employee">Employee</option>
                                <option value="Business">Business / Self Employed</option>
                                <option value="Homemaker">Homemaker</option>
                                <option value="Senior Citizen">Senior Citizen</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Annual Family Income</label>
                            <select
                                name="income"
                                value={formData.income}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Income</option>
                                <option value="below1">Below ₹1 Lakh</option>
                                <option value="1to3">₹1 Lakh – ₹3 Lakhs</option>
                                <option value="3to5">₹3 Lakhs – ₹5 Lakhs</option>
                                <option value="5to10">₹5 Lakhs – ₹10 Lakhs</option>
                                <option value="above10">Above ₹10 Lakhs</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Education</label>
                            <select
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Education</option>
                                <option value="School">School</option>
                                <option value="12th">12th Pass</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="find-btn">
                            🔍 Find Suitable Schemes
                        </button>
                        {showResults && (
                            <button type="button" className="reset-btn" onClick={handleReset}>
                                🔄 Reset Criteria
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {showResults && (
                <div className="results-section">
                    <h2>✨ Recommended Schemes ({filteredSchemes.length})</h2>
                    <p className="result-info">
                        Matching schemes based on Age: <strong>{formData.age}</strong>, Occupation:{" "}
                        <strong>{formData.occupation}</strong>, State: <strong>{formData.state}</strong>.
                    </p>

                    {filteredSchemes.length === 0 ? (
                        <div className="no-schemes-card">
                            <p>🔍 No specific schemes directly matched all exact filters.</p>
                            <small>Try lowering the income bracket or adjusting the occupation criteria to see general state assistance schemes.</small>
                        </div>
                    ) : (
                        <div className="scheme-grid">
                            {filteredSchemes.map((scheme) => (
                                <div key={scheme.id} className="scheme-card">
                                    <div className="scheme-icon">{scheme.icon}</div>
                                    <h3>{scheme.title}</h3>
                                    <p>{scheme.description}</p>

                                    <div className="scheme-details">
                                        <p>
                                            <strong>👤 Suitable for:</strong> {scheme.suitableFor}
                                        </p>
                                        <p>
                                            <strong>📄 Key Documents:</strong> {scheme.documents.join(", ")}
                                        </p>
                                    </div>

                                    <button
                                        className="details-btn"
                                        onClick={() => setSelectedScheme(scheme)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* DETAIL MODAL */}
            {selectedScheme && (
                <div className="modal-overlay" onClick={() => setSelectedScheme(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{selectedScheme.icon} {selectedScheme.title}</h2>
                            <button className="close-btn" onClick={() => setSelectedScheme(null)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <span className="category-badge">{selectedScheme.category}</span>
                            <p><strong>Description:</strong> {selectedScheme.description}</p>
                            <p><strong>🎁 Key Benefits:</strong> {selectedScheme.benefits}</p>
                            <p><strong>📋 Eligibility:</strong> {selectedScheme.suitableFor}</p>
                            <p><strong>📄 Documents Required:</strong></p>
                            <ul>
                                {selectedScheme.documents.map((doc, idx) => (
                                    <li key={idx}>{doc}</li>
                                ))}
                            </ul>
                            <p><strong>📝 How to Apply:</strong> {selectedScheme.howToApply}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="primary-btn" onClick={() => setSelectedScheme(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Schemes;