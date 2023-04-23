// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {Configuration, OpenAIApi} = require("openai");
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("480f174641ac0d3ebac25953f55f645f65c3e515cffade77055f3caeb7fddf33");
const firebase = require('firebase/compat/app');
const database = require('firebase/database');
const firestore = require('firebase/firestore');



const firebaseConfig = {
  apiKey: "AIzaSyD5GVzcthHAUWBa7Fr0cRrSPb3b26tisME",
  authDomain: "hackla.firebaseapp.com",
  projectId: "hackla",
  storageBucket: "hackla.appspot.com",
  messagingSenderId: "810563009692",
  appId: "1:810563009692:web:2114b4a75526f46022c159",
  measurementId: "G-ZZY7JYGLMP"
};

const ap = firebase.initializeApp(firebaseConfig);

const db  = database.getDatabase();
const fdb = firestore.getFirestore(ap);

const configuration = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(configuration);

const openshit = async(message) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();

  var prevmessages = [];
  prevmessages.push({role: "system", content: `Find the exact dates and place of the trip. If a duration or date of the trip 
  is not given, assume 1 week, starting the following week. If a specific date in a month is not specified, assume the 1st day of that month
   today is ${mm + '/' + dd + '/' + yyyy}. Only Output in JSON in this format {"start": "may 1", "end": "may 5", "location":"Dallas, Texas, United States"} Here is another example {"start": "june 3", "end": "june 10", "location":"Portland, Oregon, United States"}`});
  
  
  
  prevmessages.push({role: "user", content: message + `Only Output in JSON in this format {"start": "may 1", "end": "may 5", "location":"Dallas, Texas, United States"} Here is another example {"start": "june 3", "end": "june 10", "location":"Portland, Oregon, United States"}` });

  const completion = await openai.createChatCompletion({
    model:"gpt-4",
    messages:prevmessages,

})

const answer = completion.data.choices[0].message;

const dates = JSON.parse(answer.content);




const params = {
  engine: "google",
  q: `Events from ${dates.start} to ${dates.end}`,
  location: dates.location,
  google_domain: "google.com",
  gl: "us",
  hl: "en",
  device: "desktop"
};

const callback = async function (data) {
  let events =  data["events_results"];
 
  let eventstring = "";

  for (var i = 0; i < events.length; ++i){
    eventstring += `Event ${events[i].title} occurs ${events[i].date.when} on ${events[i].date.start_date}. `;
  }
  

  let mes = [];

  mes.push({role: "system", content: ` Make a day by day itenerary for group trip based on the chat. The trip is from ${dates.start} to ${dates.end}. Here are some events to choose from: ${eventstring}. Make sure the time of the events does not overlap. Also pick events based on what the people might like based on thier chat history. `});
  
  
  mes.push({role: "user", content: message + `Only Output in JSON in this format {"event_name": "LAHack", "start": "april 21", "end":"april 23"} Here is another example {"event_name": "Skateboard meet up", "start": "august 11", "end":"august 13"}` });




  const completion = await openai.createChatCompletion({
    model:"gpt-4",
    messages:mes,

  })
  const lol =  completion.data.choices[0].message;
  return lol



};

// Show result as JSON
search.json(params, callback);




}


export default async function handler(req, res) {
  
  const starCountRef = database.ref(db, 'messages/');
  database.onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    
    let message = "";
    for (const chatId in data) {
      // Get the message from the current dictionary and push it into the messagesArray
      message += data[chatId].message;
      message += "| ";
    }
    


    var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();

  var prevmessages = [];
  prevmessages.push({role: "system", content: `Find the exact dates and place of the trip. If a duration or date of the trip 
  is not given, assume 1 week, starting the following week. If a specific date in a month is not specified, assume the 1st day of that month
   today is ${mm + '/' + dd + '/' + yyyy}. Only Output in JSON in this format {"start": "may 1", "end": "may 5", "location":"Dallas, Texas, United States"} Here is another example {"start": "june 3", "end": "june 10", "location":"Portland, Oregon, United States"}`});
  
  
  
  prevmessages.push({role: "user", content: message + `Only Output in JSON in this format {"start": "may 1", "end": "may 5", "location":"Dallas, Texas, United States"} Here is another example {"start": "june 3", "end": "june 10", "location":"Portland, Oregon, United States"}` });

  const completion = await openai.createChatCompletion({
    model:"gpt-4",
    messages:prevmessages,

})

const answer = completion.data.choices[0].message;

const dates = JSON.parse(answer.content);



const params = {
  engine: "google",
  q: `Events from ${dates.start} to ${dates.end}`,
  location: dates.location,
  google_domain: "google.com",
  gl: "us",
  hl: "en",
  device: "desktop"
};

const callback = async function (data) {
  let events =  data["events_results"];
  
  let eventstring = "";

  for (var i = 0; i < events.length; ++i){
    eventstring += `Event ${events[i].title} occurs ${events[i].date.when} on ${events[i].date.start_date}. `;
  }
  

  let mes = [];

  mes.push({role: "system", content: ` Make a day by day itenerary for group trip based on the chat. The trip is from ${dates.start} to ${dates.end}. Here are some events to choose from: ${eventstring}. Make sure the time of the events does not overlap. Also pick events based on what the people might like based on their chat history.
  Only Output in JSON in this format {"May 1": ["Attend the stripe conference 8am to 10pm", "Check out the stars 10pm onwards"], "May 2": ["Breakfast at taco joint 10am to 12pm"]} `});
  
  
  mes.push({role: "user", content: message + `Only Output in JSON in this format {"May 1": ["Attend the stripe conference 8am to 10pm", "Check out the stars 10pm onwards"], "May 2": ["Breakfast at taco joint 10am to 12pm"]}` });




  const completion = await openai.createChatCompletion({
    model:"gpt-4",
    messages:mes,

  })
  const lol =  completion.data.choices[0].message;

const jsonlol = JSON.parse(lol.content);



const ref = firestore.doc(fdb, "Itenerary", "eZNbC6VKLD9aakILHQlh");

firestore.updateDoc(ref, {
  stuff: JSON.stringify(jsonlol),
}).then(() => {
  console.log('done');
})

};

// Show result as JSON
search.json(params, callback);




    
    
  });
  
  res.status(200).json({ data: 'here' })
}
