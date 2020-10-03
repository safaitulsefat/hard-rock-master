const result = document.getElementById('result');
const lyrics = document.getElementById('lyrics')
//search button
const btn = document.getElementById('btn');
btn.addEventListener('click',function(){
    searchSONG();
    
})
//search song
function searchSONG() {
    const search = document.getElementById('search').value;
    fetch(`https://api.lyrics.ovh/suggest/${search}`)
    .then(res => res.json())
    .then(data => {
        result.innerHTML = '';
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const  artist = data.data[i].artist.name;
            result.innerHTML += `<p class="author lead"><strong>${title}</strong> Album by <span>${artist}</span> 
            <button data-artist='${artist}' data-title='${title}' class="btn btn-success">Get Lyrics</button></p>`;
           
            if (i==9) {
                break 
        }
        
            
        }
    })
}
//get lyrics button
result.addEventListener('click',e => {
     const createEL = e.target;
     if(createEL.tagName=== 'BUTTON'){
        const Title = createEL.getAttribute('data-title');
        const Artist = createEL.getAttribute('data-artist');
        getlyrics(Title,Artist);
        
     }
})
// getlyrics
function getlyrics(Title,Artist){
    fetch(`https://api.lyrics.ovh/v1/${Artist}/${Title}`)
    .then(res => res.json())
    .then(data=>{
        
        lyrics.innerHTML = `<h2 class="text-success mb-4" >${Title} - ${Artist}</h2>
        ${data.lyrics}`;
    })
}
