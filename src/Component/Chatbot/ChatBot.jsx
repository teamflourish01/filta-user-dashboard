import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { PiWechatLogoFill } from "react-icons/pi";
import helloGif from "../../images/helloGif.gif"
import {
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { IoSend } from "react-icons/io5"; // Import Send icon
import logo from "../../images/filtablack.png"

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentStep, setCurrentStep] = useState(""); // Start with an empty step
  const [navigationStack, setNavigationStack] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // For paginated display
  const [userInput, setUserInput] = useState(""); // Input state for the first message
  const [hasUserGreeted, setHasUserGreeted] = useState(false); // To track if greeting is completed
  const [showHelloGif, setShowHelloGif] = useState(true); // To control GIF visibility
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const chatContainerRef = useRef(null);
  

  // Chat data
  const data = {
    main: {
      question: "How can I help you today?",
      options: ["Digital Business Card", "NFC Card", "Digital Review Card"],
    },
    "Digital Business Card": {
      question: "Please select a subcategory:",
      options: [
        "General Questions",
        "Technical Questions",
        "Design and Features",
        "Sharing and Accessibility",
        "Payment and Plans",
        "Troubleshooting",
      ],
    },
    "General Questions": {
      question: "Please select a question:",
      options: [
        "What is a digital business card?",
        "How do I create a digital business card on this platform?",
        "What are the benefits of using a digital business card?",
        "Other"
      ],
    },
    "Technical Questions": {
      question: "Please select a question:",
      options: [
        "How do I update my card details?",
        "Is my data secure on this platform?",
        "Does the platform support multiple languages?",
        "Other"
      ],
    },
    "Design and Features": {
      question: "Please select a question:",
      options: [
        "Can I customize the design of my digital business card?",
        "Does the platform support adding a company logo or personal photo?",
        "Can I add clickable links to my card?",
        "Other"
      ],
    },
    "Sharing and Accessibility": {
      question: "Please select a question:",
      options: [
        "How can I share my digital business card?",
        "Will my card work on all devices?",
        "Can I download my digital business card?",
        "Other"
      ],
    },
    "Payment and Plans": {
      question: "Please select a question:",
      options: [
        "Are there free and premium plans available?",
        "What payment methods are accepted for premium plans?",
        "Other"
      ],
    },
    "Troubleshooting": {
      question: "Please select a question:",
      options: [
        "I can’t log in to my account. What should I do?",
        "My QR code is not working. How can I fix this?",
        "I’m experiencing technical issues. Whom should I contact?",
        "Other"
      ],
    },
    "NFC Card": {
      question: "Please select a question:",
      options: [
        "What is NFC?",
        "How does an NFC card work?",
        "Can my phone read NFC cards?",
        "What data can I store on an NFC card?",
        "Is NFC data secure?",
        "Do NFC cards work with all smartphones?",
        "Can NFC cards be reused?",
        "What if my phone doesn’t have NFC?",
        "How durable are NFC cards?",
        "Do NFC cards need batteries?",
        "Other"
      ],
    },
    "Digital Review Card": {
      question: "Please select a question:",
      options: [
        "What is a digital review card?",
        "How can customers access their review card?",
        "Is customer feedback stored securely?",
        "What platforms support the review card?",
        "Does the review card require an app?",
        "Is the review card mobile-friendly?",
        "Is there a limit to how many reviews I can collect?",
        "How quickly can I set up my review card?",
        "What if a customer needs help using the review card?",
        "Other"
      ],
    },
  };
  
  const answers = {
    "What is a digital business card?":
      "A digital business card is an online version of a traditional business card that allows you to share your contact details, social media links, and other information electronically.",
    "How do I create a digital business card on this platform?":
      "You can create your card by signing up, customizing your profile, adding your details, and saving your design. It’s quick and user-friendly!",
    "What are the benefits of using a digital business card?":
      "It is eco-friendly, cost-effective, shareable via QR code or link, easily updatable, and provides advanced networking features.",
    "How do I update my card details?":
      "Log in to your account, go to the 'Edit Profile' section, update the details, and save your changes.",
    "Is my data secure on this platform?":
      "Yes, we use encryption and follow data security best practices to ensure your information remains safe.",
    "Does the platform support multiple languages?":
      "Currently, we support English. More languages will be added soon.",
    "Can I customize the design of my digital business card?":
      "Absolutely! Choose from a variety of templates, colors, and fonts to match your branding.",
    "Does the platform support adding a company logo or personal photo?":
      "Yes, you can upload your logo or photo to personalize your card.",
    "Can I add clickable links to my card?":
      "Yes, you can include links to your social media, portfolio, or website that are fully clickable.",
    "How can I share my digital business card?":
      "You can share it via QR code, email, text message, or a unique link.",
    "Will my card work on all devices?":
      "Yes, our cards are mobile-friendly and accessible on all modern devices and browsers.",
    "Can I download my digital business card?":
      "Yes.",
    "Are there free and premium plans available?":
      "Yes, we offer both free and premium plans. Premium plans come with advanced features.",
    "What payment methods are accepted for premium plans?":
      "We accept credit/debit cards and UPI.",
    "I can’t log in to my account. What should I do?":
      "Use the 'Forgot Password' option on the login page to reset your password. For further assistance, contact our support team.",
    "My QR code is not working. How can I fix this?":
      "Ensure the code is scanned under good lighting. If the issue persists, regenerate the QR code from your dashboard.",
    "I’m experiencing technical issues. Whom should I contact?":
      "You can reach out to our support team at Support@filta.in.",
    "What is NFC?":
      "NFC (Near Field Communication) is a wireless technology that enables data exchange between devices over short distances (up to 4 cm).",
    "How does an NFC card work?":
      "An NFC card stores data that can be read by a smartphone or NFC reader when brought close to it.",
    "Can my phone read NFC cards?":
      "Most modern smartphones with NFC functionality can read NFC cards. Check your device settings to enable NFC.",
    "What data can I store on an NFC card?":
      "NFC cards can store links, contact information, social media profiles, or any other small-sized data.",
    "Is NFC data secure?":
      "NFC is secure due to its short range. For extra protection, you can encrypt or password-protect your data.",
    "Do NFC cards work with all smartphones?":
      "NFC cards work with NFC-enabled smartphones, including most Android devices and iPhones.",
    "Can NFC cards be reused?":
      "Yes, many NFC cards are rewritable, allowing you to update the data multiple times.",
    "What if my phone doesn’t have NFC?":
      "You can still access the digital business card using a QR code or a shared link.",
    "How durable are NFC cards?":
      "NFC cards are highly durable, waterproof, and designed to last years under normal usage.",
    "Do NFC cards need batteries?":
      "No, NFC cards are passive and draw power from the device reading them.",
    "What is a digital review card?":
      "A digital review card allows customers to leave feedback or reviews online via a link, QR code, or NFC card.",
    "How can customers access their review card?":
      "Customers can access it via a QR code scan, an NFC tap, or a direct link.",
    "Is customer feedback stored securely?":
      "Yes, all feedback is encrypted and stored securely in our database.",
    "What platforms support the review card?":
      "Digital review cards work on all web browsers and devices, including Android, iOS, and desktop.",
    "Does the review card require an app?":
      "No, customers can access and submit reviews directly through a browser.",
    "Is the review card mobile-friendly?":
      "Absolutely, the review card is optimized for all mobile and desktop devices.",
    "Is there a limit to how many reviews I can collect?":
      "No, you can collect unlimited reviews with our platform.",
    "How quickly can I set up my review card?":
      "The setup takes just a few minutes, and you can start collecting reviews immediately.",
    "What if a customer needs help using the review card?":
      "Customers can use the help link on the card or contact your support team directly.",
  };
  

  const questionsPerPage = 11; // Show 3 questions per page

  // Automatically scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

    // Handle the first user input and "other" option
