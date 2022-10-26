let choice;
fetch("./index.json")
    .then(response => {
       return response.json();
    })
    .then(function(song){
       const output = JSON.stringify(song);
       document.getElementById("songList").innerHTML = output;
       const obj = JSON.parse(output);
       buildTable(obj);
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
            if(choice == data.song[i].genre[j]){
                count++;
            }
        }
        if (count > 0) {
            const row = `${data.song[i].title}<br>
                         ${data.song[i].artist}<br>
                         ${data.song[i].year}<br>
                         ${data.song[i].genre}<br><br>
                        `;
            table.innerHTML += row
        }

    }
}

