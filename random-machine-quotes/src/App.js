import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [quotes, setQuotes] = useState('');
  const [backgroundcolors, setBackgroundolor] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  async function fetchAPI() {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      if (!response.ok) {
        throw new Error('FAILED: ' + response.status);
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuotes(data[randomIndex]);
    } catch (error) {
      console.error(`An error occurred url not complete: ${error.message}`);
    }
  }
  
  const hundleQuotes = (event) => {
    event.preventDefault();
    setShowOverlay(true);
    const randomC = ['blue', 'green', 'orange','red'];
    const randomNumber = Math.floor(Math.random() * randomC.length);
    setBackgroundolor(randomC[randomNumber]);
    const rootElement = document.getElementById("root");
    rootElement.style.backgroundColor = randomC[randomNumber];
   // Set timeout to hide overlay after 2 seconds
   setTimeout(() => {
    setShowOverlay(false);
    
    fetchNewQuote();
  }, 500);

  // Fetch new quote
  

  };
  const fetchNewQuote = async () => {
    await fetchAPI();
  };
  useEffect(() => {
     // Fetch initial quote on component mount
     fetchAPI();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        {showOverlay && (
        <div
          className="position-fixed w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}
        >
         
        </div>
      )}
      <div id="quote-box" className="text-center p-5 bg-blue" style={{ width: '600px', height: 'auto', backgroundColor: 'white',borderRadius:'5px'}}>
        <FontAwesomeIcon icon={faQuoteLeft} size="2x" id="icon-quote" style={{color:backgroundcolors}}/>
        <span id="text" style={{ fontSize: '30px', color: backgroundcolors }} className="m-2">{quotes.text}</span>
        <div id="quote-author" className='d-flex justify-content-end mt-4 mb-4'>
          <span style={{ fontSize: '20px', color:backgroundcolors }}>{`- ${quotes.author}`}</span>
        </div>
        <div className="d-flex justify-content-between">
          <a
            href="https://twitter.com/intent/tweet"
            id="tweet-quote"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          style={{backgroundColor:backgroundcolors}}>
        new list quotes
          </a>
          <button id="new-quote" className="btn btn-secondary " onClick={hundleQuotes} style={{backgroundColor:backgroundcolors}}>
            New Quotes
          </button>
        </div>
      </div>
      <div className='mt-3'style={{color:'white'}}>
        <span > by jundhel </span>
      </div>
    </div>
  );
}

export default App;
