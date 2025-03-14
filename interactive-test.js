import OpenAI from 'openai';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to chat with the AI
async function chatWithAI(userInput) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: userInput }
      ],
    });

    console.log("\nAI Response:", completion.choices[0].message.content);
    console.log("\n-------------------");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Interactive chat loop
async function startChat() {
  console.log("Welcome to the OpenAI Chat! (Type 'exit' to quit)\n");
  
  const askQuestion = () => {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      await chatWithAI(input);
      askQuestion();
    });
  };

  askQuestion();
}

// Start the chat
startChat();

// Handle readline close
rl.on('close', () => {
  console.log('\nThank you for chatting! Goodbye!');
  process.exit(0);
});