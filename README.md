# 🧠 BrainSnack

BrainSnack is an AI-powered full-stack web app that delivers personalized, bite-sized information via email based on user preferences. Built using **Next.js**, **Convex**, **ShadCN**, and integrated with **Resend** and **Google Gemini**, BrainSnack helps you stay informed—daily, and in your own style.

---

## ✨ Features

- 🔐 Authentication and email verification  
- 💌 Personalized daily emails based on preferences  
- 🎯 AI-generated content (fun, educational, question-based, or surprise)  
- 🌐 Multilingual support (choose the language of your emails)  
- 🧭 Beautiful onboarding experience  
- 👤 Profile page with full control over preferences and subscription  
- 🛠️ Built with Next.js, Convex backend, ShadCN UI, and Resend for emails  

---

## 🧪 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [ShadCN UI](https://ui.shadcn.com/)  
- **Backend/Database:** [Convex](https://www.convex.dev/)  
- **Emails:** [Resend](https://resend.com/)  
- **AI:** [Google Gemini API](https://ai.google.dev/)  
- **Auth & State:** Convex Auth + JWT  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/brainsnack.git
cd brainsnack
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Create a `.env` file

```env
# Required Environment Variables
JWT_PRIVATE_KEY=your_super_secret_jwt_private_key
RESEND_API_KEY=your_resend_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_key
```

> 💡 You can get the keys from:
>
> * [Resend Dashboard](https://resend.com/)
> * [Google AI Studio](https://makersuite.google.com/app)
> * JWT Key: Generate securely from your auth logic (Convex or other)

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🧩 Project Structure

```
/app            → Next.js App Directory
/components     → Shared UI components using ShadCN
/lib            → Utility functions (e.g. auth, validation)
/convex         → Backend logic & database queries
```

---

## 📬 Email Templates

All email content is generated dynamically via the Google AI API, styled, and sent using Resend. Users receive one email per day with information tailored to their preferences and style.



