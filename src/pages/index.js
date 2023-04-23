import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'


import { auth } from '@/firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import NavbarHeader from '@/NavbarHeader';
import NavbarOverlay from '@/NavbarOverlay';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [navbarOpen, setNavbarOpen] = useState(false);
 const router = useRouter();
  const [number, setNumber] = useState('');
 const [user] = useAuthState(auth);
 const provider = new GoogleAuthProvider();
  const signin = () => {
    if (!number){
      alert('enter number');
      return;
    }

    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        updateProfile(auth.currentUser, {displayName: number});
        
        router.push('/dashboard');
    }).catch((error) => {

   console.log(error);

  });
}

const gpttest = async() => {
  const message = `LSure, here's the same conversation with a debate added:

  Liam: Hey guys, have you ever been to LA? I was thinking we should plan a trip there.
  
  Sophie: No, I've never been, but I've always wanted to go. What do you have in mind?
  
  Emma: That sounds like a great idea! When were you thinking of going?
  
  Aiden: I've been there a few times, but I'm down to go again. I think we should go in the summer when the weather's nice.
  
  Liam: I was thinking maybe in August, what do you guys think?
  
  Sophie: That works for me. How long were you thinking of staying?
  
  Emma: Yeah, August sounds good. I'm free for most of the month.
  
  Aiden: I think we should stay for at least a week. There's so much to do and see in LA.
  
  Liam: Agreed. I was thinking we could rent a house or an Airbnb together. It would be cheaper than getting separate hotel rooms.
  
  Sophie: That's a good idea. We should start looking for places now before they get booked up.
  
  Emma: Definitely. Also, we should plan out our itinerary so we don't miss out on any must-see attractions. I want to go to a concert, but I hate Taylor Swift.
  
  Aiden: Speaking of attractions, I think we should also consider visiting San Francisco while we're in California.
  
  Liam: San Francisco? That's pretty far from LA, isn't it?
  
  Sophie: Yeah, it's a 6-hour drive or a 1-hour flight.
  
  Emma: But it's such a beautiful city, and we could take a scenic road trip up the coast.
  
  Aiden: Exactly, and we could stop at some great spots along the way.
  
  Liam: I don't know, guys. I feel like we should focus on exploring LA and not try to cram too much into one trip.
  
  Sophie: I see what you mean, but San Francisco could be a great addition to our trip. We could even stay there for a night or two.
  
  Emma: And we could check out some of the famous landmarks like the Golden Gate Bridge and Alcatraz Island.
  
  Aiden: Plus, the food and wine scene in San Francisco is amazing too.
  
  Liam: Okay, you guys make some good points. Let's add San Francisco to our itinerary, but we'll have to plan it out carefully so we don't get too rushed.
  
  Sophie: Agreed. I'll start looking into transportation options and accommodations for us.
  
  Emma: Awesome, I'm excited for this trip!`;

  const response = await fetch('/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    
  })

  const data = await response.json();
  const shit = await data.data.content;

  console.log(data, shit);
}

  

  return (
    <>
    <Head>

    <title>lol</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&display=swap" rel="stylesheet"></link>

</Head>
  <main>
    <div className='first-screen bg-blue-200'>
      
        
    <div className=" container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center ">
        <div className="  pt-4 text-center flex flex-col w-full text-center justify-center items-start   md:text-left">
              
          <h1 className="my-4 text-5xl w-full fp-title font-bold leading-tight text-center title">
                  Plan a group Trip in seconds.
              </h1>
              
              
              <div className='middle-container'>
              <div className='inner-container '>
              <input type="text" id="text" class="bg-gray-50  border " onChange={(e)=>{setNumber(e.target.value)}} placeholder={"+16823759884"} />

              </div>
                </div>
                <br />
                <div className='middle-container'>
                <button onClick={signin} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
                </div>
              
            
            
          </div>
    </div>
      
    </div>
  </main>
    </>
  )
}
