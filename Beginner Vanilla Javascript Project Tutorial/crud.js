const elApp=document.querySelector("tbody");
const search=document.querySelector("input[type=search]");
const elAppform=document.querySelector("#form");
const elAppformAdd=document.querySelector("#form-add");
const elAppformERG=document.querySelector("#form-save");


export const movies = [
    {
      title: "Interstellar",
      year: 2014
    },
    {
      title: "John Wick",
      year: 2014
    },
    {
      title: "John Wick 2",
      year: 2017
    },
    {
      title: "John Wick 3",
      year: 2019
    },
    {
      title: "Parasite",
      year: 2019
    }];
  function fetchAllMovies(movies)
  {
     
      let data="";
      elApp.innerHTML = "";
      movies.forEach((element,index) => {
        data+=`<tr>
        <td>${element.title}</td><td>${element.year}</td>
        <td>
        <button  class="edit btn btn-sm btn-outline-success" value="${index}">Modifier</button>
        <button class="delete btn btn-sm btn-outline-danger" value="${index}"> Supprimer</button>
        </td>
      </tr>`
      });
      if (data.length > 0) {
        // Affichage des données dans le tableau
        elApp.innerHTML += data;
       
        document.querySelectorAll("button.edit").forEach(b => {
          b.addEventListener("click", function() {
            return editMovie(b.value);
          });
        });
        document.querySelectorAll("button.delete").forEach(b => {
          b.addEventListener("click", function() {
            return deleteMovie(this.value);
          });
        });
      } 
      else 
      {
        // Aucune donnée
        elApp.innerHTML += "<p>Aucune ligne trouvée</p>";
      }
      
     
  }
  function getsearch()
  {
    let val=search.value;
    

      const filter=movies.filter(item=>item.title.toLowerCase().includes(this.value.toLowerCase()) ||  item.year.toString().toLowerCase().includes(this.value.toLowerCase()));
        fetchAllMovies(filter);


      if(val==="")
        fetchAllMovies(movies);
  }
  search.addEventListener("keyup",getsearch)
  elAppformAdd.addEventListener("click",()=>
  {
    
      let attr=elAppform.style.display ;
      if(attr==="none")
      {
        elAppform.style.display = "block";
        elAppformAdd.textContent="hide form";
      }
      else
      {
        elAppform.style.display = "none";
        elAppformAdd.textContent="display form";
      }});
  elAppformERG.addEventListener("click",()=>{

    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
  
    if (title && year) 
    {
      debugger
      const movie = { title: title, year: year };
      if (document.getElementById("hidden").value.length > 0) 
      {
        movies.splice(document.getElementById("hidden").value, 1, movie);
      } 
      else 
      {
        movies.push(movie);
      }
      // movies.push(movie);
    } return fetchAllMovies(movies); });
  function editMovie(index) {
    
    // Récupération de la ligne via son index
    // const movie = movies.find((m, i) => {
    //   return i == index;
    // });
  
    const movie=movies.find((m, i)=>i==index)
    // Alimentation des champs
    document.getElementById("title").value = movie.title;
    document.getElementById("year").value = movie.year;

    document.getElementById("hidden").value = index;
  
    elAppform.style.display = "block";

  }
  function deleteMovie(index) {
    if (confirm("Confirmez-vous la suppression de ce film ?")) {
      movies.splice(index, 1);
      fetchAllMovies(movies);
    }
  }
  fetchAllMovies(movies);
  elAppform.style.display = "none";