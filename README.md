🧩 **Blockchain Word Search Puzzle**

A fun and interactive web-based word search puzzle game with a blockchain theme. Players find hidden words related to blockchain technology, and their completion details are securely stored in a MongoDB Atlas database via a Vercel serverless API.

This project demonstrates a full-stack application setup, including a static frontend, a Node.js Express serverless backend, and a MongoDB Atlas database.

✨ **Features**

Interactive Word Search Game: A 12x12 grid with words hidden horizontally and vertically.

Blockchain-Themed Word List: Words like BLOCKCHAIN, NFT, CONTRACT, TOKEN, ETHEREUM, MINING, LEDGER, DEFI, HASH, NODE.

Multiple Puzzle Versions: Dynamically generated puzzles ensure a fresh challenge each time.

Progress Tracking: Found words are visually marked and crossed out in the list.

Submission Gate: Users can submit their details only after finding at least 5 words.

Secure Data Storage: Winner's name, email, number of words found, puzzle version, and timestamp are securely saved to MongoDB Atlas.

Serverless Backend: Utilizes Vercel for efficient and scalable API deployment.

Responsive Design: Basic styling ensures playability on various screen sizes.

🚀 **Technologies Used**

Frontend:

HTML5

CSS3

JavaScript (Vanilla JS)

Backend:

Node.js

Express.js (for API routing)

Mongoose (MongoDB ODM for Node.js)

cors (for Cross-Origin Resource Sharing)

dotenv (for local environment variable management)

Database:

MongoDB Atlas (Cloud-hosted NoSQL database)

Deployment:

Vercel (for deploying both the frontend and backend serverless function)

Git / GitHub (for version control and continuous deployment)

🛠️ **Setup and Installation**

This project consists of two main parts: the frontend (your wordsearch_puzzle.html file) and the backend (a Node.js Express application deployed as a Vercel Serverless Function).

1. MongoDB Atlas Setup
Create a MongoDB Atlas Account: If you don't have one, sign up for a free tier account at MongoDB Atlas.

Build a New Cluster: Follow the Atlas UI to create a new "Shared Cluster" (M0, free tier).

Create a Database User:

In your Atlas project, go to Security > Database Access.

Click "Add New Database User."

Choose "Password" authentication. Create a strong username and password and save them securely.

Grant "Read and write to any database" privileges.

Click "Add User."

Configure Network Access (IP Whitelist):

Go to Security > Network Access.

Click "ADD IP ADDRESS."

For development and Vercel deployment, select "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0). This is the easiest for getting started, but for production, consider more restrictive IP whitelisting or VPC Peering if your plan allows.

Click "Confirm."

Get Your Connection String:

Go to Database (left sidebar).

Click "Connect" on your cluster.

Choose "Connect your application."

Select "Node.js" and copy the connection string. It will look like:
mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority

Replace <username> and <password> with the credentials you created in step 3. This is your MONGO_URI.

2. Backend Setup (Node.js & Vercel)
Clone the Repository:

git clone <your-repo-url>
cd <your-repo-name>/wordsearch-backend # Assuming your backend is in a 'wordsearch-backend' folder

(If your backend is directly at the root, just cd <your-repo-name>)

Install Dependencies:

npm install

Create api Directory and submit-winner.js:

Ensure your backend code is structured correctly for Vercel Serverless Functions. Create an api directory at the root of your backend project.

Place the backend code (from the vercel_mongodb_backend immersive provided previously) into api/submit-winner.js.

Your backend project structure should look like this:

wordsearch-backend/
├── api/
│   └── submit-winner.js  # Your backend code
├── node_modules/
├── package.json
├── .env                  # For local testing (optional, not deployed to Vercel)
└── .gitignore

Deploy to Vercel:

Go to Vercel and sign up/log in.

Click "Add New Project."

Import your Git repository (the one containing your wordsearch-backend folder).

During configuration, Vercel will detect it's a Node.js project.

Set Environment Variables: This is critical!

In the deployment settings, go to "Environment Variables."

Add a new variable:

Name: MONGO_URI

Value: Paste your full MongoDB Atlas connection string (from step 1.5) here.

Click "Add."

Click "Deploy."

Vercel will provide you with a deployment URL (e.g., https://your-project-name.vercel.app). Your API endpoint will be this URL followed by /api/submit-winner.

Example: https://blockchain-puzzle.vercel.app/api/submit-winner

3. Frontend Setup (HTML)
Open wordsearch_puzzle.html: Locate the wordsearch_puzzle.html file in your project.

Update Vercel API Endpoint URL:

Inside the <script> tags, find the line:

const VERCEL_API_ENDPOINT_URL = 'YOUR_VERCEL_API_ENDPOINT_URL_HERE';

Replace 'YOUR_VERCEL_API_ENDPOINT_URL_HERE' with the actual Vercel API endpoint URL you obtained in step 2.4.

Example: const VERCEL_API_ENDPOINT_URL = 'https://blockchain-puzzle.vercel.app/api/submit-winner';

Save the HTML file.

▶️ **Usage**

Open the Frontend: Open the wordsearch_puzzle.html file directly in your web browser.

Play the Puzzle: Find the words listed below the grid. Click and drag your mouse over the letters to select a word. If it's correct, the cells will turn green.

Submit Details: Once you have found at least 5 words, the "Submit" button will become enabled. Enter your name and email, and click submit.

Verify Data: Log in to your MongoDB Atlas dashboard, navigate to your cluster, then to the winners collection within your database. You should see your submitted details there.

📂 **Project Structure**

.
├── wordsearch_puzzle.html  # Frontend HTML, CSS, and JavaScript for the game
└── wordsearch-backend/     # Backend Node.js project
    ├── api/
    │   └── submit-winner.js # Vercel Serverless Function (Express app)
    ├── node_modules/        # Node.js dependencies
    ├── package.json         # Backend project dependencies and scripts
    └── .gitignore


📄 **License**

This project is open-source and available under the MIT License.

🙏 **Acknowledgements**

MongoDB Atlas for cloud database hosting.

Vercel for seamless serverless deployment.

Node.js and Express.js for the backend.

Mongoose for MongoDB object modeling.