const handleUserInput = () => {
  if (userInput.trim() === "") return;

  const userMessage = { sender: "user", text: userInput };
  setMessages((prevMessages) => [...prevMessages, userMessage]);
  setUserInput(""); // Clear the input
  setIsTyping(true);

  setTimeout(() => {
    if (currentStep === "other") {
      const botMessage = { sender: "bot", text: "Your request is accepted, resolve in 48 hours." };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);
      setCurrentStep(""); // Reset current step to end the conversation
    } else {
      const botMessage = { sender: "bot", text: data.main.question };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentStep("main");
      setIsTyping(false);
      setHasUserGreeted(true); // Mark greeting as completed
    }
  }, 1000);
  // Hide the GIF once the user interacts
  setShowHelloGif(false);
};
  
    const handleOptionClick = (option) => {
      if (option === "Other") {
        // Ask the user to provide their custom input
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Please tell us more about your request:" },
        ]);
        setCurrentStep("other");
      } else {
        const userMessage = { sender: "user", text: option };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setSelectedOption(option);
    
        if (data[option]) {
          setIsTyping(true);
          setTimeout(() => {
            setNavigationStack((prevStack) => [...prevStack, currentStep]);
            setCurrentStep(option);
            setIsTyping(false);
            const botMessage = { sender: "bot", text: data[option].question };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          }, 1000);
        } else if (answers[option]) {
          setIsTyping(true);
          setTimeout(() => {
            const botMessage = { sender: "bot", text: answers[option] };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsTyping(false);
          }, 1500);
        }
      }
    };
  

  // Handle back navigation
  const goBack = () => {
    if (navigationStack.length > 0) {
      const previousStep = navigationStack[navigationStack.length - 1];
      setNavigationStack((prevStack) => prevStack.slice(0, -1));
      setCurrentStep(previousStep);
      const botMessage = { sender: "bot", text: data[previousStep].question };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const currentOptions = data[currentStep]?.options || [];
  const paginatedOptions = currentOptions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  return (
    <div>
      {/* Chatbot Icon */}

      <div className="chatbot-icon" onClick={toggleChat}>
        <PiWechatLogoFill style={{ width: "50px", height: "50px" }} />
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className={`chat-container ${isFullScreen ? "fullscreen" : ""}`}>
          <div className="chat-header">
            <span>Filta Chatbot</span>
            <div className="chat-header-actions">
              <button onClick={toggleFullScreen} className="header-button">
                {isFullScreen ? (
                  <AiOutlineFullscreenExit />
                ) : (
                  <AiOutlineFullscreen />
                )}
              </button>
              <button onClick={toggleChat} className="header-button">
                <AiOutlineClose />
              </button>
            </div>
          </div>

          <div className="messages" ref={chatContainerRef}>
            {/* Hello GIF animation */}
            {showHelloGif && (
              <div className="hello-gif">
                <img src={helloGif} alt="Hello typing..." />
              </div>
            )}

            {/* Loop through messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "message user" : "message bot"
                }
              >
                {message.sender === "bot" && (
                  <img src={logo} alt="User Avatar" className="user-avatar" />
                )}
                <span>{message.text}</span>
              </div>
            ))}

            {/* Typing animation */}
            {isTyping && (
              <div className="message bot typing">
                <TypingAnimation />
              </div>
            )}

            {/* Options block with radio buttons */}
            {hasUserGreeted && currentStep && data[currentStep] && (
              <div
                className="options"
                style={{ maxWidth: "85%", margin: "0 auto" }}
              >
                <form>
                  <div className="option-buttons">
                    {paginatedOptions.map((option, index) => (
                      <label key={index} className="option-label">
                        <input
                          type="radio"
                          name="options"
                          value={option}
                          checked={selectedOption === option} // Bind to selectedOption
                          onChange={() => handleOptionClick(option)} // Handle option click
                        />
                        <p
                          style={{
                            textAlign: "left",
                            padding: "0",
                            margin: "0",
                          }}
                        >
                          {option}
                        </p>
                      </label>
                    ))}
                  </div>
                </form>
                {/* Pagination */}
                <div className="pagination-buttons">
                  {currentPage > 0 && (
                    <button className="pagination-button" onClick={prevPage}>
                      Previous
                    </button>
                  )}
                  {(currentPage + 1) * questionsPerPage <
                    currentOptions.length && (
                    <button className="pagination-button" onClick={nextPage}>
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {currentStep === "other" && (
  <div className="input-container">
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleUserInput();
        }
      }}
      placeholder="Type your message..."
      className="user-input"
    />
    <button onClick={handleUserInput} className="send-button">
      <IoSend size={20} />
    </button>
  </div>
)}

          {/* Initial User Input */}
          {!hasUserGreeted && (
            <div className="input-container">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUserInput();
                  }
                }}
                placeholder="Type your message..."
                className="user-input"
              />
              <button onClick={handleUserInput} className="send-button">
                <IoSend size={20} />
              </button>
            </div>
          )}

          {/* Back Button */}
          {navigationStack.length > 0 && (
            <button className="back-button" onClick={goBack}>
              Back
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const TypingAnimation = () => {
  return (
    <div className="typing-animation">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default ChatBot;
