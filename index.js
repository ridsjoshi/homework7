// choice represents the choice from the dropdown
let choice;
//get data from json file
fetch("./index.json")
    .then(response => {
       return response.json();
    })
    .then(function(song){
       const output = JSON.stringify(song); // create the serialized list of songs
       document.getElementById("songList").innerHTML = output; // print onto page
       const obj = JSON.parse(output); // parse the serialized list into an array
       buildTable(obj); // call the function to build a readable organized table
       $(document).ready(function () {
           $('select[name=genres]').change(function () {
               choice = this.value;
           });
           $("input[type=button]").click(function () {
               document.getElementById("filtered").innerHTML = "";
               newOutput(obj);
           });
       });
    });

function buildTable(data){
    // add each set of information by row to the table
    const table = document.getElementById("songInfo");
    for (i = 0; i < 12; i++){
        const row = `<tr>
                     <td>${data.song[i].title}</td>
                     <td>${data.song[i].artist}</td>
                     <td>${data.song[i].year}</td>
                     <td>${data.song[i].genre}</td>
                    </tr>`;
        table.innerHTML += row
    }
}

function newOutput(data){
    let count = 0;
    const table = document.getElementById("filtered");
    for (i = 0; i < 12; i++){
        count = 0;
        for(j = 0; j < data.song[i].genre.length; j++){
            if(choice == data.song[i].genre[j]){ //nested for loop to loop through the genres of each song
                count++;
            }
        }
        if (count > 0) { // this occurs when the genre is in the song, so the song information is printed
            const row = `${data.song[i].title}<br>
                         ${data.song[i].artist}<br>
                         ${data.song[i].year}<br>
                         ${data.song[i].genre}<br><br>
                        `;
            table.innerHTML += row
        }

    }
}

