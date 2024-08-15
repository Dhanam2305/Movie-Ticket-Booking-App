import React, { useState } from 'react'


let SCREENS = [
    {
        id: 1,
        time: "10.00am",
         seats: Array(20).fill(1),
    },
    {
        id: 2,
        time: "2.00pm",
         seats: Array(20).fill(1),
    },
    {
        id: 3,
        time: "6.00pm",
         seats: Array(20).fill(1),
    },
];

const MOVIES = [
    {
        id: 1,
        title: "Thunivu 2023",
        image: "https://upload.wikimedia.org/wikipedia/en/6/65/Thunivu_poster.jpg?20230111024028",
    },
    {
        id: 2,
        title: "Varisu 2023",
        image: "https://upload.wikimedia.org/wikipedia/en/a/af/Varisu_poster.jpg",
    },
    {
        id: 3,
        title: "Indian2 2024",
        image:"https://upload.wikimedia.org/wikipedia/en/6/6f/Indian_2_poster.jpg",
    },
    {
        id: 4,
        title: "Raayan 2024",
        image: "https://assetscdn1.paytm.com/images/cinema/Rayan6-ff6d1950-d603-11ee-a9f8-af6625610d3c.jpg",
    },
    {
        id: 5,
        title: "Doctor 2023",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0f/Doctor_%28soundtrack%29.jpeg",
    },
    {
        id: 6,
        title: "Don 2023",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4M6cEZ24e-O6RyN4seyq-MdJtoY-vZxLM7qf000Mz42MQPg7Pi0Bd5zWGXPaHVjn705s&usqp=CAU",
    },
    {
        id: 7,
        title: "Viduthalai 2023",
        image: "https://upload.wikimedia.org/wikipedia/en/1/1b/Viduthalai_Part_2.jpg",
    },
    {
        id: 8,
        title: "Ghilli2 2024",
        image: "https://preview.redd.it/ghilli-re-release-v0-psbllbtd4rkc1.jpeg?auto=webp&s=a495094d024eeacc6f1245054cbe7015eed5f7c2",
    },
    {
        id: 9,
        title: "Annathe 2023",
        image: "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/226095/annaatthe-posterart.jpg",
    },
    {
        id: 10,
        title: "Karudan 2024",
        image: "https://upload.wikimedia.org/wikipedia/en/8/8b/Garudan_2024_poster.jpg",
    },
    {
        id: 11,
        title: "Maharaja 2024",
        image: "https://m.media-amazon.com/images/M/MV5BNWJmMmUwZjAtYTM1Ni00ZDY3LWE0ZGItOWQ1ZTYxMTlkZDc1XkEyXkFqcGc@._V1_.jpg",
    },
    {
        id: 12,
        title: "Aranmanai 2024",
        image: "https://upload.wikimedia.org/wikipedia/en/c/cf/Aranmanai_4.jpg",
    },
    {
        id: 13,
        title: "Star 2024",
        image:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Weapon_film_poster.jpg/220px-Weapon_film_poster.jpg"
    },

    
    
];


  


export default function MovieBooking() {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect = (index, screen) => {
        if(screen?.id !== selectedScreen?.id){
            setSelectedSeats([index]);
            setSelectedScreen(screen)
            return
        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i) => i !== index));
            if(selectedSeats.filter((i) => i !== index).length < 1){
                setSelectedScreen(null)
            }
        }
        else {
           setSelectedSeats((seats) => [...seats, index])
        }
    }

    

    const handleBooking = () => {
        alert(`Seats ${selectedSeats.map((index) => index+1).join(",")}  booked for ${selectedScreen.movie.title} at ${selectedScreen.time}`)
        SCREENS = SCREENS.map(screen => {
            if(screen.id === selectedScreen?.id){
                let seats = screen.seats;
                selectedSeats.map((seat) => (seats[seat] = 0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen
        })
        setSelectedMovie(null)
        setSelectedScreen(null)
        setSelectedSeats([])
    }


  return (
    <div>
        <h1>Movie Online Ticket Booking App</h1>
        <h2>Choose your Movie:</h2>
        <div className='movie-selection'>
            {
                MOVIES.map((movie) => (
                    <div className='movie' key={movie.id} onClick={() => setSelectedMovie(movie)}>
                        <img className='movie-poster' src={movie.image} alt={movie.title} />
                        <div className='movie-title'>{movie.title}</div>
                        </div>
                ))
            }
        </div>
      {
        selectedMovie && (
            <>
            <h2>Choose your Screen</h2>
            <div className='screen-selection'>
                { 
                    SCREENS.map((screen) => {
                        return (
                            <div
                            key={screen.id}
                            className={`screen ${
                                screen?.id === selectedScreen?.id ? "selected" : ""
                            } ${screen.seats.includes(1) ? "available" : ""} `}>
                              <div className='screen-number'>Screen {screen.id}</div>
                               <div className='screen-time'>{screen.time}</div>
                               <div className='movie-title'>{selectedMovie.title}</div>
                               <div className='screen-seats'> 
                                {screen.seats.map((seat, index) => {
                                        return (
                                            <div 
                                            key={index} 
                                            className={`seat ${
                                                seat ? "available": 'unavailable'
                                            } ${selectedSeats.includes(index) && selectedScreen?.id === screen.id ? 'selected' : '' }
                                            ${selectedSeats.includes(index) ? "booked" : ''}
                                            `}
                                            onClick={() => {
                                              if(seat){
                                                handleSeatSelect(index, {
                                                    ...screen,
                                                    movie: selectedMovie
                                                })
                                              }
                                            }}  
                                            >
                                                <div className='seat-number'>{index + 1}</div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                
                        );
                    })}
            </div>
            </>
        )}
<div className="booking-summary">
    <div className="selected-screen">
     {
        selectedScreen  && (
            <div>
                <h3>Selected Screen: {selectedScreen.id}</h3>
                <p>Time: {selectedScreen.time}</p>
                <p>Movie: {selectedScreen.movie.title}</p>
            </div>
        )
     }
    </div>
    <div className='selected-seat'>
        {
            selectedScreen && selectedSeats?.length > 0 && (
                <div>
                    <h3>Selected Seats: <>{selectedSeats.map(index => index+1).join(",")}</></h3>
                    <h3>No of tickets: {selectedSeats?.length}</h3>
                 </div>   
            )
        }
    </div>
    </div>
    <button className='payment-button' onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>
        Book now
    </button>
    </div>
  );
}