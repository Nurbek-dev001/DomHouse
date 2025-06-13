# **DomHouse – Real Estate Marketplace**  

🚀 **DomHouse** is a modern real estate platform that allows users to browse, buy, rent, and sell properties in Kazakhstan. The platform features **AI-powered property search, virtual 3D tours, secure verification, and an admin dashboard** for managing listings.  

---

## **✨ Key Features**  

✅ **AI-Powered Search** – Find properties using natural language queries (e.g., "3-bedroom apartment under $200k").  
✅ **Virtual 3D Tours** – Explore properties in immersive 360° using Matterport.  
✅ **Two-Factor Authentication (2FA)** – Secure login via SMS/email verification.  
✅ **Admin Dashboard** – Approve, edit, or delete listings with ease.  
✅ **Interactive Map** – Heatmap of property prices across cities.  
✅ **Telegram Bot** – Get instant notifications for new listings.  
✅ **Mobile-Friendly** – Fully responsive design for all devices.  

---

## **🚀 Quick Start**  

### **1. Prerequisites**  
- Node.js (v16+)  
- MongoDB (for user data)  
- Twilio account (for SMS verification)  
- Gmail account (for email verification)  

### **2. Installation**  

#### **Backend Setup**  
```bash
# Clone the repo
git clone https://github.com/yourusername/DomHouse.git
cd DomHouse

# Install dependencies
npm install express body-parser twilio nodemailer crypto jsonwebtoken mongoose

# Start the server
node server.js
```

#### **Frontend Setup**  
Open `index.html` in a browser (no build step required).  

---

## **🔧 Configuration**  

### **1. Environment Variables**  
Create a `.env` file in the root directory:  
```env
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
GMAIL_USER=your@gmail.com
GMAIL_PASSWORD=your_app_password
JWT_SECRET=your_jwt_secret
```  

### **2. API Keys**  
- **Matterport (3D Tours)**: [Get API Key](https://matterport.com/)  
- **OpenAI (AI Search)**: [Get API Key](https://platform.openai.com/)  
- **Binance Pay (Crypto)**: [Register Here](https://merchant.binance.com/)  

---

## **📂 Project Structure**  

```
DomHouse/
├── css/                  # Stylesheets
│   ├── main.css          # Global styles
│   ├── auth.css          # Login/register forms
│   └── ...
├── js/                   # JavaScript
│   ├── auth.js           # Authentication logic
│   ├── property-utils.js # Property helpers
│   └── ...
├── server.js             # Backend (Node.js)
├── properties.json       # Sample property data
└── index.html            # Homepage
```

---

## **🔐 Authentication Flow**  

1. User enters email/phone.  
2. Server sends a **6-digit verification code** via SMS/email.  
3. User submits the code.  
4. If valid, they receive a **JWT token** for access.  

![Auth Diagram](https://i.imgur.com/xyz123.png)  

---

## **🌐 APIs Used**  

| Service       | Purpose                          | Docs                          |
|--------------|--------------------------------|-----------------------------|
| Twilio       | SMS verification                | [Twilio Docs](https://www.twilio.com/docs) |
| OpenAI       | AI property recommendations     | [OpenAI API](https://platform.openai.com/docs) |
| Matterport   | 3D property tours               | [Matterport SDK](https://matterport.com/developers/) |

---

## **🛠️ Future Improvements**  

- [ ] **Blockchain Integration** – Smart contracts for rentals.  
- [ ] **AR Interior Preview** – Visualize furniture in your home.  
- [ ] **Multi-language Support** – Kazakh, Russian, English.  

---

## **📜 License**  
MIT © 2023 DomHouse  

---

## **📧 Contact**  
For questions or support:  
📩 **Email**: support@domhouse.kz  
🌐 **Website**: [domhouse.kz](https://domhouse.kz)  

---

🚀 **Happy House Hunting!** 🏡
