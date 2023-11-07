
import axios from 'axios';
import './App.css';
import React, { useEffect, useMemo, useState } from "react";
import moment from 'moment';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || isCompleted) {
      return;
    }
    getCardsApi();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCardsApi();
  }, [])

  const getCardsApi = async () => {
    setIsLoading(true);
    let pageNum = cards.length === 0 ? page : page + 1;
    setPage(pageNum);
    let response = await axios.post(`http://localhost:3001/api/data`, { url: `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${pageNum}` }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response && response.data && response.data.nodes && response.data.nodes.length > 0) {
      setCards(oldcards => [...oldcards, ...response.data.nodes]);
    } else {
      setIsCompleted(true);
    }
    setIsLoading(false);
  }

  const memoisedCards = useMemo(() => {
    return (
      <>
        {cards && cards.map((item) => {
          return (
            <div className='card-item'>
              <img src={item.node.ImageStyle_thumbnail} />
              <div className='item-info'>
                <h3>{item.node.title}</h3>
                <span className='date'>{moment(item.node.last_update).format("MMM DD, yyyy hh:mm A")}</span>
              </div>
            </div>
          )
        })}
      </>
    )
  }, [cards]);

  return (
    <div className='card-wrapper'>
      {memoisedCards}
      {isLoading && <div>LOADING....</div>}

    </div>
  )
}

export default App;
