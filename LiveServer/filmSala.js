import { Film } from "./film.js";

export class FilmSala
{
    constructor(id,film,sala,vreme)
    {   this.id=id;
        this.film=film;
        this.sala=sala;
        this.termin=vreme;
    }

    UzmiFilm(tbody)
    {

        fetch("https://localhost:5001/Bioskop/PreuzmiFilm/"+this.film, {

            method:"GET"
           }).then(p => p.json().then(data => {

                    let film=new Film(this.film,data.naziv,data.zanr,data.vremeTrajanja,data.glumci);


                    film.crtaj(tbody,this);

            }));
        
    }
    izmeni(id,novoVreme,filmNovi)
    {
        fetch("https://localhost:5001/Bioskop/IzmeniFilmSalaTermin/"+id+"/"+novoVreme+"/"+filmNovi,{
            method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    
                })      
            }).then(p=>{
                if(p.ok)
                {
                    document.location.reload();
                }
                else
                {
                    alert("Izmena nije uspesna");
                }
            });
    }

    Obrisi(id)
    {
        fetch("https://localhost:5001/Bioskop/ObrisiFilmSala/"+id, {
            method: "DELETE"
        }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali film!");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
        });
    }
    
}