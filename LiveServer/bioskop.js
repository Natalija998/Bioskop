import {Sala} from "./sala.js"
export class Bioskop
{
    constructor(id,naziv,adresa)
    {
        this.id=id;
        this.naziv=naziv;
        this.adresa=adresa;

        this.sale=new Array();
        this.kontejner=null;
    }
   
    crtaj(host)
    {
        if(!host) throw new Error("Greska!");
   
        let divBioskop=document.createElement("div");
        divBioskop.className="divBioskop";
        this.kontejner=divBioskop;
        host.appendChild(this.kontejner);

        let divNaslov=document.createElement("div");
        divNaslov.className="divNaslov";
        divBioskop.appendChild(divNaslov);

        let labNaziv=document.createElement("label");
        labNaziv.className="labNaziv";
        labNaziv.style.display="block";
        labNaziv.innerHTML=this.naziv;
        divNaslov.appendChild(labNaziv);

        let inputNaziv=document.createElement("input");
        inputNaziv.style.display="none"; 
        inputNaziv.className="naziv";
        inputNaziv.type="text";
        divNaslov.appendChild(inputNaziv);

        let labAdresa=document.createElement("label");
        labAdresa.className="labAdresa";
        labAdresa.style.display="block";
        labAdresa.innerHTML=this.adresa;
        divNaslov.appendChild(labAdresa);

        let inputAdresa=document.createElement("input");
        inputAdresa.style.display="none"; 
        inputAdresa.className="adresa";
        inputAdresa.type="text";
        divNaslov.appendChild(inputAdresa);

        let dugmeIzmeni=document.createElement("button");
        dugmeIzmeni.innerHTML="Izmeni";
        dugmeIzmeni.className="btn btn-outline-secondary dugme";
        dugmeIzmeni.style.display="block";
        divNaslov.appendChild(dugmeIzmeni);

        let dugmeSacuvaj=document.createElement("button");
        dugmeSacuvaj.innerHTML="Sacuvaj";
        dugmeSacuvaj.className="btn btn-outline-success dugme";
        dugmeSacuvaj.style.display="none";
        divNaslov.appendChild(dugmeSacuvaj);

        let dugmeOtkazi=document.createElement("button");
        dugmeOtkazi.innerHTML="Otkazi";

        dugmeOtkazi.className="btn btn-outline-secondary dugme";
        dugmeOtkazi.style.display="none";
        divNaslov.appendChild(dugmeOtkazi);

        dugmeIzmeni.onclick=(ev)=>

        {
            labNaziv.style.display="none";
            labAdresa.style.display="none";

            inputNaziv.style.display="block";
            inputAdresa.style.display="block";

            dugmeIzmeni.style.display="none";
            dugmeSacuvaj.style.display="block";
            dugmeOtkazi.style.display="block";
            divNaslov.querySelector(".naziv").value=this.naziv;
            divNaslov.querySelector(".adresa").value=this.adresa;
            
        }

        dugmeSacuvaj.onclick=(ev)=>
        {
            let naziv=divNaslov.querySelector(".naziv").value;
            let adresa=divNaslov.querySelector(".adresa").value;
            fetch("https://localhost:5001/Bioskop/IzmeniBioskop/",{
                method:"PUT",
                    headers:{
                            "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "id":this.id,
                        "naziv":naziv,
                        "adresa":adresa
                    })      
            }).then(p=>{
                if(p.ok)
                {
                    console.log("PROSLO");
                    labNaziv.innerHTML=naziv;
                    labNaziv.style.display="block";
                    labAdresa.innerHTML=adresa;
                    labAdresa.style.display="block";

                    inputNaziv.style.display="none";
                    inputAdresa.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";
                }
                else
                {
                    console.log("NIJE PROSLO");  
                    labNaziv.innerHTML=this.naziv;
                    labNaziv.style.display="block";
                    labAdresa.innerHTML=this.adresa;
                    labAdresa.style.display="block";

                    inputNaziv.style.display="none";
                    inputAdresa.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";

                    
                }
            })

        }

        dugmeOtkazi.onclick=(ev)=>
        {
            labNaziv.innerHTML=this.naziv;
            labNaziv.style.display="block";
            labAdresa.innerHTML=this.adresa;
            labAdresa.style.display="block";

            inputNaziv.style.display="none";
            inputAdresa.style.display="none";

            dugmeIzmeni.style.display="block";
            dugmeSacuvaj.style.display="none";
            dugmeOtkazi.style.display="none";
        }

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger dugme";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {
            fetch("https://localhost:5001/Bioskop/ObrisiBioskop/"+this.id, {
            method: "DELETE"
            }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali Bisokop "+this.naziv+" "+this.adresa+" ! ");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
            });
        }

        
        this.dodajSaluUBioskop(divBioskop);
              
    }
    dodajSaluUBioskop(divBioskop)
    {
        fetch("https://localhost:5001/Bioskop/UzmiSaleIzBioksopa/"+this.id, {

            method:"GET"
           }).then(p => p.json().then(data => {
               if(data.length > 0)
               {
               data.forEach(el => {
               
                let sala=new Sala(el.id,el.oznaka,el.brojSedista);

                sala.crtaj(divBioskop);
                   
                this.sale.push(sala);
                  
    
                })
            }
           }));
    }    

}