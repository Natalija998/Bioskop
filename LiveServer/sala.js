import { FilmSala } from "./filmSala.js";
export class Sala
{
    constructor(id,oznaka,brSedista)
    {
        this.id=id;
        this.oznaka=oznaka;
        this.brSedista=brSedista;

        this.filmSalaNiz=new Array();
    }
    

    crtaj(divBioskop)
    {
        let divSale=document.createElement("div");
        divSale.className="divSale";
        divBioskop.appendChild(divSale);

        let divNaslov=document.createElement("div");
        divNaslov.className="divNaslov";
        divSale.appendChild(divNaslov);

        let labSale=document.createElement("h4");
        labSale.className="labSale";
        labSale.innerHTML="Sala: "+this.oznaka+", broj sedista: "+this.brSedista;
        divNaslov.appendChild(labSale);

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {
            this.ObrisiSalu(ev);
        }


        this.UzmiTermieZaSalu(divSale); 
    }

     ObrisiSalu(ev)
    {
        fetch("https://localhost:5001/Bioskop/ObrisiSalu/"+this.id, {
            method: "DELETE"
        }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali salu "+this.naziv+"!");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
        });
    }

    UzmiTermieZaSalu(divSale)
    {
        if(this.id != null)
        {
                    
        let divTermin=document.createElement("div");
        divTermin.className="divTermin";
        divSale.appendChild(divTermin);

        let labFilm=document.createElement("h5");
        labFilm.className="labFilm";
        labFilm.innerHTML="Filmovi:";
        divTermin.appendChild(labFilm);

        
        var noviRed=document.createElement("br");
        divTermin.appendChild(noviRed);

        let filmTabela=document.createElement("table");
        filmTabela.className="table";
        divTermin.appendChild(filmTabela);

        let thead=document.createElement("thead");
        filmTabela.appendChild(thead);

        let filmTr=document.createElement("tr");
        thead.appendChild(filmTr);

        var naziv=document.createElement("th");
        filmTr.appendChild(naziv);

        var lab=document.createElement("label");
        lab.innerHTML="Naziv";
        naziv.appendChild(lab);

        var zanr=document.createElement("th");
        filmTr.appendChild(zanr);

        var lab=document.createElement("label");
        lab.innerHTML="Zanr";
        zanr.appendChild(lab);


        var trajanje=document.createElement("th");
        filmTr.appendChild(trajanje); 

        var lab=document.createElement("label");
        lab.innerHTML="Trajanje (u minutima)";
        trajanje.appendChild(lab);

        var termin=document.createElement("th");
        filmTr.appendChild(termin);

        var lab=document.createElement("label");
        lab.innerHTML="Termin";
        termin.appendChild(lab);

        var glumci=document.createElement("th");
        filmTr.appendChild(glumci);

        var lab=document.createElement("label");
        lab.innerHTML="Glumci";
        glumci.appendChild(lab);

        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        
        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        var filmTh=document.createElement("th");
        filmTr.appendChild(filmTh);
        

        let tbody=document.createElement("tbody");
        filmTabela.appendChild(tbody);

        let br=0;
       
        fetch("https://localhost:5001/Bioskop/UzmiSveFilmSalaIzSale/"+this.id, {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(el => {
                let filmSala=new FilmSala(el.id,el.filmID,el.salaID,el.termin);

                this.filmSalaNiz.push(filmSala);

               filmSala.UzmiFilm(tbody);
               
               })}));
            }
    }
}