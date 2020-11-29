// Get Quote From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn= document.getElementById('newquote');

async function getQuote()
{

    const proxyURL='http://cors-anywhere.herokuapp.com/'
const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try
{
const response= await fetch(proxyURL+apiURL);
const data = await response.json(); 

if(data.quoteAuthor==='')
{
    authorText.innerText ='Unknown';
}
else
{
    authorText.innerText=data.quoteAuthor;
}
if(data.quoteText.length>120)
{
    quoteText.classList.add('long-quote');

}
else
{

quoteText.classList.remove('long-quote');
}

authorText.innerText = data.quoteAuthor;
quoteText.innerText = data.quoteText;


}catch(error)
{ 
    console.log(error);
    getQuote();
   }

}

// Tweet Quote
function tweetQuote()
{
   const quote = quoteText.innerText;
   const author=authorText.innerText;
   const twitterUrl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
   window.open(twitterUrl,'_blank'); 
}

// Event Listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
