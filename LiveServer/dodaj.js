import { Bioskop } from "./bioskop.js";
export class Dodaj
{
    constructor()
    {
        this.kontejner=null;
    }
    crtaj(host)
    {
        if(!host) throw new Error("Host nije validan!");

        var glavniDiv=document.createElement("div");
        glavniDiv.className="glavniDiv";
        this.kontejner=glavniDiv;
        host.appendChild(this.kontejner);

        var divDodavanje=document.createElement("div");
        divDodavanje.className="divDodavanje";
        this.kontejner.appendChild(divDodavanje);

        var divBioskop=document.createElement("div");
        divBioskop.className="divBioskop";
        divBioskop.className="col-md-3";
        divDodavanje.appendChild(divBioskop);

        var divSala=document.createElement("div");
        divSala.className="divSala";
        divSala.className="col-md-3";
        divDodavanje.appendChild(divSala);

        var divFilm=document.createElement("div");
        divFilm.className="divFilm";
        divFilm.className="col-md-3";
        divDodavanje.appendChild(divFilm);

        var divFilmSala=document.createElement("div");
        divFilmSala.className="divFilmSala";
        divFilmSala.className="col-md-3";
        divDodavanje.appendChild(divFilmSala);


         this.crtajDodavanjeBioskop(divBioskop);
         this.crtajDodavanjeSala(divSala);
        this.crtajDodavanjeFilma(divFilm);
        this.crtajDodavanjeFilmaSala(divFilmSala);

       
        fetch("https://localhost:5001/Bioskop/PreuzmiBioskop", {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(el => {
                let  b=new Bioskop(el.id,el.naziv,el.adresa);

                let divBioskop=document.createElement("div");
                divBioskop.className="divBioskop";
                glavniDiv.appendChild(divBioskop);
                b.crtaj(glavniDiv);
               });
           }));
            

        
    }
    crtajDodavanjeBioskop(divBioskop)
    {  
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj bioskop";
        divBioskop.appendChild(h2);

        var noviRed=document.createElement("br");
        divBioskop.appendChild(noviRed);

        var labNaziv=document.createElement("label");
        labNaziv.innerHTML="Unesite naziv bioskopa:";
        divBioskop.appendChild(labNaziv);

        noviRed=document.createElement("br");
        divBioskop.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="nazivBioskopa";
        input.type="text";
        divBioskop.appendChild(input);

        noviRed=document.createElement("br");
        divBioskop.appendChild(noviRed);

        var labAdresa=document.createElement("label");
        labAdresa.innerHTML="Unesite naziv ulice i grada:";
        divBioskop.appendChild(labAdresa);

        noviRed=document.createElement("br");
        divBioskop.appendChild(noviRed);

        input=document.createElement("input");
        input.className="adresaBioskopa";
        input.type="text";
        divBioskop.appendChild(input);

        noviRed=document.createElement("br");
        divBioskop.appendChild(noviRed);

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj bioskop";
        dugme.className="dodajBioskop";
        dugme.className="btn btn-outline-primary";
        divBioskop.appendChild(dugme);

        dugme.onclick=(ev)=>
        {
            var naziv=this.kontejner.querySelector(".nazivBioskopa").value;
            var adresa=this.kontejner.querySelector(".adresaBioskopa").value;

            fetch("https://localhost:5001/Bioskop/DodajBioskop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "naziv":naziv,
                    "adresa":adresa
                })
            }).then(p => {
                if(p.ok)
                {
                    alert("Uspesno ste dodali bioskop!");
                    document.location.reload();
                }
                else
                {
                    alert("Nastala je greska prilikom dodavanja bioskopa!");
                    document.location.reload();

                }
            });
        }

    }
    crtajDodavanjeSala(divSala)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj salu";
        divSala.appendChild(h2);

        var noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var labNaziv=document.createElement("label");
        labNaziv.innerHTML="Unesite naziv sale:";
        divSala.appendChild(labNaziv);

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="nazivSale";
        input.type="text";
        divSala.appendChild(input);

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var labSedista=document.createElement("label");
        labSedista.innerHTML="Unesite broj sedista:";
        divSala.appendChild(labSedista);

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        input=document.createElement("input");
        input.className="brSedista";
        input.type="number";
        divSala.appendChild(input);

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var labSelect=document.createElement("label");
        labSelect.innerHTML="Izaberite bioskop:";
        divSala.appendChild(labSelect);

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var select=document.createElement("select");
        select.name="s";
        select.required=true;
        divSala.appendChild(select);

        //dodavanje opcija
        fetch("https://localhost:5001/Bioskop/PreuzmiBioskop", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(bioskop => {
                var opcija=document.createElement("option");
                opcija.value=bioskop.id;
                opcija.innerHTML=bioskop.naziv+" "+bioskop.adresa;
                select.appendChild(opcija);
            });
        }));

        noviRed=document.createElement("br");
        divSala.appendChild(noviRed);

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj salu";
        dugme.className="dodajSalu";
        dugme.className="btn btn-outline-primary";
        divSala.appendChild(dugme);
        
        dugme.onclick=(ev)=>
        {
            var nazivSale= divSala.querySelector(".nazivSale").value;
            var brSedista=divSala.querySelector(".brSedista").value;
            var b=divSala.querySelector('select[name="s"]').value;

            fetch("https://localhost:5001/Bioskop/DodajSalu/"+b,{
                method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                    "oznaka":nazivSale,
                    "brojsedista":brSedista,
                   })      
            }).then(p=>{
                if(p.ok)
                {
                    alert("Uspesno ste dodali salu!");
                    document.location.reload();
                }
                else
                {
                    alert("Nastala je greska prilikom dodavanja sale!");
                    document.location.reload();
                }
            })
            
        }
         
            
    }
    crtajDodavanjeFilma(divFilm)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj film";
        divFilm.appendChild(h2);

        var noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var labNaziv=document.createElement("label");
        labNaziv.innerHTML="Unesite naziv filma:";
        divFilm.appendChild(labNaziv);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="nazivFilma";
        input.type="text";
        divFilm.appendChild(input);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var labZanr=document.createElement("label");
        labZanr.innerHTML="Unesite zanr filma:";
        divFilm.appendChild(labZanr);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        input=document.createElement("input");
        input.className="zanrFilma";
        input.type="text";
        divFilm.appendChild(input);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var labTrajanje=document.createElement("label");
        labTrajanje.innerHTML="Unesite trajanje filma u minutima:";
        divFilm.appendChild(labTrajanje);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        input=document.createElement("input");
        input.className="trajanjeFilma";
        input.type="number";
        divFilm.appendChild(input);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var labGlumci=document.createElement("label");
        labGlumci.innerHTML="Unesite imena i prezimena glumaca:";
        divFilm.appendChild(labGlumci);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="glumci";
        input.type="text";
        divFilm.appendChild(input);

        noviRed=document.createElement("br");
        divFilm.appendChild(noviRed);

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj film";
        dugme.className="dodajFilm";
        dugme.className="btn btn-outline-primary";
        divFilm.appendChild(dugme);
        
        dugme.onclick=(ev)=>
        {
            var nazivFilma= divFilm.querySelector(".nazivFilma").value;
            var zanr=divFilm.querySelector(".zanrFilma").value;
            var trajanje=divFilm.querySelector(".trajanjeFilma").value;
            var glumci=divFilm.querySelector(".glumci").value;

            fetch("https://localhost:5001/Bioskop/DodajFilm",{
                method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                    "naziv":nazivFilma,
                    "zanr":zanr,
                    "vremetrajanja":trajanje,
                    "glumci":glumci
                   })      
            }).then(p=>{
                if(p.ok)
                {
                    alert("Uspesno ste dodali film!");
                    document.location.reload();
                }
                else
                {
                    alert("Nastala je greska prilikom dodavanja filma!");
                    document.location.reload();
                }
            })
            
        }
     }
    crtajDodavanjeFilmaSala(divFilmSala)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj termin";
        divFilmSala.appendChild(h2);

        var noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);

        var labFilm=document.createElement("label");
        labFilm.innerHTML="Izaberite film:";
        labFilm.className="labFilm";
        divFilmSala.appendChild(labFilm);

        noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);
        
        var selectFilm=document.createElement("select");
        selectFilm.name="film";
        selectFilm.required=true;
        divFilmSala.appendChild(selectFilm);

        //dodavanje opcija
        fetch("https://localhost:5001/Bioskop/PreuzmiFilm", {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(film => {
                   var opcija=document.createElement("option");
                   opcija.value=film.id;
                   opcija.innerHTML=film.naziv;
                   selectFilm.appendChild(opcija);
               });
           }));
        noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);

        var labSelect=document.createElement("label");
        labSelect.innerHTML="Izaberite bioskop:";
        divFilmSala.appendChild(labSelect);

        noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);

        var selectBioskop=document.createElement("select");
        selectBioskop.name="s";
        selectBioskop.required=true;
        divFilmSala.appendChild(selectBioskop);

        //dodavanje opcija
        fetch("https://localhost:5001/Bioskop/PreuzmiBioskop", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(bioskop => {
                var opcija=document.createElement("option");
                opcija.value=bioskop.id;
                opcija.innerHTML=bioskop.naziv+" "+bioskop.adresa;
                selectBioskop.appendChild(opcija);
            });
        }));


        noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);

        var dugmeB=document.createElement("button");
        dugmeB.innerHTML="Izaberi bioskop i film";
        dugmeB.className="izaneriBioskopIFilm";
        dugmeB.className="btn btn-outline-primary";
        divFilmSala.appendChild(dugmeB);
        

        noviRed=document.createElement("br");
        divFilmSala.appendChild(noviRed);
        
        dugmeB.onclick=(ev)=>
        {
            dugmeB.disabled=true;
            var labSala=document.createElement("label");
            labSala.innerHTML="Izaberite salu";
            labSala.className="labSala";
            divFilmSala.appendChild(labSala);

            noviRed=document.createElement("br");
            divFilmSala.appendChild(noviRed);

            var divCheck=document.createElement("div");
            divCheck.className="divCheck";
            divFilmSala.appendChild(divCheck);

            var bioskopID=divFilmSala.querySelector('select[name="s"]').value;
            //console.log(bioskopID);

            fetch("https://localhost:5001/Bioskop/UzmiSaleIzBioksopa/"+bioskopID, {
    
                method:"GET"
               }).then(p => p.json().then(data => {
                   data.forEach(sala => {
                       var check=document.createElement("input");
                       check.type="checkbox";
                      check.name="sala";
                      // check.className="sala";
                       check.value=sala.id;
                   //    console.log(sala.id);
                       divCheck.appendChild(check);

                       var labRadio=document.createElement("label");
                       labRadio.innerHTML=sala.oznaka;
                       labRadio.className="labRadio";
                       divCheck.appendChild(labRadio);

                       var input=document.createElement("input");
                       input.type="date";
                       input.className="datum";
                       input.name="datum"+sala.id;
                       divCheck.appendChild(input);

                       var input=document.createElement("input");
                       input.type="time";
                       input.className="vreme";
                       input.name="vreme"+sala.id;
                       divCheck.appendChild(input);
                   });
               }));

            noviRed=document.createElement("br");
            divFilmSala.appendChild(noviRed);
    
            var dugme=document.createElement("button");
            dugme.innerHTML="Dodaj film u salu";
            dugme.className="dodajSalu";
            dugme.className="btn btn-outline-primary";
            dugme.disabled=false;
            divFilmSala.appendChild(dugme);

            dugme.onclick=(ev)=>
            {
                
                var filmID=divFilmSala.querySelector('select[name="film"]').value;
                  
                let saleInput=[];
                saleInput=document.querySelectorAll('input[type="checkbox"]:checked');

                let saleID=[];
                saleInput.forEach(sala=>saleID.push(sala.value));

                
                let datumInput=[];
                let datum=[];

                let vremeInput=[];
                let vreme=[];

                let dataTime=[];
                
                saleID.forEach(el=>{
                    datumInput.push(document.querySelector('input[name="datum'+el+'"]'));
                    vremeInput.push(document.querySelector('input[name="vreme'+el+'"]'));
                })
              
                datumInput.forEach(d=>datum.push(d.value));
                vremeInput.forEach(v=>vreme.push(v.value));
                console.log(datum);
                console.log(vreme);

                for(let i=0;i<datum.length;i++)
                {
                    dataTime[i]=datum[i]+" "+vreme[i];
                    console.log(dataTime[i]);
                    fetch("https://localhost:5001/Bioskop/DodajFilmUSalu/"+filmID+"/"+saleID[i]+"/"+dataTime[i],{
                        method:"POST",
                            headers:{
                                "Content-Type": "application/json"
                            }  
                    }).then(p=>{
                        if(p.ok)
                        {
                            alert("Uspesno ste dodali sali film!");
                            dugmeB.disabled=false;
                            document.location.reload();
                        }
                        else
                        {
                            
                            alert("Nastala je greska prilikom dodavanja filma sali!");
                            dugmeB.disabled=false;
                            document.location.reload();
                        }
                    })
                }
                
                
            }
                
        }

        
     }
    


}