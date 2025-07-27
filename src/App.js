import './App.css';
import ReactMarkdown from "react-markdown";
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'

import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'

import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';

import { sendMsgToOpenAI } from './openai.js';
import { useEffect, useRef, useState } from 'react';

function App() {

  const msgEnd = useRef(null);
  const [input,setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [messages,setMessages]=useState([
    {
      text: "Hi, I am ChatGpt, a state-of-the-art language model developed for making the life of the humans a little easy and fast",
      isBot:true,
    }
  ])

  const toggleSidebar = () => setShowSidebar(prev => !prev);


  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleSend = async()=>{
    const text=input;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res=await sendMsgToOpenAI(input);
    setMessages(
      [...messages,
        {text:text,isBot:false},
        {text:res,isBot:true},
      ]);
  }

  const handleEnter = async(e)=>{
    if(e.key === 'Enter')await handleSend();
  }

  const  handleQuery=async (e)=>{
    const text=e.target.value;
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res=await sendMsgToOpenAI(input);
    setMessages(
      [...messages,
        {text:text,isBot:false},
        {text:res,isBot:true},
      ]);
  }

  return (
    <div className="App">
      {window.innerWidth < 640  && !showSidebar&& (
        <div className="navbar">
          <button className="toggle-sidebar" onClick={toggleSidebar}>☰</button>
          
            <div className='navtop'>
              <img src={gptLogo} alt="Logo" className='logo' />
              <span className='brand'>ChatGPT</span>
            </div>
        </div>
      )}
      <div className={`sideBar ${showSidebar ? 'show' : ''}`}>  
        {window.innerWidth < 640 && (
          <button className="close-sidebar" onClick={toggleSidebar}>✖</button>
        )}
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt="Logo" className='logo' />
            <span className='brand'>ChatGPT</span>
          </div>
          <button onClick={()=>{window.location.reload()}} className='midBtn'><img src={addBtn} alt="Add Button" className='addBtn'/>New Chat</button>
          <div className='upperSideBottom'>
            <button onClick={handleQuery} className='query' value="What is Programming"><img src={msgIcon}  alt='Query'/>What is Programming</button>
            <button onClick={handleQuery} className='query' value="How to Use Api"><img src={msgIcon}  alt='Query'/>How to Use Api</button>
          </div>
        </div>


        <div className='lowerSide'>
          <div className='listItems'><img src={home} alt='Home' className='ListItemsImg' />Home</div>
          <div className='listItems'><img src={saved} alt='Saved' className='ListItemsImg' />Save</div>
          <div className='listItems'><img src={rocket} alt='Upgarde' className='ListItemsImg' />Upgrade to Pro</div>
        </div>
      </div>


      <div className='main'>
        <div className='chats'>
          {messages.map((message,index) =>
              <div key={index} className={message.isBot?"chat bot":"chat"}>
                <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt='userimage' />
                <p className='txt'><ReactMarkdown>{message.text}</ReactMarkdown></p>
              </div>
          )}
          <div ref={msgEnd}></div>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} type='text' name='' id='' value={input} placeholder='Enter the Query'/>
            <button className='send' onClick={handleSend}><img src={sendBtn} alt='send Button'/></button>
          </div>
          <p>ChatGPT may Produce inaccurate information about people, places, or facts, chatgpt August 20 version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
